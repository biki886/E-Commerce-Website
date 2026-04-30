import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";
import EditProductAdmin from '../components/EditProductAdmin'

const ProductAdmin = () => {
  const [productData,setProductData] = useState([])
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
              limit : 12,
              search : search 
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setTotalPageCount(responseData.totalNoPage)
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[page])

  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }
  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(()=>{
    let flag = true 

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300);

    return ()=>{
      clearTimeout(interval)
    }
  },[search])
  
  return (
    <section className='bg-slate-100 min-h-screen rounded-2xl overflow-hidden border border-slate-200 shadow-xl'>
        <div className='p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-md flex items-center justify-between gap-4 border-b border-orange-500/30'>
                <h2 className='font-bold text-white text-lg'>Product</h2>
                <div className='h-full min-w-24 max-w-72 w-full ml-auto bg-white/10 px-4 flex items-center gap-3 py-2 rounded-xl border border-slate-600 text-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20'>
                  <IoSearchOutline size={25} className='text-orange-400'/>
                  <input
                    type='text'
                    placeholder='Search product here ...' 
                    className='h-full w-full outline-none bg-transparent placeholder:text-slate-400 text-white'
                    value={search}
                    onChange={handleOnChange}
                  />
                </div>
        </div>
        {
          loading && (
            <Loading/>
          )
        }


        <div className='p-4 bg-slate-100'>


            <div className='min-h-[55vh]'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {
                  productData.map((p,index)=>{
                    return(
                      <ProductCardAdmin data={p} fetchProductData={fetchProductData}  />
                    )
                  })
                }
              </div>
            </div>
            
            <div className='flex justify-between my-4 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md'>
              <button onClick={handlePrevious} className="border-r border-slate-300 px-4 py-2 hover:bg-orange-500 hover:text-white font-semibold text-slate-700 transition-all duration-300">Previous</button>
              <button className='w-full bg-slate-50 font-bold text-slate-700'>{page}/{totalPageCount}</button>
              <button onClick={handleNext} className="border-l border-slate-300 px-4 py-2 hover:bg-orange-500 hover:text-white font-semibold text-slate-700 transition-all duration-300">Next</button>
            </div>

        </div>
          

      
    </section>
  )
}

export default ProductAdmin