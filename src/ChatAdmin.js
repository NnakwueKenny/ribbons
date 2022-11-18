import React, { useEffect, useState } from 'react';
import { Link, redirect } from "react-router-dom";

const ChatAdmin = () => {
    const [ users, setUsers ] = useState([]);

    const getMessages = () => {
        fetch('https://timmyedibo.pythonanywhere.com/api/users/')
        .then(response =>  {
            return response.json()
        })
        .then(data => {
            const filteredUsers = data.filter(item => {
                if (item.is_superuser === false) {
                    return item.phone_number
                }
            } )
            setUsers(filteredUsers)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getMessages();
    }, []);
    
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='text-xl font-bold shadow-lg py-3 text-gray-500 border-y'>Ease Tour Chat Admin</div>
        <div className='w-full mb-auto flex flex-col divide-y border-y pt-4 h-full overflow-auto px-3'>
            {
                users.map((user, index) => {
                    return (
                        <Link key={index} to={`/chat-admin-msg/${user.phone_number}`} className='py-2 w-full flex items-center gap-5 text-start'>
                            <div>
                                <span className='flex items-center justify-center text-2xl text-gray-700 w-14 h-14 border rounded-full'><i className='fa fa-user'></i></span>
                            </div>
                            <div>
                                <span>{user.phone_number}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ChatAdmin;