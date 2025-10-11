import { apiClient } from '../lib/axiosClient';
import type { Category, CategoryInput, CategoryUpdate, ApiResponse } from '../types/api.types';

export const categoriesService = {
  /**
   * Get all categories
   * @param group - If true, returns hierarchical structure with subCategories
   */
  getAll: async (group?: boolean): Promise<Category[]> => {
    const params = group ? { group: 'true' } : undefined;
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories', { params });
    return response.data.data || [];
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    if (!response.data.data) {
      throw new Error('Categoria non trovata');
    }
    return response.data.data;
  },

  /**
   * Create new category
   */
  create: async (data: CategoryInput): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    if (!response.data.data) {
      throw new Error('Errore nella creazione della categoria');
    }
    return response.data.data;
  },

  /**
   * Update category
   */
  update: async (id: string, data: CategoryUpdate): Promise<Category> => {
    const response = await apiClient.patch<ApiResponse<Category>>(`/categories/${id}`, data);
    if (!response.data.data) {
      throw new Error('Errore nell\'aggiornamento della categoria');
    }
    return response.data.data;
  },

  /**
   * Delete category
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
