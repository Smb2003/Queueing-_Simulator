import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Simulation = () => {
  return (
    <div>
      <div className='flex justify-center border-b-2 md:h-full h-12 gap-5'>
        <Link to="MM1"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>M/M/1</h1></Link>
        <Link to="MMC"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>M/M/C</h1></Link>
        <Link to="MGC"><h1 className='md:text-2xl text-xl text-emerald-900 font-bold text-center p-2 md:pt-[1vw] md:pb-[1vw] hover:underline cursor-pointer active:scale-95'>M/G/C</h1></Link>
      </div>
      <Outlet/>
    </div>
  )
}

export default Simulation