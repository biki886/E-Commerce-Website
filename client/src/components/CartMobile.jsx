import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

  return (
    <>
        {
            cartItem[0] && (
            <div className='sticky bottom-4 px-2 z-50'>
                <div className='bg-gradient-to-r from-orange-600 to-amber-500 px-3 py-2 rounded-xl text-white text-sm flex items-center justify-between gap-3 shadow-lg lg:hidden'>

                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-white/20 backdrop-blur-sm rounded-lg'>
                            <FaCartShopping/>
                        </div>
                        <div className='text-xs leading-4'>
                                <p className='font-semibold'>{totalQty} items</p>
                                <p className='font-bold'>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                    </div>

                    <Link to={"/cart"} className='flex items-center gap-1 font-semibold hover:gap-2 transition-all duration-300'>
                        <span className='text-sm'>View Cart</span>
                        <FaCaretRight/>
                    </Link>
                </div>
            </div>
            )
        }
    </>
    
  )
}

export default CartMobileLink