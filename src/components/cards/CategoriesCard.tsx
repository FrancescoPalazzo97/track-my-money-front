import { Pencil, Trash2 } from "lucide-react"
import type { TCategory } from "../../types/api.types"
import BaseButton from "../ui/BaseButton"
import TypeCategoryLabel from "../labels/TypeCategoryLabel"
import { store } from "../../store/store"
import { useShallow } from "zustand/shallow"

type Props = {
    category: TCategory
}

const CategoriesCard = ({ category }: Props) => {

    const { openModal, closeModal } = store(
        useShallow(s => ({
            openModal: s.openModal,
            closeModal: s.closeModal
        })))

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
                    onClick={() => { openModal() }}
                    variant="secondary"
                    hoverColor="yellow"
                    aria-label='Modifica categoria'
                >
                    <Pencil className='w-4 h-4' />
                </BaseButton>
                <BaseButton
                    onClick={() => { }}
                    variant="secondary"
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
