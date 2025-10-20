import { useShallow } from "zustand/shallow";
import { store } from "../../store/store"
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { Category } from "../../types/api.types";

type Props = {
    category: Category
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

const SelectCategory = ({ category, value, setValue }: Props) => {

    const { categories, isLoading, modifyCategory } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory,
            modifyCategory: s.modifyCategory
        }))
    );

    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    }

    return (
        <select
            value={category.parentCategory || ''}
            onChange={changeSelect}
        >
            <option value="">Nessuna</option>
            {categories
                .filter(c => c._id !== category._id)
                .map(c => (
                    <option
                        key={c._id}
                        id={`option-${c._id}`}
                        value={c._id}
                    >
                        {c.name}
                    </option>
                ))}
        </select>
    )
}

export default SelectCategory
