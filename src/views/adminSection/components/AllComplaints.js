import { Box, Button, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';

const AllComplaints = ({filter, togglePrevComplaint}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ complaints, setComplaints ] = useState([]);

    const getAllComplaints = () => {
        setIsLoading(true);
        fetch('https://ribbons.onrender.com/complaint/get-all-complaints',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loc: JSON.parse(localStorage.getItem('adminLocation')),
                    username: JSON.parse(localStorage.getItem('adminUsername'))
                })
            }
        )
        .then(response => response.json())
        .then(data =>{
            if ( filter === 'open' ) {
                setComplaints(data.filter(item => item.status === false));
            } else if ( filter === 'closed' ) {
                setComplaints(data.filter(item => item.status === true));
            } else {
                setComplaints(data);
            }
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getAllComplaints();
    }, [])
    
    return (
        <div className='relative w-full'>
            {/*
                previewComplaint &&
                <Modal
                className='h-full w-full flex justify-center items-center p-3'
                open={setPreviewComplaint}
                onClose={() => setPreviewComplaint(prevValue => !prevValue)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box className='relative bg-white w-full max-w-xl h-auto max-h-[700px] rounded-2xl p-6'>
                    <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                    <div className='w-full flex justify-start md:justify-center text-purple-900'>
                        <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                        <Typography variant='h5' sx={{ mt: 1 }}>
                            About Complaint
                        </Typography>
                        
                    </div>
                </Box>
            </Modal>
            */
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
                                        <Button onClick={() => togglePrevComplaint(complaint)} variant='outlined' color='secondary' backgroundColor = 'purple[500]' className='w-full bg-gray-500'>View Details</Button>
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

export default AllComplaints