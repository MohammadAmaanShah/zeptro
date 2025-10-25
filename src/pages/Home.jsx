import React from 'react'
import Carousel from '../components/carousel'
import Category from '../components/Category'
import MidBanner from '../components/MidBanner'
import Feature from '../components/Feature'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Carousel />
      <Category />
      <MidBanner />
      <Feature />
    </div>
  )
}

export default Home
