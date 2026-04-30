import React from 'react'
import { IoClose } from "react-icons/io5";

const CofirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-black bg-opacity-70 p-4 flex justify-center items-center'>
      
      <div className='bg-white w-full max-w-md p-5 rounded-2xl shadow-2xl border border-slate-200'>
           
           <div className='flex justify-between items-center gap-3 border-b border-slate-200 pb-3'>
                <h1 className='font-bold text-slate-800 text-lg'>Permanent Delete</h1>
                <button onClick={close} className='hover:text-red-500 bg-slate-100 p-1 rounded-full transition'>
                    <IoClose size={25} />
                </button>
           </div>

           <p className='my-5 text-slate-600 text-sm'>
                Are you sure you want to permanently delete this item?
           </p>

           <div className='w-fit ml-auto flex items-center gap-3'>
                <button 
                  onClick={cancel} 
                  className='px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-200 transition-all'
                >
                  Cancel
                </button>

                <button 
                  onClick={confirm} 
                  className='px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold shadow-md transition-all'
                >
                  Confirm
                </button>
           </div>

      </div>
    </div>
  )
}

export default CofirmBox