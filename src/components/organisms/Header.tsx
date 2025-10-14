import React from 'react'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'

const Header = () => {
    return (
        <header className='fixed inset-x-0 top-0'>
            <nav className='py-2'>
                <div className='relative'>
                    <h1 className='text-3xl text-center font-bold'>
                        Track my Money!
                    </h1>
                    <div className='absolute top-1.5 right-2 bottom-1.5'>
                        <Link to={'/'}>
                            <Settings />
                        </Link>
                    </div>
                </div>
                <ul className='flex gap-1.5'>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/settings'}>Impostazioni</Link>
                    </li>
                    <li>
                        <Link to={'/categories'}>Categorie</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
