import React, { useEffect } from 'react'
import type { TTransaction } from '../types/api.types'
import { useShallow } from 'zustand/shallow'
import { store } from '../store/store'

type Props = {
    transactionId: string
}

const TransactionDetails = ({ transactionId }: Props) => {

    const { fetchTransactionById, transaction } = store(
        useShallow(s => ({
            fetchTransactionById: s.fetchTransactionById,
            transaction: s.transaction
        }))
    )

    console.log(transaction)

    useEffect(() => {
        console.log('inizio fetchTransactionById in TransactionDetails', { transactionId });
        fetchTransactionById(transactionId);
    }, []);

    if (!transaction) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>{transaction.title}</h2>
            <p>Amount: {transaction.amount} {transaction.currency}</p>
            <p>Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
            {transaction.description && <p>Description: {transaction.description}</p>}
        </div>
    )
}

export default TransactionDetails
