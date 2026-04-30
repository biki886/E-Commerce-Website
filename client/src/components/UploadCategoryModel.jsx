import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({close, fetchData}) => {
    const [data,setData] = useState({
        name : "",
        image : ""
    })
    const [loading,setLoading] = useState(false)

    const handleOnChange = (e)=>{
        const { name, value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()


        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data : data
            })
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    const handleUploadCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const { data : ImageResponse } = response

        setData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 flex items-center justify-center z-50'>
        <div className='bg-white max-w-4xl w-full p-5 rounded-2xl shadow-2xl border border-slate-200'>
            <div className='flex items-center justify-between border-b border-slate-200 pb-3'>
                <h1 className='font-bold text-slate-800 text-lg'>Category</h1>
                <button onClick={close} className='w-fit block ml-auto hover:text-red-500 bg-slate-100 p-1 rounded-full transition'>
                    <IoClose size={25}/>
                </button>
            </div>

            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label id='categoryName' className='font-semibold text-slate-700'>Name</label>
                    <input
                        type='text'
                        id='categoryName'
                        placeholder='Enter category name'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        className='bg-slate-100 p-3 border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none rounded-xl'
                    />
                </div>

                <div className='grid gap-1'>
                    <p className='font-semibold text-slate-700'>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border border-slate-300 bg-slate-100 h-36 w-full lg:w-36 flex items-center justify-center rounded-xl p-2'>
                            {
                                data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )
                            }
                        </div>

                        <label htmlFor='uploadCategoryImage'>
                            <div className={`${!data.name ? "bg-gray-300 text-gray-600" : "border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"} px-5 py-2 rounded-xl cursor-pointer border font-semibold transition-all duration-300`}>
                                Upload Image
                            </div>

                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                    </div>
                </div>

                <button
                    className={`${data.name && data.image ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white shadow-lg" : "bg-gray-300 text-gray-600"} py-3 rounded-xl font-bold transition-all duration-300`}
                >
                    Add Category
                </button>
            </form>
        </div>
    </section>
)
}

export default UploadCategoryModel
