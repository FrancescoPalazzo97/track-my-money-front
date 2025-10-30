import type { StateCreator } from "zustand";
import type { TGetTransactionsQuery, TTransaction, TTransactionInput, TTransactionUpdate } from "../types/api.types";
import { categoriesService } from "../services/categoriesService";
import type { TStore } from "../types/store";
import { tryCatch } from "../lib/tryCatch";
import { success } from "zod";
import { transactionsService } from "../services/transactionsService";
import dayjs from "dayjs";

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

const baseQuery = {
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    baseCurrency: 'EUR'
}

export type TTransactionsSlice = TTransactionsState & TTransactionsActions;

export const createTransactionSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TTransactionsSlice
> = (set) => ({
    ...initialState,
    fetchTransactions: async (query: TGetTransactionsQuery = baseQuery) => {
        console.log('fetchTransactions: chiamata iniziata');
        set({ isLoadingTransaction: true });
        const res = await transactionsService.getAll(query);
        console.log('fetchTransactions: risposta ricevuta: ', { res, length: res.length });
        set({ transactions: res, isLoadingTransaction: false });
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