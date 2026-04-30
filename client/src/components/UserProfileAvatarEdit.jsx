import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updatedAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })
            const { data : responseData}  = response

            dispatch(updatedAvatar(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex items-center justify-center z-50'>
        <div className='bg-white max-w-sm w-full rounded-2xl p-5 flex flex-col items-center justify-center shadow-2xl border border-slate-200'>
            
            <button onClick={close} className='text-slate-700 hover:text-red-500 w-fit block ml-auto bg-slate-100 p-1 rounded-full transition'>
                <IoClose size={22}/>
            </button>

            <div className='w-24 h-24 bg-slate-700 text-white flex items-center justify-center rounded-full overflow-hidden shadow-lg border-4 border-orange-500'>
                {
                    user.avatar ? (
                        <img 
                            alt={user.name}
                            src={user.avatar}
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <FaRegUserCircle size={65}/>
                    )
                }
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor='uploadProfile'>
                    <div className='bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white cursor-pointer px-5 py-2 rounded-xl text-sm my-4 font-semibold shadow-lg transition-all duration-300'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/>
                </label>
            </form>
            
        </div>
    </section>
)
}

export default UserProfileAvatarEdit
