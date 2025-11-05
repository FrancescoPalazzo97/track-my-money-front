const TotalComponentSkeleton = () => {
    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-3 sm:p-5 space-y-3 sm:space-y-4 animate-pulse">

            {/* Income and Expense Skeleton */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Income Skeleton */}
                <div className="bg-slate-800/30 rounded-lg p-2.5 sm:p-3 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-700 rounded"></div>
                        <div className="h-3 sm:h-3.5 w-12 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 sm:h-5 w-20 bg-slate-700 rounded"></div>
                </div>

                {/* Expense Skeleton */}
                <div className="bg-slate-800/30 rounded-lg p-2.5 sm:p-3 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-700 rounded"></div>
                        <div className="h-3 sm:h-3.5 w-12 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 sm:h-5 w-20 bg-slate-700 rounded"></div>
                </div>
            </div>

            {/* Total Skeleton */}
            <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4 border border-slate-700/50">
                <div className="flex justify-between items-center gap-2">
                    <div className="h-4 sm:h-5 w-28 bg-slate-700 rounded"></div>
                    <div className="h-5 sm:h-6 w-24 bg-slate-700 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default TotalComponentSkeleton
