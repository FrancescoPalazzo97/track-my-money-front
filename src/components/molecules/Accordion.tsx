import type { Category } from "../../types/api.types"
import DetailsComp from "../atoms/accordion/DetailsComp"
import SummaryComp from "../atoms/accordion/SummaryComp"

type Props = {
    category: Category
}

const Accordion = ({ category }: Props) => {
    return (
        <DetailsComp>
            {(isOpen: boolean) => (
                <>
                    <SummaryComp
                        title={category.name}
                        type={category.type}
                        isOpen={isOpen}
                    />
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
