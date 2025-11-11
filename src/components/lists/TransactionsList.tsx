import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import EmptyList from './EmptyList';
import TransactionsCard from '../cards/TransactionsCard';
import TransactionsListSkeleton from './TransactionsListSkeleton';

const TransactionsList = () => {
    const { transactions, isLoading } = store(
        useShallow(s => ({
            transactions: s.transactions,
            isLoading: s.isLoadingTransaction
        }))
    )

    if (isLoading) {
        return <TransactionsListSkeleton />;
    }

    if (transactions.length === 0) {
        return (
            <EmptyList
                content="Nessuna transazione disponibile. Aggiungi nuove transazioni per iniziare a monitorare le tue spese."
            />
        )
    }

    return (
        <ul className='space-y-3'>
            {transactions.map(t => (
                <TransactionsCard
                    key={t._id}
                    transaction={t}
                />
            ))}
        </ul>
    )
}

export default TransactionsList
