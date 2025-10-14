import TransactionsList from "../components/organisms/TransactionsList"

const HomePage = () => {

    return (
        <div className="px-3">
            <h2 className='text-xl text-center'>
                Lista movimenti
            </h2>
            <TransactionsList />
        </div>
    )
}

export default HomePage
