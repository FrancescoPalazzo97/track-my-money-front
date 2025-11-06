const TotalComponentSkeleton = () => {
    return (
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-3 sm:p-5 space-y-3 sm:space-y-4 animate-pulse">

            {/* Income and Expense Skeleton */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Income Skeleton */}
                <div className="bg-slate-800/30 rounded-lg px-2.5 py-3 sm:p-3 md:p-2.5 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-700 rounded"></div>
                        <div className="h-3 sm:h-3.5 w-14 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 sm:h-[1.75rem] w-24 bg-slate-700 rounded"></div>
                </div>

                {/* Expense Skeleton */}
                <div className="bg-slate-800/30 rounded-lg px-2.5 py-3 sm:p-3 md:p-2.5 border border-slate-700/50">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-700 rounded"></div>
                        <div className="h-3 sm:h-3.5 w-10 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-4 sm:h-[1.75rem] w-24 bg-slate-700 rounded"></div>
                </div>
            </div>

            {/* Total Skeleton */}
            <div className="bg-slate-800/50 rounded-lg px-3 py-3.5 sm:px-4 sm:py-5 border border-slate-700/50">
                <div className="flex justify-between items-center gap-2">
                    <div className="h-3.5 sm:h-4 w-28 bg-slate-700 rounded"></div>
                    <div className="h-[1.75rem] sm:h-7 w-28 bg-slate-700 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default TotalComponentSkeleton
