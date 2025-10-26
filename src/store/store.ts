import { create } from 'zustand';
import type { TStore } from '../types/store';
import { createCategorySlice } from './categoriesSlice';
import { immer } from 'zustand/middleware/immer';
import { createModalSlice } from './modalSlice';
import { createFormSlice } from './formSlice';

export const store = create<TStore>()(
    immer((...a) => ({
        ...createCategorySlice(...a),
        ...createModalSlice(...a),
        ...createFormSlice(...a)
    }))
)