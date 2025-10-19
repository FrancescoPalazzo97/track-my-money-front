import { Triangle } from "lucide-react"
import LabelCat from "../labels/LabelCat";

type Props = {
    title: string,
    type: "income" | "expense";
}

const SummaryComp = ({ title, type }: Props) => {
    return (
        <summary
            className="cursor-pointer list-none flex items-center justify-between gap-4"
        >
            <span className="transition-transform duration-300 group-open:rotate-180">
                <Triangle />
            </span>
            <span
                className='text-slate-100 font-medium text-lg truncate'
            >
                {title}
            </span>
            <LabelCat type={type} />
        </summary>
    )
}

export default SummaryComp
