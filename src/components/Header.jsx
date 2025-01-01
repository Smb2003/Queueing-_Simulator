
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='font-mono sticky w-full flex justify-between items-center md:h-16 h-full md:px-[3vw] md:py-[1vw] py-3 px-3 border border-b-2 border-[#dadada]'>
      <Link to="/">
        <h1 className='md:text-3xl text-2xl md:font-bold font-extrabold text-emerald-900 hover:translate-x-1 cursor-pointer'>
          Queuing Simulator
        </h1>
      </Link>

      <div className='hidden md:flex gap-3'>
        <Link to="/Simulation">
          <button className='md:w-fit md:h-[3vw] mr:4 px-2 md:mr-2 rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md'>
            Simulation
          </button>
        </Link>
        <Link to="/Queueing">
          <button className='md:w-fit md:h-[3vw] px-2 rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md'>
            Queuing Model
          </button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className='md:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute w-full top-full right-0 bg-white  shadow-lg border rounded-md flex flex-col p-3 gap-3 z-50'>
          <Link to="/Simulation" onClick={() => setIsMenuOpen(false)}>
            <button className='w-full h-fit px-2 py-2 rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md'>
              Simulation
            </button>
          </Link>
          <Link to="/Queueing" onClick={() => setIsMenuOpen(false)}>
            <button className='w-full h-fit px-2 py-2 rounded-md bg-emerald-800 text-white active:scale-95 hover:bg-emerald-600 text-md'>
              Queuing Model
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

