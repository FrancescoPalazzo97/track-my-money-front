import { TrendingDown, TrendingUp } from "lucide-react"

type Props = {
    type: "income" | "expense"
    icon?: boolean
}

const TypeCategoryLabel = ({ type, icon }: Props) => {
    return (
        <div className={`p-2 rounded-lg text-sm font-medium ${type === 'income'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
            {icon ? (
                <>
                    {type === 'income' ? (
                        <TrendingUp className='w-5 h-5' />
                    ) : (
                        <TrendingDown className='w-5 h-5' />
                    )}
                </>
            ) : (
                <>
                    {type === 'income' ? 'Entrata' : 'Uscita'}
                </>
            )}
        </div>
    )
}

export default TypeCategoryLabel
