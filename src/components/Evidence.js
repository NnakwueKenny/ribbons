import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SearchLoader from '../components/SearchLoader';

const Evidence = () => {
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
        toggleLoader();
    }, []);
  return (
    <div className='h-full overflow-auto w-full py-4'>
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
                <div className='flex w-full text-gray-600 text'>
                    <Link to='/'><i className='fa fa-arrow-left'></i></Link>
                    <div style={{fontFamily: `'Lato', sans-serif`}} className='w-full text-xl font-semibold text-purple-900'>Evidence</div>
                </div>
                <div>
                    
                </div>
            </div>
            {/* Main Section ends here */}

        </div>
      }
    </div>
  )
}

export default Evidence