import ChangeDate from '../components/ChangeDate';
import TransactionsList from '../components/lists/TransactionsList'
import TotalComponent from '../components/TotalComponent';
import BaseButton from '../components/ui/BaseButton';

const TransactionsPage = () => {

    const handleCreate = () => {

    }

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <div className="py-4 gap-4 flex flex-col">
                    <ChangeDate />
                    <TotalComponent />
                    <BaseButton
                        onClick={() => { }}
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
