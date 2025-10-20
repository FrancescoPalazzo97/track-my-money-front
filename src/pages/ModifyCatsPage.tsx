import { store } from "../store/store";
import { Pencil, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { useShallow } from "zustand/shallow";
import Loader from "../components/molecules/Loader";
import EmptyListComponent from "../components/molecules/EmptyListComponent";
import { CategoryUpdateSchema } from "../schemas/api.schemas";
import type { Category } from "../types/api.types";
import Modal from "../components/organisms/Modal";
import Form from "../components/organisms/Form";

const ModifyCatsPage = () => {

    const {
        categories, isLoading,
        modifyCategory,
        showModal, openModal, closeModal,
        categoryName, type, parentCategory,
        categoryToModify, setInitialValue
    } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory,
            modifyCategory: s.modifyCategory,
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

    const handleDelete = (categoryId: string) => {
        // TODO: Implementare logica di eliminazione
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
                        <li
                            key={cat._id}
                            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-200'
                        >
                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex items-center gap-3 flex-1 min-w-0'>
                                    <div className={`p-2 rounded-lg ${cat.type === 'income'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {cat.type === 'income' ? (
                                            <TrendingUp className='w-5 h-5' />
                                        ) : (
                                            <TrendingDown className='w-5 h-5' />
                                        )}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <input
                                            type="text"
                                            id={`categoryName-${cat._id}`}
                                            className='text-slate-100 font-medium text-lg truncate'
                                            placeholder={cat.name}
                                            defaultValue={cat.name}
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 flex-shrink-0'>
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className='p-2 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200'
                                        aria-label='Modifica categoria'
                                    >
                                        <Pencil className='w-4 h-4' />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className='p-2 rounded-lg bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/50 hover:border-red-500/30 transition-all duration-200'
                                        aria-label='Elimina categoria'
                                    >
                                        <Trash2 className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ModifyCatsPage
