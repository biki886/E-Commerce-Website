import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state)=> state?.user)
    const [openUserMenu,setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const { totalPrice, totalQty} = useGlobalContext()
    const [openCartSection,setOpenCartSection] = useState(false)
 
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

    const handleCloseUserMenu = ()=>{
        setOpenUserMenu(false)
    }

    const handleMobileUser = ()=>{
        if(!user._id){
            navigate("/login")
            return
        }

        navigate("/user")
    }


  return (
<header className='h-24 lg:h-20 sticky top-0 z-40 flex flex-col justify-center gap-1 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-lg border-b border-orange-500/20'>
    {
        !(isSearchPage && isMobile) && (
            <div className='container mx-auto flex items-center px-3 justify-between'>
                
                {/* LOGO */}
                <div className='h-full'>
                    <Link to={"/"} className='h-full flex justify-center items-center'>
                        <img 
                            src={logo}
                            width={170}
                            height={60}
                            alt='logo'
                            className='hidden lg:block brightness-110'
                        />
                        <img 
                            src={logo}
                            width={120}
                            height={60}
                            alt='logo'
                            className='lg:hidden brightness-110'
                        />
                    </Link>
                </div>

                {/* SEARCH */}
                <div className='hidden lg:block w-full max-w-lg'>
                    <div className='bg-white rounded-xl shadow-md border border-slate-200'>
                        <Search/>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div>
                    {/* MOBILE USER */}
                    <button className='text-white lg:hidden hover:text-orange-400 transition' onClick={handleMobileUser}>
                        <FaRegCircleUser size={26}/>
                    </button>

                    {/* DESKTOP */}
                    <div className='hidden lg:flex items-center gap-8 text-white'>
                        {
                            user?._id ? (
                                <div className='relative'>
                                    <div onClick={()=>setOpenUserMenu(preve => !preve)} className='flex items-center gap-1 cursor-pointer hover:text-orange-400 transition'>
                                        <p className='font-semibold'>Account</p>
                                        {
                                            openUserMenu ? (
                                                <GoTriangleUp size={22}/> 
                                            ) : (
                                                <GoTriangleDown size={22}/>
                                            )
                                        }
                                    </div>

                                    {
                                        openUserMenu && (
                                            <div className='absolute right-0 top-12'>
                                                <div className='bg-white text-black rounded-xl p-4 min-w-52 shadow-xl border border-slate-200'>
                                                    <UserMenu close={handleCloseUserMenu}/>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <button onClick={redirectToLoginPage} className='text-lg px-3 py-1 border border-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition'>
                                    Login
                                </button>
                            )
                        }

                        {/* CART */}
                        <button 
                            onClick={()=>setOpenCartSection(true)} 
                            className='flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 px-4 py-2 rounded-xl text-white shadow-lg transition-all'
                        >
                            <div className='animate-bounce'>
                                <BsCart4 size={24}/>
                            </div>

                            <div className='font-semibold text-sm leading-4'>
                                {
                                    cartItem[0] ? (
                                        <div>
                                            <p>{totalQty} Items</p>
                                            <p className='font-bold'>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    ) : (
                                        <p>My Cart</p>
                                    )
                                }
                            </div>    
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    {/* MOBILE SEARCH */}
    <div className='container mx-auto px-3 lg:hidden'>
        <div className='bg-white rounded-xl shadow-md border border-slate-200'>
            <Search/>
        </div>
    </div>

    {
        openCartSection && (
            <DisplayCartItem close={()=>setOpenCartSection(false)}/>
        )
    }
</header>
)
}

export default Header
