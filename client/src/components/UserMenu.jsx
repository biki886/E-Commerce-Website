import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }
  return (
  <div className='bg-white rounded-xl'>
      <div className='font-bold text-slate-800 text-lg'>My Account</div>

      <div className='text-sm flex items-center gap-2 mt-1 text-slate-600'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>
          {user.name || user.mobile}{" "}
          <span className='font-semibold text-orange-600'>
            {user.role === "ADMIN" ? "(Admin)" : "" }
          </span>
        </span>

        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-orange-600 transition'>
          <HiOutlineExternalLink size={16}/>
        </Link>
      </div>

      <Divider/>

      <div className='text-sm grid gap-1'>
          {
            isAdmin(user.role) && (
              <Link onClick={handleClose} to={"/dashboard/category"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>Category</Link>
            )
          }

          {
            isAdmin(user.role) && (
              <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>Sub Category</Link>
            )
          }

          {
            isAdmin(user.role) && (
              <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>Upload Product</Link>
            )
          }

          {
            isAdmin(user.role) && (
              <Link onClick={handleClose} to={"/dashboard/product"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>Product</Link>
            )
          }

          <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>My Orders</Link>

          <Link onClick={handleClose} to={"/dashboard/address"} className='px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition'>Save Address</Link>

          <button onClick={handleLogout} className='text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 transition font-semibold'>Log Out</button>
      </div>
  </div>
)
}

export default UserMenu
