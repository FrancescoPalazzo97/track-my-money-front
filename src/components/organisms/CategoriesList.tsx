import React, { useEffect } from 'react'
import { useStore } from '../../store/useStore';
import { useShallow } from 'zustand/shallow';

const CategoriesList = () => {

    const { categories, fetchCategories, isLoading } = useStore(
        useShallow(s => ({
            categories: s.categories,
            fetchCategories: s.fetchCategories,
            isLoading: s.isLoadingCategory
        }))
    )

    useEffect(() => {
        fetchCategories();
    }, []);

    if (isLoading) return <>Caricamento...</>

    return (
        <ul>
            {categories.map(cat => (
                <li key={cat._id}>
                    <h3>{cat.name}</h3>
                    <p>{cat.type}</p>
                </li>
            ))}
        </ul>
    )
}

export default CategoriesList
