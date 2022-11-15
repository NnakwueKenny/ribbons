import React from 'react'

const ChatbotBtn = ({toggleShowChatbot}) => {
  return (
    <button onClick={toggleShowChatbot} className='z-50 absolute animate-pulse flex justify-center items-center bottom-6 right-6 w-14 h-14 text-2xl bg-white text-violet-900 rounded-full border border-violet-900 shadow-3xl pt-3'>
      <span className='animate-bounce'><i className='fa fa-message'></i></span>
    </button>
  )
}

export default ChatbotBtn