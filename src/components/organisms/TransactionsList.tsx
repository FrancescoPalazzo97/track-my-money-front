import { useEffect } from 'react'
import TransactionCard from '../molecules/TransactionCard'
import { useStore } from '../../store/useStore'
import { useShallow } from 'zustand/shallow'

const TransactionsList = () => {

    const { transactions, fetchTransactions, isLoading } = useStore(
        useShallow(s => ({
            transactions: s.transactions,
            fetchTransactions: s.fetchTransactions,
            isLoading: s.isLoadingTransaction
        }))
    )

    useEffect(() => {
        fetchTransactions({
            startDate: '2025-10-01',
            endDate: '2025-10-31',
            baseCurrency: 'EUR'
        });
    }, []);

    if (isLoading) return <>Caricamento...</>

    return (
        <ul>
            {transactions.map(t => (
                <TransactionCard key={t._id} transaction={t} />
            ))}
        </ul>
    )
}

export default TransactionsList
