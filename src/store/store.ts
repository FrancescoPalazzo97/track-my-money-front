import { create } from 'zustand';
import type { TStore } from '../types/store';
import { createCategorySlice } from './categoriesSlice';
import { immer } from 'zustand/middleware/immer';
import { createModalSlice } from './modalSlice';
import { createFormSlice } from './formSlice';
import { createTransactionSlice } from './TransactionsSlice';
import { createErrorsSlice } from './errorsSlice';
import { createDateSlice } from './dateSlice';

export const store = create<TStore>()(
    immer((...a) => ({
        ...createCategorySlice(...a),
        ...createModalSlice(...a),
        ...createFormSlice(...a),
        ...createTransactionSlice(...a),
        ...createErrorsSlice(...a),
        ...createDateSlice(...a)
    }))
)