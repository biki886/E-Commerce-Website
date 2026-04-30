import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import CofirmBox from './CofirmBox'
import { IoClose } from 'react-icons/io5'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen,setEditOpen]= useState(false)
  const [openDelete,setOpenDelete] = useState(false)

  const handleDeleteCancel  = ()=>{
      setOpenDelete(false)
  }

  const handleDelete = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data : {
          _id : data._id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
          setOpenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
  <div className='w-40 p-3 bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300'>
      <div className='h-32 bg-slate-100 rounded-xl p-2 flex items-center justify-center'>
          <img
             src={data?.image[0]}  
             alt={data?.name}
             className='w-full h-full object-scale-down'
          />
      </div>

      <p className='text-ellipsis line-clamp-2 font-semibold text-slate-800 mt-2 text-sm'>
        {data?.name}
      </p>

      <p className='text-slate-400 text-sm'>{data?.unit}</p>

      <div className='grid grid-cols-2 gap-2 py-3'>
        <button 
          onClick={()=>setEditOpen(true)} 
          className='px-2 py-2 text-sm bg-amber-100 text-amber-700 hover:bg-amber-600 hover:text-white rounded-xl font-semibold transition-all'
        >
          Edit
        </button>

        <button 
          onClick={()=>setOpenDelete(true)} 
          className='px-2 py-2 text-sm bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-semibold transition-all'
        >
          Delete
        </button>
      </div>

      {
        editOpen && (
          <EditProductAdmin fetchProductData={fetchProductData} data={data} close={()=>setEditOpen(false)}/>
        )
      }

      {
        openDelete && (
          <section className='fixed top-0 left-0 right-0 bottom-0 bg-black z-50 bg-opacity-70 p-4 flex justify-center items-center'>
              <div className='bg-white p-5 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200'>
                  <div className='flex items-center justify-between gap-4 border-b border-slate-200 pb-3'>
                      <h3 className='font-bold text-slate-800 text-lg'>Permanent Delete</h3>
                      <button onClick={()=>setOpenDelete(false)} className='hover:text-red-500 bg-slate-100 p-1 rounded-full transition'>
                        <IoClose size={25}/>
                      </button>
                  </div>

                  <p className='my-5 text-slate-600 text-sm'>
                    Are you sure you want to permanently delete this product?
                  </p>

                  <div className='flex justify-end gap-3 py-2'>
                    <button 
                      onClick={handleDeleteCancel} 
                      className='px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 transition-all'
                    >
                      Cancel
                    </button>

                    <button 
                      onClick={handleDelete} 
                      className='px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all'
                    >
                      Delete
                    </button>
                  </div>
              </div>
          </section>
        )
      }
  </div>
)
}

export default ProductCardAdmin
