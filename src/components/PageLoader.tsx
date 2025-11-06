const PageLoader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 animate-pulse">
                {/* Header skeleton */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="h-8 w-48 bg-slate-700 rounded"></div>
                        <div className="h-10 w-32 bg-slate-700 rounded-lg"></div>
                    </div>
                </div>

                {/* Content area skeleton */}
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 sm:p-6">
                    <div className="space-y-4">
                        <div className="h-6 w-64 bg-slate-700 rounded"></div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="h-20 bg-slate-800/50 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
