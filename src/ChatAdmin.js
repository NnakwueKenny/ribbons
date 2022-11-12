import React, { useEffect, useState } from 'react';

const ChatAdmin = (number) => {
    const getUser = () => {
        console.log('[Hello')
    }
    const [ messages, setMessages ] = useState([
            {"sender":"08114528984","receiver":"easetour","msg":"how are you"},
            {"sender":"easetour","receiver":"08114528984","msg":"how are you"},
            {"sender":"08114528984","receiver":"easetour","msg":"where you dey now, i dey wait oo"},
            {"sender":"08114528984","receiver":"easetour","msg":"call me"},
            {"sender":"easetour","receiver":"08114528984","msg":"okay"},
            {"sender":"easetour","receiver":"08114528984","msg":"okay"}
            ]);
    const getMessages = () => {
        fetch('https://ribbons.rf.gd/ribbonsapi/api/sms/read.php',
            {
                method: 'post',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getMessages();
    }, []);
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='text-xl font-bold shadow-lg py-3 text-gray-500 border-y'>Ease Tour Admin</div>
        <div className='w-full mb-auto flex flex-col divide-y border-y mt-4 px-3'>
            <button onClick={() => getUser('08137926904')} className='py-2 w-full flex items-center gap-5 text-start'>
                <div>
                    <span className='flex items-center justify-center text-2xl text-gray-700 w-14 h-14 border rounded-full'><i className='fa fa-user'></i></span>
                </div>
                <div>
                    <span>08137926904</span>
                </div>
            </button>
        </div>
    </div>
  )
}

export default ChatAdmin;