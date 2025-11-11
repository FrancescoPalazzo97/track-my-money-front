import { Pencil, Trash2 } from "lucide-react";
import type { TCategory } from "../../types/api.types";
import BaseButton from "../ui/BaseButton";
import TypeCategoryLabel from "../labels/TypeCategoryLabel";
import { store } from "../../store/store";
import { useShallow } from "zustand/shallow";
import CategoryForm from "../forms/CategoryForm";

type Props = {
    category: TCategory
}

const CategoriesCard = ({ category }: Props) => {

    const { openModal, addIdToDelete, categoriesToDelete } = store(
        useShallow(s => ({
            openModal: s.openModal,
            addIdToDelete: s.addIdToDelete,
            categoriesToDelete: s.categoriesToDelete
        }))
    );

    const handleEdit = () => {
        openModal(
            <CategoryForm categoryId={category._id} />,
            'Modifica categoria'
        );
    };

    const handleDelete = () => {
        addIdToDelete(category._id);
    };

    return (
        <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3 flex-1 min-w-0'>
                <TypeCategoryLabel type={category.type} icon />
                <div className='flex-1 min-w-0'>
                    <span className='text-slate-100 font-medium text-lg truncate'>
                        {category.name}
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-2 flex-shrink-0'>
                <BaseButton
                    onClick={handleEdit}
                    variant="secondary"
                    hoverColor="yellow"
                    aria-label='Modifica categoria'
                >
                    <Pencil className='w-4 h-4' />
                </BaseButton>
                <BaseButton
                    onClick={handleDelete}
                    variant={categoriesToDelete.includes(category._id) ? "red" : "secondary"}
                    hoverColor="red"
                    aria-label='Elimina categoria'
                >
                    <Trash2 className='w-4 h-4' />
                </BaseButton>
            </div>
        </div>
    )
}

export default CategoriesCard
