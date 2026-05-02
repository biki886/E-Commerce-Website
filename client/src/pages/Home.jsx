import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => c._id == id)
        return filterData ? true : null
      })

      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      navigate(url)
  }

  return (
   <section className='bg-gray-50 min-h-screen'>

     
      <div className='container mx-auto px-3 pt-3'>
          <div className='rounded-xl overflow-hidden shadow-md'>
              <img
                src={banner}
                className='w-full h-[180px] md:h-[260px] hidden lg:block object-cover'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-[140px] lg:hidden object-cover'
                alt='banner' 
              />
          </div>
      </div>

    
      <div className='container mx-auto px-3 py-4 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3'>
          {
            loadingCategory ? (
              new Array(10).fill(null).map((_,index)=>(
                <div key={index} className='bg-white p-3 rounded-xl shadow-sm animate-pulse'>
                  <div className='bg-gray-200 h-12 rounded'></div>
                </div>
              ))
            ) : (
              categoryData.map((cat)=>(
                <div
                  key={cat._id}
                  onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}
                  className='cursor-pointer group'
                >
                  <div className='bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-center h-20'>
                      <img 
                        src={cat.image}
                        className='h-10 object-contain group-hover:scale-110 transition'
                        alt={cat.name}
                      />
                  </div>
                </div>
              ))
            )
          }
      </div>

    
      <div className='bg-white py-2'>
        {
          categoryData?.map((c)=>(
            <CategoryWiseProductDisplay 
              key={c._id} 
              id={c._id} 
              name={c.name}
            />
          ))
        }
      </div>

   </section>
  )
}

export default Home
