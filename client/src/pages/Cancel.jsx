import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 px-2'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col justify-center items-center gap-5'>

            <div className='w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl font-bold'>
                ✕
            </div>

            <p className='text-red-600 font-bold text-xl text-center'>Order Cancelled</p>
            <p className='text-slate-600 text-center text-sm'>
                Your order was not completed. You can try again anytime.
            </p>

            <Link 
                to="/" 
                className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold shadow-lg transition-all duration-300"
            >
                Go To Home
            </Link>
        </div>
    </div>
  )
}

export default Cancel