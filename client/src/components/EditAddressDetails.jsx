import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddressDetails = ({close, data}) => {
    const { register, handleSubmit,reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line :data.address_line,
            city : data.city,
            state : data.state,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile 
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async(data)=>{
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data : {
                    ...data,
                    address_line :data.address_line,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
 return (
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto px-2'>
        <div className='bg-white p-5 w-full max-w-lg mt-8 mx-auto rounded-2xl shadow-2xl border border-slate-200'>
            <div className='flex justify-between items-center gap-4 border-b border-slate-200 pb-3'>
                <h2 className='font-bold text-slate-800 text-lg'>Edit Address</h2>
                <button onClick={close} className='hover:text-red-500 bg-slate-100 p-1 rounded-full transition-all'>
                    <IoClose  size={25}/>
                </button>
            </div>

            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-1'>
                    <label htmlFor='addressline' className='font-semibold text-slate-700'>Address Line :</label>
                    <input type='text' id='addressline' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("address_line",{required : true})}/>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='city' className='font-semibold text-slate-700'>City :</label>
                    <input type='text' id='city' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("city",{required : true})}/>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='state' className='font-semibold text-slate-700'>State :</label>
                    <input type='text' id='state' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("state",{required : true})}/>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='pincode' className='font-semibold text-slate-700'>Pincode :</label>
                    <input type='text' id='pincode' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("pincode",{required : true})}/>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='country' className='font-semibold text-slate-700'>Country :</label>
                    <input type='text' id='country' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("country",{required : true})}/>
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='mobile' className='font-semibold text-slate-700'>Mobile No. :</label>
                    <input type='text' id='mobile' className='border border-slate-300 bg-slate-100 p-3 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200' {...register("mobile",{required : true})}/>
                </div>

                <button type='submit' className='bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white w-full py-3 font-bold mt-4 rounded-xl shadow-lg transition-all duration-300'>
                    Submit
                </button>
            </form>
        </div>
    </section>
)
}

export default EditAddressDetails

