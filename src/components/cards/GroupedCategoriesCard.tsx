import { useState } from 'react'
import type { TCategory } from '../../types/api.types'
import { Triangle } from 'lucide-react'
import TypeCategoryLabel from '../labels/TypeCategoryLabel'

type Props = {
    category: TCategory
}

const GroupedCategoryCard = ({ category }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <details
            onToggle={e => setIsOpen(e.currentTarget.open)}
        >
            <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <Triangle />
                </span>
                <span className='text-slate-300 font-medium text-lg truncate'>
                    {category.name}
                </span>
                <TypeCategoryLabel type={category.type} />
            </summary>
            {category.subCategories && category.subCategories.length > 0 ? (
                <ul className="mt-4 space-y-2">
                    {category.subCategories?.map(sc => (
                        <li
                            key={sc._id}
                        >
                            <GroupedCategoryCard category={sc} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='mt-4'>Nessuna sottocategoria disponibile.</p>
            )}
        </details>
    )
}

export default GroupedCategoryCard