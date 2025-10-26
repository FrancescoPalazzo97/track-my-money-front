import { apiClient } from '../lib/axiosClient';
import type { TApiResponse, TCategory, TCategoryInput, TCategoryUpdate } from '../types/api.types';

export const categoriesService = {
    /**
     * Get all categories
     * L'interceptor gestisce gli errori, se arriviamo qui è sempre success: true
     */
    getAll: async (): Promise<TCategory[]> => {
        const response = await apiClient.get<TApiResponse<TCategory[]>>('/categories');
        return response.data.data || [];
    },

    /**
     * Get category by ID
     * L'interceptor gestisce gli errori, se arriviamo qui è sempre success: true
     */
    getById: async (id: string): Promise<TCategory> => {
        const response = await apiClient.get<TApiResponse<TCategory>>(`/categories/${id}`);
        return response.data.data;
    },

    /**
     * Create new category
     * L'interceptor gestisce gli errori, se arriviamo qui è sempre success: true
     */
    create: async (data: TCategoryInput): Promise<TCategory> => {
        const response = await apiClient.post<TApiResponse<TCategory>>('/categories', data);
        return response.data.data;
    },

    /**
     * Update category
     * L'interceptor gestisce gli errori, se arriviamo qui è sempre success: true
     */
    update: async (id: string, data: TCategoryUpdate): Promise<TCategory> => {
        const response = await apiClient.patch<TApiResponse<TCategory>>(`/categories/${id}`, data);
        return response.data.data;
    },

    /**
     * Delete category
     * L'interceptor gestisce gli errori, se arriviamo qui è sempre success: true
     */
    delete: async (id: string): Promise<string> => {
        const response = await apiClient.delete<TApiResponse<string>>(
            `/categories/${id}`
        );
        return response.data.data;
    },
};