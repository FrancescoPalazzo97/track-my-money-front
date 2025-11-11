import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { TApiResponse } from '../types/api.types';
// Base configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const TIMEOUT = 10000;

// Create axios instance
const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        console.log('axiosClient: richiesta in uscita', { url: config.url, baseURL: config.baseURL, method: config.method });
        return config;
    },
    (error: AxiosError) => {
        console.error('axiosClient: errore nella richiesta', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('axiosClient: risposta ricevuta', { url: response.config.url, status: response.status, data: response.data });
        return response;
    },
    (error: AxiosError<TApiResponse<null>>) => {
        // Handle common errors
        console.error('axiosClient: errore nella risposta', { error, response: error.response, request: error.request });

        if (error.response) {
            // Estrai il messaggio di errore dal backend se disponibile
            const backendMessage = error.response.data?.message;

            if (backendMessage) {
                console.error('axiosClient: messaggio dal backend:', backendMessage);
                // Crea un nuovo errore con il messaggio del backend
                return Promise.reject(new Error(backendMessage));
            }

            // Gestione errori HTTP standard se non c'è messaggio dal backend
            switch (error.response.status) {
                case 404:
                    console.error('Risorsa non trovata');
                    return Promise.reject(new Error('Risorsa non trovata'));
                case 500:
                    console.error('Errore del server');
                    return Promise.reject(new Error('Errore del server'));
                default:
                    return Promise.reject(new Error(`Errore HTTP ${error.response.status}`));
            }
        } else if (error.request) {
            // Network error
            console.error('Errore di rete');
            return Promise.reject(new Error('Errore di rete'));
        }

        return Promise.reject(error);
    }
);

// Generic API methods
export const apiClient = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.get<T>(url, config);
    },

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.post<T>(url, data, config);
    },

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.put<T>(url, data, config);
    },

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.patch<T>(url, data, config);
    },

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return axiosClient.delete<T>(url, config);
    },
};

export default axiosClient;