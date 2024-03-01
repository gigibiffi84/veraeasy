import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getValueFromLocalStorage} from "@/lib/utils.ts";

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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            return config;
        },
        error => {
            Promise.reject(error)
        });

    return axiosInstance;
};

export default initialization;