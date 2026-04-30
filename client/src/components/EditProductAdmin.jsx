import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import { useEffect } from 'react';

const EditProductAdmin = ({ close ,data : propsData,fetchProductData}) => {
  const [data, setData] = useState({
    _id : propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [ViewImageURL, setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")


  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("data", data)

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data
      })
      const { data: responseData } = response

      if (responseData.success) {
        successAlert(responseData.message)
        if(close){
          close()
        }
        fetchProductData()
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })

      }
    } catch (error) {
      AxiosToastError(error)
    }


  }

  return (
<section className='fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4 flex items-center justify-center'>
  <div className='bg-white w-full p-5 max-w-3xl mx-auto rounded-2xl shadow-2xl border border-slate-200 overflow-y-auto h-full max-h-[95vh]'>

    {/* HEADER */}
    <div className='p-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 flex items-center justify-between rounded-xl border-b border-orange-500/30'>
      <h2 className='font-bold text-white text-lg'>Update Product</h2>
      <button onClick={close} className='text-white hover:text-orange-400'>
        <IoClose size={22}/>
      </button>
    </div>

    {/* FORM */}
    <div className='grid p-4'>
      <form className='grid gap-5' onSubmit={handleSubmit}>

        {/* NAME */}
        <div className='grid gap-1'>
          <label className='font-semibold text-slate-700'>Name</label>
          <input
            name='name'
            value={data.name}
            onChange={handleChange}
            className='bg-slate-100 p-3 border border-slate-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none'
          />
        </div>

        {/* DESCRIPTION */}
        <div className='grid gap-1'>
          <label className='font-semibold text-slate-700'>Description</label>
          <textarea
            name='description'
            value={data.description}
            onChange={handleChange}
            rows={3}
            className='bg-slate-100 p-3 border border-slate-300 rounded-xl resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none'
          />
        </div>

        {/* IMAGE */}
        <div>
          <p className='font-semibold text-slate-700'>Images</p>

          <label className='bg-slate-100 h-24 border border-dashed border-orange-400 rounded-xl flex justify-center items-center cursor-pointer hover:bg-orange-50 transition'>
            {
              imageLoading ? <Loading/> : (
                <div className='text-center'>
                  <FaCloudUploadAlt size={35} className='text-orange-500 mx-auto'/>
                  <p className='text-sm text-slate-600'>Upload Image</p>
                </div>
              )
            }
            <input type='file' className='hidden' onChange={handleUploadImage}/>
          </label>

          <div className='flex flex-wrap gap-3 mt-3'>
            {
              data.image.map((img,index)=>(
                <div key={img+index} className='h-20 w-20 bg-slate-100 border rounded-xl relative group p-1'>
                  <img src={img} className='w-full h-full object-contain cursor-pointer' onClick={()=>setViewImageURL(img)} />
                  <div onClick={()=>handleDeleteImage(index)} className='absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full hidden group-hover:block cursor-pointer'>
                    <MdDelete/>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* CATEGORY */}
        <div className='grid gap-1'>
          <label className='font-semibold text-slate-700'>Category</label>
          <select
            className='bg-slate-100 border border-slate-300 p-3 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
            value={selectCategory}
            onChange={(e)=>{
              const value = e.target.value
              const category = allCategory.find(el=>el._id===value)
              setData(prev=>({...prev,category:[...prev.category,category]}))
              setSelectCategory("")
            }}
          >
            <option value="">Select Category</option>
            {allCategory.map(c=>(
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <div className='flex flex-wrap gap-2'>
            {
              data.category.map((c,index)=>(
                <div key={c._id+index} className='flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm'>
                  {c.name}
                  <IoClose onClick={()=>handleRemoveCategory(index)} className='cursor-pointer'/>
                </div>
              ))
            }
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className='grid gap-1'>
          <label className='font-semibold text-slate-700'>Sub Category</label>
          <select
            className='bg-slate-100 border border-slate-300 p-3 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
            value={selectSubCategory}
            onChange={(e)=>{
              const value = e.target.value
              const subCategory = allSubCategory.find(el=>el._id===value)
              setData(prev=>({...prev,subCategory:[...prev.subCategory,subCategory]}))
              setSelectSubCategory("")
            }}
          >
            <option value="">Select Sub Category</option>
            {allSubCategory.map(c=>(
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <div className='flex flex-wrap gap-2'>
            {
              data.subCategory.map((c,index)=>(
                <div key={c._id+index} className='flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm'>
                  {c.name}
                  <IoClose onClick={()=>handleRemoveSubCategory(index)} className='cursor-pointer'/>
                </div>
              ))
            }
          </div>
        </div>

        {/* GRID */}
        <div className='grid md:grid-cols-2 gap-4'>
          <input name='unit' value={data.unit} onChange={handleChange} placeholder='Unit' className='bg-slate-100 p-3 border rounded-xl'/>
          <input name='stock' value={data.stock} onChange={handleChange} placeholder='Stock' className='bg-slate-100 p-3 border rounded-xl'/>
          <input name='price' value={data.price} onChange={handleChange} placeholder='Price' className='bg-slate-100 p-3 border rounded-xl'/>
          <input name='discount' value={data.discount} onChange={handleChange} placeholder='Discount' className='bg-slate-100 p-3 border rounded-xl'/>
        </div>

        {/* EXTRA */}
        {
          Object.keys(data.more_details).map((k,index)=>(
            <div key={k} className='grid gap-1'>
              <label className='font-semibold text-slate-700'>{k}</label>
              <input 
                value={data.more_details[k]}
                onChange={(e)=>{
                  const value = e.target.value
                  setData(prev=>({
                    ...prev,
                    more_details:{...prev.more_details,[k]:value}
                  }))
                }}
                className='bg-slate-100 p-3 border rounded-xl'
              />
            </div>
          ))
        }

        <div onClick={()=>setOpenAddField(true)} className='w-32 text-center font-semibold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 rounded-xl cursor-pointer transition'>
          Add Fields
        </div>

        <button className='bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white py-3 rounded-xl font-bold shadow-lg transition'>
          Update Product
        </button>

      </form>
    </div>

    {ViewImageURL && <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>}

    {openAddField && (
      <AddFieldComponent 
        value={fieldName}
        onChange={(e)=>setFieldName(e.target.value)}
        submit={handleAddField}
        close={()=>setOpenAddField(false)} 
      />
    )}
  </div>
</section>
)
}

export default EditProductAdmin