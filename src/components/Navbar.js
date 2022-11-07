import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const NavBar = () => {
  const [ showOptions, setShowOptions ] = useState(false);
  const toggleShowOptions = () => {
    setShowOptions(prevValue => !prevValue)
  }

  return (
    <div className='w-full flex items-center justify-between border-b'>
      <Link to='/' className='w-32 max-h-[50px] flex items-center'>
        <img className='h-full w-full' src={logo} alt='ribbons logo'/>
      </Link>
      <div className='relative text-2xl px-2'>
        <button onClick={toggleShowOptions}><i className='fa fa-bars'></i></button>
        <div className={`${showOptions? '': 'hidden'} absolute right-0 z-10 mt-2 w-44 md:w-56 overflow-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          {
            <ul className='p-2 text-base flex flex-col divide-y text-gray-600'>
                <li className='flex justify-between py-1'>
                    <span>Help</span>
                    <span><i className='fa fa-question-circle'></i></span>
                </li>
            </ul>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar