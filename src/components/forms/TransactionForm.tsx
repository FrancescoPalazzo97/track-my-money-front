import React, { useEffect } from 'react'
import { useShallow } from 'zustand/shallow';
import { store } from '../../store/store';
import BaseButton from '../ui/BaseButton';
import { TransactionInputSchema, TransactionUpdateSchema } from '../../schemas/api.schemas';
import { TrendingDown, TrendingUp } from 'lucide-react';

type Props = {
    transactionId?: string;
};

const TransactionForm = ({ transactionId }: Props) => {

    const {
        title, setTitle, titleError,
        transactionDate, setTransactionDate,
        amount, setAmount,
        currency, setCurrency,
        tempType, setTempType,
        category, setCategory,
        description, setDescription,
        categories, transactions,
        addTransaction, modifyTransaction,
        closeModal,
        setError
    } = store(
        useShallow(s => ({
            title: s.title,
            setTitle: s.setTitle,
            titleError: s.titleError,
            transactionDate: s.transactionDate,
            setTransactionDate: s.setTransactionDate,
            amount: s.amount,
            setAmount: s.setAmount,
            currency: s.currency,
            setCurrency: s.setCurrency,
            tempType: s.tempType,
            setTempType: s.setTempType,
            category: s.category,
            setCategory: s.setCategory,
            description: s.description,
            setDescription: s.setDescription,
            categories: s.categories,
            transactions: s.transactions,
            addTransaction: s.addTransaction,
            modifyTransaction: s.modifyTransaction,
            closeModal: s.closeModal,
            setError: s.setError
        }))
    );

    useEffect(() => {
        const transaction = transactions.find(t => t._id === transactionId);
        if (transaction) {
            setTitle(transaction.title);
            setTransactionDate(transaction.transactionDate);
            setAmount(transaction.amount);
            setCurrency(transaction.currency);
            setCategory(transaction.category._id);
            setDescription(transaction.description || '');
        }
    }, [transactionId]);

    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateData = TransactionInputSchema.safeParse({
            title,
            transactionDate,
            amount,
            currency,
            category,
            description
        });
        if (!validateData.success) {
            setError(validateData.error.message);
            return;
        }
        console.log('Submitting form with values:', validateData.data);
        await addTransaction(validateData.data, tempType);
        closeModal();
    };

    const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (transactionId) {
        //     const validateData = TransactionUpdateSchema.safeParse({
        //         title,
        //         transactionDate,
        //         amount,
        //         currency,
        //         category,
        //         description
        //     });
        //     if (!validateData.success) {
        //         setError(validateData.error.message);
        //         return;
        //     }
        //     console.log('Modifying transaction with values:', validateData.data);
        //     await modifyTransaction(transactionId, validateData.data);
        //     closeModal();
        // }
    };

    // Raggruppa le categorie per tipo
    const incomeCategories = categories.filter(c => c.type === 'income');
    const expenseCategories = categories.filter(c => c.type === 'expense');

    return (
        <div>
            <form className="space-y-6" onSubmit={transactionId ? handleSubmitEdit : handleSubmitCreate}>
                {/* Titolo */}
                <div>
                    <label className="block text-sm font-medium">
                        <h3 className="mb-1.5">Titolo</h3>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Esempio: Spesa al supermercato"
                            className={`w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 ${titleError ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500/50' : ''}`}
                        />
                        {titleError && <p className="mt-1 text-sm text-red-500 absolute">{titleError}</p>}
                    </label>
                </div>

                {/* Data e Importo - Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Data */}
                    <div>
                        <label className="block text-sm font-medium">
                            <h3 className="mb-1.5">Data e Ora</h3>
                            <input
                                id="transactionDate"
                                type="datetime-local"
                                value={transactionDate}
                                onChange={(e) => setTransactionDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                            />
                        </label>
                    </div>

                    {/* Importo */}
                    <div>
                        <label className="block text-sm font-medium">
                            <h3 className="mb-1.5">Importo</h3>
                            <input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                            />
                        </label>
                    </div>
                </div>

                {/* Valuta */}
                <div>
                    <label className="block text-sm font-medium">
                        <h3 className="mb-1.5">Valuta</h3>
                        <select
                            id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="JPY">JPY (¥)</option>
                        </select>
                    </label>
                </div>

                <div className="flex gap-3">
                    <BaseButton
                        onClick={() => setTempType('expense')}
                        variant={tempType === 'expense' ? 'red' : 'secondary'}
                        className="w-1/2 flex items-center justify-center border-2 gap-2"
                    >
                        <TrendingDown className="w-5 h-5" />
                        <span>Uscita</span>
                    </BaseButton>
                    <BaseButton
                        onClick={() => setTempType('income')}
                        variant={tempType === 'income' ? 'emerald' : 'secondary'}
                        className="w-1/2 flex items-center justify-center border-2 gap-2"
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span>Entrata</span>
                    </BaseButton>
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-sm font-medium">
                        <h3 className="mb-1.5">Categoria</h3>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                        >
                            <option value="">Seleziona una categoria</option>
                            {tempType === 'expense' && expenseCategories.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                            {tempType === 'income' && incomeCategories.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Descrizione */}
                <div>
                    <label className="block text-sm font-medium">
                        <h3 className="mb-1.5">Descrizione (opzionale)</h3>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Aggiungi dettagli sulla transazione..."
                            rows={3}
                            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 resize-none"
                        />
                    </label>
                </div>

                {/* Bottoni */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/50">
                    <BaseButton
                        onClick={() => { closeModal() }}
                        variant="secondary"
                    >
                        Annulla
                    </BaseButton>
                    <BaseButton
                        disabled={title.trim() === '' || amount <= 0 || category === ''}
                        type="submit"
                    >
                        Salva
                    </BaseButton>
                </div>
            </form>
        </div>
    )
}

export default TransactionForm
