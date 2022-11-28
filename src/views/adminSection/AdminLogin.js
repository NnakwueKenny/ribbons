import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import Loader from '../../components/Loader';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginMessage, setLoginMessage ] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showLoader, setShowLoader ] = useState(false);

  const toggleMessageContent = (setTarget, message) => {
    setTarget(message);
    setTimeout(() => {
      setTarget('')
    }, 2000)
  }

  const login = () => {
    setIsLoading(true);
    fetch('http://localhost:3500/admin/login',
        {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data)
        if (data.err) {
          toggleMessageContent(setLoginMessage, data.err);
          setLoginStatus(false);
        } else {
          toggleMessageContent(setLoginMessage, data.message);
          setLoginStatus(true);
          localStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
          localStorage.setItem('adminUsername', JSON.stringify(username));
          setTimeout(() => {
            setShowLoader(true);
          }, 2000);
          setTimeout(() => {
            navigate('/admin');
          }, 4000)
        }
        setIsLoading(false);
    })
    .catch(err => {
      console.log(err)
      toggleMessageContent(setLoginMessage, 'Login failed');
      setLoginStatus(false);
    })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bWFuaXRhcmlhbnNlcnZjYW1wbWFoYXJhc2giLCJpYXQiOjE2Njk1NjEzMjAsImV4cCI6MTY3MDE2NjEyMH0.1flPPKkBNYbJHlOu4njWzzuiabA8rxhWW-rJ0MKgEqI
}
  return (
    <div className='w-full h-full flex justify-center items-center'>
      {
        showLoader?
        <Loader />
        :
        <div data-scroll className="promo relative w-full flex max-w-4xl flex-col items-center py-4 px-6 shadow rounded-3xl">
          <div className='w-full max-w-[100px] h-30px'>
            <img alt='' src={logo} />
          </div>
          <h2 style={{fontFamily: 'Gochi Hand'}} className='flex justify-center text-purple-900 w-full max-w-3xl px-3 font-orbitron text-3xl font-bold'>Admin Login</h2>
          <form id='login-form' className='font-orbitron w-full max-w-3xl p-6 md:py-8 md:px-10 md:p-6 bg-white bg-opacity-25 rounded-2xl'>
              <div className="relative z-0 mb-6 w-full group">
                  <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="block py-3 pt-5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
                  <label htmlFor="username" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
              </div>
              <div className="relative z-0 mb-4 w-full group">
                  <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="block py-3 pt-5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
                  <label htmlFor="password" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              </div>
              { loginMessage !== '' &&
                  <div className='login-message'>
                      <span className={`login-message-content block text-start font-semibold pb-3 italic text-${loginStatus === 'success'? 'green-500': 'purple-800'}`}>{loginMessage}</span>
                  </div>
              }
              <div className='py-4'>
                  <span className='flex '>Not an admin? <Link className='text-purple-900 font-semibold px-2' to='/admin/register'> Register</Link></span>
              </div>
              <button onClick={() => login()} type="button" id='login-btn' className="flex items-center justify-center gap-2 text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">
                  Login
                  {
                      isLoading &&
                      <span className='flex w-5 h-5 rounded-full border-2 border-gray-300 border-r-white animate-spin'></span>
                  }
              </button>
          </form>
        </div>
      }
    </div>
  )
}

export default AdminLogin