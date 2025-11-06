import TransactionsPageLoader from './loaders/TransactionsPageLoader';
import CategoriesPageLoader from './loaders/CategoriesPageLoader';

type RouteLoaderProps = {
    routeName?: 'transactions' | 'categories' | 'modify-categories' | 'settings';
};

const RouteLoader = ({ routeName = 'transactions' }: RouteLoaderProps) => {
    // Return specific loader based on route
    switch (routeName) {
        case 'transactions':
            return <TransactionsPageLoader />;

        case 'categories':
            return <CategoriesPageLoader mode="view" />;

        case 'modify-categories':
            return <CategoriesPageLoader mode="edit" />;

        case 'settings':
        default:
            // Generic loader for routes without specific skeleton
            return (
                <div className="p-4 sm:p-6">
                    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-pulse">
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 sm:p-6">
                            <div className="space-y-4">
                                <div className="h-6 w-64 bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="h-20 bg-slate-800/50 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
};

export default RouteLoader;
