import { Settings } from 'lucide-react';
import BaseNavLink from './ui/BaseNavLink';

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
                            <BaseNavLink
                                to='/settings'
                            >
                                <Settings className='w-5 h-5' />
                            </BaseNavLink>
                        </div>
                    </div>
                    <ul className='flex gap-2 justify-center'>
                        <li>
                            <BaseNavLink
                                to='/transactions'
                            >
                                Transazioni
                            </BaseNavLink>
                        </li>
                        <li>
                            <BaseNavLink
                                to='/categories'
                            >
                                Categorie
                            </BaseNavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
