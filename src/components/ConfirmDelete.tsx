import { AlertTriangle } from 'lucide-react';
import BaseButton from './ui/BaseButton';

type Props = {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    itemName?: string;
    isDeleting?: boolean;
}

const ConfirmDelete = ({
    title,
    message,
    onConfirm,
    onCancel,
    itemName,
    isDeleting = false
}: Props) => {
    return (
        <div className='space-y-6'>
            {/* Warning Icon and Title */}
            <div className='flex flex-col items-center gap-4'>
                <div className='p-4 bg-red-500/10 rounded-full border-2 border-red-500/30'>
                    <AlertTriangle className='w-12 h-12 text-red-400' />
                </div>
                <div className='text-center space-y-2'>
                    <h3 className='text-xl font-bold text-slate-100'>
                        {title}
                    </h3>
                    {itemName && (
                        <p className='text-slate-300 font-medium'>
                            "{itemName}"
                        </p>
                    )}
                </div>
            </div>

            {/* Message */}
            <div className='bg-slate-800/30 rounded-lg p-4 border border-slate-700/50'>
                <p className='text-slate-300 text-center leading-relaxed'>
                    {message}
                </p>
            </div>

            {/* Warning Note */}
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
                <p className='text-red-300 text-sm text-center'>
                    <span className='font-semibold'>Attenzione:</span> Questa azione non può essere annullata.
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-3 pt-2'>
                <BaseButton
                    onClick={onCancel}
                    variant='secondary'
                    disabled={isDeleting}
                >
                    Annulla
                </BaseButton>
                <BaseButton
                    onClick={onConfirm}
                    variant='red'
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Eliminazione...' : 'Elimina definitivamente'}
                </BaseButton>
            </div>
        </div>
    )
}

export default ConfirmDelete
