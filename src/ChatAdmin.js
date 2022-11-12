import React, { useEffect, useState } from 'react';
import { Link, redirect } from "react-router-dom";

const ChatAdmin = () => {
    const getUser = (number) => {
        console.log(number)
        redirect(`/chat-admin-msg/:${number}`);
    }
    const [ messages, setMessages ] = useState([
            {"sender":"08114528984","receiver":"easetour","msg":"how are you"},
            {"sender":"easetour","receiver":"08137926904","msg":"how are you"},
            {"sender":"08037386998","receiver":"easetour","msg":"where you dey now, i dey wait oo"},
            {"sender":"08114528984","receiver":"easetour","msg":"call me"},
            {"sender":"easetour","receiver":"08114528984","msg":"okay"},
            {"sender":"easetour","receiver":"08114528984","msg":"okay"}
            ]);
    const getMessages = () => {
        let responseMessage;
        fetch('https://ribbons.rf.gd/ribbonsapi/api/sms/read.php',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            console.log(response)
            responseMessage = response.status;
            return response.json();
        })
        .then(data => console.log(data))
        .catch(err => {
            console.log(err);
            console.log(responseMessage);
        })
    }

    useEffect(() => {
        getMessages();
    }, []);
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='text-xl font-bold shadow-lg py-3 text-gray-500 border-y'>Ease Tour Admin</div>
        <div className='w-full mb-auto flex flex-col divide-y border-y mt-4 px-3'>
            {
                messages.map(message => {
                    if (message.sender !== 'easetour') {
                        return (
                            <Link to={`/chat-admin-msg/:${message.sender}`} className='py-2 w-full flex items-center gap-5 text-start'>
                                <div>
                                    <span className='flex items-center justify-center text-2xl text-gray-700 w-14 h-14 border rounded-full'><i className='fa fa-user'></i></span>
                                </div>
                                <div>
                                    <span>{message.sender}</span>
                                </div>
                            </Link>
                        )
                    } else {return (
                        <Link to={`/chat-admin-msg/:${message.receiver}`} className='py-2 w-full flex items-center gap-5 text-start'>
                            <div>
                                <span className='flex items-center justify-center text-2xl text-gray-700 w-14 h-14 border rounded-full'><i className='fa fa-user'></i></span>
                            </div>
                            <div>
                                <span>{message.receiver}</span>
                            </div>
                        </Link>
                    )
                    }
                })
            }
        </div>
    </div>
  )
}

export default ChatAdmin;