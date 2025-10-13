import type { StateCreator } from "zustand";
import { transactionsService } from "../services";
import type { GetTransactionsQuery, Transaction, TransactionInput, TransactionUpdate } from "../types/api.types";
import type { TStore } from "../types/store";

type TTransactionsState = {
    transactions: Transaction[],
    transaction: Transaction | null,
    isLoadingTransaction: boolean
}

type TTransactionsActions = {
    fetchTransactions: (query: GetTransactionsQuery) => Promise<void>,
    fetchTransactionById: (transactionId: string, baseCurrency?: string) => Promise<void>,
    // addTransaction: (data: TransactionInput) => Promise<void>
    // modifyTransaction: (transactionId: string, data: TransactionUpdate) => Promise<void>,
    // deleteTransaction: (transactionId: string) => Promise<void>
}

const initialState: TTransactionsState = {
    transactions: [],
    transaction: null,
    isLoadingTransaction: false
}

export type TTransactionsSlice = TTransactionsState & TTransactionsActions;

export const createTransactionsSlice: StateCreator<
    TTransactionsSlice,
    [['zustand/immer', never]],
    [],
    TTransactionsSlice
> = (set) => ({
    ...initialState,
    fetchTransactions: async (query) => {
        console.log('fetchTransactions: chiamata iniziata', { query });
        set({ isLoadingTransaction: true });
        try {
            const res = await transactionsService.getAll(query);
            console.log('fetchTransactions: risposta ricevuta', { res, length: res.length });
            set({ transactions: res, isLoadingTransaction: false });
        } catch (error) {
            console.error('fetchTransactions: errore catturato', error);
            set({ isLoadingTransaction: false });
        }
    },
    fetchTransactionById: async (transactionId, baseCurrency?) => {
        console.log('fetchTransactionById: chiamata iniziata', { transactionId });
        set({ isLoadingTransaction: true });
        try {
            const res = await transactionsService.getById(transactionId);
            console.log('fetchTransactionById: risposta ricevuta', { res });
            set({ transaction: res, isLoadingTransaction: false });
        } catch (error) {
            console.error('fetchTransactionById: errore catturato', error);
            set({ isLoadingTransaction: false });
        }
    }
})
