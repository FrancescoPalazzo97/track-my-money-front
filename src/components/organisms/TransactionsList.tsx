import TransactionCard from '../molecules/TransactionCard';
import { store } from '../../store/store';
import { useShallow } from 'zustand/shallow';
import Loader from '../molecules/Loader';
import EmptyListComponent from '../molecules/EmptyListComponent';

const TransactionsList = () => {

    const { transactions, isLoading } = store(
        useShallow(s => ({
            transactions: s.transactions,
            isLoading: s.isLoadingTransaction
        }))
    );

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (transactions.length === 0) {
        return (
            <EmptyListComponent
                content={'Nessun movimento trovato'}
            />
        )
    }

    return (
        <ul className='space-y-3'>
            {transactions.map(t => (
                <TransactionCard key={t._id} transaction={t} />
            ))}
        </ul>
    )
}

export default TransactionsList
