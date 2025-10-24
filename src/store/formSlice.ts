import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import type { ChangeEventHandler } from "react";

type TFormState = {
    categoryId: string,
    categoryName: string,
    type: string,
    parentCategory: string | undefined
}

type TFormActions = {
    setCategoryName: ChangeEventHandler<HTMLInputElement>,
    setType: (value: string) => void,
    setParentCategory: ChangeEventHandler<HTMLSelectElement>,
    setInitialValue: (id: string, name: string, type: string, parentCategory: string | undefined) => void
}

export type TFormSlice = TFormState & TFormActions;

const initialState: TFormState = {
    categoryId: '',
    categoryName: '',
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
    setCategoryName(e) {
        set({ categoryName: e.target.value })
    },
    setType(value) {
        set({ type: value })
    },
    setParentCategory(e) {
        set({ parentCategory: e.target.value })
    },
    setInitialValue(id, name, type, parentCategory) {
        set({
            categoryId: id,
            categoryName: name,
            type,
            parentCategory
        })
    },
})