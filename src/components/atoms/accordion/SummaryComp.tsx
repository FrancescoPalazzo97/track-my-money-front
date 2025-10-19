import { Triangle } from "lucide-react"
import LabelCat from "../labels/LabelCat";

type Props = {
    title: string,
    type: "income" | "expense";
    isOpen?: boolean;
}

const SummaryComp = ({ title, type, isOpen = false }: Props) => {
    return (
        <summary
            className="cursor-pointer list-none flex items-center justify-between gap-4"
        >
            <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <Triangle />
            </span>
            <span
                className='text-slate-300 font-medium text-lg truncate'
            >
                {title}
            </span>
            <LabelCat type={type} />
        </summary>
    )
}

export default SummaryComp
