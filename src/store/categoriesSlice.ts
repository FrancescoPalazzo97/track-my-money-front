import type { StateCreator } from "zustand";
import type { TCategory, TCategoryInput, TCategoryUpdate } from "../types/api.types";
import { categoriesService } from "../services/categoriesService";
import type { TStore } from "../types/store";
import { tryCatch } from "../lib/tryCatch";

type TCategoriesState = {
    categories: TCategory[],
    categoriesToDelete: string[],
    category: TCategory | null,
    isLoadingCategory: boolean,
    categoryError: string | null
}

type TCategoriesActions = {
    fetchCategories: () => Promise<void>,
    fetchCategoryById: (categoryId: string) => Promise<void>,
    addCategory: (data: TCategoryInput) => Promise<{ success: boolean }>,
    modifyCategory: (categoryId: string, data: TCategoryUpdate) => Promise<{ success: boolean }>,
    deleteCategory: (categoryId: string) => Promise<void>,
    //setError: (message: string) => void,
    //clearError: () => void,
    addIdToDelete: (categoryId: string) => void
}

const initialState: TCategoriesState = {
    categories: [],
    categoriesToDelete: [],
    category: null,
    isLoadingCategory: false,
    categoryError: null
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
    addCategory: async (data): Promise<{ success: boolean }> => {
        console.log('addCategory: chiamata iniziata', { data });
        set({ categoryError: null });
        const res = await categoriesService.create(data);
        console.log('addCategory: risposta ricevuta', { res });
        set(s => ({
            categories: [...s.categories, res].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
            error: null
        }));
        return { success: true };
    },
    modifyCategory: async (categoryId, data): Promise<{ success: boolean }> => {
        if (data.parentCategory === '') {
            delete data.parentCategory
        }
        console.log('addCategory: chiamata iniziata', { categoryId, data });
        const res = await categoriesService.update(categoryId, data);
        console.log('modifyCategory: risposta ricevuta', { res });
        set(s => ({
            categories: s.categories.map(c => c._id === res._id ? res : c)
        }));
        return { success: true };
    },
    deleteCategory: async (categoryId) => {
        console.log('deleteCategory: chiamata iniziata', { categoryId });
        const [, error] = await tryCatch(categoriesService.delete(categoryId));
        if (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            console.error('deleteCategory: errore durante l\'eliminazione:', errorMessage);
            throw error;
        }
        console.log('deleteCategory: categoria eliminata con successo');
        set(s => ({
            categories: s.categories.filter(c => c._id !== categoryId),
            categoriesToDelete: s.categoriesToDelete.filter(id => id !== categoryId)
        }));
    },
    //setError: (message) => set({ categoryError: message }),
    //clearError: () => set({ categoryError: null }),
    addIdToDelete: (categoryId) => {
        set(s => {
            const exists = s.categoriesToDelete.includes(categoryId);
            s.categoriesToDelete = exists
                ? s.categoriesToDelete.filter(id => id !== categoryId)
                : [...s.categoriesToDelete, categoryId];
        });
    }
})