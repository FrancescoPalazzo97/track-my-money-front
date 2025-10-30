import { useShallow } from 'zustand/shallow';
import type { TTransaction } from '../../types/api.types';
import LabelPrice from '../labels/LabelPrice';
import { store } from '../../store/store';
import TransactionDetails from '../TransactionDetails';

type Props = {
    transaction: TTransaction
}

const TransactionsCard = ({ transaction }: Props) => {

    const { openModal, fetchTransactionById } = store(
        useShallow(s => ({
            openModal: s.openModal,
            fetchTransactionById: s.fetchTransactionById
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
            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/5'
        >
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

export default TransactionsCard
