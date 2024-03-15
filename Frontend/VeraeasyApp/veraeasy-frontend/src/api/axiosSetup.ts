import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken, saveToken} from "@/lib/utils.ts";
import SignInApi from "@/api/SignInApi.ts";

const clearSession = () => {
    saveToken("veraeasy:token", undefined);
    saveToken("veraeasy:user", undefined);
    window.location.reload();
}

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    // Request interceptor for API calls
    axiosInstance.interceptors.request.use(
        async config => {
            const value = getToken("veraeasy:token") as [];
            console.log('axios-interceptor >>>', value)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const at = value["access_token"];
            config.headers.setAuthorization(`Bearer ${at}`);
            config.headers.setAccept('application/json');
            config.headers.setContentType('application/json');
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
            const value = getToken("veraeasy:token") as [];
            let parsed = undefined;

            if (typeof value === "string") {
                parsed = JSON.parse(value as string);
            }

            console.log('axios-interceptor <<<', parsed)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const refreshToken = parsed ? parsed["refresh_token"] : value["refresh_token"];
            if (!refreshToken) {
                clearSession();
            }
            const newToken = await SignInApi.refreshSession(refreshToken);
            if (!newToken || !newToken.access_token) {
                clearSession();
            }

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken.access_token;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default initialization;