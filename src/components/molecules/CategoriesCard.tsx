import { TrendingDown, TrendingUp } from 'lucide-react'
import type { Category } from '../../types/api.types'
import LabelCat from '../atoms/labels/LabelCat'
import Accordion from './Accordion'

type Props = {
    category: Category
}

const CategoriesCard = ({ category }: Props) => {
    return (
        <li
            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5'
        >
            <Accordion category={category} />
        </li>
    )
}

export default CategoriesCard
