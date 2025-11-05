const TransactionsListSkeleton = () => {
    return (
        <ul className='space-y-3'>
            {[...Array(5)].map((_, index) => (
                <li
                    key={index}
                    className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-3 sm:p-4 animate-pulse'
                >
                    <div className='flex items-start justify-between gap-2 sm:gap-4'>
                        <div className='flex-1 min-w-0 space-y-1.5 sm:space-y-2'>
                            {/* Title skeleton */}
                            <div className='h-5 sm:h-6 w-3/4 bg-slate-700 rounded'></div>

                            {/* Description skeleton (alternating visibility for variety) */}
                            {index % 2 === 0 && (
                                <div className='space-y-1'>
                                    <div className='h-3 sm:h-4 w-full bg-slate-700/70 rounded'></div>
                                    <div className='h-3 sm:h-4 w-2/3 bg-slate-700/70 rounded'></div>
                                </div>
                            )}

                            {/* Date and currency info skeleton */}
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <div className='flex items-center gap-1'>
                                    <div className='w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-700 rounded'></div>
                                    <div className='h-3 w-20 bg-slate-700 rounded'></div>
                                </div>
                                {index % 3 === 0 && (
                                    <div className='flex items-center gap-1'>
                                        <div className='w-3 h-3 sm:w-3.5 sm:h-3.5 bg-slate-700 rounded'></div>
                                        <div className='h-3 w-16 bg-slate-700 rounded'></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price label skeleton */}
                        <div className='flex-shrink-0'>
                            <div className='h-7 sm:h-8 w-20 sm:w-24 bg-slate-700 rounded-lg'></div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default TransactionsListSkeleton
