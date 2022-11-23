import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SearchLoader from '../components/SearchLoader';

const Evidence = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ savedImages, setSavedImages] = useState(false);
    const [ isCapturing, setIsCapturing ] = useState(false);
    
    const toggleLoader = () => {
      setTimeout(()=> {
        setIsLoading(false);
      }, 2000)
    }
    
    const [ showChatbot, setShowChatbot ] = useState(false);
    const toggleShowChatbot = () => {
        setShowChatbot(prevValue => !prevValue)
    }

    const uploadFromDevice = () => {
        document.querySelector('.file-uploader').click();
    }

    const [enableUpload, setEnableUpload ] = useState(false);

    const uploadImage = (e) => {
        const reader = new FileReader();
        const getLocalimages = () => {
            return JSON.parse(localStorage.getItem('gbv-images'))
        }
        reader.addEventListener('load', () => {
            const imageFromLocal = getLocalimages() === null ? [] : getLocalimages();
            console.log(imageFromLocal)
        })
        console.log(e.files );
    }
    
    useEffect(() => {
        toggleLoader();
    }, []);

  return (
    <div className='h-full overflow-auto w-full flex flex-col py-4'>
      {showChatbot && <Chatbot toggleShowChatbot={toggleShowChatbot}/>}
      {
        isLoading ?
        <Loader />:
        <div className='flex flex-col gap-4 w-full h-full items-center px-3'>
            {/* Navbar starts here */}
            <Navbar />
            {/* Navbar ends here */}

            {/* Main Section starts here */}
            <div className='flex flex-col gap-4 w-full h-full items-center px-1'>
                <div className='relative w-full flex flex-col gap-2'>
                    <div className='flex w-full text-gray-600 text'>
                        <Link to='/'><i className='fa fa-arrow-left'></i></Link>
                        <div style={{fontFamily: `'Lato', sans-serif`}} className='w-full text-xl font-semibold text-purple-900'>Evidence</div>
                    </div>
                    <button onClick={() => setEnableUpload(true)} htmlFor='upload-image' className='shadow w-full flex justify-center items-center gap-2 py-2 text-gray-600 hover:text-purple-900 hover:shadow-md'>
                        <span className='flex'><i className='fa fa-plus'></i></span>
                        <span className='flex font-semibold py-2'>Upload Evidence</span>
                    </button>
                    <input type='file' accept='image/png, image/jpg, image/jpeg' className='file-uploader sr' onChange={(e) => uploadImage(e.target)} />
                    {
                        enableUpload &&
                        <div className='absolute -bottom-16 z-10 bg-white shadow border w-full h-14 p-4 flex items-center justify-center divide-x rounded-md'>
                            <button onClick={() => { setIsCapturing(true); setEnableUpload(false)}} className='flex w-full justify-center'>Camera</button>
                            <button onClick={() => { uploadFromDevice(); setEnableUpload(false)}} className='flex w-full justify-center'>From Device</button>
                        </div>
                    }
                </div>
                <div className='relative w-full h-full py-4'>
                    {
                        isCapturing &&
                        <div className='absolute top-3 left-0 h-full w-full bg-white shadow'>
                            <div className='relative w-full h-full'>
                                <div className='absolute w-full h-full rounded-lg overflow-hidden'>
                                    <img alt='' className='w-full h-full' src='https://images.pexels.com/photos/5274935/pexels-photo-5274935.jpeg?auto=compress&cs=tinysrgb&w=600' />
                                </div>
                                <div className='absolute w-full bottom-8 flex justify-around'>
                                    <button className='flex items-center justify-center text-3xl bg-gray-300 text-purple-900 border h-14 w-14 rounded-full'>
                                        <span className='flex'><i className='fa fa-camera'></i></span>
                                    </button>
                                    <button onClick={() => setIsCapturing(false)} className='flex items-center justify-center text-3xl bg-gray-300 text-red-600 border h-14 w-14 rounded-full'>
                                        <span className='flex'><i className='fa fa-times'></i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !savedImages ?
                        <div className='w-full grid grid-cols-2 gap-3'>
                            <div className='w-full h-44 border rounded-lg overflow-hidden'>
                                <img alt='er' className='w-full h-full' src='https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?auto=compress&cs=tinysrgb&w=600' />
                            </div>
                            <div className='w-full h-44 border rounded-lg overflow-hidden'>
                                <img alt='er' className='w-full h-full' src='https://images.pexels.com/photos/5699780/pexels-photo-5699780.jpeg?auto=compress&cs=tinysrgb&w=600' />
                            </div>
                            <div className='w-full h-44 border rounded-lg overflow-hidden'>
                                <img alt='er' className='w-full h-full' src='https://images.pexels.com/photos/673862/pexels-photo-673862.jpeg?auto=compress&cs=tinysrgb&w=600' />
                            </div>
                            <div className='w-full h-44 border rounded-lg overflow-hidden'>
                                <img alt='er' className='w-full h-full' src='https://images.pexels.com/photos/7322293/pexels-photo-7322293.jpeg?auto=compress&cs=tinysrgb&w=600' />
                            </div>
                        </div>
                        :
                        <div className='h-full w-full flex flex-col justify-center items-center gap-4 text-gray-500'>
                            <button className='h-24 w-24 border-2 hover:text-purple-900 hover:border-purple-900 rounded-full flex justify-center items-center text-4xl'><i className='fa-regular fa-image'></i></button>
                            <span className='text-lg text-purple-900 font-semibold'>No Evidence uploaded yet!</span>
                        </div>
                    }
                </div>
            </div>
            {/* Main Section ends here */}

        </div>
      }
    </div>
  )
}

export default Evidence