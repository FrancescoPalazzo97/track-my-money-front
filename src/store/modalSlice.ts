import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import { store } from "./store";

type TModalState = {
    isModalOpen: boolean,
    modalContent: React.ReactNode | null,
    modalTitle: string | null
}

type TModalActions = {
    openModal: (content?: React.ReactNode, title?: string) => void,
    closeModal: () => void,
}

const initialState: TModalState = {
    isModalOpen: false,
    modalContent: null,
    modalTitle: null
}

export type TModalSlice = TModalState & TModalActions;

export const createModalSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TModalSlice
> = (set) => ({
    ...initialState,
    openModal: (content = 'Testo default', title = 'Titolo default') => {
        set(s => {
            s.isModalOpen = true
            s.modalContent = content
            s.modalTitle = title
        });
    },
    closeModal: () => {
        set(s => {
            s.isModalOpen = false
            s.modalContent = null
            s.modalTitle = null
        });
    }
})