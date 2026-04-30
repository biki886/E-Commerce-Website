import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async() => {
      try {
          const response = await Axios({
            ...SummaryApi.CashOnDeliveryOrder,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
          })

          const { data : responseData } = response

          if(responseData.success){
              toast.success(responseData.message)
              if(fetchCartItem){
                fetchCartItem()
              }
              if(fetchOrder){
                fetchOrder()
              }
              navigate('/success',{
                state : {
                  text : "Order"
                }
              })
          }

      } catch (error) {
        AxiosToastError(error)
      }
  }

  const handleOnlinePayment = async()=>{
    try {
        toast.loading("Loading...")
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
        const stripePromise = await loadStripe(stripePublicKey)
       
        const response = await Axios({
            ...SummaryApi.payment_url,
            data : {
              list_items : cartItemsList,
              addressId : addressList[selectAddress]?._id,
              subTotalAmt : totalPrice,
              totalAmt :  totalPrice,
            }
        })

        const { data : responseData } = response

        stripePromise.redirectToCheckout({ sessionId : responseData.id })
        
        if(fetchCartItem){
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }
    } catch (error) {
        AxiosToastError(error)
    }
  }
  return (
    <section className='bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 min-h-screen'>
  <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-6 justify-between'>

    {/* Address Section */}
    <div className='w-full'>
      <h3 className='text-lg font-bold text-white mb-2'>Choose your address</h3>

      <div className='bg-white/95 p-3 grid gap-4 rounded-xl border border-slate-200 shadow-lg'>
        {
          addressList.map((address, index) => {
            return (
              <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                <div className='border border-slate-200 rounded-xl p-4 flex gap-3 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 cursor-pointer'>
                  <div className='pt-1'>
                    <input
                      id={"address" + index}
                      type='radio'
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name='address'
                    />
                  </div>
                  <div className='text-slate-700'>
                    <p className='font-semibold text-slate-900'>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.country} - {address.pincode}</p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            )
          })
        }

        <div
          onClick={() => setOpenAddress(true)}
          className='h-16 bg-white border-2 border-dashed border-orange-400 text-orange-600 font-semibold rounded-xl flex justify-center items-center cursor-pointer hover:bg-orange-50 transition-all duration-300'
        >
          Add address
        </div>
      </div>
    </div>

    {/* Summary Section */}
    <div className='w-full max-w-md bg-white/95 py-4 px-4 rounded-xl shadow-xl border border-slate-200'>
      <h3 className='text-lg font-bold text-slate-800 mb-3'>Summary</h3>

      <div className='bg-slate-50 p-4 rounded-xl border border-slate-200'>
        <h3 className='font-semibold text-slate-700 mb-2'>Bill details</h3>

        <div className='flex gap-4 justify-between text-slate-600'>
          <p>Items total</p>
          <p className='flex items-center gap-2'>
            <span className='line-through text-neutral-400'>
              {DisplayPriceInRupees(notDiscountTotalPrice)}
            </span>
            <span className='font-semibold text-slate-800'>
              {DisplayPriceInRupees(totalPrice)}
            </span>
          </p>
        </div>

        <div className='flex gap-4 justify-between text-slate-600'>
          <p>Quantity total</p>
          <p>{totalQty} item</p>
        </div>

        <div className='flex gap-4 justify-between text-slate-600'>
          <p>Delivery Charge</p>
          <p className='text-green-600 font-semibold'>Free</p>
        </div>

        <div className='font-bold flex items-center justify-between mt-3 text-lg'>
          <p>Grand total</p>
          <p className='text-orange-600'>{DisplayPriceInRupees(totalPrice)}</p>
        </div>
      </div>

      <div className='w-full flex flex-col gap-4 mt-4'>
        <button
          className='py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300'
          onClick={handleOnlinePayment}
        >
          Online Payment
        </button>

        <button
          className='py-3 px-4 border-2 border-orange-500 font-semibold text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all duration-300'
          onClick={handleCashOnDelivery}
        >
          Cash on Delivery
        </button>
      </div>
    </div>

  </div>

  {
    openAddress && (
      <AddAddress close={() => setOpenAddress(false)} />
    )
  }
</section>
  )
}

export default CheckoutPage
