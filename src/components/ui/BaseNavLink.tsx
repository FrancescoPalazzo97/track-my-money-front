import { NavLink } from "react-router-dom"

type Props = {
    to: string,
    children: React.ReactNode,
    className?: string
}

const BaseNavLink = ({ to, children, className }: Props) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                } ${className}`}
        >
            {children}
        </NavLink>
    )
}

export default BaseNavLink