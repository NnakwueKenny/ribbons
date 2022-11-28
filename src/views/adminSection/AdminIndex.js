import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  checkLogin from './functions/checkAdminLogin';
import Loader from '../../components/Loader';
import logo from '../../images/logo.png';
import AllComplaints from './components/AllComplaints';

const AdminIndex = () => {
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAdmin, setCurrentAdmin ] = useState({});
    const [ isPageLoading, setIsPageLoading ] = useState(false);
    const complaintCategories = {
        all: <AllComplaints /> ,
        pending: '',
        resolved: '',
    }

    const [ complaintCategory, setComplaintCategory ] = useState(complaintCategories.all);
    
    // useEffect(() => {
    //     // checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
    //     console.log('Hello')
    // }, []);

    return (
        <div className='w-full h-full justify-center items-center'>
            {
                isPageLoading?
                <Loader />
                :
                <>
                    <header className='w-full flex justify-center shadow'>
                        <div className='w-full max-w-5xl flex justify-between items-center py-3'>
                            <div className='w-full max-w-[100px]'><img alt='' src={logo} /></div>
                            <div className='text-3xl'>Admin Panel</div>
                            <div className='flex gap-4'>
                                <button className='relative flex items-center justify-center text-gray-600 text-2xl w-12 h-12 border-2 border-gray-700 rounded-full shadow hover:shadow-md hover:border-purple-900 hover:text-purple-900'>
                                    <span className='absolute -top-[10px] right-0 w-5 h-5 rounded-full flex items-center justify-center text-white bg-red-400 text-sm'>1</span>
                                    <span className=''><i className="fa-regular fa-comments"></i></span>
                                </button>
                                <button className="flex items-center justify-center text-gray-600 text-2xl w-12 h-12 border-2 border-gray-700 rounded-full shadow hover:shadow-md hover:border-purple-900 hover:text-purple-900" id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" type="button">
                                    <span className=''><i className="fa-regular fa-user"></i></span>
                                </button>
                            </div>
                            <div id="dropdownInformation" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                <div>Bonnie Green</div>
                                <div className="font-medium truncate">name@flowbite.com</div>
                                </div>
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                </ul>
                                <div className="py-1">
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className='w-full h-full flex'>
                        <aside className='w-64 md:w-72 h-full shadow'>
                            <div className=''></div>
                        </aside>
                        <main className='h-full w-full overflow-y-auto'>{complaintCategory}</main>
                    </section>
                </>
            }
        </div>
    )
}

export default AdminIndex