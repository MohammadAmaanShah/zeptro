import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrums = ({ title }) => {

    const navigator = useNavigate();
    return (
        <>
            <div className='mx-auto my-10 max-w-6xl'>

                <h1 className='text-xl font-bold text-gray-600 '> <span onClick={() => navigator('/')} className='cursor-pointer'>Home</span> / <span className='cursor-pointer' onClick={() => navigator('/products')}>Products</span> / <span>{title}</span></h1>
            </div>
        </>
    )
}

export default Breadcrums;
