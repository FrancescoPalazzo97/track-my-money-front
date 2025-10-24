import { apiClient } from '../lib/axiosClient';
import type { TApiResponse, TCategory, TCategoryInput, TCategoryUpdate } from '../types/api.types';

export const categoriesService = {
    /**
     * Get all categories
     */
    getAll: async (): Promise<TCategory[]> => {
        const response = await apiClient.get<TApiResponse<TCategory[]>>('/categories');
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data || [];
    },

    /**
     * Get category by ID
     */
    getById: async (id: string): Promise<TCategory> => {
        const response = await apiClient.get<TApiResponse<TCategory>>(`/categories/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },

    /**
     * Create new category
     */
    create: async (data: TCategoryInput): Promise<TCategory> => {
        const response = await apiClient.post<TApiResponse<TCategory>>('/categories', data);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },

    /**
     * Update category
     */
    update: async (id: string, data: TCategoryUpdate): Promise<TCategory> => {
        const response = await apiClient.patch<TApiResponse<TCategory>>(`/categories/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },

    /**
     * Delete category
     */
    delete: async (id: string): Promise<string> => {
        const response = await apiClient.delete<TApiResponse<string>>(
            `/categories/${id}`
        );
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },
};