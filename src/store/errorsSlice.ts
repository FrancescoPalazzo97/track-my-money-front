import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";

type TErrorsState = {
    errorMessage: string | null
}

type TErrorsActions = {
    setError: (message?: string) => void,
    clearError: () => void
}

export type TErrorsSlice = TErrorsState & TErrorsActions;

export const createErrorsSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TErrorsSlice
> = (set) => ({
    errorMessage: null,
    setError: (message = 'Errore sconosciuto') => {
        console.log('Il messaggio passato a setError è: ', message)
        set({ errorMessage: message });
    },
    clearError: () => {
        set({ errorMessage: null });
    }
})