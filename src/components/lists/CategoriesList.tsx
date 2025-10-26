import { useMemo } from 'react'
import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import { getGroupedCategories } from '../../lib/getGroupedCategories';
import { Loader } from 'lucide-react';
import EmptyList from './EmptyList';
import GroupedCategoryCard from '../cards/GroupedCategoriesCard';

type Props = {
    mode: 'view' | 'edit'
}

const GroupedCategoriesList = ({ mode }: Props) => {

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
            {mode === 'view' && (
                <>
                    {groupedCategories.map(c => (
                        <li
                            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5'
                            key={c._id}>
                            <GroupedCategoryCard
                                category={c}
                            />
                        </li>
                    ))}
                </>
            )}
            {mode === 'edit' && (
                <>
                    {categories.map(c => (
                        <li
                            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5'
                            key={c._id}>

                        </li>
                    ))}
                </>
            )}
        </ul>
    )
}

export default GroupedCategoriesList
