import BaseButton from '../components/ui/BaseButton';
import CategoriesList from '../components/lists/CategoriesList';
import { useShallow } from 'zustand/shallow';
import { store } from '../store/store';
import CategoryForm from '../components/forms/CategoryForm';

const ModifyCategoriesPage = () => {

    const { setCategoryInitialValue, openModal, closeModal } = store(
        useShallow(s => ({
            setCategoryInitialValue: s.setCategoryInitialValue,
            openModal: s.openModal,
            closeModal: s.closeModal
        }))
    );

    const handleEdit = () => { };

    const handleDelete = () => { };

    const handleCreate = () => {
        setCategoryInitialValue('', '', undefined);
        openModal(
            <CategoryForm />,
            'Crea nuova categoria'
        );
    };

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <div className="py-4">
                    <BaseButton
                        onClick={handleCreate}
                        fullWidth
                        size="lg"
                    >
                        Aggiungi nuova categoria
                    </BaseButton>
                </div>
                <CategoriesList
                    mode="edit"
                />
            </div>
        </div>
    )
}

export default ModifyCategoriesPage
