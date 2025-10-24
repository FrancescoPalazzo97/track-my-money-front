import { store } from "../store/store";
import { useShallow } from "zustand/shallow";
import Loader from "../components/molecules/Loader";
import EmptyListComponent from "../components/molecules/EmptyListComponent";
import { CategoryUpdateSchema } from "../schemas/api.schemas";
import type { Category } from "../types/api.types";
import CategoriesCard from "../components/molecules/cards/CategoriesCard";
import EditCategoryForm from "../components/organisms/forms/EditCategoryForm";
import DefaultButton from "../components/atoms/buttons/DefaultButton";
import CreateCategoryForm from "../components/organisms/forms/CreateCategoryForm";

const ModifyCatsPage = () => {

    const {
        categories, isLoading,
        modifyCategory, deleteCategory,
        openModal, closeModal,
        categoryName, type, parentCategory,
        categoryToModify, setInitialValue
    } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory,
            modifyCategory: s.modifyCategory,
            deleteCategory: s.deleteCategory,
            openModal: s.openModal,
            closeModal: s.closeModal,
            categoryName: s.categoryName,
            type: s.type,
            parentCategory: s.parentCategory,
            setInitialValue: s.setInitialValue,
            categoryToModify: s.categoryId
        }))
    );

    const handleEdit = (category: Category) => {
        setInitialValue(
            category._id,
            category.name,
            category.type,
            category.parentCategory
        );
        openModal(
            <EditCategoryForm />,
            'Modifica categoria'
        );
        console.log('Edit category:', category);
    };

    const handleDelete = async (categoryId: string) => {
        await deleteCategory(categoryId)
        console.log('Delete category:', categoryId);
    };

    const handleCreate = async () => {
        openModal(
            <CreateCategoryForm />,
            'Crea una nuova gategoria'
        )
    }

    if (isLoading) return <Loader />;

    if (categories.length === 0) {
        return (
            <EmptyListComponent
                content={'Nessuna categoria trovata'}
            />
        )
    }

    return (

        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Modifica categorie
                </h2>
                <div className="py-4">
                    <DefaultButton
                        onClick={handleCreate}
                        fullWidth
                        size="lg"
                    >
                        Aggiungi nuova categoria
                    </DefaultButton>
                </div>
                <ul className='space-y-3'>
                    {categories.map(cat => (
                        <CategoriesCard
                            key={cat._id}
                            category={cat}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ModifyCatsPage
