import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [data,setData] = useState({
    email : "",
    newPassword : "",
    confirmPassword : ""
  })
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const valideValue = Object.values(data).every(el => el)

  useEffect(()=>{
    if(!(location?.state?.data?.success)){
        navigate("/")
    }

    if(location?.state?.email){
        setData((preve)=>{
            return{
                ...preve,
                email : location?.state?.email
            }
        })
    }
  },[])

  const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

  console.log("data reset password",data)

  const handleSubmit = async(e)=>{
    e.preventDefault()

    ///optional 
    if(data.newPassword !== data.confirmPassword){
        toast.error("New password and confirm password must be same.")
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.resetPassword, //change
            data : data
        })
        
        if(response.data.error){
            toast.error(response.data.message)
        }

        if(response.data.success){
            toast.success(response.data.message)
            navigate("/login")
            setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
            })
            
        }

    } catch (error) {
        AxiosToastError(error)
    }



}

  return (
    <section className='w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 flex items-center justify-center px-2'>
    <div className='bg-white/95 my-4 w-full max-w-lg mx-auto rounded-2xl p-7 shadow-2xl border border-slate-200'>

        <p className='font-bold text-xl text-slate-800'>Reset Password</p>
        <p className='text-sm text-slate-500 mt-1'>Enter your new password</p>

        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

            <div className='grid gap-1'>
                <label htmlFor='newPassword' className='font-semibold text-slate-700'>New Password :</label>
                <div className='bg-slate-100 p-3 border border-slate-300 rounded-xl flex items-center focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id='password'
                        className='w-full outline-none bg-transparent'
                        name='newPassword'
                        value={data.newPassword}
                        onChange={handleChange}
                        placeholder='Enter your new password'
                    />
                    <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer text-slate-700 hover:text-orange-600'>
                        {
                            showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                        }
                    </div>
                </div>
            </div>

            <div className='grid gap-1'>
                <label htmlFor='confirmPassword' className='font-semibold text-slate-700'>Confirm Password :</label>
                <div className='bg-slate-100 p-3 border border-slate-300 rounded-xl flex items-center focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200'>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id='password'
                        className='w-full outline-none bg-transparent'
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={handleChange}
                        placeholder='Enter your confirm password'
                    />
                    <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer text-slate-700 hover:text-orange-600'>
                        {
                            showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                        }
                    </div>
                </div>
            </div>
     
            <button
                disabled={!valideValue}
                className={` ${valideValue 
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg" 
                    : "bg-gray-500"
                } text-white py-3 rounded-xl font-semibold my-3 tracking-wide transition-all duration-300`}
            >
                Change Password
            </button>

        </form>

        <p className='text-slate-700'>
            Already have account?{" "}
            <Link to={"/login"} className='font-semibold text-orange-600 hover:text-orange-700'>
                Login
            </Link>
        </p>
    </div>
</section>
  )
}

export default ResetPassword
