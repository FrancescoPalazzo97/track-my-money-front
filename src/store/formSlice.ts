import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import type { ChangeEventHandler } from "react";
import { validateChars } from "../lib/utility";
import type { TCategoryType } from "../types/api.types";

type TFormState = {
    name: string,
    nameError: string | null,
    type: TCategoryType | '',
    parentCategory: string | undefined,
}

type TFormActions = {
    setName: ChangeEventHandler<HTMLInputElement>,
    setType: (value: string) => void,
    setParentCategory: ChangeEventHandler<HTMLSelectElement>,
    setCategoryInitialValue: (name: string, type: TCategoryType | '', parentCategory: string | undefined) => void
}

export type TFormSlice = TFormState & TFormActions;

const initialState: TFormState = {
    name: '',
    nameError: null,
    type: '',
    parentCategory: undefined
}

export const createFormSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TFormSlice
> = (set) => ({
    ...initialState,
    setName(e) {
        const { value } = e.target;
        set({ nameError: null });
        if (!value.trim()) {
            set({ nameError: 'In nome della categoria non può essere vuoto!' });
        }
        if (validateChars(value)) {
            set({ nameError: 'Non sono consentiti caratteri speciali!' });
            return;
        }
        set({ name: e.target.value });
    },
    setType(value) {
        if (value === 'income' || value === 'expense') set({ type: value })
    },
    setParentCategory(e) {
        set({ parentCategory: e.target.value })
    },
    setCategoryInitialValue(name, type, parentCategory) {
        set({
            name,
            type,
            parentCategory
        })
    },
})