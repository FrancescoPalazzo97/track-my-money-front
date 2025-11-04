import type { TCategoriesSlice } from "../store/categoriesSlice";
import type { TFormSlice } from "../store/formSlice";
import type { TModalSlice } from "../store/modalSlice";
import type { TTransactionsSlice } from "../store/transactionsSlice";
import type { TErrorsSlice } from "../store/errorsSlice";
import type { TDateSlice } from "../store/dateSlice";
import type { TTransactionFormSlice } from "../store/transactionFormSlice";

export type TStore = TCategoriesSlice
    & TModalSlice
    & TFormSlice
    & TTransactionsSlice
    & TErrorsSlice
    & TDateSlice
    & TTransactionFormSlice;