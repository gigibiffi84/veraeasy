import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const initialization = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    // Request interceptor for API calls

    // Response interceptor for API calls

    return axiosInstance;
};

export default initialization;