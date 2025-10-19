import { Triangle } from "lucide-react"
import type { Category } from "../../types/api.types"
import DetailsComp from "../atoms/accordion/DetailsComp"
import SummaryComp from "../atoms/accordion/SummaryComp"
import LabelCat from "../atoms/labels/LabelCat"

type Props = {
    category: Category
}

const Accordion = ({ category }: Props) => {
    return (
        <DetailsComp>
            {(isOpen: boolean) => (
                <>
                    <SummaryComp>
                        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <Triangle />
                        </span>
                        <span
                            className='text-slate-300 font-medium text-lg truncate'
                        >
                            {category.name}
                        </span>
                        <LabelCat type={category.type} />
                    </SummaryComp>
                    {category.subCategories && category.subCategories.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {category.subCategories.map(sub => (
                                <Accordion key={sub._id} category={sub} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </DetailsComp>
    )
}

export default Accordion
