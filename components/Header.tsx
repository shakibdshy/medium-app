import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <>
            <header className='container mx-auto flex justify-between space-x-5 p-5'>
                <div className='flex items-center space-x-5'>
                    <Link href="/">
                        <a className='w-44 object-contain'>
                            <Image src="https://moryphea.sirv.com/mediumApp/logo.png" width={500} height={200} />
                        </a>
                    </Link>
                    <ul className='hidden md:flex items-center space-x-5'>
                        <li>
                            <Link href='/'>
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <a>Contact</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <a className='px-6 py-2 rounded-full bg-green-600 text-white border-none'>Follow</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center space-x-5'>
                    <Link href='/'>
                        <a className='text-green-600'>Sign In</a>
                    </Link>
                    <Link href='/'>
                        <a className='border px-4 py-1 rounded-full border-green-600 text-green-600 transition-all hover:bg-green-600 hover:text-white hover:border-transparent'>Get Started</a>
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header