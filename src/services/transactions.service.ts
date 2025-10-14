import { apiClient } from '../lib/axiosClient';
import type {
  Transaction,
  TransactionInput,
  TransactionUpdate,
  GetTransactionsQuery,
  ApiResponse,
} from '../types/api.types';

export const transactionsService = {
  /**
   * Get all transactions with required date range
   * @param query - Must include startDate and endDate, optionally baseCurrency
   */
  getAll: async (query: GetTransactionsQuery): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>('/transactions', {
      params: query,
    });
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data || [];
  },

  /**
   * Get transaction by ID
   * @param id - Transaction ID
   * @param baseCurrency - Optional currency for amount conversion (defaults to EUR)
   */
  getById: async (id: string, baseCurrency?: string): Promise<Transaction> => {
    const params = baseCurrency ? { baseCurrency } : undefined;
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`, {
      params,
    });
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Create new transaction
   */
  create: async (data: TransactionInput): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/transactions', data);
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Update transaction
   */
  update: async (id: string, data: TransactionUpdate): Promise<Transaction> => {
    const response = await apiClient.patch<ApiResponse<Transaction>>(
      `/transactions/${id}`,
      data
    );
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },

  /**
   * Delete transaction
   */
  delete: async (id: string): Promise<string> => {
    const response = await apiClient.delete<ApiResponse<string>>(
      `/transactions/${id}`
    );
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data;
  },
};
