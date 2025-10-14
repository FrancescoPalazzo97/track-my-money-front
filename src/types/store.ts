import type { TCategoriesSlice } from "../store/categoriesSlice";
import type { TTransactionsSlice } from "../store/transactionsSlice";

export type TStore = TCategoriesSlice & TTransactionsSlice;