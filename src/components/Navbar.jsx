import { MapPin } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { IoCaretUpOutline, IoCartOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignInButton, SignOutButton, SignedOut, UserButton } from '@clerk/clerk-react';
import { CgClose } from 'react-icons/cg';
import { useCart } from '../context/CartContext';
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi';
import ResponsiveMenu from './ResponsiveMenu ';
import { useUser } from '@clerk/clerk-react';
const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {


    const { cartItems, addToCart } = useCart();
    const [openNav, setOpenNav] = useState(false)
    const user = useUser()



    return (

        <div className='bg-white py-3 shadow-2xl sticky top-0 z-20 px-4'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
                {/* logo  */}
                <div className='flex gap-2 md:gap-7 items-center'>
                    <Link to={'/'}><h1 className='font-bold  md:text-3xl'><span className='text-red-500 font-serif'>Z</span>aptro</h1></Link>
                    <div className='flex gap-1 cursor-pointer text-gray-700 items-center md:text:md text-xs'>
                        <MapPin className='text-red-500' />
                        <span className='font-semibold  '>{location ? <div className='-space-y-2'><p className='mb-0.5'>{location.city}</p><p>{location.state}</p></div> : "Add Address"}</span>
                        <FaCaretDown onClick={() => { setOpenDropDown(true) }} />
                    </div>

                    {
                        openDropDown ? <div className='md:h-[100px] z-10 w-max shadow-2xl rounded-md bg-white fixed md:top-16  top-13 md:left-60  left-10  md:p-5 p-2 '><h1 className='font-semibold mb-2 flex justify-between md:text-xl    '>Change location <span className='ml-7' ><CgClose onClick={() => { setOpenDropDown(false) }} /></span></h1>
                            <button onClick={getLocation} className='bg-red-500 px-3 py-1 rounded-md  text-white text-sm  text-md font-semibold hover:bg-red-600'>Detect My Location</button>
                        </div> : null

                    }

                </div>


                {/* menu section  */}

                <nav className='flex gap-7 items-center'>
                    <ul className='md:flex hidden items-center text-xl font-semibold gap-7'>
                        <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : 'text-black'}`} ><li>Home</li></NavLink>
                        <NavLink to={'/products'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : 'text-black'}`} ><li>Products</li></NavLink>
                        <NavLink to={'/about'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : 'text-black'}`} ><li>About</li></NavLink>
                        <NavLink to={'/contact'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : 'text-black'}`}><li>Contact</li></NavLink>
                    </ul>
                    <Link to={'/cart'} className=' relative'>
                        <IoCartOutline className='h-7 w-7  ' />
                        <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{user?.user?.firstName ? cartItems.length : 0}</span></Link>
                    <div className='md:block hidden'> <SignedOut >
                        <SignInButton className='bg-red-500 rounded-md px-3 py-1 text-white font-semibold  cursor-pointer' />
                    </SignedOut>
                        <SignedIn className='bg-red-500 rounded-md py-1 px-3 text-white  cursor-pointer '>
                            <UserButton />
                        </SignedIn></div>
                    {
                        openNav ? <HiMenuAlt3 onClick={() => setOpenNav(false)} className='w-6 h-6 md:hidden ' /> : <HiMenuAlt1 onClick={() => setOpenNav(true)} className='w-6 h-6 md:hidden ' />
                    }
                </nav>
            </div>
            <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
        </div>

    )
}

export default Navbar;
