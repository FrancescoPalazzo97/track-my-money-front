import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import Loader from '../molecules/Loader';
import EmptyListComponent from '../molecules/EmptyListComponent';
import { useMemo } from 'react';
import { getGroupedCategories } from '../../lib/utility';
import GroupedCategoriesCard from '../molecules/cards/GroupedCategoriesCard';

const CategoriesList = () => {

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
            <EmptyListComponent
                content={'Nessuna categoria trovata'}
            />
        )
    }

    return (
        <ul className='space-y-3'>
            {groupedCategories.map(cat => (
                <GroupedCategoriesCard
                    key={cat._id}
                    category={cat}
                />
            ))}
        </ul>
    )
}

export default CategoriesList
