import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-6 gap-3 bg-white rounded-2xl shadow-md border border-slate-200 max-w-sm mx-auto'>
      
      <img
        src={noDataImage}
        alt='no data'
        className='w-40 opacity-90'
      />

      <p className='text-slate-500 font-medium text-sm'>
        No Data Available
      </p>

    </div>
  )
}

export default NoData