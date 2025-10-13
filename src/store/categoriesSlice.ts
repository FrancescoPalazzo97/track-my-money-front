import type { StateCreator } from "zustand";
import type { Category } from "../types/api.types";
import { categoriesService } from "../services";

type TCategoriesState = {
    categories: Category[],
    isLoading: boolean
}

type TCategoriesActions = {
    fetchCategories: (group?: boolean) => Promise<void>,
    // fetchCategoryById: () => void,
    // addCategory: () => void,
    // modifyCategory: () => void,
    // deleteCategory: () => void,
}

const initialState = {
    categories: [],
    isLoading: false,
}

export type TCategoriesSlice = TCategoriesState & TCategoriesActions;

export const createCategoriesSlice: StateCreator<
    TCategoriesSlice,
    [],
    [],
    TCategoriesSlice
> = (set) => ({
    ...initialState,
    fetchCategories: async (group?: boolean) => {
        console.log('fetchCategories: chiamata iniziata', { group });
        set({ isLoading: true });
        try {
            const res = await categoriesService.getAll(group);
            console.log('fetchCategories: risposta ricevuta', { res, length: res.length });
            set({ categories: res, isLoading: false });
        } catch (error) {
            console.error('fetchCategories: errore catturato', error);
            set({ isLoading: false });
        }
    },

})