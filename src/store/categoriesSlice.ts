import type { StateCreator } from "zustand";
import type { Category, CategoryUpdate } from "../types/api.types";
import { categoriesService } from "../services";
import type { TStore } from "../types/store";

type TCategoriesState = {
    categories: Category[],
    category: Category | null,
    isLoadingCategory: boolean
}

type TCategoriesActions = {
    fetchCategories: (group?: boolean) => Promise<void>,
    fetchCategoryById: (categoryId: string) => Promise<void>,
    addCategory: (data: Category) => Promise<void>,
    modifyCategory: (categoryId: string, data: CategoryUpdate) => Promise<void>,
    deleteCategory: (categoryId: string) => Promise<void>,
}

const initialState: TCategoriesState = {
    categories: [],
    category: null,
    isLoadingCategory: false,
}

export type TCategoriesSlice = TCategoriesState & TCategoriesActions;

export const createCategoriesSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TCategoriesSlice
> = (set) => ({
    ...initialState,
    fetchCategories: async (group?) => {
        console.log('fetchCategories: chiamata iniziata', { group });
        set({ isLoadingCategory: true });
        try {
            const res = await categoriesService.getAll(group);
            console.log('fetchCategories: risposta ricevuta', { res, length: res.length });
            set({ categories: res, isLoadingCategory: false });
        } catch (error) {
            console.error('fetchCategories: errore catturato', error);
            set({ isLoadingCategory: false });
        }
    },
    fetchCategoryById: async (categoryId) => {
        console.log('fetchCategoryById: chiamata iniziata', { categoryId });
        set({ isLoadingCategory: true });
        try {
            const res = await categoriesService.getById(categoryId);
            console.log('fetchCategoryById: risposta ricevuta', { res });
            set({ category: res, isLoadingCategory: false });
        } catch (error) {
            console.error('fetchCategoryById: errore catturato', error);
            set({ isLoadingCategory: false });
        }
    },
    addCategory: async (data) => {
        console.log('addCategory: chiamata iniziata', { data });
        set({ isLoadingCategory: true });
        try {
            const res = await categoriesService.create(data);
            console.log('addCategory: risposta ricevuta', { res });
            set(s => ({
                categories: [...s.categories, res],
                isLoadingCategory: false
            }));
        } catch (error) {
            console.error('addCategory: errore catturato', error);
            set({ isLoadingCategory: false });
        }
    },
    modifyCategory: async (categoryId, data) => {
        console.log('addCategory: chiamata iniziata', { data });
        set({ isLoadingCategory: true });
        try {
            const res = await categoriesService.update(categoryId, data);
            console.log('modifyCategory: risposta ricevuta', { res });
            set(s => ({
                categories: s.categories.map(c => c._id === res._id ? res : c),
                isLoadingCategory: false
            }));
            console.log('response settata!')
        } catch (error) {
            console.error('modifyCategory: errore catturato', error);
            set({ isLoadingCategory: false });
        }
    },
    deleteCategory: async (categoryId) => {
        console.log('deleteCategory: chiamata iniziata', { categoryId });
        set({ isLoadingCategory: true });
        try {
            await categoriesService.delete(categoryId);
            console.log('deleteCategory: risposta ricevuta');
            set(s => ({
                categories: s.categories.filter(cat => cat._id !== categoryId),
                isLoadingCategory: false
            }));
        } catch (error) {
            console.error('deleteCategory: errore catturato', error);
            set({ isLoadingCategory: false });
        }
    }
})