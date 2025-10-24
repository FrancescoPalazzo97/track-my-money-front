import { create } from 'zustand';
import type { TStore } from '../types/store';
import { createCategorySlice } from './categoriesSlice';
import { immer } from 'zustand/middleware/immer';

export const store = create<TStore>()(
    immer((...a) => ({
        ...createCategorySlice(...a),
    }))
)