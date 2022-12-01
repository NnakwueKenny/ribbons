import React from 'react';
import logo from '../images/logo.png';

const Loader = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
        <div className='animate-pulse text-purple-900 h-16 flex'>
            <img className='w-full max-w-[120px] md:max-w-[150px]' src={logo} alt='riboons logo' />
        </div>
        <span className='flex w-10 h-10 md:w-12 md:h-12 rounded-full border-b-purple-900 border-4 animate-spin'></span>
    </div>
  )
}

export default Loader