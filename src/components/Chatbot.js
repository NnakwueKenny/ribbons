import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';

// <script src="//code.tidio.co/8gqimlvow6hqsvqgtvr5vlaohfynjbyg.js" async></script>

const Chatbot = ({toggleShowChatbot}) => {
    const [ typedMessage, setTypedMessage ] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [ isValidNumber, setIsValidNumber ] = useState(false);
    const [ isFirstTime, setIsFirstTime ] = useState(false);
    const [ isOnline, setIsOnline ] = useState(true);
    const [ isTypingMessage, setIsTypingMessage ] = useState(false);
    const [ isTypingNumber, setIsTypingNumber ] = useState(false);
    const [ typedPhoneNumber, setTypedPhoneNumber] = useState('');

    const getUserData = () => {
        const user = JSON.parse(localStorage.getItem('ribbonsUser')) == null? {
            phone: '',
            loc: '',
            dept: ''
        }: JSON.parse(localStorage.getItem('ribbonsUser'));
        return user;
    }
    
    const [ userData, setUserData ] = useState(() => getUserData());
    const [ location, setLocation ] = useState('');
    const [ dept, setDept ] = useState(() => getUserData().dept);
    const [ isOnSession, setIsOnSession ] = useState(false);
    const [ isSelectDept, setIsSelectDept ] = useState(false);
    const [ showSessionBtn, setShowSessionBtn ] = useState(true);
    const [ chats, setChats ] = useState([]);

    const updateUserData = () => {
        localStorage.setItem('ribbonsUser', JSON.stringify(userData));
    }

    const checkNumber = () => {
        const data = getUserData();
        setPhoneNumber(data.phone);
        // setUserData(prevValue => {
        //     return {
        //         ...prevValue,
        //         phone: data.phone
        //     }
        // })
        setIsFirstTime(!data?.phone? false: true);
        setIsValidNumber(!data?.phone? false: true);
        setIsPhoneNumber(!data?.phone? false: true);
    }

    const addNumber = async () => {
        console.log('Userdata before number is added!', userData);
        setIsFirstTime(true);
        setPhoneNumber(typedPhoneNumber);
        setIsPhoneNumber(true);
        // localStorage.setItem('phoneNumber', JSON.stringify(typedPhoneNumber));
        setUserData(prevValue => {
            return {
                ...prevValue,
                phone: typedPhoneNumber
            }
        })
        setIsValidNumber(true);
    }

    const getGeoLocation = async (data) => {
        // extracting the latitude and longitude from the data
        let latitude = data.coords.latitude;
        let longitude = data.coords.longitude;

        console.log('Getting geolocation');
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=19.076111+72.877500&key=3fc01ec0efd54fec9f12d22b658a4752`,
        // fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3fc01ec0efd54fec9f12d22b658a4752`,
            {
                method: 'get',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const fetchedLocation = data.results[0].formatted.split(',').slice(-2);
            console.log(fetchedLocation);
            setUserData(prevValue => {
                return {
                    ...prevValue,
                    loc: `${fetchedLocation[0]}, ${fetchedLocation[1]}`
                }
            })
            setLocation(`${fetchedLocation[0]}, ${fetchedLocation[1]}`);
        })
        .catch(err => console.log(err));
    }
    
    const getUserLoc = () => {
        if (userData.loc !== '') {
            setLocation(userData.loc)
        } else {
            console.log('No location');
            console.log('Getting Location!');
            if (navigator.geolocation) {
                window.navigator.geolocation
                    .getCurrentPosition(getGeoLocation, console.error);
            } else {
                // alert('Location is required! Reload Page to activate');
                // return false;
            }
        }
    }

    const updateDept = (dept) => {
        if (dept) {
            console.log(dept);
            setUserData(prevValue => {
                return {
                    ...prevValue,
                    dept: dept
                }
            })
            setDept(dept);
            setIsSelectDept(true);
            setIsOnSession(false)
        } else {
            console.log('Wow!!!!!!2')
            fetch('http://localhost:3500/all-chats/current-chat/',
                {
                    method: 'post',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "phone": `${phoneNumber}`,  //${phoneNumber} +2348064110208
                        "sessionEnded": false
                      })
                }
            )
            .then(response => response.json())
            .then(data => {
                if (data.noUser) {
                    setDept('');
                    setIsOnSession(false);
                    setIsSelectDept(false);
                } else {
                    console.log(data);
                    setUserData(prevValue => {
                        return {
                            ...prevValue,
                            dept: data.user.message.length < 1? '': data.user.message[data.user.message.length - 1].dept
                        }
                    })
                    setDept(data.user.message.length < 1? '': data.user.message[data.user.message.length - 1].dept);
                    setIsSelectDept(true);
                    setIsOnSession(true);
                }
            })
        }
    }

    const getDept = () => {
        if (userData.dept) {
            console.log('Wow!!!!!!1')
            setDept(userData.dept);
            setIsSelectDept(true);
            setIsOnSession(true);
        } else {
            updateDept()
        }
    }

    const getSessionStatus = (status) => {
        console.log('Getting session');
        getMessages(status);
    }

    const getMessages = (sessionStatus) => {
        fetch(`https://ribbons.onrender.com/all-chats/current-chat`,
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    sessionEnded: sessionStatus? sessionStatus: false
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setChats(data.user? data.user.message: []);
        })
        .catch(err => console.log(err))
    }

    const sendMessage = (message) => {
        console.log(phoneNumber)
        fetch('https://ribbons.onrender.com/user/chat/', {
            method: 'post',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: phoneNumber,
                receiver: 'receiver',
                msg: message,
                dept: dept,
                loc: location,
                status: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTypedMessage('');
            // getMessages();
            setChats(data.user? data.user.message: []);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        checkNumber();
        getUserLoc();
        getDept();
        // getMessages();
    }, []);

    useEffect(() => {
        updateUserData();
    }, [userData])

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
                        <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>Hi ! Welcome to Ribbons...</div>
                    </div>
                    <div className='flex justify-start px-2 mb-1'>
                        <div className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>Please provide your phone number.</div>
                    </div>
                    {
                        isPhoneNumber &&
                        <>
                            <div className='flex justify-end px-2 mb-1'>
                                <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>{phoneNumber}</div>
                            </div>
                            {
                                !location?
                                <div className='px-2 mb-1'>
                                    <span className='flex justify-center text-center text-gray-700 font-semibold italic py-1'>Please, we need your location to be able to assist you.</span>
                                    <button onClick={ () =>  getUserLoc()} className='border border-purple-900 rounded-xl text-purple-900 hover:text-white hover:bg-purple-900 w-full py-2'>Enable location</button>
                                </div>
                                :
                                <>
                                {
                                    dept === ''?
                                    <div className='flex flex-col gap-3 px-2 mb-1'>
                                        <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>How may I help you today?</div>
                                        <div className='grid grid-cols-2 gap-3 place-items-center'>
                                            <button onClick={(e) => updateDept(e.target.textContent)} className='flex w-full max-w-[150px] justify-center text-center border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none capitalize'>medical</button>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        {
                                            isOnSession && showSessionBtn?
                                            <div className='flex gap-4 justify-center'>
                                                <button onClick={() => { setShowSessionBtn(false); getSessionStatus(false)}} className='border border-purple-900 rounded-xl text-purple-900 hover:text-white hover:bg-purple-900 w-full max-w-[150px] py-1 text-sm font-semibold'>Previous Session</button>
                                                <button onClick={() => { setShowSessionBtn(false); getSessionStatus(true)}} className='border border-purple-900 rounded-xl text-purple-900 hover:text-white hover:bg-purple-900 w-full max-w-[150px] py-1 text-sm font-semibold'>Start new Session</button>
                                            </div>
                                            :
                                            <div></div>
                                        }
                                        <div className='flex justify-start px-2 mb-1'>
                                            <div  className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>How may I help you?</div>
                                        </div>
                                    </>
                                }</>
                            }
                        </>
                    }
                    
                    {
                        chats.map(item => {
                            return  (item.status === 'sent'?
                                    <div className='flex justify-end px-2 mb-1'>
                                        <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>{item.content}</div>
                                    </div>
                                    :
                                    <div className='flex justify-start px-2 mb-1'>
                                        <div className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>{item.content}</div>
                                    </div>)
                        })

                    /*
                        <div className='flex justify-start px-2 mb-1'>
                            <div className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>message</div>
                        </div>
                        :
                        <div className='flex justify-end px-2 mb-1'>
                            <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>message</div>
                        </div>
                    */
                    }
                </div>
            </div>
            
            <div className='flex flex-col gap-3 w-full py-3 px-2'>
                {
                    isValidNumber &&
                    <div className='relative flex w-full rounded-xl overflow-hidden'>
                        {
                            (isSelectDept && !showSessionBtn) &&
                            <>
                                <label className='sr-only'></label>
                                <input onChange={(e) => {setIsTypingMessage(e.target.value.length>0? true: false);  setTypedMessage(e.target.value)}} value={typedMessage} type='text' placeholder='Send a message...' className={`w-full border-none ring-0 outline-0 focus:ring-0 text-gray-600 `} />
                                <button onClick={() => typedMessage.length> 0? sendMessage(typedMessage): console.log('Please Type something')} type='button' className={`absolute top-0 right-0 h-full flex justify-center items-center px-3 ${isTypingMessage? 'text-purple-700': 'text-gray-400'} bg-white`}><i className='fa fa-paper-plane'></i></button>
                            </>
                        }
                    </div>
                }
                {
                    !isValidNumber &&
                    <div className='relative flex w-full rounded-xl overflow-hidden'>
                        <label className='sr-only'></label>
                        <input onChange={(e) => {setIsTypingNumber(e.target.value); setTypedPhoneNumber(e.target.value)}} type='text' placeholder='Phone Number...' className='w-full border-none ring-0 outline-0 focus:ring-0 text-gray-600' />
                        <button onClick={() => addNumber()} type='button' className={`absolute top-0 right-0 h-full flex justify-center items-center px-3 ${isTypingNumber? 'text-purple-700': 'text-gray-400'} bg-white`}><i className='fa fa-paper-plane'></i></button>
                    </div>
                }
            </div>
        </div>
        <script src="//code.tidio.co/8gqimlvow6hqsvqgtvr5vlaohfynjbyg.js" async></script>
    </div>
  )
}

export default Chatbot