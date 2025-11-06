import BaseButton from '../components/ui/BaseButton';
import CategoriesList from '../components/lists/CategoriesList';
import { useShallow } from 'zustand/shallow';
import { store } from '../store/store';
import CategoryForm from '../components/forms/CategoryForm';
import { Trash } from 'lucide-react';

const ModifyCategoriesPage = () => {

    const { setCategoryInitialValue, openModal, deleteCategory, categoriesToDelete, setError, categories } = store(
        useShallow(s => ({
            setCategoryInitialValue: s.setCategoryInitialValue,
            openModal: s.openModal,
            categoriesToDelete: s.categoriesToDelete,
            deleteCategory: s.deleteCategory,
            setError: s.setError,
            categories: s.categories
        }))
    );

    const handleDelete = async () => {
        if (categoriesToDelete.length === 0) return;

        const results = await Promise.allSettled(
            categoriesToDelete.map(id => deleteCategory(id))
        )

        const errors = results
            .map((result, index) => ({ result, categoryId: categoriesToDelete[index] }))
            .filter(({ result }) => result.status === 'rejected');

        if (errors.length > 0) {
            console.error('Errori durante l\'eliminazione:', errors);

            const failedCategoryNames = errors.map(({ categoryId }) => {
                const category = categories.find(c => c._id === categoryId);
                return category ? category.name : categoryId;
            });

            const errorString = failedCategoryNames.join(', ');
            setError(`Impossibile eliminare le seguenti categorie: ${errorString}`);
        } else {
            console.log('Tutte le categorie eliminate con successo');
        }
    };

    const handleCreate = () => {
        setCategoryInitialValue('', '', undefined);
        openModal(
            <CategoryForm />,
            'Crea nuova categoria'
        );
    };

    const addButtonProps = categoriesToDelete.length > 0
        ? { className: 'w-2/4 sm:w-3/4' }
        : { fullWidth: true };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="pb-4 gap-4 flex items-center justify-between">
                <BaseButton
                    onClick={handleCreate}
                    {...addButtonProps}
                    truncate
                    size="lg"
                >
                    Aggiungi nuova categoria
                </BaseButton>
                {categoriesToDelete.length > 0 && (
                    <BaseButton
                        onClick={handleDelete}
                        className='w-2/4 md:w-1/4 flex items-center justify-center gap-2'
                        size="lg"
                        variant="red"
                    >
                        <Trash className='w-5 h-5' />
                        <span>({categoriesToDelete.length})</span>
                    </BaseButton>
                )}
            </div>
            <CategoriesList
                mode="edit"
            />
        </div>
    )
}

export default ModifyCategoriesPage
