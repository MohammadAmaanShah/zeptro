import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData } from '../context/DataContext';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

const CategoryProduct = () => {

  const params = useParams();
  const category = params.category;
  const { data, } = getData();
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [])



  return (
    <div className='flex flex-col gap-4 mb-10 items-center mt-10'>

      {
        data?.map((item, index) => {
          if (category == 'All' || item.category == category) {
            return <div key={index} className='h-[200px] w-6xl flex justify-between px-2 items-center    bg-gray-200 rounded-md '>
              <div className='w-4xl flex items-center gap-6 py-1 h-[200px]  '>
                <img onClick={() => navigate(`/products/${item.id}`)} src={item.images} className=' max-h-[97%] w-50 bg-white/60 rounded-md aspect-square' alt="" />
                <div className='w-xl  h-[85%] flex  items-start flex-col  justify-between '>


                  <p className='line-clamp-3 text-gray-500 font-semibold'>{item.description} </p>
                  <p className='text-xl font-bold text-red-500'>${item.price} <span className='text-black font-bold line-through '>${(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}</span> <span className='text-lg  px-3 py-1 rounded-md bg-red-500 text-white'>{item.discountPercentage}% discount</span></p>


                  <div className='flex gap-4 mt-4   '>
                    <button onClick={() => addToCart(item)} className='cursor-pointer px-3 flex items-center   bg-red-500 text-white gap-1 py-1 rounded-md  '><IoCartOutline className='w-5 h-5' /> Add to Cart</button>
                  </div>
                </div>
              </div>

            </div>

          }
        })
      }
    </div>

  )
}

export default CategoryProduct
