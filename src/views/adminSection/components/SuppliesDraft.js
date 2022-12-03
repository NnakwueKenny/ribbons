import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';

import { Box, Button, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const SuppliesDraft = ({filter, toggleEditDraft}) => {
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
                                <div key={index+1} className="w-full h-auto flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
                                    <div className="block flex justify-between items-start mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                                        <span className='capitalize'>
                                            {complaint.cat} Support Complaint
                                        </span>
                                        {
                                            complaint.severity === 'emergency' &&
                                            <span className='font-bold text-base flex text-red-500 text-lg capitalize'>{complaint.severity}</span>
                                        }
                                    </div>
                                    <div className='w-full mb-1 flex justify-between items-baseline text-gray-700 text-base'>
                                        <span className="block text-lg">{complaint.name}</span>
                                        <Typography component='div' variant='caption' className='text-green-500 pr-3 w-28 flex justify-end'>{complaint.createdAt.split('T')[0]}</Typography>
                                    </div>
                                    <div className='w-full mb-2 flex justify-between items-baseline text-gray-700 text-base'>
                                        <p className="font-normal text-gray-700">Medium: {complaint.medium}</p>
                                        <Typography component='div' variant='caption' className='text-green-500 pr-3 w-40 flex justify-end'>{complaint.phone}</Typography>
                                    </div>
                                    <p className="font-normal text-gray-700">{complaint.desc.length >= 100? complaint.desc.slice(0, 100): complaint.desc}</p>
                                    {
                                        complaint.status?
                                        <div className='flex items-center justify-between mb-4 mt-6'>
                                            <p className='text-green-700 text-xl'>Resolved</p>
                                            <Tooltip title="Call Victim">
                                                <a  href={`tel:${complaint.phone}`} id={complaint.id} className={`text-purple-800 text:bg-purple-900`}>
                                                    <IconButton color={`${complaint.status? 'secondary': 'gray'}`}>
                                                        <PhoneEnabledIcon />
                                                    </IconButton>
                                                </a>
                                            </Tooltip>
                                        </div>
                                        :
                                        <p className='mt-auto my-4 mt-6 text-red-500 text-xl flex w-full justify-center'>Pending</p>
                                    }
                                    <div className='flex gap-3 mt-auto'>
                                        <Button onClick={() => toggleEditDraft(complaint)} variant='outlined' color='secondary' backgroundColor = 'purple[500]' className='w-full bg-gray-500'>Edit</Button>
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