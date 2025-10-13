import { apiClient } from '../lib/axiosClient';
import type { Category, CategoryInput, CategoryUpdate } from '../types/api.types';

export const categoriesService = {
  /**
   * Get all categories
   * @param group - If true, returns hierarchical structure with subCategories
   */
  getAll: async (group?: boolean): Promise<Category[]> => {
    const params = group ? { group: 'true' } : undefined;
    const response = await apiClient.get<Category[]>('/categories', { params });
    return response.data || [];
  },

  /**
   * Get category by ID
   */
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    if (!response.data) {
      throw new Error('Categoria non trovata');
    }
    return response.data;
  },

  /**
   * Create new category
   */
  create: async (data: CategoryInput): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories', data);
    if (!response.data) {
      throw new Error('Errore nella creazione della categoria');
    }
    return response.data;
  },

  /**
   * Update category
   */
  update: async (id: string, data: CategoryUpdate): Promise<Category> => {
    const response = await apiClient.patch<Category>(`/categories/${id}`, data);
    if (!response.data) {
      throw new Error('Errore nell\'aggiornamento della categoria');
    }
    return response.data;
  },

  /**
   * Delete category
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
