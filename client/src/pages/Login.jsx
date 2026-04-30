import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
        <section className='w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 flex items-center justify-center px-2'>
    <div className='bg-white/95 my-4 w-full max-w-lg mx-auto rounded-2xl p-7 shadow-2xl border border-slate-200'>

        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label htmlFor='email' className='font-semibold text-slate-700'>Email :</label>
                <input
                    type='email'
                    id='email'
                    className='bg-slate-100 p-3 border border-slate-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='password' className='font-semibold text-slate-700'>Password :</label>
                <div className='bg-slate-100 p-3 border border-slate-300 rounded-xl flex items-center focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200'>
                    <input
                        type={showPassword ? "text" : "password"}
                        id='password'
                        className='w-full outline-none bg-transparent'
                        name='password'
                        value={data.password}
                        onChange={handleChange}
                        placeholder='Enter your password'
                    />
                    <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer text-slate-700 hover:text-orange-600'>
                        {
                            showPassword ? (
                                <FaRegEye />
                            ) : (
                                <FaRegEyeSlash />
                            )
                        }
                    </div>
                </div>
                <Link to={"/forgot-password"} className='block ml-auto text-sm text-slate-600 hover:text-orange-600'>Forgot password ?</Link>
            </div>

            <button disabled={!valideValue} className={` ${valideValue ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg" : "bg-gray-500" } text-white py-3 rounded-xl font-semibold my-3 tracking-wide transition-all duration-300`}>Login</button>

        </form>

        <p className='text-slate-700'>
            Don't have account? <Link to={"/register"} className='font-semibold text-orange-600 hover:text-orange-700'>Register</Link>
        </p>
    </div>
</section>
    )
}

export default Login

