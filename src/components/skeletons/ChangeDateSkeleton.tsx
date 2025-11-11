const ChangeDateSkeleton = () => {
    return (
        <div className='flex items-center justify-between gap-4 animate-pulse'>
            {/* Left button skeleton */}
            <div className="h-10 w-10 bg-slate-700 rounded-lg"></div>

            {/* Month/Year text skeleton */}
            <div className="h-5 w-32 bg-slate-700 rounded"></div>

            {/* Right button skeleton */}
            <div className="h-10 w-10 bg-slate-700 rounded-lg"></div>
        </div>
    );
};

export default ChangeDateSkeleton;
