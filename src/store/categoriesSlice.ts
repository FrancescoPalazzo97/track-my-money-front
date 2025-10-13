import type { StateCreator } from "zustand";
import type { Category } from "../types/api.types";
import { categoriesService } from "../services";

type TCategoriesState = {
    categories: Category[],
    category: Category | null,
    isLoading: boolean
}

type TCategoriesActions = {
    fetchCategories: (group?: boolean) => Promise<void>,
    fetchCategoryById: (categoryId: string) => Promise<void>
    addCategory: (data: Category) => void,
    // modifyCategory: () => void,
    // deleteCategory: () => void,
}

const initialState: TCategoriesState = {
    categories: [],
    category: null,
    isLoading: false,
}

export type TCategoriesSlice = TCategoriesState & TCategoriesActions;

export const createCategoriesSlice: StateCreator<
    TCategoriesSlice,
    [['zustand/immer', never]],
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
    fetchCategoryById: async (categoryId: string): Promise<void> => {
        console.log('fetchCategoryById: chiamata iniziata', { categoryId });
        set({ isLoading: true });
        try {
            const res = await categoriesService.getById(categoryId);
            console.log('fetchCategoryById: risposta ricevuta', { res });
            set({ category: res, isLoading: false });
        } catch (error) {
            console.error('fetchCategoryById: errore catturato', error);
            set({ isLoading: false });
        }
    },
    addCategory: async (data: Category): Promise<void> => {
        console.log('addCategory: chiamata iniziata', { data });
        set({ isLoading: true });
        try {
            const res = await categoriesService.create(data);
            console.log('addCategory: risposta ricevuta', { res });
            set(s => ({
                categories: [...s.categories, res]
            }));
        } catch (error) {
            console.error('fetchCategoryById: errore catturato', error);
            set({ isLoading: false });
        }
    }
})