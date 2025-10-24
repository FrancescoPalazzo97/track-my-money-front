import { Link } from 'react-router-dom';

type LinkVariant =
    | 'primary' | 'secondary' | 'ghost'
    | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
    | 'red' | 'orange' | 'amber' | 'yellow'
    | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan'
    | 'sky' | 'blue' | 'indigo'
    | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

type LinkHoverColor =
    | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone'
    | 'red' | 'orange' | 'amber' | 'yellow'
    | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan'
    | 'sky' | 'blue' | 'indigo'
    | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

type LinkSize = 'sm' | 'md' | 'lg';

type Props = {
    children: React.ReactNode
    to: string
    variant?: LinkVariant
    hoverColor?: LinkHoverColor
    size?: LinkSize
    fullWidth?: boolean
    className?: string
}

const BaseLink = ({
    children,
    to,
    variant = 'primary',
    hoverColor,
    size = 'md',
    fullWidth = false,
    className = ''
}: Props) => {

    const baseStyles = 'font-medium rounded-lg transition-all duration-200 inline-block text-center'

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-sm',
        md: 'px-4 py-2.5 text-sm sm:px-5 sm:py-2.5 sm:text-base',
        lg: 'px-5 py-3 text-base sm:px-7 sm:py-3.5 sm:text-lg'
    }

    const variantStyles = {
        // Varianti semantiche
        primary: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        secondary: 'bg-slate-800/50 text-slate-200 border border-slate-700/50',
        ghost: 'text-slate-400',

        // Grigi
        slate: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
        gray: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
        zinc: 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30',
        neutral: 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30',
        stone: 'bg-stone-500/20 text-stone-400 border border-stone-500/30',

        // Rossi e arancioni
        red: 'bg-red-500/20 text-red-400 border border-red-500/30',
        orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
        amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        yellow: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',

        // Verdi
        lime: 'bg-lime-500/20 text-lime-400 border border-lime-500/30',
        green: 'bg-green-500/20 text-green-400 border border-green-500/30',
        emerald: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        teal: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',

        // Blu
        sky: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
        blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        indigo: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
        violet: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',

        // Viola e rosa
        purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30',
        pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
        rose: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    }

    const defaultHoverStyles = {
        primary: 'hover:bg-emerald-500/30 hover:border-emerald-500/40',
        secondary: 'hover:bg-slate-800/70 hover:border-slate-600/50',
        ghost: 'hover:text-slate-200 hover:bg-slate-800/50',

        // Grigi
        slate: 'hover:bg-slate-500/30 hover:border-slate-500/40',
        gray: 'hover:bg-gray-500/30 hover:border-gray-500/40',
        zinc: 'hover:bg-zinc-500/30 hover:border-zinc-500/40',
        neutral: 'hover:bg-neutral-500/30 hover:border-neutral-500/40',
        stone: 'hover:bg-stone-500/30 hover:border-stone-500/40',

        // Rossi e arancioni
        red: 'hover:bg-red-500/30 hover:border-red-500/40',
        orange: 'hover:bg-orange-500/30 hover:border-orange-500/40',
        amber: 'hover:bg-amber-500/30 hover:border-amber-500/40',
        yellow: 'hover:bg-yellow-500/30 hover:border-yellow-500/40',

        // Verdi
        lime: 'hover:bg-lime-500/30 hover:border-lime-500/40',
        green: 'hover:bg-green-500/30 hover:border-green-500/40',
        emerald: 'hover:bg-emerald-500/30 hover:border-emerald-500/40',
        teal: 'hover:bg-teal-500/30 hover:border-teal-500/40',
        cyan: 'hover:bg-cyan-500/30 hover:border-cyan-500/40',

        // Blu
        sky: 'hover:bg-sky-500/30 hover:border-sky-500/40',
        blue: 'hover:bg-blue-500/30 hover:border-blue-500/40',
        indigo: 'hover:bg-indigo-500/30 hover:border-indigo-500/40',
        violet: 'hover:bg-violet-500/30 hover:border-violet-500/40',

        // Viola e rosa
        purple: 'hover:bg-purple-500/30 hover:border-purple-500/40',
        fuchsia: 'hover:bg-fuchsia-500/30 hover:border-fuchsia-500/40',
        pink: 'hover:bg-pink-500/30 hover:border-pink-500/40',
        rose: 'hover:bg-rose-500/30 hover:border-rose-500/40',
    }

    const customHoverStyles = {
        // Grigi
        slate: 'hover:bg-slate-500/30 hover:border-slate-500/40 hover:text-slate-300',
        gray: 'hover:bg-gray-500/30 hover:border-gray-500/40 hover:text-gray-300',
        zinc: 'hover:bg-zinc-500/30 hover:border-zinc-500/40 hover:text-zinc-300',
        neutral: 'hover:bg-neutral-500/30 hover:border-neutral-500/40 hover:text-neutral-300',
        stone: 'hover:bg-stone-500/30 hover:border-stone-500/40 hover:text-stone-300',

        // Rossi e arancioni
        red: 'hover:bg-red-500/30 hover:border-red-500/40 hover:text-red-300',
        orange: 'hover:bg-orange-500/30 hover:border-orange-500/40 hover:text-orange-300',
        amber: 'hover:bg-amber-500/30 hover:border-amber-500/40 hover:text-amber-300',
        yellow: 'hover:bg-yellow-500/30 hover:border-yellow-500/40 hover:text-yellow-300',

        // Verdi
        lime: 'hover:bg-lime-500/30 hover:border-lime-500/40 hover:text-lime-300',
        green: 'hover:bg-green-500/30 hover:border-green-500/40 hover:text-green-300',
        emerald: 'hover:bg-emerald-500/30 hover:border-emerald-500/40 hover:text-emerald-300',
        teal: 'hover:bg-teal-500/30 hover:border-teal-500/40 hover:text-teal-300',
        cyan: 'hover:bg-cyan-500/30 hover:border-cyan-500/40 hover:text-cyan-300',

        // Blu
        sky: 'hover:bg-sky-500/30 hover:border-sky-500/40 hover:text-sky-300',
        blue: 'hover:bg-blue-500/30 hover:border-blue-500/40 hover:text-blue-300',
        indigo: 'hover:bg-indigo-500/30 hover:border-indigo-500/40 hover:text-indigo-300',
        violet: 'hover:bg-violet-500/30 hover:border-violet-500/40 hover:text-violet-300',

        // Viola e rosa
        purple: 'hover:bg-purple-500/30 hover:border-purple-500/40 hover:text-purple-300',
        fuchsia: 'hover:bg-fuchsia-500/30 hover:border-fuchsia-500/40 hover:text-fuchsia-300',
        pink: 'hover:bg-pink-500/30 hover:border-pink-500/40 hover:text-pink-300',
        rose: 'hover:bg-rose-500/30 hover:border-rose-500/40 hover:text-rose-300',
    }

    const hoverStyles = hoverColor ? customHoverStyles[hoverColor] : defaultHoverStyles[variant]
    const widthStyles = fullWidth ? 'w-full' : ''

    return (
        <Link
            to={to}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${hoverStyles} ${widthStyles} ${className}`}
        >
            {children}
        </Link>
    )
}

export default BaseLink
