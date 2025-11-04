import { useMemo } from 'react'
import { store } from '../store/store';
import { useShallow } from 'zustand/shallow';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TotalComponent = () => {

    const { transactions } = store(
        useShallow(s => ({
            transactions: s.transactions
        }))
    );

    // Calcola il totale tra entrate e spese
    const { total, income, expense } = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(transaction => {
            const amount = transaction.amount;

            // La categoria è già inclusa nell'oggetto transaction
            if (transaction.category?.type === 'income') {
                totalIncome += amount;
            } else if (transaction.category?.type === 'expense') {
                totalExpense += amount;
            }
        });

        return {
            income: totalIncome,
            expense: totalExpense,
            total: totalIncome - totalExpense
        };
    }, [transactions]);

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-3 sm:p-5 space-y-3 sm:space-y-4">

            {/* Income and Expense */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Income */}
                <div className="bg-slate-800/30 rounded-lg p-2.5 sm:p-3 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        <span className="text-slate-400 text-xs sm:text-sm">Entrate</span>
                    </div>
                    <p className="text-emerald-400 font-semibold text-base sm:text-lg truncate">
                        +{income.toFixed(2)}&euro;
                    </p>
                </div>

                {/* Expense */}
                <div className="bg-slate-800/30 rounded-lg p-2.5 sm:p-3 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                        <span className="text-slate-400 text-xs sm:text-sm">Spese</span>
                    </div>
                    <p className="text-red-400 font-semibold text-base sm:text-lg truncate">
                        -{expense.toFixed(2)}&euro;
                    </p>
                </div>
            </div>

            {/* Total */}
            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-slate-700/50">
                <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-300 font-medium text-sm sm:text-base">Bilancio totale</span>
                    <span className={`text-lg sm:text-xl font-bold truncate ${total >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {total >= 0 ? '+' : ''}{total.toFixed(2)}&euro;
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TotalComponent
