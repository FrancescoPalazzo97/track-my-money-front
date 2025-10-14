import { useShallow } from "zustand/shallow";
import { useStore } from "../store/useStore";
import { useEffect } from "react";

const HomePage = () => {
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
        <div>
            <h2 className='text-xl text-center'>
                Lista movimenti
            </h2>
            <ul>
                {transactions.map(t => (
                    <li key={t._id}>
                        <h3>{t.title}</h3>
                        <p>
                            {t.amountInEUR} &euro;
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage
