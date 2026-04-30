import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()
    
    console.log("location",)  
  return (
  <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 px-2'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col justify-center items-center gap-5'>

          <div className='w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl font-bold'>
              ✓
          </div>

          <p className='text-green-600 font-bold text-xl text-center'>
              {Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully
          </p>

          <p className='text-slate-600 text-center text-sm'>
              Your request has been completed successfully.
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

export default Success
