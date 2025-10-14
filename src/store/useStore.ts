import { create } from 'zustand';
import type { TStore } from '../types/store';
import { createCategoriesSlice } from './categoriesSlice';
import { createTransactionsSlice } from './transactionsSlice';
import { immer } from 'zustand/middleware/immer';

export const useStore = create<TStore>()(
    immer((...a) => ({
        ...createCategoriesSlice(...a),
        ...createTransactionsSlice(...a)
    }))
)