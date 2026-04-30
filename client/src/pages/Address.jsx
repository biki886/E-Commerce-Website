import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({})
  const { fetchAddress} = useGlobalContext()

  const handleDisableAddress = async(id)=>{
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className='bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xl'>
        <div className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-lg px-4 py-4 flex justify-between gap-4 items-center border-b border-orange-500/30'>
            <h2 className='font-bold text-white text-lg text-ellipsis line-clamp-1'>Address</h2>
            <button onClick={()=>setOpenAddress(true)} className='border border-orange-500 text-orange-500 px-4 hover:bg-orange-500 hover:text-white py-2 rounded-full font-semibold transition-all duration-300'>
                Add Address
            </button>
        </div>
        <div className='bg-slate-100 p-3 grid gap-4'>
              {
                addressList.map((address,index)=>{
                  return(
                      <div className={`border border-slate-200 rounded-xl p-4 flex gap-3 bg-white shadow-md hover:shadow-xl hover:border-orange-400 transition-all duration-300 ${!address.status && 'hidden'}`}>
                          <div className='w-full text-slate-700 leading-7'>
                            <p className='font-semibold text-slate-900'>{address.address_line}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.country} - {address.pincode}</p>
                            <p>{address.mobile}</p>
                          </div>
                          <div className='grid gap-10'>
                            <button onClick={()=>{
                              setOpenEdit(true)
                              setEditData(address)
                            }} className='bg-amber-100 text-amber-700 p-2 rounded-lg hover:text-white hover:bg-amber-600 transition-all duration-300'>
                              <MdEdit/>
                            </button>
                            <button onClick={()=>
                              handleDisableAddress(address._id)
                            } className='bg-red-100 text-red-600 p-2 rounded-lg hover:text-white hover:bg-red-600 transition-all duration-300'>
                              <MdDelete size={20}/>  
                            </button>
                          </div>
                      </div>
                  )
                })
              }
              <div onClick={()=>setOpenAddress(true)} className='h-16 bg-white border-2 border-dashed border-orange-400 text-orange-600 font-semibold rounded-xl flex justify-center items-center cursor-pointer hover:bg-orange-50 transition-all duration-300'>
                Add address
              </div>
        </div>

        {
          openAddress && (
            <AddAddress close={()=>setOpenAddress(false)}/>
          )
        }

        {
          OpenEdit && (
            <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
          )
        }
    </div>
  )
}

export default Address