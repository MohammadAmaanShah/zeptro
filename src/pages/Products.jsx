import React, { useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection';
import { useEffect } from 'react';
import Loading from '../assets/Loading4.webm'
import ProductCart from '../components/ProductCart';
import Pagination from '../components/Pagination';
import Lottie from 'lottie-react';
import notfound from '../assets/notFound.json'
import MobileFilter from '../components/MobileFilter';
const Products = () => {

  const { data, fetchAllProducts } = getData();
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)
  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, [])
  const handleCategoryChange = (e) => {

    setCategory(e.target.value);
    setPage(1)
    setOpenFilter(false)

  }
  const handleBrandChange = (e) => {

    setBrand(e.target.value);
    setPage(1)


  }
  const filterData = data?.filter((item) => {

    return (item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] && item.price <= priceRange[1]

    )
  })


  const dynamicPage = Math.ceil(filterData?.length / 8);

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0);
  }




  return (
    <div>
      <div className='mb-10 max-w-5xl px-4 mx-auto'>
        <MobileFilter search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} openFilter={openFilter} setOpenFilter={setOpenFilter} />
        {
          data?.length > 0 ? (
            <>
              <div className='flex gap-3 '>
                <FilterSection search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} category={category} setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} />

                {
                  filterData.length > 0 ? (
                    <div className='flex flex-col justify-between items-center min-h-[500px]'>
                      <div className='grid  grid-cols-2 md:grid-cols-4 gap-5 mt-10'>

                        {
                          filterData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCart key={index} product={product} />
                          })
                        }

                      </div>
                      <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                    </div>
                  ) : (
                    <div className='flex justify-center items-center mt-10 md:h-[500px] md:w-[800px] ' >
                      <Lottie animationData={notfound} classID='w-[500px]' />

                    </div>

                  )
                }


              </div>



            </>
          ) :
            (
              <div className='flex mx-w-[600px] items-center justify-center min-h-[400px]'>
                <video loop muted autoPlay>
                  <source src={Loading} type='video/webm' />
                </video>
              </div>
            )
        }

      </div>
    </div>
  )
}

export default Products
