import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import { Loader2, TrendingDown, TrendingUp, Triangle } from 'lucide-react';
import CategoriesCard from '../molecules/CategoriesCard';
import Loader from '../molecules/Loader';
import EmptyListComponent from '../molecules/EmptyListComponent';
import Accordion from '../molecules/Accordion';

const CategoriesList = () => {

    const { categories, isLoading } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory
        }))
    );

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (categories.length === 0) {
        return (
            <EmptyListComponent
                content={'Nessuna categoria trovata'}
            />
        )
    }

    return (
        <>
            <ul className='space-y-3'>
                {categories.map(cat => (
                    <CategoriesCard
                        key={cat._id}
                        category={cat}
                    />
                ))}
            </ul>
        </>
    )
}

export default CategoriesList
