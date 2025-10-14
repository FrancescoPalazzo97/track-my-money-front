import React from 'react'
import type { Transaction } from '../../types/api.types'

type TProps = {
    transaction: Transaction
}

const TransactionCard = ({ transaction }: TProps) => {
    return (
        <li className='py-1'>
            <h3>{transaction.title}</h3>
            <p>
                {transaction.amountInEUR} &euro;
            </p>
        </li>
    )
}

export default TransactionCard
