import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { store } from '../store/store';
import { Calendar, Coins, FileText, Clock, ArrowRightLeft, Trash2, Pencil } from 'lucide-react';
import LabelPrice from './labels/LabelPrice';
import TypeCategoryLabel from './labels/TypeCategoryLabel';
import Loader from './Loader';
import useDayjs from '../hooks/useDayjs';
import TransactionForm from './forms/TransactionForm';
import BaseButton from './ui/BaseButton';
import ConfirmDelete from './ConfirmDelete';

type Props = {
    transactionId: string
}

const TransactionDetails = ({ transactionId }: Props) => {

    const { fetchTransactionById, transaction, categories, isLoading, openModal, setInitialState, deleteTransaction, closeModal } = store(
        useShallow(s => ({
            fetchTransactionById: s.fetchTransactionById,
            transaction: s.transaction,
            categories: s.categories,
            isLoading: s.isLoadingTransaction,
            openModal: s.openModal,
            setInitialState: s.setInitialState,
            deleteTransaction: s.deleteTransaction,
            closeModal: s.closeModal
        }))
    )

    useEffect(() => {
        fetchTransactionById(transactionId);
    }, [transactionId]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center py-12'>
                <Loader />
            </div>
        )
    }

    if (!transaction) {
        return (
            <div className='text-center py-12'>
                <p className='text-slate-400'>Transazione non trovata</p>
            </div>
        )
    }

    const amount = transaction.amountInEUR || transaction.amount;
    const type = transaction.category.type;

    // Trova la categoria completa nell'array categories
    const findCategoryById = categories.find(c => c._id === transaction.category._id);

    // Trova la categoria padre se esiste
    const findParentCategory = categories.find(c => c._id === findCategoryById?.parentCategory);

    const handleEdit = () => {
        // Implementa la logica per modificare la transazione
        const newState = {
            title: transaction.title,
            transactionDate: transaction.transactionDate,
            amount: transaction.amount,
            currency: transaction.currency,
            tempType: transaction.category.type,
            category: transaction.category._id,
            description: transaction.description || ''
        }
        console.log(newState);
        setInitialState(newState);
        openModal(
            <TransactionForm transactionId={transaction._id} />,
            'Modifica transazione'
        );
    }

    const handleDelete = () => {
        // Implementa la logica per eliminare la transazione
        console.log('Elimina transazione');
        openModal(
            <ConfirmDelete
                title="Conferma eliminazione"
                message="Sei sicuro di voler eliminare questa transazione?"
                onConfirm={() => deleteTransaction(transaction._id)}
                onCancel={() => closeModal()}
                itemName={transaction.title}
            />,
            'Elimina transazione'
        );
    }

    return (
        <div className='space-y-6'>
            {/* Title and Amount Section */}
            <div className='space-y-3'>
                <h2 className='text-2xl font-bold text-slate-100'>
                    {transaction.title}
                </h2>
                <div className='flex justify-center'>
                    <LabelPrice
                        type={type}
                        amount={amount}
                    />
                </div>
            </div>

            {/* Details Grid */}
            <div className='space-y-4'>
                {/* Transaction Date */}
                <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                    <div className='flex items-start gap-3'>
                        <div className='mt-0.5'>
                            <Calendar className='w-5 h-5 text-emerald-400' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-slate-400 text-sm mb-1'>Data transazione</p>
                            <p className='text-slate-100 font-medium'>
                                {useDayjs(transaction.transactionDate).format('D MMMM YYYY')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Currency Information */}
                <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                    <div className='flex items-start gap-3'>
                        <div className='mt-0.5'>
                            <Coins className='w-5 h-5 text-emerald-400' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-slate-400 text-sm mb-1'>Valuta</p>
                            <p className='text-slate-100 font-medium'>
                                {transaction.amount.toFixed(2)} {transaction.currency}
                            </p>
                            {transaction.currency !== 'EUR' && transaction.amountInEUR && (
                                <div className='mt-2 flex items-center gap-2 text-sm'>
                                    <ArrowRightLeft className='w-4 h-4 text-slate-500' />
                                    <span className='text-slate-400'>
                                        Convertito: {transaction.amountInEUR} EUR
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category */}
                <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                    <div className='flex items-start gap-3'>
                        <div className='mt-0.5'>
                            <TypeCategoryLabel type={findCategoryById?.type || type} icon />
                        </div>
                        <div className='flex-1 space-y-1'>
                            <p className='text-slate-400 text-sm'>Categoria</p>
                            <div>
                                {findParentCategory && (
                                    <span className='text-slate-400 text-sm'>
                                        {findParentCategory.name}
                                        <span className='mx-1.5 text-slate-600'>/</span>
                                    </span>
                                )}
                                <span className='text-slate-100 font-medium'>
                                    {findCategoryById?.name || 'Non specificata'}
                                </span>
                            </div>
                            <p className='text-slate-400 text-xs'>
                                {type === 'income' ? 'Entrata' : 'Uscita'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                {transaction.description && (
                    <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                        <div className='flex items-start gap-3'>
                            <div className='mt-0.5'>
                                <FileText className='w-5 h-5 text-emerald-400' />
                            </div>
                            <div className='flex-1'>
                                <p className='text-slate-400 text-sm mb-1'>Descrizione</p>
                                <p className='text-slate-100 leading-relaxed'>
                                    {transaction.description}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                    <div className='flex items-start gap-3'>
                        <div className='mt-0.5'>
                            <Clock className='w-5 h-5 text-emerald-400' />
                        </div>
                        <div className='flex-1 space-y-2'>
                            <div>
                                <p className='text-slate-400 text-sm'>Creata il</p>
                                <p className='text-slate-100 text-sm font-medium'>
                                    {useDayjs(transaction.createdAt).format('DD/MM/YYYY, HH:mm')}
                                </p>
                            </div>
                            <div>
                                <p className='text-slate-400 text-sm'>Ultima modifica</p>
                                <p className='text-slate-100 text-sm font-medium'>
                                    {useDayjs(transaction.updatedAt).format('DD/MM/YYYY, HH:mm')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/50">
                    <BaseButton
                        onClick={handleEdit}
                        variant="yellow"
                    >
                        <Pencil className='w-5 h-5' />
                    </BaseButton>
                    <BaseButton
                        onClick={handleDelete}
                        variant='red'
                    >
                        <Trash2 className='w-5 h-5' />
                    </BaseButton>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetails
