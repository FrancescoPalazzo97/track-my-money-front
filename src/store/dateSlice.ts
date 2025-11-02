import type { StateCreator } from "zustand";
import type { TStore } from "../types/store";
import dayjs from "dayjs";

type TDateState = {
    date: dayjs.Dayjs
}

type TDateActions = {
    handleChangeMonth: (direction: 'prev' | 'next') => void
}

export type TDateSlice = TDateState & TDateActions;

export const createDateSlice: StateCreator<
    TStore,
    [['zustand/immer', never]],
    [],
    TDateSlice
> = (set) => ({
    date: dayjs(),
    handleChangeMonth: (direction) => {
        set(s => {
            if (direction === 'prev') {
                s.date = s.date.subtract(1, 'month');
            } else {
                s.date = s.date.add(1, 'month');
            }
        });
    }
})