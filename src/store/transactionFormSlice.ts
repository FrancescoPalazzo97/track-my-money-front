import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import type { TTransactionInput } from "../types/api.types";
import dayjs from "dayjs";
import { validateChars } from "../lib/utility";


type TTransactionFormState = TTransactionInput & {
    titleError: string | null,
    tempType: string
};

type TTransactionFormActions = {
    setTitle: (value: string) => void,
    setTransactionDate: (value: string | undefined) => void,
    setAmount: (value: number) => void,
    setCurrency: (value: string) => void,
    setTempType: (value: string) => void,
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
    tempType: '',
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
            set({ titleError: 'Il campo non può essere vuoto!' });
        }
        if (validateChars(value)) {
            set({ titleError: 'Non sono consentiti caratteri speciali!' });
            return;
        }
        set({ title: value })
    },
    setTransactionDate: (value) => {
        if (value) {
            set({ transactionDate: value })
        }
    },
    setAmount: (value) => {
        console.log(typeof value, value)
        set({ amount: value })
    },
    setCurrency: (value) => {
        set({ currency: value })
    },
    setTempType: (value) => {
        set({ tempType: value })
    },
    setCategory: (value) => {
        set({ category: value })
    },
    setDescription: (value) => {
        set({ description: value })
    }
})