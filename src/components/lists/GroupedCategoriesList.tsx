import { useMemo } from 'react'
import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import { getGroupedCategories } from '../../lib/getGroupedCategories';
import { Loader } from 'lucide-react';
import EmptyList from './EmptyList';
import GroupedCategoryCard from '../cards/GroupedCategoriesCard';

const GroupedCategoriesList = () => {

    const { categories, isLoading } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory
        }))
    );

    const groupedCategories = useMemo(
        () => getGroupedCategories(categories),
        [categories]
    );

    if (isLoading) {
        return (
            <Loader />
        )
    }


    if (groupedCategories.length === 0) {
        return (
            <EmptyList
                content="Nessuna categoria disponibile. Aggiungi nuove categorie per iniziare a organizzare le tue transazioni."
            />
        )
    }

    return (
        <ul className='space-y-3'>
            {groupedCategories.map(c => (
                <li key={c._id}>
                    <GroupedCategoryCard
                        category={c}
                    />
                </li>
            ))}
        </ul>
    )
}

export default GroupedCategoriesList
