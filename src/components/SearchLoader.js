import React from 'react';
import logo from '../images/logo.png';

const SearchLoader = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='animate-pulse text-purple-900 h-14 flex'>
            <img className='w-full max-w-[120px] md:max-w-[150px]' src={logo} alt='riboons logo' />
        </div>
        <p className='mb-3 w-12 h-12 rounded-full border-2 border-violet-900 border-b-gray-100 animate-spin'></p>
        <p className='text-lg font-semibold text-gray-600'>Searching</p>
    </div>
  )
}

export default SearchLoader