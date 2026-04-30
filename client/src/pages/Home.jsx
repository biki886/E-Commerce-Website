import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }


  return (
   <section className='bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 min-h-screen'>
      <div className='container mx-auto px-2 pt-3'>
          <div className={`w-full h-full min-h-48 bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 ${!banner && "animate-pulse my-2" } `}>
              <img
                src={banner}
                className='w-full h-full hidden lg:block object-cover'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden object-cover'
                alt='banner' 
              />
          </div>
      </div>
      
      <div className='container mx-auto px-4 py-5 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-slate-800/80 rounded-xl p-4 min-h-36 grid gap-2 shadow-lg animate-pulse border border-slate-700'>
                    <div className='bg-slate-700 min-h-24 rounded-lg'></div>
                    <div className='bg-slate-700 h-8 rounded-lg'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full cursor-pointer group' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    <div className='bg-white rounded-xl p-2 shadow-md border border-slate-200 hover:border-orange-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                        <img 
                          src={cat.image}
                          className='w-full h-full object-scale-down group-hover:scale-105 transition-transform duration-300'
                        />
                    </div>
                  </div>
                )
              })
              
            )
          }
      </div>

      {/***display category product */}
      <div className='bg-slate-100 pt-3'>
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }
      </div>



   </section>
  )
}

export default Home