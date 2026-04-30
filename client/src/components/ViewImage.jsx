import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
  return (
  <div className='fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4'>
      <div className='w-full max-w-md max-h-[85vh] p-4 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col'>
          
          <button 
            onClick={close} 
            className='w-fit ml-auto block text-slate-700 hover:text-red-500 bg-slate-100 p-1 rounded-full transition'
          >
              <IoClose size={24}/>
          </button>

          <div className='flex-1 flex items-center justify-center'>
              <img 
                  src={url}
                  alt='full screen'
                  className='w-full h-full object-contain rounded-lg'
              />
          </div>
      </div>
  </div>
)
}

export default ViewImage
