import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import logo from '../images/logo.png';

const Dashboard = () => {
  const [ isLoading, setIsLoading ] = useState(true);

  const toggleLoader = () => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000)
  }

  const [ showOptions, setShowOptions ] = useState(false);
  const toggleShowOptions = () => {
    setShowOptions(prevValue => !prevValue)
  }

  useEffect(() => {
    toggleLoader()
  }, [])

  return (
    <div className='h-full overflow-auto w-full max-w-md py-6 font-medium md:border-2 rounded-3xl'>
      {
        isLoading ?
        <Loader />:
        <div className='flex flex-col gap-4 w-full items-center px-3'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-32 max-h-[50px] flex items-center'><img className='h-full w-full' src={logo} alt='ribbons logo'/></div>
            <div className='relative text-2xl px-2'>
              <button onClick={toggleShowOptions}><i className='fa fa-bars'></i></button>
              <div className={`${showOptions? '': 'hidden'} absolute right-0 z-10 mt-2 w-44 md:w-56 overflow-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                {
                    <ul className='p-2 text-base flex flex-col divide-y text-gray-600'>
                        <li className='flex justify-between py-1'>
                          <span>Settings</span>
                          <span><i className='fa fa-gear'></i></span>
                        </li>
                        <li className='flex justify-between py-1'>
                          <span>Logout</span>
                          <span><i className='fa fa-arrow-bracket'></i></span>
                        </li>
                    </ul>
                }
              </div>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl w-1/5 px-5 flex py-2'><i className='fa fa-message'></i></span>
              <span className='w-full flex text-2xl font-normal'>Chat</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i class="fa-solid fa-truck-medical"></i></span>
              <span className='w-full flex text-2xl font-normal'>Medical Assistance</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i class="fa fa-comment"></i></span>
              <span className='w-full flex text-2xl font-normal'>Support</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i class="fa-solid fa-location-dot"></i></span>
              <span className='w-full flex text-2xl font-normal'>Locate a Doctor</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i class="fa-solid fa-circle-check"></i></span>
              <span className='w-full flex text-2xl font-normal'>SARC</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard