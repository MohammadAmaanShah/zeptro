import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SignedIn, SignInButton, SignOutButton, SignedOut, UserButton } from '@clerk/clerk-react';

const ResponsiveMenu = ({ openNav, setOpenNav }) => {

    const user = useUser();


    return (
        <div className={`${openNav ? 'left-0' : '-left-200'} fixed bottom-0 top-0 h-screen w-[75%] flex flex-col justify-start bg-white pt-10 px-8   text-black md:hidden rounded-r-2xl shadow-md transtion-all `}>
            <div className=' flex items-center justify-start gap-3'>
                {
                    user ? <div>
                        <SignedOut >
                            <SignInButton className='bg-red-500 rounded-md px-2 py-1 text-white font-semibold text-sm  cursor-pointer' />
                        </SignedOut>
                        <SignedIn className='bg-red-500 rounded-md py-1 px-3 text-white  cursor-pointer '>
                            <UserButton size={50} />
                        </SignedIn>
                    </div> : <div></div>
                }
                <div>
                    {user?.user?.firstName && <h1>Hello, {user?.user?.firstName}</h1>}
                    {user?.user?.firstName && <h1 className='text-yellow-500 text-sm'>Premium User</h1>}
                </div>
            </div>
            <nav className='mt-12'>
                <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                    <Link onClick={() => setOpenNav(false)} to={'/'} className='cursor=pointer text-black'  ><li>Home</li></Link>
                    <Link onClick={() => setOpenNav(false)} to={'/products'} className='cursor=pointer text-black'  ><li>Products</li></Link>
                    <Link onClick={() => setOpenNav(false)} to={'/about'} className='cursor=pointer text-black'  ><li>About</li></Link>
                    <Link onClick={() => setOpenNav(false)} to={'/contact'} className='cursor=pointer text-black'><li>Contact</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default ResponsiveMenu 
