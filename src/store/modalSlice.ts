import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";

type TModalState = {
    showModal: boolean
}

type TModalActions = {
    openModal: () => void,
    closeModal: () => void
}

const initialState: TModalState = {
    showModal: false
}

export type TModalSlice = TModalState & TModalActions;

export const createModalSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TModalSlice
> = (set) => ({
    ...initialState,
    openModal: () => {
        set({ showModal: true });
    },
    closeModal: () => {
        set({ showModal: false });
    }
})