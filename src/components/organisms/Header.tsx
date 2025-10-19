import { NavLink } from 'react-router-dom'
import { Settings } from 'lucide-react'

const Header = () => {

    return (
        <header className='fixed inset-x-0 top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-slate-800/50 shadow-xl'>
            <nav className='py-3 px-4'>
                <div className='mx-auto'>
                    <div className='relative mb-4'>
                        <h1 className='text-2xl md:text-3xl text-center font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
                            Track my Money!
                        </h1>
                        <div className='absolute top-0 right-0 bottom-0 flex items-center'>
                            <NavLink
                                to={'/settings'}
                                className='p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200 text-slate-400 hover:text-emerald-400'
                            >
                                <Settings className='w-5 h-5' />
                            </NavLink>
                        </div>
                    </div>
                    <ul className='flex gap-2 justify-center'>
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/categories'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`
                                }
                            >
                                Categorie
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
