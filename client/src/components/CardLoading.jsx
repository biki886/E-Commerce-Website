import React from 'react'

const CardLoading = () => {
  return (
    <div className='border border-slate-200 py-3 lg:p-4 grid gap-2 lg:gap-3 min-w-36 lg:min-w-52 rounded-2xl cursor-pointer bg-white shadow-md animate-pulse'>
      
      {/* Image */}
      <div className='min-h-28 bg-slate-200 rounded-xl'></div>

      {/* Title */}
      <div className='p-2 bg-slate-200 rounded-xl w-24'></div>

      {/* Description */}
      <div className='p-2 bg-slate-200 rounded-xl'></div>

      {/* Price */}
      <div className='p-2 bg-slate-200 rounded-xl w-16'></div>

      {/* Buttons */}
      <div className='flex items-center justify-between gap-3 mt-2'>
        <div className='p-2 bg-slate-200 rounded-xl w-20'></div>
        <div className='p-2 bg-slate-200 rounded-xl w-20'></div>
      </div>

    </div>
  )
}

export default CardLoading