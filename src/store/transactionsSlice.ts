import type { StateCreator } from "zustand";
import type { TTransaction, TTransactionInput } from "../types/api.types";
import type { TStore } from "../types/store";
import { transactionsService } from "../services/transactionsService";
import { tryCatch } from "../lib/tryCatch";
import { calculateDateRange } from "../lib/utility";

type TTransactionsState = {
    transactions: TTransaction[],
    transaction: TTransaction | null,
    isLoadingTransaction: boolean,
    transactionError: string | null
}

type TTransactionsActions = {
    fetchTransactions: () => Promise<void>,
    fetchTransactionById: (transactionId: string) => Promise<void>,
    addTransaction: (data: TTransactionInput) => Promise<{ success: boolean }>,
    modifyTransaction: (transactionId: string) => Promise<{ success: boolean }>,
    deleteTransaction: (transactionId: string) => Promise<{ success: boolean }>,
    setTransactionError: (message: string) => void,
    clearTransactionError: () => void
}

const initialState: TTransactionsState = {
    transactions: [],
    transaction: null,
    isLoadingTransaction: false,
    transactionError: null
}

export type TTransactionsSlice = TTransactionsState & TTransactionsActions;

export const createTransactionSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TTransactionsSlice
> = (set, get) => ({
    ...initialState,
    fetchTransactions: async () => {
        const { date } = get();

        const { startDate, endDate } = calculateDateRange(date);

        set({ isLoadingTransaction: true });
        const [data, error] = await tryCatch(
            transactionsService.getAll({ startDate, endDate, baseCurrency: 'EUR' })
        );

        if (error) {
            set({ isLoadingTransaction: false });
            get().setError(error.message);
            return;
        }

        set({
            transactions: data || [],
            isLoadingTransaction: false
        });
    },
    fetchTransactionById: async (transactionId) => {
        console.log('fetchTransactionById: chiamata iniziata', { transactionId });
        set({ isLoadingTransaction: true });
        const res = await transactionsService.getById(transactionId, 'EUR');
        console.log('fetchTransactionById: risposta ricevuta', { res });
        set({ transaction: res, isLoadingTransaction: false });
    },
    addTransaction: async (data) => {
        return { success: true }
    },
    modifyTransaction: async () => {
        return { success: true }
    },
    deleteTransaction: async () => {
        return { success: true }
    },
    setTransactionError: () => { },
    clearTransactionError: () => { },
})