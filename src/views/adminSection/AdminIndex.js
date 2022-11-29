import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  checkLogin from './functions/checkAdminLogin';
import Loader from '../../components/Loader';
import logo from '../../images/logo.png';
import AdminDashboard from './components/AdminDashboard'
import Complaints from './components/Complaints';
import Drafts from './components/Drafts';

const AdminIndex = () => {
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAdmin, setCurrentAdmin ] = useState({});
    const [ isPageLoading, setIsPageLoading ] = useState(false);
    const [ showSidebar, setShowSidebar ] = useState(false);

    const pages = {
        dashboard: <AdminDashboard />,
        complaints: <Complaints /> ,
        drafts: <Drafts />,
        // chat: <WelfareComplaint filter='welfare' />,
    }

    const [ page, setPage ] = useState(pages.dashboard);
    const [ currentPage, setCurrentPage ] = useState('dashboard');

    useEffect(() => {
        // checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
        console.log('Hello');
    }, []);

    return (
        <div className='w-full h-screen flex flex-col'>
            {
                isPageLoading?
                <Loader />
                :
                <>
                
                <aside className={`fixed h-full z-20`}>
                    <div className={`bg-white h-full ${showSidebar? 'w-64':'w-0 md:w-24'} overflow-hidden shadow flex flex-col divide-y`}>
                        <div className='flex justify-center'>
                            <div className='w-full max-w-[100px] h-20 mb-2 flex items-center'>{showSidebar && <img alt='' src={logo} />}</div>
                        </div>
                        <button
                            onClick={() => setShowSidebar(prevValue => !prevValue)}
                            className={'absolute -right-5 top-1/2 flex items-center justify-center rounded-full w-8 h-8 hover:h-9 hover:w-9 hover:-right-6 border'}>
                                {
                                    showSidebar?
                                    <i className='fa fa-chevron-left'></i>
                                    :
                                    <i className='fa fa-chevron-right'></i>
                                }
                        </button>
                        <button
                            onClick={(e) => {setPage(pages['dashboard']);
                            setCurrentPage('dashboard')}}
                            className={`${currentPage === 'dashboard'? 'text-white bg-purple-900': 'hover:bg-gray-100 hover:text-gray-600 text-gray-700'} p-4 flex ${showSidebar? 'justify-start' : 'justify-center'} gap-4 text-xl font-semibold capitalize`}>
                            <span><i className='fa fa-home'></i></span>
                            {
                                showSidebar &&
                                <span>dashboard</span>
                            }
                        </button>
                        <button
                            onClick={(e) => {setPage(pages['complaints']);
                            setCurrentPage('complaints')}}
                            className={`${currentPage === 'complaints'? 'text-white bg-purple-900': 'hover:bg-gray-100 hover:text-gray-600 text-gray-700'} p-4 flex ${showSidebar? 'justify-start' : 'justify-center'} gap-4 text-xl font-semibold capitalize`}>
                            <span><i className='fa fa-c'></i></span>
                            {
                                showSidebar &&
                                <span>complaints</span>
                            }
                        </button>
                        <button
                            onClick={(e) => {setPage(pages['drafts']);
                            setCurrentPage('drafts')}}
                            className={`${currentPage === 'drafts'? 'text-white bg-purple-900': 'hover:bg-gray-100 hover:text-gray-600 text-gray-700'} p-4 flex ${showSidebar? 'justify-start' : 'justify-center'} gap-4 text-xl font-semibold capitalize`}>
                            <span><i className='fa fa-d'></i></span>
                            {
                                showSidebar &&
                                <span>drafts</span>
                            }
                        </button>
                        <button
                            onClick={(e) => {setPage(pages['chat']);
                            setCurrentPage('chat')}}
                            className={`${currentPage === 'chat'? 'text-white bg-purple-900': 'hover:bg-gray-100 hover:text-gray-600 text-gray-700'} p-4 flex ${showSidebar? 'justify-start' : 'justify-center'} gap-4 text-xl font-semibold capitalize`}>
                            <span><i className='fa fa-c'></i></span>
                            {
                                showSidebar &&
                                <span>chat</span>
                            }
                        </button>
                    </div>
                </aside>
                <section className='w-full h-full flex flex-col items-center'>
                    <header className='w-full h-auto flex justify-center shadow'>
                        <div className='w-full max-w-8xl flex justify-between items-center py-3 px-4'>
                            <div className='w-full max-w-[100px]'><img alt='' src={logo} /></div>
                            <div className='text-3xl'>Admin Panel</div>
                            <div className='hidden md:flex gap-4'>
                                <button className='relative flex items-center justify-center text-gray-600 text-2xl w-12 h-12 border-2 border-gray-700 rounded-full shadow hover:shadow-md hover:border-purple-900 hover:text-purple-900'>
                                    <span className='absolute -top-[10px] right-0 w-5 h-5 rounded-full flex items-center justify-center text-white bg-red-400 text-sm'>1</span>
                                    <span className=''><i className="fa-regular fa-comments"></i></span>
                                </button>
                                <button className="flex items-center justify-center text-gray-600 text-2xl w-12 h-12 border-2 border-gray-700 rounded-full shadow hover:shadow-md hover:border-purple-900 hover:text-purple-900" id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" type="button">
                                    <span className=''><i className="fa-regular fa-user"></i></span>
                                </button>
                            </div>
                        </div>
                    </header>
                    <main className='h-full w-full flex flex-col overflow-y-auto'>
                        {page}
                    </main>
                </section>
                </>
            }
        </div>
    )
}

export default AdminIndex