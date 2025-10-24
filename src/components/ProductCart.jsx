import React from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCart = ({ product }) => {

    const navigator = useNavigate();
    const { addToCart } = useCart();

    return (
        <div className='border h-max cursor-pointer border-gray-100 relative rounded-2xl  hover:shadow-2xl '>
            <img src={product.images} alt="img" className='bg-gray-100 aspect-square' onClick={() => navigator(`/products/${product.id}`)} />
            <h1 className='line-clamp-1 font-semibold p-1'>{product.title}</h1>
            <p className='my-1 text-lg text-gray-800 font-bold'>{product.price}</p>
            <button onClick={() => addToCart(product)} className='flex items-center justify-center rounded-md bg-rose-500 font-bold w-full gap-10 cursor-pointer text-lg py-2 hover:bg-red-600 hover:scale-101 hover:text-white '><IoCartOutline className='h-6 w-6 ' /></button>

        </div>
    )
}

export default ProductCart
