import { apiClient } from '../lib/axiosClient';
import type { ApiResponse, Category, CategoryInput, CategoryUpdate } from '../types/api.types';

export const categoriesService = {
  /**
   * Get all categories
   * @param group - If true, returns hierarchical structure with subCategories
   */
  getAll: async (group?: boolean): Promise<Category[]> => {
    const params = group ? { group: 'true' } : undefined;
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories', { params });
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data || [];
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Create new category
   */
  create: async (data: CategoryInput): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Update category
   */
  update: async (id: string, data: CategoryUpdate): Promise<Category> => {
    const response = await apiClient.patch<ApiResponse<Category>>(`/categories/${id}`, data);
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Delete category
   */
  delete: async (id: string): Promise<string> => {
    const response = await apiClient.delete<ApiResponse<string>>(
      `/categories/${id}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },
};
