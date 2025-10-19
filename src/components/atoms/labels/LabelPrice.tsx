import { ShieldQuestionMark, TrendingDown, TrendingUp } from "lucide-react";

type Props = {
    type: 'income' | 'expense' | null,
    amount: number
}

const LabelPrice = ({ type, amount }: Props) => {

    let styles: string;
    switch (type) {
        case 'income':
            styles = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
            break;
        case 'expense':
            styles = 'bg-red-500/10 text-red-400 border border-red-500/20';
            break;
        default:
            styles = 'bg-gray-500/10 text-gay-400 border border-gray-500/20';
            break;
    }

    return (
        <div className='flex items-center gap-2 flex-shrink-0'>
            <div className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold ${styles}`}>
                {type === 'expense'
                    ? (<TrendingDown className='w-4 h-4' />)
                    : type === 'income'
                        ? (<TrendingUp className='w-4 h-4' />)
                        : (<ShieldQuestionMark className='w-4 h-4' />)}
                <span className='whitespace-nowrap'>
                    {type === 'expense' && '-'}
                    {type === 'income' && '+'}
                    {amount.toFixed(2)} €
                </span>
            </div>
        </div>
    )
}

export default LabelPrice
