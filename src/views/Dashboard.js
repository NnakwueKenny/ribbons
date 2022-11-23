import React, { useEffect, useState } from 'react'
import Chatbot from '../components/Chatbot';
import Loader from '../components/Loader';
import logo from '../images/logo.png';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import ChatbotBtn from '../components/ChatbotBtn';

const Dashboard = () => {
  const [ isLoading, setIsLoading ] = useState(true);

  const toggleLoader = () => {
    setTimeout(()=> {
      setIsLoading(false);
    }, 2000)
  }

  const [ showChatbot, setShowChatbot ] = useState(false);
  const toggleShowChatbot = () => {
    setShowChatbot(prevValue => !prevValue)
  }

  useEffect(() => {
    toggleLoader()
  }, [])

  return (
    <div className='h-full overflow-auto w-full py-4'>
      {showChatbot && <Chatbot toggleShowChatbot={toggleShowChatbot}/>}
      {
        isLoading ?
        <Loader />:
        <div className='flex flex-col gap-4 w-full items-center px-3'>
          {/* Navbar starts here */}
            <Navbar />
          {/* Navbar ends here */}

          {/* Carousel starts here */}
          <div>
            <div className='w-full relative py-3 px-1'>
              <div id="carouselExampleCaptions" className="carousel slide relative rounded-2xl overflow-auto shadow" data-bs-ride="carousel">
                  <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-label="Slide 1" ></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="active" aria-label="Slide 2" ></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="active" aria-label="Slide 3" ></button>
                  </div>
                  <div className="carousel-inner relative w-full overflow-hidden">
                      <div className="h-full md:max-h-[400px] carousel-item active relative float-left w-full">
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
          {/* Carousel ends here */}

          {/* Main Section starts here */}
          <div className='flex flex-col gap-4 w-full items-center px-1'>
            <p style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-600 text-xl italic font-bold'>
              Fight GBV with us today, take a stand against injustice, make the world safe and better  for everyone to coexist.
            </p>
            <div className='w-full'>
              <div className=''>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 w-full'>
              <Link to='/sarc' className='flex flex-col justify-center items-center gap-1 w-full rounded-2xl bg-purple-900 text-white py-4'>
                <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-circle-check"></i></span>
                <span className='flex text-lg font-normal'>One-stop Centers</span>
              </Link>
              <Link to='/locate-hospital' className='flex flex-col justify-center items-center gap-1 w-full rounded-2xl bg-purple-900 text-white py-4'>
                <span className='text-2xl px-2 flex py-2'><i className="fa-solid fa-hospital"></i></span>
                <span className='flex text-lg font-normal'>Locate a Hospital</span>
              </Link>
              <Link to='/evidence'  className='flex flex-col justify-center items-center gap-1 w-full rounded-2xl bg-purple-900 text-white py-4'>
                <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-image"></i></span>
                <span className='flex text-lg font-normal px-2'>Document Evidence</span>
              </Link>
              <button onClick={toggleShowChatbot}  className='flex flex-col justify-center items-center gap-1 w-full rounded-2xl bg-purple-900 text-white py-4'>
                <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-phone"></i></span>
                <span className='flex text-lg font-normal'>Anonymous Chat</span>
              </button>
              <Link to='/faqs'  className='flex flex-col justify-center items-center gap-1 w-full rounded-2xl bg-purple-900 text-white py-4 col-span-2'>
                <span className='text-2xl px-5 flex py-2'><i className="fa-solid fa-question-circle"></i></span>
                <span className='flex text-lg font-normal'>Help / FAQS</span>
              </Link>
            </div>
          </div>
          {/* Main Section ends here */}
        </div>
      }
    </div>
  )
}

export default Dashboard;