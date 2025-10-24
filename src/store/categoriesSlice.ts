import type { StateCreator } from "zustand";
import type { TCategory, TCategoryInput, TCategoryUpdate } from "../types/api.types";
import { categoriesService } from "../services/categoriesService";
import type { TStore } from "../types/store";

type TCategoriesState = {
    categories: TCategory[],
    category: TCategory | null,
    isLoadingCategory: boolean
}

type TCategoriesActions = {
    fetchCategories: () => Promise<void>,
    fetchCategoryById: (categoryId: string) => Promise<void>,
    addCategory: (data: TCategoryInput) => Promise<void>,
    modifyCategory: (categoryId: string, data: TCategoryUpdate) => Promise<void>,
    deleteCategory: (categoryId: string) => Promise<void>,
}

const initialState: TCategoriesState = {
    categories: [],
    category: null,
    isLoadingCategory: false,
}

export type TCategoriesSlice = TCategoriesState & TCategoriesActions;

export const createCategorySlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TCategoriesSlice
> = (set) => ({
    ...initialState,
    fetchCategories: async () => {
        console.log('fetchCategories: chiamata iniziata');
        set({ isLoadingCategory: true });
        const res = await categoriesService.getAll();
        console.log('fetchCategories: risposta ricevuta', { res, length: res.length });
        set({ categories: res, isLoadingCategory: false });
    },
    fetchCategoryById: async () => { },
    addCategory: async () => { },
    modifyCategory: async () => { },
    deleteCategory: async () => { }
})