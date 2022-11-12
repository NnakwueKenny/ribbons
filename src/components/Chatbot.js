import React, { useState } from 'react';
import logo from '../images/logo.png';

// <script src="//code.tidio.co/8gqimlvow6hqsvqgtvr5vlaohfynjbyg.js" async></script>

const Chatbot = ({toggleShowChatbot}) => {
    const [ isOnline, setIsOnline ] = useState(true);
    const [ isTyping, setIsTyping ] = useState(false);
    const [ userResponses, setUserResponses ] = useState([`1`]);
    const [ botResponses, setBotResponses ] = useState([``]);
    const [ conversation, setConversation ] = useState([]);
    const [ typedMessage, setTypedMessage ] = useState('');
    const [ clickedMessage, setClickedMessage ] = useState('');

    const updateConversation = () => {

    }

  return (
    <div className='absolute h-full overflow-hidden top-0 left-0 z-40 w-full flex pt-5 px-2 pb-2'>
        <div className='relative flex flex-col bg-gray-100 w-full h-full shadow-xl rounded-t-2xl rounde overflow-hidden' data-aos="fade-up-left" data-aos-anchor-placement="center-bottom" >
            <button className='absolute right-7 top-3 text-purple-900' onClick={toggleShowChatbot}><i className='fa fa-times'></i></button>
            <div className='flex flex-col shadow'>
                <div className='flex items-center text-white p-2 gap-4'>
                    <div className='relative flex justify-center items-center px-1 w-12 h-12 rounded-full shadow-lg border border-purple-700'>
                        <div className='absolute top-0 -right-[-2px]'>
                            {
                                isOnline?
                                <span className='flex w-2.5 h-2.5 rounded-full bg-green-400'></span>
                                :
                                <span className='flex w-2.5 h-2.5 rounded-full bg-gray-400'></span>
                            }
                        </div>
                        <img src={logo} alt='ribbons logo'/>
                    </div>
                    <div style={{fontFamily: `'Lato', sans-serif`}} className='text-purple-900 font-semibold h-full'>Ribbons Chatbot</div>
                </div>
            </div>
            <div className='flex flex-col justify-end px-2 h-full bg-white overflow-auto'>
                <div style={{fontFamily: `'Lato', sans-serif`}} className='flex flex-col py-2 w-full h-full gap-2 rounded-lg'>
                    <div className='mb-auto'></div>
                    <div className='relative flex justify-center py-1'>
                        <div className='absolute w-full border top-[50%] z-20'></div>
                        <span className='bg-gray-500 px-3 py-1 rounded-lg text-xs text-white z-30'>Today</span>
                    </div>
                    <div className='flex justify-start px-2 mb-1'>
                        <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>Hi! Welcome to Ribbons...</div>
                    </div>
                    <div className='flex justify-end px-2 mb-1'>
                        <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tr-none'>Hello</div>
                    </div>
                </div>
            </div>
            
            <form className='flex w-full py-3 px-2'>
                <div className='relative flex w-full rounded-xl overflow-hidden'>
                    <label className='sr-only'></label>
                    <input onChange={(e) => setIsTyping(e.target.value.length>0? true: false)} type='text' placeholder='Send a message...' className='w-full border-none ring-0 outline-0 focus:ring-0 text-gray-600' />
                    <button type='button' className={`absolute top-0 right-0 h-full flex justify-center items-center px-3 ${isTyping? 'text-purple-700': 'text-gray-400'} bg-white`}><i className='fa fa-paper-plane'></i></button>
                </div>
            </form>
        </div>
        <script src="//code.tidio.co/8gqimlvow6hqsvqgtvr5vlaohfynjbyg.js" async></script>
    </div>
  )
}

export default Chatbot