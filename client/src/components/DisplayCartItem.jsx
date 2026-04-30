import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }
  return (
   <section className='bg-black fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
    <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto shadow-2xl border-l border-slate-200'>

        {/* HEADER */}
        <div className='flex items-center p-4 shadow-md gap-3 justify-between bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 border-b border-orange-500/30'>
            <h2 className='font-bold text-white text-lg'>Cart</h2>

            <Link to={"/"} className='lg:hidden text-white hover:text-orange-400'>
                <IoClose size={25}/>
            </Link>

            <button onClick={close} className='hidden lg:block text-white hover:text-orange-400'>
                <IoClose size={25}/>
            </button>
        </div>

        {/* BODY */}
        <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-slate-100 p-3 flex flex-col gap-4'>

            {
                cartItem[0] ? (
                    <>
                        {/* SAVINGS */}
                        <div className='flex items-center justify-between px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-semibold text-sm'>
                            <p>Your total savings</p>
                            <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
                        </div>

                        {/* ITEMS */}
                        <div className='bg-white rounded-xl p-4 grid gap-5 overflow-auto shadow-md border border-slate-200'>
                            {
                                cartItem.map((item,index)=>(
                                    <div key={item?._id+"cartItemDisplay"} className='flex w-full gap-4 items-center'>

                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-slate-100 border rounded-xl p-1 flex items-center justify-center'>
                                            <img
                                                src={item?.productId?.image[0]}
                                                className='object-contain w-full h-full'
                                            />
                                        </div>

                                        <div className='w-full text-xs'>
                                            <p className='text-slate-800 font-semibold line-clamp-2'>{item?.productId?.name}</p>
                                            <p className='text-slate-400'>{item?.productId?.unit}</p>
                                            <p className='font-bold text-orange-600'>
                                                {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}
                                            </p>
                                        </div>

                                        <div>
                                            <AddToCartButton data={item?.productId}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* BILL */}
                        <div className='bg-white p-4 rounded-xl shadow border border-slate-200'>
                            <h3 className='font-bold text-slate-800 mb-2'>Bill details</h3>

                            <div className='flex justify-between text-sm text-slate-600'>
                                <p>Items total</p>
                                <p className='flex gap-2'>
                                    <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                    <span className='font-semibold text-slate-800'>{DisplayPriceInRupees(totalPrice)}</span>
                                </p>
                            </div>

                            <div className='flex justify-between text-sm text-slate-600'>
                                <p>Quantity total</p>
                                <p>{totalQty} item</p>
                            </div>

                            <div className='flex justify-between text-sm text-slate-600'>
                                <p>Delivery Charge</p>
                                <p className='text-green-600 font-semibold'>Free</p>
                            </div>

                            <div className='flex justify-between font-bold mt-2 text-slate-800'>
                                <p>Grand total</p>
                                <p className='text-orange-600'>{DisplayPriceInRupees(totalPrice)}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='bg-white flex flex-col justify-center items-center rounded-xl p-4 shadow border border-slate-200'>
                        <img
                            src={imageEmpty}
                            className='w-full max-w-xs object-contain'
                        />
                        <Link onClick={close} to={"/"} className='mt-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 px-5 py-2 text-white rounded-xl font-semibold shadow'>
                            Shop Now
                        </Link>
                    </div>
                )
            }
        </div>

        {/* FOOTER */}
        {
            cartItem[0] && (
                <div className='p-3 border-t border-slate-200 bg-white'>
                    <div className='bg-gradient-to-r from-orange-600 to-amber-500 text-white px-4 font-bold text-base py-3 rounded-xl flex items-center justify-between shadow-lg'>
                        <div>
                            {DisplayPriceInRupees(totalPrice)}
                        </div>
                        <button onClick={redirectToCheckoutPage} className='flex items-center gap-2'>
                            Proceed
                            <FaCaretRight/>
                        </button>
                    </div>
                </div>
            )
        }

    </div>
</section>
  )
}

export default DisplayCartItem
