import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const [loading,setLoading] = useState(false)
  
  return (
    <Link to={url} className='border border-slate-200 py-3 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded-2xl cursor-pointer bg-white shadow-md hover:shadow-xl hover:border-orange-400 hover:-translate-y-1 transition-all duration-300' >
      <div className='min-h-24 w-full max-h-28 lg:max-h-36 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center'>
            <img 
                src={data.image[0]}
                className='w-full h-full object-scale-down lg:scale-110 hover:scale-125 transition-transform duration-300'
            />
      </div>

      <div className='flex items-center gap-1 flex-wrap px-2 lg:px-0'>
        <div className='rounded-full text-xs w-fit px-2 py-[2px] text-orange-600 bg-orange-100 font-semibold'>
              10 min 
        </div>
        <div>
            {
              Boolean(data.discount) && (
                <p className='text-green-600 bg-green-100 px-2 py-[2px] w-fit text-xs rounded-full font-semibold'>{data.discount}% discount</p>
              )
            }
        </div>
      </div>

      <div className='px-2 lg:px-0 font-semibold text-slate-800 text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>

      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base text-slate-500'>
        {data.unit} 
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-2 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-bold text-slate-900'>
              {DisplayPriceInRupees(pricewithDiscount(data.price,data.discount))} 
          </div>
        </div>

        <div>
          {
            data.stock == 0 ? (
              <p className='text-red-500 text-sm text-center font-semibold'>Out of stock</p>
            ) : (
              <AddToCartButton data={data} />
            )
          }
        </div>
      </div>

    </Link>
  )
}

export default CardProduct