import React from 'react'
import { getData } from '../context/DataContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {

    const { catagoryOnlyData } = getData();
    const navigate = useNavigate();


    console.log(catagoryOnlyData);
    return (
        <div className='bg-[#101829]'>
            <div className=' max-w-7xl  flex md:justify-around  flex-wrap items-center justify-center py-5 px-4 gap-10 mx-auto '>

                {
                    catagoryOnlyData?.map((item, index) => {
                        return <div key={index}>
                            <button onClick={() => navigate(`/category/${item}`)} className=' bg-linear-to-r from-[red] to-[purple] text-white shadow-2xl px-5 py-2 rounded-md cursor-pointer'>{item}</button>

                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default Category



