import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';


const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

    const handleOnChange  = (e)=>{
        const { name, value} = e.target 

        setUserData((preve)=>{
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
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
 return (
    <div className='p-4 bg-slate-100 min-h-screen rounded-2xl border border-slate-200 shadow-xl'>

        {/**profile upload and display image */}
        <div className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 rounded-2xl p-5 border border-orange-500/30 shadow-xl'>
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

            <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full mt-3 font-semibold transition-all duration-300'>Edit</button>
        </div>
        
        {
            openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={()=>setProfileAvatarEdit(false)}/>
            )
        }

        {/**name, mobile , email, change password */}
        <form className='my-4 grid gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-lg' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label className='font-semibold text-slate-700'>Name</label>
                <input
                    type='text'
                    placeholder='Enter your name' 
                    className='p-3 bg-slate-100 outline-none border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl'
                    value={userData.name}
                    name='name'
                    onChange={handleOnChange}
                    required
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='email' className='font-semibold text-slate-700'>Email</label>
                <input
                    type='email'
                    id='email'
                    placeholder='Enter your email' 
                    className='p-3 bg-slate-100 outline-none border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl'
                    value={userData.email}
                    name='email'
                    onChange={handleOnChange}
                    required
                />
            </div>
            <div className='grid gap-1'>
                <label htmlFor='mobile' className='font-semibold text-slate-700'>Mobile</label>
                <input
                    type='text'
                    id='mobile'
                    placeholder='Enter your mobile' 
                    className='p-3 bg-slate-100 outline-none border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl'
                    value={userData.mobile}
                    name='mobile'
                    onChange={handleOnChange}
                    required
                />
            </div>

            <button className='bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white px-4 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300'>
                {
                    loading ? "Loading..." : "Submit"
                }
            </button>
        </form>
    </div>
)
}

export default Profile
