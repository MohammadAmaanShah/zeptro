import React from 'react'
import { getData } from '../context/DataContext'

const FilterSection = ({ search, setSearch, brand, setBrand, category, setCategory, priceRange, setPriceRange, handleCategoryChange, handleBrandChange }) => {

    const { catagoryOnlyData, brandOnlyData } = getData();
    return (
        <div className='bg-gray-100  rounded-md mt-10 p-4 h-max md:block hidden'>
            <input id='gray' type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search. . . '
                className=' text-gray-400 font-semibold  rounded-md border-2 border-gray-400  p-2 '
            />
            <h1 className='font-semibold text-xl mt-5  '>Category</h1>
            <div className='flex flex-col gap-1.5 mt-10'>
                {
                    catagoryOnlyData?.map((item, index) => {
                        return <div key={index} className='flex gap-2'>

                            <input type="checkbox"
                                name={item}
                                checked={category === item}
                                value={item}
                                onChange={handleCategoryChange}
                            />
                            <button className='cursor-pointer uppercase font-semibold' >{item}</button>

                        </div>
                    })

                }
            </div>
            <h1 className='font-semibold text-xl mt-5 mb-3  '>Brand</h1>
            <select name="" id=""
                className='rounded-sm border-2 border-gray-400 w-full  bg-white'
                value={brand}
                onChange={handleBrandChange}
            >
                {
                    brandOnlyData?.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })
                }
            </select>
            <h1 className='font-semibold mb-3 mt-3 text-xl '>Price Range</h1>
            <div className='flex flex-col gap-3 '>
                <label htmlFor=""> Price Range ${priceRange[0]} - ${priceRange[1]}</label>
                <input type="range" min="0" max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} />
            </div>
            <button
                onClick={() => {
                    setPriceRange([0, 5000]),
                        setSearch(''), setCategory('All'), setBrand('All')
                }}
                className='bg-red-500 rounded-md py-1 px-3 mt-3 hover:bg-red-600 text-white font-semibold cursor-pointer  '>
                Reset Filter
            </button>
        </div>
    )
}

export default FilterSection;
