import React, { useContext, useEffect } from 'react'
import { getData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Category from './Category';
import MidBanner from './MidBanner';
import Feature from './Feature';
import { useNavigate } from 'react-router-dom';
import Loading from '../assets/Loading4.webm'




const Carousel = () => {

    const { data, fetchAllProducts } = getData()
    const navigate = useNavigate()

    console.log(data)

    useEffect(() => {
        fetchAllProducts();

    }, [])

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;

        return (

            <div className={`arrow ${className}`} onClick={onClick} style={{ zIndex: 3 }}>
                <AiOutlineArrowLeft className='arrows ' style={{ ...style, display: 'block', borderRadius: '50px', color: 'white', position: 'absolute', padding: '2px', left: '50px', background: '#f53347' }} onMouseOver='this.style.backgroundColor= #555' />
            </div>
        )

    }
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;

        return (
            <div className={`arrow ${className}`} onClick={onClick} style={{ zIndex: 3 }}>
                <AiOutlineArrowRight className='arrows ' style={{ ...style, display: 'block', borderRadius: '50px', color: 'white', position: 'absolute', padding: '2px', right: '50px', background: '#f53347' }} onMouseOver='this.style.backgroundColor = #555' />
            </div>
        )

    }
    var settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow to='next' />,
        prevArrow: <SamplePrevArrow to='prev' />,
    };

    return (
        <>
            <Slider {...settings}>
                {
                    data ? (
                        data?.slice(0, 7)?.map((item, index) => {
                            return <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10 '>
                                <div className='flex  md:flex-row flex-col gap-10 justify-center items-center px-4 min-h-[470px] py-7'>
                                    <div className='space-y-6'>
                                        <h3 className='font-sans text-red-500 text-sm font-semibold'>Powring Your World with the best ...</h3>
                                        <h1 className='text-4xl font-bold line-clamp-3 uppercase md:w-[400px] text-white'>{item.title}</h1>
                                        <p className='md:w-[400px] text-gray-500 line-clamp-5 pr-7 '>{item.description}</p>
                                        <button className='bg-gradient-to-r from-purple-500 to-red-500 py-3 px-5 cursor-pointer mt-2 rounded-md'>Shop Now </button>
                                    </div>
                                    <div>
                                        <img onClick={() => navigate(`/products/${item.id}`)} src={item.images} alt={item.title} className='hover:scale-105 transition-all shadow-2xl shadow-red-500  w-100 rounded-full md:w-sm     ' />
                                    </div>
                                </div>
                            </div>
                        })
                    ) :
                        (
                            <div>
                                <div className='  flex w-screen items-center justify-center min-h-[400px]'>
                                    <video loop muted autoPlay>
                                        <source src={Loading} type='video/webm' />
                                    </video>
                                </div>
                            </div>
                        )
                }


            </Slider>

        </>

    )
}

export default Carousel
