import { store } from "../store/store";
import { useShallow } from "zustand/shallow";
import Loader from "../components/molecules/Loader";
import EmptyListComponent from "../components/molecules/EmptyListComponent";
import { CategoryUpdateSchema } from "../schemas/api.schemas";
import type { Category } from "../types/api.types";
import Modal from "../components/organisms/Modal";
import Form from "../components/organisms/Form";
import CategoriesCard from "../components/molecules/cards/CategoriesCard";

const ModifyCatsPage = () => {

    const {
        categories, isLoading,
        modifyCategory, deleteCategory,
        showModal, openModal, closeModal,
        categoryName, type, parentCategory,
        categoryToModify, setInitialValue
    } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory,
            modifyCategory: s.modifyCategory,
            deleteCategory: s.deleteCategory,
            showModal: s.showModal,
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
        openModal();
        console.log('Edit category:', category);
    };

    const handleDelete = async (categoryId: string) => {
        await deleteCategory(categoryId)
        console.log('Delete category:', categoryId);
    };

    const saveModify = async () => {
        console.log(categoryName, type, parentCategory)
        let newData = {};
        if (categoryName) {
            newData = { ...newData, name: categoryName }
        }
        if (type) {
            newData = { ...newData, type }
        }
        if (parentCategory) {
            newData = { ...newData, parentCategory }
        }
        const validateData = CategoryUpdateSchema.safeParse(newData);

        if (validateData.success) {
            console.log(validateData.data)
            await modifyCategory(categoryToModify, validateData.data)
            closeModal();
        } else {
            console.error(validateData.error)
        }
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
            <Modal
                show={showModal}
                title="Modifica categoria"
                content={<Form />}
                undo={closeModal}
                done={saveModify}
            />
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Modifica categorie
                </h2>
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
