import BaseButton from './ui/BaseButton';
import { Triangle } from 'lucide-react';
import { store } from '../store/store';
import { useShallow } from 'zustand/shallow';

const ChangeDate = () => {

    const { dateToShow, handleClick } = store(
        useShallow(s => ({
            dateToShow: s.date,
            handleClick: s.handleChangeMonth
        }))
    );

    return (
        <div className='flex items-center justify-between gap-4'>
            <BaseButton
                onClick={() => handleClick('prev')}
            >
                <Triangle className="-rotate-90" />
            </BaseButton>

            <span className="font-medium">{dateToShow.format('MMMM YYYY')}</span>

            <BaseButton
                onClick={() => handleClick('next')}
            >
                <Triangle className="rotate-90" />
            </BaseButton>
        </div>
    )
}

export default ChangeDate
