import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../components/Breadcrums ';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {

    const params = useParams();
    console.log(params.id)
    const { addToCart, setCartItems } = useCart();
    const [singleProduct, setSingleProduct] = useState("")
    const getSingleProduct = async () => {

        try {
            let res = await axios.get(`https://dummyjson.com/products/${params.id}`)
            console.log(res.data)
            const product = res.data
            setSingleProduct(product);
        } catch (error) {
            console.log(error + ' not worrking')
        }
    }

    useEffect(() => {

        getSingleProduct();
    }, [])

    return (
        <>
            {
                singleProduct ?
                    <div className=' px-4 mx-4 md:px-0  mb-5'>
                        <Breadcrums title={singleProduct.title} />
                        <div className='max-w-6xl  grid-cols-1   grid md:grid-cols-2 gap-10 mx-auto md:p-6'>
                            <img src={singleProduct.images} alt={singleProduct.title} className='w-full object-cover rounded-2xl max-h-[430px]' />
                            <div className='flex flex-col gap-6'>
                                <h1 className='font-bold  text-5xl   md:text-5xl '>{singleProduct.title}</h1>
                                <h1 className='font-bold text-gray-500 '>{singleProduct.brand?.toUpperCase()} / {singleProduct.category?.toUpperCase()} / {singleProduct.tags[1]?.toUpperCase()}</h1>
                                <p className='text-xl font-bold text-red-500'>${singleProduct.price} <span className='text-black font-bold line-through '>${(singleProduct.price / (1 - (singleProduct.discountPercentage / 100))).toFixed(2)}</span> <span className='text-lg  px-3 py-1 rounded-md bg-red-500 text-white'>{singleProduct.discountPercentage}% discount</span></p>
                                <h1 className='font-semibold text-gray-500'>{singleProduct.description}</h1>
                                <div className='flex items-center gap-4'>
                                    <label htmlFor=" " className='text-gray-700 font-medium text-sm '> Quantity:</label>
                                    <input type="number" value={1} min={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500' />

                                </div>
                                <div className='flex gap-4 mt-4  '>
                                    <button onClick={() => addToCart(singleProduct)} className='cursor-pointer px-6 flex items-center  text-lg bg-red-500 text-white gap-3 py-2 rounded-md '><IoCartOutline className='w-6 h-6' /> Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className='flex mx-w-[600px] items-center justify-center min-h-[400px]'>
                        <video loop muted autoPlay>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
            }
        </>
    )
}

export default SingleProduct
