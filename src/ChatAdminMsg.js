import React from 'react';
import { Link } from 'react-router-dom';

const ChatAdminMsg = (number) => {
    console.log(number)
    const sendMessage = () => {
        fetch('',
        {
            headers: {
                accept: 'application/json',
            },
            body: JSON.stringify(
                {
                    msg: '',
                    sender: 'easetour',
                    receiver: number
                }
            )
        }
        )
    }
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
                <div className='relative flex justify-start px-2 mb-1'>
                    <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>Hi! Welcome to Ribbons...</div>
                </div>
                <div className='flex justify-end px-2 mb-1'>
                    <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tr-none'>Hello</div>
                </div>
                <div className='relative flex justify-start px-2 mb-1'>
                    <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>Hi! Welcome to Ribbons...</div>
                </div>
                <div className='flex justify-end px-2 mb-1'>
                    <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tr-none'>Hello</div>
                </div>
            </div>
        </div>
        <div className='w-full'>
            <form className='flex py-2 px-4 w-full'>
                <div className='w-full relative'>
                    <label className='sr-only'>Send Message</label>
                    <input type='text' className='w-full rounded-xl'/>
                    <button onClick={() => sendMessage('08137926904')} type='button' className='absolute h-full px-3 text-teal-600 right-0'><i className='fa fa-paper-plane'></i></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChatAdminMsg;