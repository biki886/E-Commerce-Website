import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useGlobalContext } from '../provider/GlobalProvider'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  const { fetchOrder } = useGlobalContext()

  const handleCancelOrder = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.cancelOrder,
        data : {
          orderId : id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchOrder){
          fetchOrder()
        }
      }

      if(responseData.error){
        toast.error(responseData.message)
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className='bg-slate-100 min-h-screen rounded-2xl overflow-hidden border border-slate-200 shadow-xl'>
      <div className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-md p-4 font-semibold border-b border-orange-500/30'>
        <h1 className='text-white text-lg font-bold'>Order</h1>
      </div>

      {
        !orders[0] && (
          <NoData/>
        )
      }

      <div className='p-4 grid gap-4'>
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded-xl p-4 text-sm bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300'>
                  
                  <div className='flex justify-between gap-3 mb-3'>
                    <p className='text-slate-500'>
                      Order No : <span className='font-semibold text-slate-800'>{order?.orderId}</span>
                    </p>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order?.order_status === "CANCELLED"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                    }`}>
                      {order?.order_status || "PLACED"}
                    </span>
                  </div>

                  <div className='flex gap-3 items-center'>
                    <div className='w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 p-2 flex items-center justify-center'>
                      <img
                        src={order.product_details.image[0]} 
                        className='w-full h-full object-scale-down'
                      />  
                    </div>

                    <div className='w-full'>
                      <p className='font-semibold text-slate-800'>{order.product_details.name}</p>
                    </div>
                  </div>

                  {
                    order?.order_status !== "CANCELLED" && (
                      <div className='flex justify-end mt-4'>
                        <button
                          onClick={()=>handleCancelOrder(order._id)}
                          className='px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white font-semibold transition-all duration-300'
                        >
                          Cancel Order
                        </button>
                      </div>
                    )
                  }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders