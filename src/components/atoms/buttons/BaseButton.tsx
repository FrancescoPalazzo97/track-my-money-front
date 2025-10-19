import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type Props = {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    fullWidth?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const BaseButton = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    onClick,
    type = 'button',
    className = ''
}: Props) => {

    const baseStyles = 'font-medium rounded-lg transition-all cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    }

    const variantStyles = {
        primary: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-500/40',
        secondary: 'bg-slate-800/50 text-slate-200 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50',
        danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/40',
        success: 'bg-emerald-500 text-white border border-emerald-600 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20',
        ghost: 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}`}
        >
            {children}
        </button>
    )
}

export default BaseButton
