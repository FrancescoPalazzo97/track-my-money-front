type Props = {
    type: "income" | "expense"
}

const TypeCategoryLabel = ({ type }: Props) => {
    return (
        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${type === 'income'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
            {type === 'income' ? 'Entrata' : 'Uscita'}
        </div>
    )
}

export default TypeCategoryLabel
