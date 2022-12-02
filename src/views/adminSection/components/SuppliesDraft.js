import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';

const SuppliesDraft = ({filter}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ complaints, setComplaints ] = useState([]);
    const [ previewComplaint, setPreviewComplaint ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    
    const [ dept , setDept ] = useState('');
    const [ severity , setSeverity ] = useState('');
    const [ complainantName , setComplainantName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ complainantPhone , setComplainantPhone ] = useState('');
    const [ requestMessage, setRequestMessage ] = useState('');


    const toggleMessageContent = (setTarget, message, err) => {
        if (!err) {
            setTarget(message);
            setDept('');
            setDesc('');
            setSeverity('');
            setComplainantName('');
            setComplainantPhone('');
            setTimeout(() => {
                setTarget('');
                setPreviewComplaint(false);
            }, 3000)
        } else {
            setTarget(message);
            setTimeout(() => {
                setTarget('');
            }, 3000)
        }
    }

    const getAllComplaints = () => {
        setIsLoading(true);
        fetch('https://ribbons.onrender.com/draft/get-drafts',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loc: JSON.parse(localStorage.getItem('adminLocation'))
                })
            }
        )
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            setComplaints(data.filter(item => item.cat === 'supplies'));
            setIsLoading(false)
        })
    }

    const updateComplaint = () => {
        console.Console.log('Hello');
    }

    const sendComplaint = () => {
        setIsSubmitting(true);
        console.log(dept, severity, complainantName, complainantPhone, desc);
        fetch('http://localhost:3500/complaint/send-complaint',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cat: dept,
                    severity: severity,
                    name: complainantName,
                    desc: desc,
                    medium: 'online',
                    status: false,
                    loc: JSON.parse(localStorage.getItem('adminLocation')),
                    phone: complainantPhone,
                    sent_by: JSON.parse(localStorage.getItem('adminUsername'))
                  })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSubmitting(false);
            if (data.errors) {
                console.log(data.errors);
                toggleMessageContent(setRequestMessage, 'Please fill all fields!', 'error');
            } else {
                toggleMessageContent(setRequestMessage, data);
            }
        })
        .catch(err => {
            console.log(err);
            setIsSubmitting(false);
            toggleMessageContent(setRequestMessage, err.message, err);
        })

    }

    const saveComplaint = () => {
        setIsSaving(true);
        console.log(dept, severity, complainantName, complainantPhone, desc);
        fetch('http://localhost:3500/draft/send-draft',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cat: dept,
                    name: complainantName,
                    desc: desc,
                    medium: 'online',
                    status: false,
                    loc: JSON.parse(localStorage.getItem('adminLocation')),
                    phone: complainantPhone,
                  })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSaving(false);
            if (data.errors) {
                console.log(data.errors);
                toggleMessageContent(setRequestMessage, 'Please fill all fields!', 'error');
            } else {
                toggleMessageContent(setRequestMessage, data);
            }
        })
        .catch(err => {
            console.log(err);
            setIsSaving(false);
            toggleMessageContent(setRequestMessage, err.message, err);
        })

    }
    
    useEffect(() => {
        getAllComplaints();
    }, [])

    return (
        <div className='relative w-full'>
            {
                previewComplaint &&
                <Modal
                    className='h-full w-full flex justify-center items-center p-3'
                    open={setPreviewComplaint}
                    onClose={() => setPreviewComplaint(prevValue => !prevValue)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='relative bg-white w-xl h-auto max-h-[700px] rounded-2xl p-6'>
                        <div className='w-full flex justify-start md:justify-center text-purple-900'>
                            <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                            <div className='fixed z-20 top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex justify-center items-center p-3'>
                                <div className='relative bg-white w-full max-w-4xl h-full max-h-[700px] rounded-2xl p-6'>
                                    <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                                    <div className='w-full flex justify-center text-lg md:text-2xl font-bold text-purple-900'>Preview Complaint</div>
                                    <div className='py-5 md:p-8 h-full flex flex-col gap-3'>
                                        <div className='grid md:grid-cols-2 gap-2 md:gap-6 py-2 '>
                                            <div className="relative z-0 w-full flex flex-col gap-1 md:gap-2">
                                                <label className='text-gray-600 text-xl' htmlFor='dept'>Department</label>
                                                <select onChange={(e) => setDept(e.target.value)} value={dept} name='dept' id='dept' className='p-2 rounded-lg capitalize'>
                                                    <option className='capitalize'>counselling</option>
                                                    <option className='capitalize'>health</option>
                                                    <option className='capitalize'>legal</option>
                                                    <option className='capitalize'>welfare</option>
                                                </select>
                                            </div>
                                            <div className="relative z-0 w-full flex flex-col md:gap-2">
                                                <label className='text-gray-600 text-xl' htmlFor='severity'>Severity</label>
                                                <select onChange={(e) => setSeverity(e.target.value)} value={severity} name='severity' id='severity' className='p-2 rounded-lg capitalize'>
                                                    <option className='capitalize'>emergency</option>
                                                    <option className='capitalize'>normal</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="relative z-0 mb-2 w-full group">
                                            <input onChange={(e) => setComplainantName(e.target.value)} value={complainantName} type="text" name="complainant-name" id="complainant-name" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                                            <label htmlFor="complainant-name" className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Complainant Name</label>
                                        </div>
                                        <div className="relative z-0 mb-2 w-full group">
                                            <input onChange={(e) => setComplainantPhone(e.target.value)} value={complainantPhone} type="text" name="complainant-phone" id="complainant-phone" className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                                            <label htmlFor="complainant-phone" className="peer-focus:font-medium absolute text-sm md:text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Complainant Phone (Eg. +2348137926904)</label>
                                        </div>
                                        <div className="relative z-0 w-full flex flex-col gap-2">
                                            <label htmlFor='desc' className='text-gray-600 text-xl'>Description</label>
                                            <textarea onChange={(e) => setDesc(e.target.value)} name="desc" id="desc" value={desc} className='rounded-lg px-4 py-3 h-auto max-h-[70px] md:max-h-[200px]'></textarea>
                                        </div>
                                        <div className='mb-auto flex text-purple-800 font-semibold italic text-lg'>{requestMessage}</div>
                                        <div className='flex flex-col md:flex-row w-full gap-4'>
                                            <button onClick={saveComplaint} type="button" disabled={isSaving ? true : ''} className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                                                {
                                                    isSaving ?
                                                        <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                                        :
                                                        <span>Save</span>
                                                }
                                            </button>
                                            <button onClick={sendComplaint} type="button" disabled={isSubmitting ? true : ''} className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                                                {
                                                    isSubmitting ?
                                                        <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                                        :
                                                        <span>Submit</span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            }
            {
                isLoading?
                <div className='absolute w-full h-full flex justify-center'>
                    <Loader />
                </div>
                :
                <>
                {
                    complaints.length < 1?
                    <div className='w-full h-full flex flex-col gap-5 justify-center items-center text-3xl text-gray-600'>
                       <p>No complaints found!</p>
                    </div>
                    :
                    <div className='w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8 py-8 px-3 md:px-6 lg:px-10'>
                        {complaints.map((complaint, index) => {
                            return (
                                <div key={index+1} className="w-full h-80 flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
                                    <span className="block mb-2 text-2xl font-bold tracking-tight text-gray-900"><span className='capitalize'>{complaint.cat}</span> Support Complaint</span>
                                    <div className='w-full mb-3 flex justify-between text-gray-700 text-base'>
                                        <span className="block">Aminu Kano Teaching Hospital, Kano</span>
                                        -
                                        <span className="block text-green-600">{complaint.createdAt.split('T')[0]}</span>   
                                    </div>
                                    <p className="mb-2 font-normal text-gray-700">{complaint.desc}</p>
                                    <p className="mb-2 font-normal text-gray-700">{complaint.medium}</p>
                                    {
                                        complaint.status?
                                        <p className='mt-auto mb-4 text-green-700 text-xl'>Resolved</p>
                                        :
                                        <p className='mt-auto mb-4 text-yellow-700 text-xl'>Pending</p>
                                    }
                                    <div className='px-5'>
                                        <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} id={complaint.id} className="flex w-full items-center justify-center px-3 py-3 text-lg font-semibold text-center text-white bg-purple-800 rounded-lg hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300">
                                            Edit
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                </>
            }
        </div>
    )
}

export default SuppliesDraft;