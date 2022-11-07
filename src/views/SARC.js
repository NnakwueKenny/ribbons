import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SearchLoader from '../components/SearchLoader';

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

    
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ foundLocation, setFoundLocation ] = useState('');
    const [ isSearching, setIsSearching ] = useState(false);
    const getSARCLoc = () => {
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            setFoundLocation(searchQuery)
        }, 2000)
    }

  return (
    <div className='h-full overflow-auto w-full py-4'>
      {showChatbot && <Chatbot toggleShowChatbot={toggleShowChatbot}/>}
      { !showChatbot &&
        <ChatbotBtn toggleShowChatbot={toggleShowChatbot}/>
      }
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
                    <div style={{fontFamily: `'Lato', sans-serif`}} className='w-full text-xl font-semibold text-violet-900'>SARC</div>
                </div>
                <p style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-500 text-md italic max-w-sm'>
                    Select your state/province to see SARC locations closest to you...
                </p>
                <form className='w-full max-w-sm flex gap-1'>
                    <div className='w-full'>
                        <select onChange={(e) => setSearchQuery(e.target.value)} className='border outline-none focus:ring-1 focus:ring-violet-900 focus:outline-none p-2.5 rounded-l-lg w-full text-gray-600'>
                            <option disabled value=''>Select</option>
                            <option>Abuja</option>
                            <option>Anambra</option>
                            <option>Kano</option>
                            <option>Lagos</option>
                            <option>Plateau</option>
                            <option>Rivers</option>
                        </select>
                    </div>
                    <button onClick={getSARCLoc} type='button' className='flex items-center justify-center px-2 border border-gray-500 rounded-r-lg focus:ring-1 ring-violet-600'>Search</button>
                </form>
                <div className='w-full h-full border-t mt-4 py-2 font-normal'>
                    {
                        isSearching?
                        <SearchLoader />
                        :
                        <div className='w-full'>
                            <h2 style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-500 py-2'>SARC Locations found in {foundLocation}</h2>
                            <div className='flex flex-col gap-4'>
                                <div className='w-full shadow rounded-lg'>
                                    <div className='w-full px-2 py-3'>
                                        <p style={{fontFamily: `'Lato', sans-serif`}} className='font-semibold text-violet-900 uppercase text-md pb-2'>Aminu Kano Teaching Hospital, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Address: </span>No. 5 New Hospital Road, Gyadi-Gayadi, Tarauni LGA, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Phone: </span> +2348137926904</p>
                                    </div>
                                </div>
                                <div className='w-full shadow rounded-lg'>
                                    <div className='w-full px-2 py-3'>
                                        <p style={{fontFamily: `'Lato', sans-serif`}} className='font-semibold text-violet-900 uppercase text-md pb-2'>Aminu Kano Teaching Hospital, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Address: </span>No. 5 New Hospital Road, Gyadi-Gayadi, Tarauni LGA, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Phone: </span> +2348137926904</p>
                                    </div>
                                </div>
                                <div className='w-full shadow rounded-lg'>
                                    <div className='w-full px-2 py-3'>
                                        <p style={{fontFamily: `'Lato', sans-serif`}} className='font-semibold text-violet-900 uppercase text-md pb-2'>Aminu Kano Teaching Hospital, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Address: </span>No. 5 New Hospital Road, Gyadi-Gayadi, Tarauni LGA, Kano</p>
                                        <p className='text-sm'><span className='font-semibold'>Phone: </span> +2348137926904</p>
                                    </div>
                                </div>
                            </div>
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

export default SARC