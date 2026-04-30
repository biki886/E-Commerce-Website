import React, { useEffect, useRef, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const valideValue = data.every(el => el)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data : {
                    otp : data.join(""),
                    email : location?.state?.email
                }
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["","","","","",""])
                navigate("/reset-password",{
                    state : {
                        data : response.data,
                        email : location?.state?.email
                    }
                })
            }

        } catch (error) {
            console.log('error',error)
            AxiosToastError(error)
        }



    }

  return (
    <section className='w-full min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-100 flex items-center justify-center px-2'>
        <div className='bg-white/95 my-4 w-full max-w-lg mx-auto rounded-2xl p-7 shadow-2xl border border-slate-200'>
            <p className='font-bold text-xl text-slate-800'>Enter OTP</p>
            <p className='text-sm text-slate-500 mt-1'>Enter the 6 digit code sent to your email</p>

            <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='otp' className='font-semibold text-slate-700'>Enter Your OTP :</label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                        {
                            data.map((element,index)=>{
                                return(
                                    <input
                                        key={"otp"+index}
                                        type='text'
                                        id='otp'
                                        ref={(ref)=>{
                                            inputRef.current[index] = ref
                                            return ref 
                                        }}
                                        value={data[index]}
                                        onChange={(e)=>{
                                            const value =  e.target.value
                                            console.log("value",value)

                                            const newData = [...data]
                                            newData[index] = value
                                            setData(newData)

                                            if(value && index < 5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                        maxLength={1}
                                        className='bg-slate-100 w-full max-w-16 p-3 border border-slate-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-center font-bold text-lg text-slate-800'
                                    />
                                )
                            })
                        }
                    </div>
                    
                </div>
         
                <button disabled={!valideValue} className={` ${valideValue ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-lg" : "bg-gray-500" } text-white py-3 rounded-xl font-semibold my-3 tracking-wide transition-all duration-300`}>Verify OTP</button>

            </form>

            <p className='text-slate-700'>
                Already have account? <Link to={"/login"} className='font-semibold text-orange-600 hover:text-orange-700'>Login</Link>
            </p>
        </div>
    </section>
)
}

export default OtpVerification



