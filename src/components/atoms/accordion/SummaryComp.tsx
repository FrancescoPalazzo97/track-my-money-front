import { Triangle } from "lucide-react"
import LabelCat from "../labels/LabelCat";

type Props = {
    children: React.ReactNode
}

const SummaryComp = ({ children }: Props) => {
    return (
        <summary
            className="cursor-pointer list-none flex items-center justify-between gap-4"
        >
            {children}
        </summary>
    )
}

export default SummaryComp
