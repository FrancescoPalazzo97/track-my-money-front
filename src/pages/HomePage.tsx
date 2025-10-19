import TransactionsList from "../components/organisms/TransactionsList"

const HomePage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Lista movimenti
                </h2>
                <TransactionsList />
            </div>
        </div>
    )
}

export default HomePage
