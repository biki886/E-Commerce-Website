import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';


const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])


    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
  <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-xl border border-slate-300 overflow-hidden flex items-center text-slate-500 bg-white shadow-sm group focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200'>
      <div>
          {
              (isMobile && isSearchPage ) ? (
                  <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-orange-500 bg-slate-100 hover:bg-orange-100 rounded-full shadow-sm transition'>
                      <FaArrowLeft size={20}/>
                  </Link>
              ) :(
                  <button className='flex justify-center items-center h-full p-3 group-focus-within:text-orange-500 transition'>
                      <IoSearch size={22}/>
                  </button>
              )
          }
      </div>

      <div className='w-full h-full'>
          {
              !isSearchPage ? (
                   <div onClick={redirectToSearchPage} className='w-full h-full flex items-center cursor-pointer text-slate-500'>
                      <TypeAnimation
                              sequence={[
                                  'Search "brake pad"',
                                  1000,
                                  'Search "engine oil"',
                                  1000,
                                  'Search "clutch plate"',
                                  1000,
                                  'Search "battery"',
                                  1000,
                                  'Search "headlight"',
                                  1000,
                                  'Search "tyre"',
                                  1000,
                                  'Search "spark plug"',
                                  1000,
                                  'Search "air filter"',
                                  1000,
                                  'Search "mirror"',
                              ]}
                              wrapper="span"
                              speed={50}
                              repeat={Infinity}
                          />
                   </div>
              ) : (
                  <div className='w-full h-full'>
                      <input
                          type='text'
                          placeholder='Search spare parts and accessories...'
                          autoFocus
                          defaultValue={searchText}
                          className='bg-transparent w-full h-full outline-none text-slate-700 placeholder:text-slate-400'
                          onChange={handleOnChange}
                      />
                  </div>
              )
          }
      </div>
      
  </div>
)
}

export default Search
