import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 border-t border-orange-500/20'>
        <div className='container mx-auto p-5 text-center flex flex-col lg:flex-row lg:justify-between items-center gap-4'>
            
            <p className='text-slate-300 text-sm'>
                © {new Date().getFullYear()} SpareExpress. All Rights Reserved.
            </p>

            <div className='flex items-center gap-5 text-xl text-slate-300'>
                <a href='' className='hover:text-orange-500 transition-all duration-300'>
                    <FaFacebook/>
                </a>
                <a href='' className='hover:text-orange-500 transition-all duration-300'>
                    <FaInstagram/>
                </a>
                <a href='' className='hover:text-orange-500 transition-all duration-300'>
                    <FaLinkedin/>
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer