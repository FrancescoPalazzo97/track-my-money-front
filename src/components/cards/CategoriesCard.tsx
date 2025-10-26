import { Pencil, Trash2, TrendingDown, TrendingUp } from "lucide-react"
import type { TCategory } from "../../types/api.types"
import BaseButton from "../ui/BaseButton"

type Props = {
    category: TCategory
    handleEdit: (category: TCategory) => void,
    handleDelete: (categoryId: string) => void,
}

const CategoriesCard = ({ category, handleEdit, handleDelete }: Props) => {
    return (
        <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3 flex-1 min-w-0'>
                <div className={`p-2 rounded-lg ${category.type === 'income'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-red-500/10 text-red-400'
                    }`}>
                    {category.type === 'income' ? (
                        <TrendingUp className='w-5 h-5' />
                    ) : (
                        <TrendingDown className='w-5 h-5' />
                    )}
                </div>
                <div className='flex-1 min-w-0'>
                    <span className='text-slate-100 font-medium text-lg truncate'>
                        {category.name}
                    </span>
                </div>
            </div>
            <div className='flex items-center gap-2 flex-shrink-0'>
                <BaseButton
                    onClick={() => handleEdit(category)}
                    variant="secondary"
                    hoverColor="yellow"
                    aria-label='Modifica categoria'
                >
                    <Pencil className='w-4 h-4' />
                </BaseButton>
                <BaseButton
                    onClick={() => handleDelete(category._id)}
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
