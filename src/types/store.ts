import type { TCategoriesSlice } from "../store/categoriesSlice";
import type { TFormSlice } from "../store/formSlice";
import type { TModalSlice } from "../store/modalSlice";
import type { TTransactionsSlice } from "../store/TransactionsSlice";

export type TStore = TCategoriesSlice & TModalSlice & TFormSlice & TTransactionsSlice;