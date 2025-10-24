import { useState } from 'react'
import type { TCategory } from '../../types/api.types'

type Props = {
    category: TCategory
}

const GroupedCategoryCard = ({ category }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-slate-800/50 hover:bg-slate-800/70 transition-colors rounded-md p-3'>
            <span className='font-medium'>{category.name}</span>
            <div className={`mt-2 overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className='text-sm text-slate-400'>
                    {category.subCategories?.map(sc => (
                        <GroupedCategoryCard key={sc._id} category={sc} />
                    ))}
                </div>
            </div>
            <button
                className='mt-2 text-xs text-slate-500 hover:text-slate-300 transition-colors'
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Chiudi' : 'Leggi di più'}
            </button>
        </div>
    )
}

export default GroupedCategoryCard