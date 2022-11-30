import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import Loader from '../../components/Loader';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ location, setLocation ] = useState('');

  const [ registerMessage, setregisterMessage ] = useState('');
  const [ registerStatus, setRegisterStatus ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showLoader, setShowLoader ] = useState(false);

  const toggleMessageContent = (setTarget, message) => {
    setTarget(message);
    setTimeout(() => {
      setTarget('')
    }, 2000)
  }

  const register = () => {
    setIsLoading(true);
    fetch('https://ribbons.onrender.com/admin/register',
        {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              phone: phone,
              email: email,
              username: username,
              password: password,
              confirmPassword: confirmPassword,
              loc: location
          })
        }
    )
    .then(response => response.json())
    .then(regData => {
      console.log(regData)
        if (!regData.message) {
          toggleMessageContent(setregisterMessage, regData);
          setRegisterStatus(false);
        } else {
          fetch('https://ribbons.onrender.com/admin/login',
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
          .then(loginData => {
            toggleMessageContent(setregisterMessage, regData.message);
            setRegisterStatus(true);
            localStorage.setItem('adminAccessToken', JSON.stringify(loginData.accessToken));
            localStorage.setItem('adminUsername', JSON.stringify(username));
            setTimeout(() => {
              setShowLoader(true);
            }, 2000);
            setTimeout(() => {
              setShowLoader(false);
              navigate('/admin');
            }, 5000);
          })
          .catch(err => console.log(err));
        }
        setIsLoading(false);
    })
    .catch(err => {
      console.log(err)
      toggleMessageContent(setregisterMessage, 'Login failed');
      setRegisterStatus(false);
      setIsLoading(false);
    })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bWFuaXRhcmlhbnNlcnZjYW1wbWFoYXJhc2giLCJpYXQiOjE2Njk1NjEzMjAsImV4cCI6MTY3MDE2NjEyMH0.1flPPKkBNYbJHlOu4njWzzuiabA8rxhWW-rJ0MKgEqI
}
  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      {
        showLoader?
        <Loader />
        :
        <div data-scroll className="promo relative w-full flex max-w-4xl flex-col items-center py-4 px-6 shadow rounded-3xl">
          <div className='w-full max-w-[100px] h-30px'>
            <img alt='' src={logo} />
          </div>
          <h2 style={{fontFamily: 'Gochi Hand'}} className='flex justify-center text-purple-900 w-full max-w-3xl px-3 font-orbitron text-3xl font-bold'>Admin Register</h2>
          <form id='login-form' className='font-orbitron w-full max-w-3xl p-6 md:py-8 md:px-10 md:p-6 bg-white bg-opacity-25 rounded-2xl'>
            <div className="relative z-0 mb-6 w-full group">
              <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="block py-3 pt-5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="name" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name: (Eg. Humanitarian services camp, Maharashtra,  India)</label>
            </div>
            <div className="relative z-0 mb-4 w-full group">
              <input onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" className="block py-3 pt-5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="phone" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="block py-3 pt-5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="email" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address:</label>
            </div>
            <div className="relative z-0 mb-4 w-full group">
              <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="block py-3 pt-5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="username" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username:</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="block py-3 pt-5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="password" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
            </div>
            <div className="relative z-0 mb-4 w-full group">
              <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="password" className="block py-3 pt-5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="confirm-password" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password:</label>
            </div>
            <div className="relative z-0 mb-4 w-full group">
              <input onChange={(e) => setLocation(e.target.value)} type="text" name="location" id="location" className="block py-3 pt-5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-900 peer" placeholder=" " required />
              <label htmlFor="location" className="flex peer-focus:font-medium absolute text-xl  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-600 peer-focus:text-purple-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location: (Eg. Mumbai, India)</label>
            </div>
            { registerMessage !== '' &&
              <div className='login-message'>
                <span className={`login-message-content block text-start font-semibold pb-3 italic text-${registerStatus === 'success'? 'green-500': 'purple-800'}`}>{registerMessage}</span>
              </div>
            }
            <div className='py-4'>
              <span className='flex '>Already an Admin? <Link className='text-purple-900 font-semibold px-2' to='/admin/login'> Login</Link></span>
            </div>
            <button onClick={() => register()} type="button" id='login-btn' className="flex items-center justify-center gap-2 text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center">
              Register
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

export default AdminLogin;