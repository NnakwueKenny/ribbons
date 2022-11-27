import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ChatAdminMsg = () => {
    const { number } = useParams();
    const [ chats, setChats ] = useState([]);
    const [ typedMessage, setTypedMessage ] = useState('')

    const sendMessage = (message) => {
        fetch('https://timmyedibo.pythonanywhere.com/api/chats/', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sent_by: "+2347067272110",
                sent_to: `${number}`,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            setTypedMessage('');
            getMessages();
        })
        .catch(err => console.log(err))
    }

    const getMessages = () => {
        fetch(`https://timmyedibo.pythonanywhere.com/api/chats/${number}`)
        .then(response => response.json())
        .then(data => {
            setChats(data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getMessages();
    }, []);

  return (
    <div className='w-full h-full flex flex-col'>
        <Link to='/chat-admin' className='absolute h-14 flex items-center px-3 text-gray-600 hover:text-purple-900'><i className='fa fa-arrow-left'></i></Link>
        <div className='text-xl font-bold shadow-lg py-3 text-gray-500 border-y'>Ease Tour Admin</div>
        <div className='w-full mb-auto flex flex-col divide-y px-3 h-ful overflow-auto'>
            <div style={{fontFamily: `'Lato', sans-serif`}} className='flex flex-col py-2 w-full h-full overflow-auto gap-2 rounded-lg'>
                <div className='relative flex justify-center py-1'>
                    <div className='absolute w-full border top-[50%] z-20'></div>
                    <span className='bg-gray-500 px-3 py-1 rounded-lg text-xs text-white z-30'>Today</span>
                </div>
                <div className='flex justify-end px-2 mb-1'>
                    <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>Hi ! Welcome to Ribbons...</div>
                </div>
                <div className='flex justify-end px-2 mb-1'>
                    <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>Please provide your phone number.</div>
                </div>
                <div className='relative flex justify-start px-2 mb-1'>
                    <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>{number}</div>
                </div>
                {
                    chats.filter(item => (item.sent_by === '+2347067272110' && item.sent_to === number) || (item.sent_by === number && item.sent_to === '+2347067272110')).map(data => 
                        data.sent_by === number?
                        <div className='flex justify-start px-2 mb-1'>
                            <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>{data.message.split('[')[0]}</div>
                        </div>
                        :
                        <div className='flex justify-end px-2 mb-1'>
                            <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>{data.message.split('[')[0]}</div>
                        </div>
                )
                }
            </div>
        </div>
        <div className='w-full'>
            <div className='flex py-2 px-4 w-full'>
                <div className='w-full relative'>
                    <label className='sr-only'>Send Message</label>
                    <input onChange={(e) => setTypedMessage(e.target.value)} value={typedMessage} type='text' className='w-full rounded-xl' placeholder='Your message...'/>
                    <button type='button' onClick={() => sendMessage(typedMessage)} className='absolute h-full px-3 text-teal-600 right-0'><i className='fa fa-paper-plane'></i></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatAdminMsg;