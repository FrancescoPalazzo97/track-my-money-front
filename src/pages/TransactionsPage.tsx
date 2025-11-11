import { useShallow } from 'zustand/shallow';
import ChangeDate from '../components/ChangeDate';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionsList from '../components/lists/TransactionsList'
import TotalComponent from '../components/TotalComponent';
import BaseButton from '../components/ui/BaseButton';
import { store } from '../store/store';

const TransactionsPage = () => {

    const { openModal, setInitialState } = store(
        useShallow(s => ({
            openModal: s.openModal,
            setInitialState: s.setInitialState
        }))
    );

    const handleCreate = () => {
        setInitialState();
        openModal(
            <TransactionForm />,
            'Aggiungi nuova transazione'
        );
    }

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <div className="py-4 gap-4 flex flex-col">
                    <ChangeDate />
                    <TotalComponent />
                    <BaseButton
                        onClick={handleCreate}
                        fullWidth
                        truncate
                        size="lg"
                    >
                        Aggiungi nuova transazione
                    </BaseButton>
                </div>
                <TransactionsList />
            </div>
        </div>
    )
}

export default TransactionsPage
