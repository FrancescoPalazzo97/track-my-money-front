import { Loader2 } from 'lucide-react'

const Loader = () => {
    return (
        <div className='flex items-center justify-center py-12'>
            <Loader2 className='w-8 h-8 animate-spin text-emerald-400' />
            <span className='ml-3 text-slate-400'>Caricamento...</span>
        </div>
    )
}

export default Loader