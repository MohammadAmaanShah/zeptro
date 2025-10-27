import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import About from './pages/About'
import Navbar from './components/Navbar'
import axios from 'axios'
import Fotter from './components/Fotter'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const [location, setLocation] = useState();

  const [openDropDown, setOpenDropDown] = useState(false);
  const { cartItems, setCartItems } = useCart();

  const getLocation = async () => {

    navigator.geolocation.getCurrentPosition(async pos => {

      const { latitude, longitude } = pos.coords;



      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {

        let location = await axios.get(url)
        const exactLoaction = location.data.address;

        setLocation(exactLoaction);
        setOpenDropDown(false)
      } catch (error) {
        console.log(error)

      }
    })


  }

  useEffect(() => {
    getLocation();
  }, [])
  console.log(cartItems)
  useEffect(() => {

    const storedCart = JSON.parse(localStorage.getItem('cartItem'));
    if (storedCart) {
      setCartItems(storedCart);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItems));
  }, [cartItems]);




  return (
    <>

      <BrowserRouter>
        <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/products/:id' element={<SingleProduct />}></Route>
          <Route path={`/category/:category`} element={<CategoryProduct />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/cart' element={<Cart location={location} getLocation={getLocation} />}></Route>


        </Routes>

        <Fotter />

      </BrowserRouter >
    </>
  )
}

export default App
