import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import type { TTransactionInput } from "../types/api.types";
import dayjs from "dayjs";
import { validateChars } from "../lib/utility";


type TTransactionFormState = Omit<TTransactionInput, 'amount'> & {
    amount: number | null
    titleError: string | null,
    tempType: string,
    descriptionError: string | null,
    descriptionCharsRemains: number
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
    transactionDate: dayjs().format('YYYY-MM-DDTHH:mm'),
    amount: null,
    currency: 'EUR',
    tempType: '',
    category: '',
    description: undefined,
    descriptionError: null,
    descriptionCharsRemains: 100
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
        if (value && dayjs(value).isValid()) {
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
        if (value === 'income' || value === 'expense') {
            set({ tempType: value })
        }
    },
    setCategory: (value) => {
        if (get().categories.some(c => c._id === value)) {
            set({ category: value })
        }
    },
    setDescription: (value) => {
        set({ descriptionError: null })
        if (validateChars(value)) {
            set({ descriptionError: 'Non sono consentiti caratteri speciali!' });
            return;
        }
        set(s => ({
            description: value,
            descriptionCharsRemains: s.descriptionCharsRemains - 1
        }));
    }
})