import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken, saveToken} from "@/lib/utils.ts";
import SignInApi from "@/api/SignInApi.ts";

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    // Request interceptor for API calls
    axiosInstance.interceptors.request.use(
        async config => {
            const value = getToken("veraeasy:token");
            console.log('axios-interceptor >>>', value)
            config.headers = {
                'Authorization': `Bearer ${value.access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            return config;
        },
        error => {
            Promise.reject(error)
        });
    // Response interceptor for API calls
    axiosInstance.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        const originalRequest = error.config;
        const unauth = error.response && (error.response.status === 403 || error.response.status === 401);
        if (unauth && !originalRequest._retry) {
            originalRequest._retry = true;
            const value = getToken("veraeasy:token");
            let parsed = undefined;

            if (typeof value === "string") {
                parsed = JSON.parse(value as string);
            }
            console.log('axios-interceptor <<<', parsed)
            const refreshToken = parsed ? parsed["refresh_token"] : value["refresh_token"];
            const newToken = await SignInApi.refreshSession(refreshToken);
            saveToken("veraeasy:token", newToken)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken.access_token;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default initialization;