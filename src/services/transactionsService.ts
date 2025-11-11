
import { apiClient } from '../lib/axiosClient';
import type {
    TTransaction,
    TTransactionInput,
    TTransactionUpdate,
    TGetTransactionsQuery,
    TApiResponse,
} from '../types/api.types';

export const transactionsService = {
    /**
     * Get all transactions with required date range
     * @param query - Must include startDate and endDate, optionally baseCurrency
     */
    getAll: async (query: TGetTransactionsQuery): Promise<TTransaction[]> => {
        const response = await apiClient.get<TApiResponse<TTransaction[]>>('/transactions', {
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
    getById: async (id: string, baseCurrency?: string): Promise<TTransaction> => {
        const params = baseCurrency ? { baseCurrency } : undefined;
        const response = await apiClient.get<TApiResponse<TTransaction>>(`/transactions/${id}`, {
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
    create: async (data: TTransactionInput): Promise<TTransaction> => {
        const response = await apiClient.post<TApiResponse<TTransaction>>('/transactions', data);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },

    /**
     * Update transaction
     */
    update: async (id: string, data: TTransactionUpdate): Promise<TTransaction> => {
        const response = await apiClient.patch<TApiResponse<TTransaction>>(
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
        const response = await apiClient.delete<TApiResponse<string>>(
            `/transactions/${id}`
        );
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data.data;
    },
};
