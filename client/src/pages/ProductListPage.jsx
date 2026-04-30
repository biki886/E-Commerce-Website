import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  console.log(AllSubCategory)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
  <section className='sticky top-24 lg:top-20 bg-slate-100'>
    <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr] gap-3'>

      {/**sub category **/}
      <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-2 shadow-xl scrollbarCustom bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-3 rounded-xl border border-slate-700'>
        {
          DisplaySubCatory.map((s, index) => {
             const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b border-slate-700
                hover:bg-orange-500/20 cursor-pointer transition-all duration-300
                ${subCategoryId === s._id ? "bg-orange-500/20 border-l-4 border-l-orange-500" : ""}
              `}
              >
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded-xl box-border p-1 shadow-md' >
                  <img
                    src={s.image}
                    alt='subCategory'
                    className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                  />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base text-white font-medium'>{s.name}</p>
              </Link>
            )
          })
        }
      </div>


      {/**Product **/}
      <div className='sticky top-20 rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white'>
        <div className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-md p-4 z-10 border-b border-orange-500/30'>
          <h3 className='font-bold text-white text-lg'>{subCategoryName}</h3>
        </div>
        <div>

         <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative bg-slate-100'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
              {
                data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  )
                })
              }
            </div>
         </div>

          {
            loading && (
              <Loading />
            )
          }

        </div>
      </div>
    </div>
  </section>
)
}

export default ProductListPage
