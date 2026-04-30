import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({close,value,onChange,submit}) => {
  return (
   <section className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4'>
        <div className='bg-white rounded-2xl p-5 w-full max-w-md shadow-2xl border border-slate-200'>
            
            <div className='flex items-center justify-between gap-3 border-b border-slate-200 pb-3'>
                <h1 className='font-bold text-slate-800 text-lg'>Add Field</h1>
                <button onClick={close} className='hover:text-red-500 bg-slate-100 p-1 rounded-full transition'>
                    <IoClose size={25}/>
                </button>
            </div>

            <input
                 className='bg-slate-100 my-4 p-3 border border-slate-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl w-full'
                 placeholder='Enter field name'
                 value={value}
                 onChange={onChange}
            />

            <button
                onClick={submit}
                className='bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white px-5 py-2 rounded-xl mx-auto w-fit block font-semibold shadow-lg transition-all duration-300'
            >
                Add Field
            </button>
        </div>
   </section>
  )
}

export default AddFieldComponent