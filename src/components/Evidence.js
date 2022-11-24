import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Webcam from 'react-webcam';
const WebcamComponent = () => <Webcam />;

const Evidence = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isCapturing, setIsCapturing ] = useState(false);
    const [ gbvImages, setGbvImages ] = useState([]);
    const [ cameraFacingMode, setCameraFacingMode ] = useState('user');
    const [picture, setPicture] = useState('')
    const webcamRef = useRef(null);
    const [enableUpload, setEnableUpload ] = useState(false);
    
    const videoConstraints = {
        video: {
            width: {
              min: 640,
              ideal: 1920,
              max: 2560,
            },
            height: {
              min: 1280,
              ideal: 1080,
              max: 1440
            },
        },
        facingMode: cameraFacingMode,
    }
    const capture = useCallback(() => {
      const pictureSrc = webcamRef.current.getScreenshot()
      setPicture(pictureSrc);
      setTimeout(() => {
        uploadImage(pictureSrc);
      }, 1000)
    });

    const clearCapture = () => {
        setPicture('');
        setIsCapturing(false);
        console.log('Capture Stopped!')
    }

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
    
    const getLocalImages = () => {
        return JSON.parse(localStorage.getItem('gbv-images'));
    }

    const appendImages = () => {
        setGbvImages(getLocalImages() === null ? [] : getLocalImages());
    }

    const uploadImage = (e) => {
        const reader = new FileReader();
        const imageFromLocal = getLocalImages() === null ? [] : getLocalImages();
        if (e.files) {
            reader.readAsDataURL(e.files[0]);
            reader.addEventListener('load', () => {
                imageFromLocal.push(reader.result);
                localStorage.setItem('gbv-images', JSON.stringify(imageFromLocal));
                setGbvImages(imageFromLocal);
            })
        } else {
            imageFromLocal.push(e);
            localStorage.setItem('gbv-images', JSON.stringify(imageFromLocal));
            setGbvImages(imageFromLocal);
        }
    }
    useEffect(() => {
        toggleLoader();
        appendImages();
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
                    <button onClick={() => {setEnableUpload(prevValue => !prevValue)}} htmlFor='upload-image' className='shadow w-full flex justify-center items-center gap-2 py-2 text-gray-600 hover:text-purple-900 hover:shadow-md'>
                        <span className='flex'><i className='fa fa-plus'></i></span>
                        <span className='flex font-semibold py-2'>Upload Evidence</span>
                    </button>
                    <input type='file' accept='image/png, image/jpg, image/jpeg' className='file-uploader sr-only' onChange={(e) => uploadImage(e.target)} />
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
                                    <div className='h-full w-full'>
                                        {picture === '' ? (
                                            <Webcam
                                                audio={false}
                                                ref={webcamRef}
                                                className='w-full h-full object-cover'
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={videoConstraints}
                                            />
                                        ) : (
                                            <img alt='' src={picture} className='w-full h-full object-cover'/>
                                        )}
                                    </div>
                                </div>
                                <div className='absolute w-full bottom-8 flex justify-around'>
                                    <button onClick={() => setCameraFacingMode(prevValue => !prevValue)} className='flex items-center justify-center text-3xl bg-gray-300 text-gray-900 border h-14 w-14 rounded-full'>
                                        <span className='flex'><i className='fa fa-camera-rotate'></i></span>
                                    </button>
                                    <button onClick={(e) => { e.preventDefault(); capture() }} className='flex items-center justify-center text-3xl bg-gray-300 text-purple-900 border h-14 w-14 rounded-full'>
                                        <span className='flex'><i className='fa fa-camera'></i></span>
                                    </button>
                                    <button onClick={() => { clearCapture()}} className='flex items-center justify-center text-3xl bg-gray-300 text-red-600 border h-14 w-14 rounded-full'>
                                        <span className='flex'><i className='fa fa-times'></i></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        gbvImages.length !== 0 ?
                        <div className='w-full grid grid-cols-2 gap-3'>
                            {
                                gbvImages.map(item => {
                                    return  <div className='w-full h-44 border rounded-lg overflow-hidden'>
                                                <img alt='er' className='w-full h-full' src={item} />
                                            </div>
                                })
                            }
                        </div>
                        :
                        <div className='h-full w-full flex flex-col justify-center items-center gap-4 text-gray-500'>
                            <button onClick={() => setEnableUpload(prevValue => !prevValue)} className='h-24 w-24 border-2 hover:text-purple-900 hover:border-purple-900 rounded-full flex justify-center items-center text-4xl'><i className='fa-regular fa-image'></i></button>
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