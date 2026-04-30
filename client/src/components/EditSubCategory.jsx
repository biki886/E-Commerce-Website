import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubCategory = ({close,data,fetchData}) => {
    const [subCategoryData,setSubCategoryData] = useState({
        _id : data._id,
        name : data.name,
        image : data.image,
        category : data.category || []
    })
    const allCategory = useSelector(state => state.product.allCategory)


    const handleChange = (e)=>{
        const { name, value} = e.target 

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadSubCategoryImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const { data : ImageResponse } = response

        setSubCategoryData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId)=>{
        const index = subCategoryData.category.findIndex(el => el._id === categoryId )
        subCategoryData.category.splice(index,1)
        setSubCategoryData((preve)=>{
            return{
                ...preve
            }
        })
    }

    const handleSubmitSubCategory = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data : subCategoryData
            })

            const { data : responseData } = response

            console.log("responseData",responseData)
            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }
                if(fetchData){
                    fetchData()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
<section className='fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4'>
    <div className='w-full max-w-4xl bg-white p-5 rounded-2xl shadow-2xl border border-slate-200'>

        {/* HEADER */}
        <div className='flex items-center justify-between gap-3 border-b border-slate-200 pb-3'>
            <h1 className='font-bold text-slate-800 text-lg'>Edit Sub Category</h1>
            <button onClick={close} className='hover:text-red-500 bg-slate-100 p-1 rounded-full transition'>
                <IoClose size={25}/>
            </button>
        </div>

        <form className='my-4 grid gap-4' onSubmit={handleSubmitSubCategory}>

            {/* NAME */}
            <div className='grid gap-1'>
                <label className='font-semibold text-slate-700'>Name</label>
                <input 
                    name='name'
                    value={subCategoryData.name}
                    onChange={handleChange}
                    className='p-3 bg-slate-100 border border-slate-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl'
                />
            </div>

            {/* IMAGE */}
            <div className='grid gap-1'>
                <p className='font-semibold text-slate-700'>Image</p>

                <div className='flex flex-col lg:flex-row items-center gap-4'>
                    <div className='border border-slate-300 h-36 w-full lg:w-36 bg-slate-100 flex items-center justify-center rounded-xl p-2'>
                        {
                            !subCategoryData.image ? (
                                <p className='text-sm text-neutral-400'>No Image</p>
                            ) : (
                                <img
                                    alt='subCategory'
                                    src={subCategoryData.image}
                                    className='w-full h-full object-scale-down'
                                />
                            )
                        }
                    </div>

                    <label htmlFor='uploadSubCategoryImage'>
                        <div className='px-5 py-2 border border-orange-500 text-orange-600 rounded-xl hover:bg-orange-500 hover:text-white cursor-pointer font-semibold transition'>
                            Upload Image
                        </div>
                        <input 
                            type='file'
                            id='uploadSubCategoryImage'
                            className='hidden'
                            onChange={handleUploadSubCategoryImage}
                        />
                    </label>
                </div>
            </div>

            {/* CATEGORY */}
            <div className='grid gap-1'>
                <label className='font-semibold text-slate-700'>Select Category</label>

                <div className='border border-slate-300 rounded-xl p-2 bg-slate-50'>

                    {/* selected */}
                    <div className='flex flex-wrap gap-2 mb-2'>
                        {
                            subCategoryData.category.map((cat,index)=>(
                                <p key={cat._id+"selectedValue"} className='bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center gap-1'>
                                    {cat.name}
                                    <IoClose size={18} className='cursor-pointer' onClick={()=>handleRemoveCategorySelected(cat._id)}/>
                                </p>
                            ))
                        }
                    </div>

                    {/* select */}
                    <select
                        className='w-full p-3 bg-white border border-slate-300 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                        onChange={(e)=>{
                            const value = e.target.value
                            const categoryDetails = allCategory.find(el => el._id == value)
                            
                            setSubCategoryData((preve)=>({
                                ...preve,
                                category : [...preve.category,categoryDetails]
                            }))
                        }}
                    >
                        <option value="">Select Category</option>
                        {
                            allCategory.map((category)=>(
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))
                        }
                    </select>

                </div>
            </div>

            {/* BUTTON */}
            <button
                className={`px-4 py-3 rounded-xl font-bold transition-all
                    ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] 
                        ? "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white shadow-lg" 
                        : "bg-gray-300 text-gray-500"
                    }`}
            >
                Submit
            </button>
            
        </form>
    </div>
</section>
)
}

export default EditSubCategory

