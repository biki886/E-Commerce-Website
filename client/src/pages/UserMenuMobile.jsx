import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 h-full min-h-screen w-full py-3'>
        <button onClick={()=>window.history.back()} className='text-white hover:text-orange-500 block w-fit ml-auto mr-4 bg-white/10 p-2 rounded-full transition-all duration-300'>
          <IoClose size={25}/>
        </button>
        <div className='container mx-auto px-3 pb-8 mt-3 bg-white/95 rounded-2xl shadow-2xl border border-slate-200'>
           <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile