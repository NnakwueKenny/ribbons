import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import ChatbotBtn from '../components/ChatbotBtn';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SearchLoader from '../components/SearchLoader';

// Sexual Assault Report Center Data
import SARCData from '../data/sarcData';

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
        toggleLoader();
    }, []);
    
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ foundLocation, setFoundLocation ] = useState('');
    const [ locationDetails, setLocationDetails ] = useState(['']);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ isSearched, setIsSearched ] = useState(false);

    const getSARCLoc = () => {
        console.log(searchQuery.length)
        setIsSearching(true);
        const targetData = SARCData.filter(item => item.state === searchQuery);
        console.log(targetData);
        setLocationDetails(targetData.length > 0? targetData[0].sarcCenters: [] );
        setIsSearched(true)
        setTimeout(() => {
            setIsSearching(false);
            setFoundLocation(searchQuery);
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
                    <div style={{fontFamily: `'Lato', sans-serif`}} className='w-full text-xl font-semibold text-purple-900'>SARC</div>
                </div>
                <p style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-500 text-md italic max-w-sm'>
                    Select your state/province to see SARC locations closest to you...
                </p>
                <form className='w-full max-w-sm flex gap-1'>
                    <div className='w-full'>
                        <select onChange={(e) => setSearchQuery(e.target.value)} className='capitalize border outline-none focus:ring-1 focus:ring-purple-900 focus:outline-none p-2.5 rounded-l-lg w-full text-gray-600'>
                            <option disabled selected value=''></option>
                            {
                                SARCData.map(dataItem => {
                                    return (
                                        <option className='capitalize'>{dataItem.state}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button onClick={getSARCLoc} type='button' className='flex items-center justify-center px-2 border border-gray-500 rounded-r-lg focus:ring-1 ring-purple-600'>Search</button>
                </form>
                {
                    isSearched &&
                    <div className='w-full h-full border-t mt-4 py-2 font-normal'>
                    {
                        isSearching?
                        <SearchLoader />
                        :
                        <div className='w-full'>
                            <h2 style={{fontFamily: `'Lato', sans-serif`}} className='text-gray-600 py-2 font-semibold'>SARC Locations found in <span className='capitalize'>{foundLocation}</span></h2>
                            { locationDetails.length > 0?
                                <div className='flex flex-col gap-4'>
                                    {
                                        locationDetails.map(location => {
                                            return (
                                                <div className='w-full shadow rounded-lg'>
                                                    <div className='w-full px-2 py-3'>
                                                        <p style={{fontFamily: `'Lato', sans-serif`}} className='font-semibold text-purple-900 uppercase text-md pb-2'>{location.name}</p>
                                                        <p className='text-sm'><span className='font-semibold'>Address: </span>{location.address}</p>
                                                        <p className='text-sm'><span className='font-semibold'>Phone: </span> <a className='underline text-purple-800' href={`tel:${location.phone}`}>{location.phone}</a></p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className='h-full flex justify-center items-center py-20 text-red-500 font-medium italic'>
                                    <p className='max-w-sm'>No SAR center found in your location. Please, select a different location closer to you.</p>
                                </div>
                            }
                        </div>
                    }
                    </div>
                }
            </div>
            {/* Main Section ends here */}

        </div>
      }
    </div>
  )
}

export default SARC