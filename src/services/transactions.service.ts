import { apiClient } from '../lib/axiosClient';
import type {
  Transaction,
  TransactionInput,
  TransactionUpdate,
  GetTransactionsQuery,
} from '../types/api.types';

export const transactionsService = {
  /**
   * Get all transactions with required date range
   * @param query - Must include startDate and endDate, optionally baseCurrency
   */
  getAll: async (query: GetTransactionsQuery): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>('/transactions', {
      params: query,
    });
    return response.data || [];
  },

  /**
   * Get transaction by ID
   * @param id - Transaction ID
   * @param baseCurrency - Optional currency for amount conversion (defaults to EUR)
   */
  getById: async (id: string, baseCurrency?: string): Promise<Transaction> => {
    const params = baseCurrency ? { baseCurrency } : undefined;
    const response = await apiClient.get<Transaction>(`/transactions/${id}`, {
      params,
    });
    if (!response.data) {
      throw new Error('Transazione non trovata');
    }
    return response.data;
  },

  /**
   * Create new transaction
   */
  create: async (data: TransactionInput): Promise<Transaction> => {
    const response = await apiClient.post<Transaction>('/transactions', data);
    if (!response.data) {
      throw new Error('Errore nella creazione della transazione');
    }
    return response.data;
  },

  /**
   * Update transaction
   */
  update: async (id: string, data: TransactionUpdate): Promise<Transaction> => {
    const response = await apiClient.patch<Transaction>(
      `/transactions/${id}`,
      data
    );
    if (!response.data) {
      throw new Error("Errore nell'aggiornamento della transazione");
    }
    return response.data;
  },

  /**
   * Delete transaction
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/transactions/${id}`);
  },
};
