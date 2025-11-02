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
> = (set, get) => ({
    ...initialState,
    fetchCategories: async () => {
        console.log('fetchCategories: chiamata iniziata');
        set({ isLoadingCategory: true });

        const [data, error] = await tryCatch(categoriesService.getAll());

        if (error) {
            set({ isLoadingCategory: false });
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            get().setError(errorMessage);
            return;
        }

        console.log('fetchCategories: risposta ricevuta', { data, length: data.length });
        set({ categories: data, isLoadingCategory: false });
    },
    fetchCategoryById: async () => { },
    addCategory: async (data): Promise<{ success: boolean }> => {
        console.log('addCategory: chiamata iniziata', { data });
        set({ categoryError: null });

        const [res, error] = await tryCatch(categoriesService.create(data));

        if (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            get().setError(errorMessage); // Chiama azione dell'errorSlice
            return { success: false };
        }

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
        console.log('modifyCategory: chiamata iniziata', { categoryId, data });

        const [res, error] = await tryCatch(categoriesService.update(categoryId, data));

        if (error) {
            const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
            get().setError(errorMessage); // Chiama azione dell'errorSlice
            return { success: false };
        }

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
    addIdToDelete: (categoryId) => {
        set(s => {
            const exists = s.categoriesToDelete.includes(categoryId);
            s.categoriesToDelete = exists
                ? s.categoriesToDelete.filter(id => id !== categoryId)
                : [...s.categoriesToDelete, categoryId];
        });
    }
})