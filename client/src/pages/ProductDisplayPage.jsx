import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight,FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data,setData] = useState({
    name : "",
    image : []
  })
  const [image,setImage] = useState(0)
  const [loading,setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async()=>{
    try {
        const response = await Axios({
          ...SummaryApi.getProductDetails,
          data : {
            productId : productId 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])
  
  const handleScrollRight = ()=>{
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = ()=>{
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data",data)
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 gap-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 min-h-screen'>

    {/* LEFT SIDE */}
    <div>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded-2xl shadow-xl border border-slate-200 min-h-56 max-h-56 h-full w-full overflow-hidden'>
            <img
                src={data.image[image]}
                className='w-full h-full object-contain p-4'
            /> 
        </div>

        {/* dots */}
        <div className='flex items-center justify-center gap-3 my-3'>
          {
            data.image.map((img,index)=>{
              return(
                <div key={img+index+"point"} className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all ${index === image ? "bg-orange-500 scale-110" : "bg-slate-300"}`}></div>
              )
            })
          }
        </div>

        {/* thumbnails */}
        <div className='grid relative'>
            <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
                  {
                    data.image.map((img,index)=>{
                      return(
                        <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer rounded-xl border border-slate-200 bg-white shadow-md hover:border-orange-500 transition-all p-2' key={img+index}>
                          <img
                              src={img}
                              alt='min-product'
                              onClick={()=>setImage(index)}
                              className='w-full h-full object-contain' 
                          />
                        </div>
                      )
                    })
                  }
            </div>

            {/* arrows */}
            <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'>
                <button onClick={handleScrollLeft} className='z-10 bg-white p-2 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition'>
                    <FaAngleLeft/>
                </button>
                <button onClick={handleScrollRight} className='z-10 bg-white p-2 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition'>
                    <FaAngleRight/>
                </button>
            </div>
        </div>

        {/* DESKTOP DETAILS */}
        <div className='my-4 hidden lg:grid gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow'>
            <div>
                <p className='font-semibold text-slate-800'>Description</p>
                <p className='text-slate-600'>{data.description}</p>
            </div>

            <div>
                <p className='font-semibold text-slate-800'>Unit</p>
                <p className='text-slate-600'>{data.unit}</p>
            </div>

            {
              data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                return(
                  <div key={index}>
                      <p className='font-semibold text-slate-800'>{element}</p>
                      <p className='text-slate-600'>{data?.more_details[element]}</p>
                  </div>
                )
              })
            }
        </div>
    </div>


    {/* RIGHT SIDE */}
    <div className='p-4 lg:pl-7 text-base lg:text-lg bg-white/95 rounded-2xl shadow-xl border border-slate-200'>
        
        <p className='bg-orange-100 text-orange-600 w-fit px-3 py-1 rounded-full font-semibold'>10 Min</p>

        <h2 className='text-xl font-bold lg:text-3xl text-slate-800 mt-2'>{data.name}</h2>  
        <p className='text-slate-500'>{data.unit}</p> 

        <Divider/>

        {/* PRICE */}
        <div>
          <p className='text-slate-600'>Price</p> 
          <div className='flex items-center gap-3 mt-2 flex-wrap'>
            <div className='border border-orange-500 px-4 py-2 rounded-xl bg-orange-50'>
                <p className='font-bold text-lg lg:text-xl text-orange-600'>
                  {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))}
                </p>
            </div>

            {
              data.discount && (
                <p className='line-through text-slate-400'>{DisplayPriceInRupees(data.price)}</p>
              )
            }

            {
              data.discount && (
                <p className="font-bold text-green-600 lg:text-xl">
                  {data.discount}% <span className='text-sm text-neutral-500'>OFF</span>
                </p>
              )
            }
          </div>
        </div> 
        
        {/* STOCK */}
        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-3 font-semibold'>Out of Stock</p>
          ) 
          : (
            <div className='my-4'>
              <AddToCartButton data={data}/>
            </div>
          )
        }

        {/* FEATURES */}
        <h2 className='font-bold text-slate-800 mt-4'>Why shop from SpareExpress?</h2>

        <div className='mt-2'>
              <div className='flex items-center gap-4 my-4'>
                  <img src={image1} className='w-16 h-16'/>
                  <div className='text-sm'>
                    <div className='font-semibold text-slate-800'>Superfast Delivery</div>
                    <p className='text-slate-500'>Lightning-fast delivery at your doorstep.</p>
                  </div>
              </div>

              <div className='flex items-center gap-4 my-4'>
                  <img src={image2} className='w-16 h-16'/>
                  <div className='text-sm'>
                    <div className='font-semibold text-slate-800'>Best Prices</div>
                    <p className='text-slate-500'>Top deals directly from manufacturers.</p>
                  </div>
              </div>

              <div className='flex items-center gap-4 my-4'>
                  <img src={image3} className='w-16 h-16'/>
                  <div className='text-sm'>
                    <div className='font-semibold text-slate-800'>Wide Range</div>
                    <p className='text-slate-500'>Thousands of spare parts & accessories.</p>
                  </div>
              </div>
        </div>

        {/* MOBILE DETAILS */}
        <div className='my-4 grid gap-3'>
            <div>
                <p className='font-semibold text-slate-800'>Description</p>
                <p className='text-slate-600'>{data.description}</p>
            </div>

            <div>
                <p className='font-semibold text-slate-800'>Unit</p>
                <p className='text-slate-600'>{data.unit}</p>
            </div>

            {
              data?.more_details && Object.keys(data?.more_details).map((element,index)=>{
                return(
                  <div key={index}>
                      <p className='font-semibold text-slate-800'>{element}</p>
                      <p className='text-slate-600'>{data?.more_details[element]}</p>
                  </div>
                )
              })
            }
        </div>
    </div>
</section>
  )
}

export default ProductDisplayPage
