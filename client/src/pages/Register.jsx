import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

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

        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }
    return (
       <section className='w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 flex items-center justify-center px-2'>
    <div className='bg-white/95 my-4 w-full max-w-lg mx-auto rounded-2xl p-7 shadow-2xl border border-slate-200'>
        <p className='text-xl font-bold text-slate-800'>Create your SpareExpress account</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label htmlFor='name' className='font-semibold text-slate-700'>Name :</label>
                <input
                    type='text'
                    id='name'
                    autoFocus
                    className='bg-slate-100 p-3 border border-slate-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    placeholder='Enter your name'
                />
            </div>

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
                        id='confirmPassword'
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
                className={`${valideValue
                        ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg"
                        : "bg-gray-500"
                    } text-white py-3 rounded-xl font-semibold my-3 tracking-wide transition-all duration-300`}
            >
                Register
            </button>

        </form>

        <p className='text-slate-700'>
            Already have account ?{" "}
            <Link to={"/login"} className='font-semibold text-orange-600 hover:text-orange-700'>
                Login
            </Link>
        </p>
    </div>
</section>
    )
}

export default Register
