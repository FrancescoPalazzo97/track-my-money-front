import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import type { TTransactionInput } from "../types/api.types";
import dayjs from "dayjs";
import { validateChars } from "../lib/utility";


type TTransactionFormState = TTransactionInput & {
    titleError: string | null
};

type TTransactionFormActions = {
    setTitle: (value: string) => void,
    setTransactionDate: (value: string) => void,
    setAmount: (value: number) => void,
    setCurrency: (value: string) => void,
    setCategory: (value: string) => void,
    setDescription: (value: string) => void
}

export type TTransactionFormSlice = TTransactionFormState & TTransactionFormActions;

const initialState: TTransactionFormState = {
    title: '',
    titleError: null,
    transactionDate: dayjs().format('YYYY-MM-DD'),
    amount: 0,
    currency: 'EUR',
    category: '',
    description: ''
}

export const createTransactionFormSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TTransactionFormSlice
> = (set, get) => ({
    ...initialState,
    setTitle: (value) => {
        set({ titleError: null });
        if (!value.trim()) {
            set({ titleError: 'In nome della transazione non può essere vuoto!' });
        }
        if (validateChars(value)) {
            set({ titleError: 'Non sono consentiti caratteri speciali!' });
            return;
        }
        set({ title: value })
    },
    setTransactionDate: (value) => {
        set({ transactionDate: value })
    },
    setAmount: (value) => {
        set({ amount: value })
    },
    setCurrency: (value) => {
        set({ currency: value })
    },
    setCategory: (value) => {
        set({ category: value })
    },
    setDescription: (value) => {
        set({ description: value })
    }
})