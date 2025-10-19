import type { Category } from "../../types/api.types"
import DetailsComp from "../atoms/accordion/DetailsComp"
import SummaryComp from "../atoms/accordion/SummaryComp"

type Props = {
    category: Category
}

const Accordion = ({ category }: Props) => {
    return (
        <DetailsComp>
            <SummaryComp
                title={category.name}
                type={category.type}
            />
            {category.description && (
                <p className="mt-4 text-slate-400 leading-relaxed pl-14">
                    {category.description}
                </p>
            )}
            {category.subCategories && category.subCategories.length > 0 && (
                <ul className="mt-4 pl-14 space-y-2">
                    {category.subCategories.map(sub => (
                        <li key={sub._id} className="text-slate-300 text-sm">
                            • {sub.name}
                        </li>
                    ))}
                </ul>
            )}
        </DetailsComp>
    )
}

export default Accordion
