import ChangeDateSkeleton from '../skeletons/ChangeDateSkeleton';
import TotalComponentSkeleton from '../TotalComponentSkeleton';
import ButtonSkeleton from '../skeletons/ButtonSkeleton';
import TransactionsListSkeleton from '../lists/TransactionsListSkeleton';

const TransactionsPageLoader = () => {
    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <div className="py-4 gap-4 flex flex-col">
                    {/* ChangeDate skeleton */}
                    <ChangeDateSkeleton />

                    {/* TotalComponent skeleton */}
                    <TotalComponentSkeleton />

                    {/* Add transaction button skeleton */}
                    <ButtonSkeleton />
                </div>

                {/* TransactionsList skeleton */}
                <TransactionsListSkeleton />
            </div>
        </div>
    );
};

export default TransactionsPageLoader;
