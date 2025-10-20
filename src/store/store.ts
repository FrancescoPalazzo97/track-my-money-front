import { create } from 'zustand';
import type { TStore } from '../types/store';
import { createCategoriesSlice } from './categoriesSlice';
import { createTransactionsSlice } from './transactionsSlice';
import { immer } from 'zustand/middleware/immer';
import { createModalSlice } from './modalSlice';
import { createFormSlice } from './formSlice';

export const store = create<TStore>()(
    immer((...a) => ({
        ...createCategoriesSlice(...a),
        ...createTransactionsSlice(...a),
        ...createModalSlice(...a),
        ...createFormSlice(...a)
    }))
)