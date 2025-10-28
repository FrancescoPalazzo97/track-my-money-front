import BaseButton from '../components/ui/BaseButton';
import CategoriesList from '../components/lists/CategoriesList';
import { useShallow } from 'zustand/shallow';
import { store } from '../store/store';
import CategoryForm from '../components/forms/CategoryForm';
import { de } from 'zod/locales';
import { Trash } from 'lucide-react';

const ModifyCategoriesPage = () => {

    const { setCategoryInitialValue, openModal, deleteCategory, categoriesToDelete } = store(
        useShallow(s => ({
            setCategoryInitialValue: s.setCategoryInitialValue,
            openModal: s.openModal,
            categoriesToDelete: s.categoriesToDelete,
            deleteCategory: s.deleteCategory
        }))
    );

    const handleEdit = () => { };

    const handleDelete = async () => {
        if (categoriesToDelete.length === 0) return;

        try {
            await Promise.allSettled(
                categoriesToDelete.map(id => deleteCategory(id))
            );
        } catch (error) {
            console.error('Errore durante l\'eliminazione delle categorie:', error);
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
        ? { className: 'w-3/4' }
        : { fullWidth: true };

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <div className="py-4 gap-4 flex items-center justify-between">
                    <BaseButton
                        onClick={handleCreate}
                        {...addButtonProps}
                        size="lg"
                    >
                        Aggiungi nuova categoria
                    </BaseButton>
                    {categoriesToDelete.length > 0 && (
                        <BaseButton
                            onClick={handleDelete}
                            className='w-1/4 flex items-center justify-center gap-2'
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
        </div>
    )
}

export default ModifyCategoriesPage
