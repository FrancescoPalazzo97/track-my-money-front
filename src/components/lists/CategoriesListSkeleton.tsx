type Props = {
    mode: 'view' | 'edit'
}

const CategoriesListSkeleton = ({ mode }: Props) => {
    return (
        <ul className='space-y-3'>
            {[...Array(8)].map((_, index) => (
                <li
                    key={index}
                    className='bg-slate-900/50 p-4 backdrop-blur-sm border border-slate-800/50 rounded-xl animate-pulse'
                >
                    {mode === 'view' ? (
                        // Skeleton for GroupedCategoryCard (view mode)
                        <div className="space-y-4">
                            <div className="flex justify-between items-center gap-4">
                                {/* Triangle icon */}
                                <div className="w-6 h-6 bg-slate-700 rounded"></div>
                                {/* Category name */}
                                <div className="flex-1 h-5 bg-slate-700 rounded"></div>
                                {/* Type label */}
                                <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
                            </div>
                            {/* Subcategories indication (alternating for variety) */}
                            {index % 2 === 0 && (
                                <div className="ml-8 space-y-2">
                                    <div className="h-4 w-3/4 bg-slate-700/70 rounded"></div>
                                    <div className="h-4 w-2/3 bg-slate-700/70 rounded"></div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Skeleton for CategoriesCard (edit mode)
                        <div className="space-y-4">
                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex items-center gap-3 flex-1 min-w-0'>
                                    {/* Type label with icon */}
                                    <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                                    {/* Category name */}
                                    <div className='flex-1 h-5 bg-slate-700 rounded'></div>
                                </div>
                                {/* Action buttons */}
                                <div className='flex items-center gap-2 flex-shrink-0'>
                                    <div className="h-9 w-9 bg-slate-700 rounded-lg"></div>
                                    <div className="h-9 w-9 bg-slate-700 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default CategoriesListSkeleton
