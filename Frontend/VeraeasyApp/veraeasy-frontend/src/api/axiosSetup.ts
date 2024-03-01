import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getValueFromLocalStorage} from "@/lib/utils.ts";
import SignInApi from "@/api/SignInApi.ts";

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    // Request interceptor for API calls
    axiosInstance.interceptors.request.use(
        async config => {
            const value = getValueFromLocalStorage("veraeasy:token");
            const keys = JSON.parse(value)
            config.headers = {
                'Authorization': `Bearer ${keys.access_token}`,
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
            const value = getValueFromLocalStorage("veraeasy:token");
            const keys = JSON.parse(value)
            const access_token = await SignInApi.refreshSession(keys["refresh_token"]);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default initialization;