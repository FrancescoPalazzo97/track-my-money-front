import React from 'react'
import type { Transaction } from '../../types/api.types'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { store } from '../../store/store'
import { useShallow } from 'zustand/shallow'
import LabelPrice from '../atoms/labels/LabelPrice'

type TProps = {
    transaction: Transaction
}

const TransactionCard = ({ transaction }: TProps) => {
    const amount = transaction.amountInEUR || transaction.amount;

    const type = transaction.category?.type;

    let styles;

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
        <li className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5'>
            <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                    <h3 className='text-slate-100 font-medium text-lg mb-1 truncate'>
                        {transaction.title}
                    </h3>
                    {transaction.description && (
                        <p className='text-slate-400 text-sm line-clamp-2'>
                            {transaction.description}
                        </p>
                    )}
                </div>
                <LabelPrice
                    type={type}
                    amount={amount}
                />
            </div>
        </li>
    )
}

export default TransactionCard
