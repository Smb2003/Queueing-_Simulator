import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Queueing = () => {
  return (
    <div>
      <div className='flex justify-center border-b-2 md:h-full h-12 '>
        <Link to="mmcModel"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:px-[1vw] md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>M/M/C</h1></Link>
        <Link to="mgcModel"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:px-[1vw] md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>M/G/C</h1></Link>
        <Link to="ggcModel"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:px-[1vw] md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>G/G/C</h1></Link>
      </div>
      <Outlet/>
    </div>
  )
}

export default Queueing