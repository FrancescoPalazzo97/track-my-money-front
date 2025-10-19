import React from 'react'
import type { Transaction } from '../../types/api.types'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { store } from '../../store/store'
import { useShallow } from 'zustand/shallow'

type TProps = {
    transaction: Transaction
}

const TransactionCard = ({ transaction }: TProps) => {
    const categories = store(s => (s.categories));

    const categoryId = transaction.category;

    const category = categories.find(cat => cat._id === categoryId);
    const isExpense = category?.type === 'expense';
    const isIncome = category?.type === 'income';
    const amount = transaction.amountInEUR || transaction.amount;

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
                <div className='flex items-center gap-2 flex-shrink-0'>
                    <div className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold 
                    ${isExpense && 'bg-red-500/10 text-red-400 border border-red-500/20'}
                    ${isIncome && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}
                    ${!category && 'bg-gray-500/10 text-gay-400 border border-gray-500/20'}`}>
                        {isExpense && (
                            <TrendingDown className='w-4 h-4' />
                        )}
                        {isIncome && (
                            <TrendingUp className='w-4 h-4' />
                        )}
                        <span className='whitespace-nowrap'>
                            {isExpense && '-'}
                            {isIncome && '+'}
                            {amount.toFixed(2)} €
                        </span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TransactionCard
