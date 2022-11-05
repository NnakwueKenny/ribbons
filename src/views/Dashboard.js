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
              <div className={`${showOptions? '': 'hidden'} absolute right-0 z-10 mt-2 w-44 md:w-56 overflow-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
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
          <div>
                
            <div className='w-full relative my-4 md:my-8'>
              <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
                  <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-label="Slide 1" ></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="active" aria-label="Slide 2" ></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="active" aria-label="Slide 3" ></button>
                  </div>
                  <div className="carousel-inner relative w-full overflow-hidden">
                      <div className="h-full mdmax-h-[400px] carousel-item active relative float-left w-full">
                        <img src={'https://images.pexels.com/photos/163431/fist-blow-power-wrestling-163431.jpeg?auto=compress&cs=tinysrgb&w=600'} className="block w-full object-cover hidden lg:block" alt="..." />
                        <img src={'https://images.pexels.com/photos/163431/fist-blow-power-wrestling-163431.jpeg?auto=compress&cs=tinysrgb&w=600'} className="block w-full h-full object-cover lg:hidden" alt="..." />
                        <div className="hidden flex flex-col lg:flex-row lg:px-8 carousel-caption absolute text-green-700 left-0 top-0 bg-gray-100 bg-opacity-25 w-full">
                          <div className="w-full lg:w-2/3 h-full flex flex-col lg:flex-row">
                            <div className="flex flex-col items-center gap-y-4 md:gap-y-6 p-2">
                              <h5 className="text-xl md:2xl lg:text-6xl">Have fun and learn at the same time</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-full max-h-[400px] carousel-item relative float-left w-full">
                          <img src={'https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?auto=compress&cs=tinysrgb&w=600'} className="block w-full object-cover hidden lg:block" alt="..." />
                          <img src={'https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?auto=compress&cs=tinysrgb&w=600'} className="block w-full h-full object-cover lg:hidden" alt="..." />
                          <div className="hidden flex flex-col lg:flex-row lg:px-8 carousel-caption absolute text-green-500 left-0 top-0 bg-gray-100 bg-opacity-25 w-full">
                            <div className="w-full lg:w-2/3 h-full flex flex-col lg:flex-row">
                              <div className="flex flex-col items-center gap-y-4 md:gap-y-6 p-2">
                                <h5 className="text-xl md:2xl lg:text-6xl">Register for climate challenge</h5>
                                <p className="text-base md:text-xl lg:text-3xl text-slate-50 bg-green-500 bg-opacity-50 px-4 py-2 rounded-lg">
                                    Learn more about climate
                                </p>
                              </div>
                          </div>
                          </div>
                      </div>
                      <div className="h-full max-h-[400px] carousel-item relative float-left w-full">
                          <img src={'https://images.pexels.com/photos/6003787/pexels-photo-6003787.jpeg?auto=compress&cs=tinysrgb&w=600'} className="block w-full object-cover hidden lg:block" alt="..." />
                          <img src={'https://images.pexels.com/photos/6003787/pexels-photo-6003787.jpeg?auto=compress&cs=tinysrgb&w=600   '} className="block w-full h-full object-cover lg:hidden" alt="..." />
                          <div className="hidden flex flex-col lg:flex-row lg:px-8 carousel-caption absolute text-green-500 left-0 top-0 bg-gray-100 bg-opacity-25 w-full">
                            <div className="w-full lg:w-2/3 h-full flex flex-col lg:flex-row">
                              <div className="flex flex-col items-center gap-y-4 md:gap-y-6 p-2">
                                <h5 className="text-xl md:2xl lg:text-6xl">Learncha</h5>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <button className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" >
                      <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                  </button>
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
              <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-truck-medical"></i></span>
              <span className='w-full flex text-2xl font-normal'>Medical Assistance</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i className="fa fa-comment"></i></span>
              <span className='w-full flex text-2xl font-normal'>Support</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-location-dot"></i></span>
              <span className='w-full flex text-2xl font-normal'>Locate a Doctor</span>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-center items-center gap-3 w-full rounded-2xl bg-violet-900 text-violet-100 py-3'>
              <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-circle-check"></i></span>
              <span className='w-full flex text-2xl font-normal'>SARC</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard