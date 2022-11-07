import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

const SARC = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isTyping, setIsTyping ] = useState(false);
  
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
    }, []);

  return (
    <div className='h-full overflow-auto w-full py-4'>
      {showChatbot && <Chatbot toggleShowChatbot={toggleShowChatbot}/>}
      { !showChatbot &&
        <ChatbotBtn toggleShowChatbot={toggleShowChatbot}/>
      }
      {
        isLoading ?
        <Loader />:
        <div className='flex flex-col gap-4 w-full items-center px-3'>
            {/* Navbar starts here */}
            <Navbar />
            {/* Navbar ends here */}

            {/* Main Section starts here */}
            <div className='flex flex-col gap-4 w-full items-center px-1'>
                <div className='flex w-full text-gray-600 text'>
                    <Link to='/'><i className='fa fa-arrow-left'></i></Link>
                    <div className='w-full text-xl font-semibold'>SARC</div>
                </div>
                <p style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-600 text-xl italic font-bold'>
                    Select any SARC closest to you
                </p>
                <form className='w-full max-w-sm'>
                    <div className='relative flex'>
                        <label className='sr-only'>SARC Location...</label>
                        <input onChange={(e) => setIsTyping(e.target.value.length>0? true: false)} className='border outline-none p-2.5 rounded-lg w-full' placeholder='Your location...'/>
                        <button type='button' className={`${isTyping? 'text-violet-700': 'text-gray-400'} absolute right-0 h-full px-3 text-violet-700`}><i className='fa fa-search'></i></button>
                    </div>
                </form>
                <div className='w-full'>
                <div className=''>
                </div>
                </div>
            </div>
            {/* Main Section ends here */}

        </div>
      }
    </div>
  )
}

export default SARC