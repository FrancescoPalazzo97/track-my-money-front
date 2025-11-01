import { useShallow } from 'zustand/shallow';
import type { TTransaction } from '../../types/api.types';
import LabelPrice from '../labels/LabelPrice';
import { store } from '../../store/store';
import TransactionDetails from '../TransactionDetails';
import { Calendar, Coins } from 'lucide-react';
import useDayjs from '../../hooks/useDayjs';

type Props = {
    transaction: TTransaction
}

const TransactionsCard = ({ transaction }: Props) => {

    const { openModal } = store(
        useShallow(s => ({
            openModal: s.openModal
        }))
    )

    const amount = transaction.amountInEUR || transaction.amount;
    const type = transaction.category?.type;

    const handleClick = () => {
        openModal(
            <TransactionDetails transactionId={transaction._id} />,
            'Dettagli Transazione'
        )
    }

    return (
        <li
            onClick={handleClick}
            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer group'
        >
            <div className='flex items-start justify-between gap-4'>
                <div className='flex-1 min-w-0 space-y-2'>
                    <h3 className='text-slate-100 font-medium text-lg truncate group-hover:text-emerald-400 transition-colors'>
                        {transaction.title}
                    </h3>

                    {transaction.description && (
                        <p className='text-slate-400 text-sm line-clamp-2'>
                            {transaction.description}
                        </p>
                    )}

                    <div className='flex items-center gap-4 text-slate-500 text-xs'>
                        <div className='flex items-center gap-1'>
                            <Calendar className='w-3.5 h-3.5' />
                            <span>{useDayjs(transaction.transactionDate).format('DD MMM YYYY')}</span>
                        </div>
                        {transaction.currency !== 'EUR' && transaction.amountInEUR && (
                            <div className='flex items-center gap-1'>
                                <Coins className='w-3.5 h-3.5' />
                                <span>{transaction.amount.toFixed(2)} {transaction.currency}</span>
                            </div>
                        )}
                    </div>
                </div>

                <LabelPrice
                    type={type}
                    amount={amount}
                />
            </div>
        </li>
    )
}

export default TransactionsCard
