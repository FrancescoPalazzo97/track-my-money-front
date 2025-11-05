import type { StateCreator } from "zustand";
import type { TTransaction, TTransactionInput, TTransactionUpdate } from "../types/api.types";
import type { TStore } from "../types/store";
import { transactionsService } from "../services/transactionsService";
import { tryCatch } from "../lib/tryCatch";
import { calculateDateRange } from "../lib/utility";
import dayjs from "dayjs";

type TTransactionsState = {
    transactions: TTransaction[],
    transaction: TTransaction | null,
    isLoadingTransaction: boolean
}

type TTransactionsActions = {
    fetchTransactions: () => Promise<void>,
    fetchTransactionById: (transactionId: string) => Promise<void>,
    addTransaction: (data: TTransactionInput, type: string) => Promise<{ success: boolean }>,
    modifyTransaction: (transactionId: string, data: TTransactionUpdate, type: string) => Promise<{ success: boolean }>,
    deleteTransaction: (transactionId: string) => Promise<{ success: boolean }>
}

const initialState: TTransactionsState = {
    transactions: [],
    transaction: null,
    isLoadingTransaction: false
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
    addTransaction: async (data, type) => {
        console.log('addTransaction: chiamata iniziata', { data });
        const [res, error] = await tryCatch(transactionsService.create(data));

        if (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            get().setError(errorMessage); // Chiama azione dell'errorSlice
            return { success: false };
        }

        console.log('addTransaction: riposta ricevuta', { res });
        set(s => {
            const newTransaction = { ...res, category: { _id: res.category, type } };
            const sortedTransactions = [...s.transactions, newTransaction].sort((a, b) =>
                dayjs(b.transactionDate).valueOf() - dayjs(a.transactionDate).valueOf()
            );
            return { transactions: sortedTransactions };
        })
        return { success: true }
    },
    modifyTransaction: async (transactionId, data, type) => {
        if (data.description === '') {
            delete data.description;
        }
        console.log('modifyTransaction: chiamata iniziata', { data });
        const [res, error] = await tryCatch(transactionsService.update(transactionId, data));
        if (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            get().setError(errorMessage); // Chiama azione dell'errorSlice
            return { success: false };
        }
        console.log('modifyTransaction: risposta ricevuta', { res });
        set(s => ({
            transactions: s.transactions.map(t => t._id === res._id ? { ...res, category: { _id: res.category, type } } : t)
        }))
        return { success: true }
    },
    deleteTransaction: async () => {
        return { success: true }
    }
})