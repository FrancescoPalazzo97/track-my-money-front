import type { TCategoriesSlice } from "../store/categoriesSlice";
import type { TFormSlice } from "../store/formSlice";
import type { TModalSlice } from "../store/modalSlice";

export type TStore = TCategoriesSlice & TModalSlice & TFormSlice;