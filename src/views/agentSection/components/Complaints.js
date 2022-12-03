import React, { useState } from 'react';
import AllComplaints from '../components/AllComplaints';
import HealthComplaint from '../components/HealthComplaint';
import CounsellingComplaint from '../components/CounsellingComplaints';
import WelfareComplaint from '../components/WelfareComplaints';
import LegalComplaint from '../components/LegalComplaints';

import {
    Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, 
    Typography, Slide, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Fade, Backdrop, IconButton, Tooltip
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const Complaints = () => {
    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });

    const [ showPreviewComplaint, setShowPreviewComplaint ] = useState(false);
    const [ complaintDetails, setComplaintDetails] = useState({})

    const togglePrevComplaint = (complaint) => {
        setComplaintDetails(complaint);
        setShowPreviewComplaint(true)
    }

    const [ filter, setFilter ] = useState('');
    const complaintCategories = {
        all: <AllComplaints filter='all' /> ,
        health: <HealthComplaint filter='health' />,
        counselling: <CounsellingComplaint filter='counselling' />,
        welfare: <WelfareComplaint filter='welfare' />,
        legal: <LegalComplaint filter='legal' />,
    }
    
    const [ complaintCategory, setComplaintCategory ] = useState(complaintCategories.all);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ showCreateComplaint , setShowCreateComplaint ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    
    const [ requestMessage, setRequestMessage ] = useState('');
    const [ showTopNav, setShowTopNav ] = useState(false);

    const toggleMessageContent = (setTarget, message, err) => {
        if (err !== undefined) {
            setTarget(message); 
            setTimeout(() => {
                setTarget('');
                setShowCreateComplaint(false);
            }, 3000)
        } else {
            setTarget(message);
            setTimeout(() => {
                setTarget('');
            }, 3000)
        }
    }

    const sendComplaint = () => {
        setIsSubmitting(true);
        fetch('https://ribbons.onrender.com/complaint/send-complaint')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSubmitting(false);
            if (data.error) {
                console.log(data.error);
                toggleMessageContent(setRequestMessage, data.error, 'error');
            } else {
                toggleMessageContent(setRequestMessage, data);
            }
        })
        .catch(err => {
            console.log(err);
            setIsSubmitting(false);
            toggleMessageContent(setRequestMessage, 'An error just occurred. Please, try again!', 'error');
        })

    }

    const saveComplaint = () => {
        setIsSaving(true);
        fetch('https://ribbons.onrender.com/draft/send-draft')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSaving(false);
            if (data.error) {
                console.log(data.error);
                toggleMessageContent(setRequestMessage, data.error, 'error');
            } else {
                toggleMessageContent(setRequestMessage, data);
            }
        })
        .catch(err => {
            console.log(err);
            setIsSaving(false);
            toggleMessageContent(setRequestMessage, 'An error just occurred!', 'error');
        })

    }

    const loadCategory = (e) => {
        if (e.target) {
            setComplaintCategory(complaintCategories[`${e.target.textContent}`]);
            setCurrentCategory(e.target.textContent);
        } else {
            setComplaintCategory(complaintCategories[`${e}`]);
            setCurrentCategory(e);
        }
    }
    const updateCategory = (e) => {
        loadCategory('');
        setFilter(e);
        setTimeout(() => {
            setFilter(e);
            loadCategory(currentCategory);
            setFilter(e);
        }, 2000)
    }
    
  return (
    <div className='flex flex-col h-screen w-full'>
        <Modal
            className='h-full w-full flex justify-center items-center p-3'
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showPreviewComplaint}
            onClose={() => setShowPreviewComplaint(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showPreviewComplaint}>
                <Box className='relative bg-white w-full max-w-2xl h-auto max-h-[700px] rounded-xl p-6 md:px-8 pt-8'>
                    <div className='absolute top-2 right-2'>
                        <IconButton color={'secondary'} onClick={() => setShowPreviewComplaint(false)}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className='flex items-baseline justify-between'>
                        <Typography id="transition-modal-title" variant="h5" component="h2">
                            <span className='capitalize'>{complaintDetails.cat} support complaint</span>
                        </Typography>
                        <Typography id="transition-modal-title" variant="body1" component="h2">
                            <span className={`capitalize font-semibold ${complaintDetails.severity === 'emergency'? 'text-red-500': 'text-green-500'}`}>{complaintDetails.severity}</span>
                        </Typography>
                    </div>
                    <div className='w-full mb-1 mt-2 flex justify-between items-baseline text-gray-700 text-base'>
                        <span className="block text-lg">{complaintDetails.name}</span>
                        <Typography component='div' variant='caption' className='text-green-500 pr-3 w-28 flex justify-end'>{complaintDetails.createdAt?.split('T')[0]}</Typography>
                    </div>
                    <div className='w-full mb-2 flex justify-between items-baseline text-gray-700 text-base'>
                        <p className="font-normal text-gray-700">Medium: {complaintDetails.medium}</p>
                        <Typography component='div' variant='caption' className='text-green-500 pr-3 w-40 flex justify-end'>{complaintDetails.phone}</Typography>
                    </div>
                    <div className='w-full mb-2 flex justify-between items-baseline text-gray-700 text-base'>
                        <Typography component='div' variant='body2'>Agent: {complaintDetails.sent_to}</Typography>
                    </div>
                    <div className='w-full mb-2 flex flex-col justify-between text-gray-700 text-base'>
                        <Typography component='div' variant='h6' className=''>
                            Complaint:
                        </Typography>
                        <Typography component='p' className='text-gray-600 text-justify'>
                            {complaintDetails.desc}
                        </Typography>
                    </div>
                    {
                        complaintDetails.agentComment &&
                        <div className='w-full mb-2 flex flex-col justify-between text-gray-700 text-base'>
                            <Typography component='div' variant='h6' className=''>
                                Agent's Comment:
                            </Typography>
                            <Typography component='p' className='text-green-500 text-justify'>
                                {complaintDetails.agentComment}
                            </Typography>
                        </div>
                    }
                    {
                        complaintDetails.status?
                        <div className='flex items-center justify-between mb-4 mt-6'>
                            <p className='text-green-700 text-xl'>Resolved</p>
                            <Tooltip title="Call Victim">
                                <a  href={`tel:${complaintDetails.phone}`} id={complaintDetails.id} className={`text-purple-800 text:bg-purple-900`}>
                                    <IconButton color={`${complaintDetails.status? 'secondary': 'gray'}`}>
                                        <PhoneEnabledIcon />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </div>
                        :
                        <p className='mt-auto my-4 mt-6 text-red-500 text-xl flex w-full justify-center'>Pending</p>
                    }
                </Box>
            </Fade>
        </Modal>
        <div className='flex items-center justify-center shadow px-3 py-5 pt-20 bg-opacity-25'>
            <div className='relative w-full max-w-7xl flex gap-3 items-baseline lg:items-center justify-between bg-opacity-25'>
                <div className={'absolute -top-4 right-2 lg:hidden'}>
                    <button onClick={() => setShowTopNav(prevValue => !prevValue)} className='text-lg'>
                        {
                            showTopNav?
                            <span><i className='fa fa-times'></i></span>
                            :
                            <span><i className='fa fa-bars'></i></span>
                        }
                    </button>
                </div>
                <div className={`relative flex flex-col lg:flex-row gap-4 md:gap-2 py-4 w-full max-w-6xl overflow-hidden ${!showTopNav? 'h-16 lg:h-auto': ''}`}>
                    <FormControl >
                        <InputLabel id="demo-simple-select-helper-label">{`${filter === 'open'? 'Open': filter === 'closed'? 'Closed': 'Status'}`}</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={''}
                            label="Status"
                            onChange={(e) => {setFilter(e.target.value); updateCategory(e.target.value)}}
                            className='w-full lg:w-24 h-12'
                            >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'open'}>Open</MenuItem>
                            <MenuItem value={'closed'}>Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'all'? 'bg-purple-900 text-white': 'bg-white text-purple-900'} border border-purple-900 px-6 py-2 text-white rounded-lg capitalize`}>all</button>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'health'? 'bg-green-600 text-white': 'bg-white text-green-600'} border border-green-600 px-4 py-2 text-white rounded-lg capitalize`}>health</button>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'supplies'? 'bg-red-600 text-white': 'bg-white text-red-600'} border border-red-600 px-4 py-2 text-white rounded-lg capitalize`}>supplies</button>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'psychosocial'? 'bg-blue-600 text-white': 'bg-white text-blue-600'} border border-blue-600 px-4 py-2 text-white rounded-lg capitalize`}>psychosocial</button>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'wash'? 'bg-purple-600 text-white': 'bg-white text-purple-600'} border border-purple-600 px-4 py-2 text-white rounded-lg uppercase`}>wash</button>
                    <button onClick={(e) => loadCategory(e)} className={`${currentCategory === 'legal'? 'bg-orange-600 text-white': 'bg-white text-orange-600'} border border-orange-600 px-4 py-2 text-white rounded-lg capitalize`}>legal</button>
                </div>
                <button onClick={() => setShowCreateComplaint(prevValue => !prevValue)} className='shrink-0 flex items-center gap-1 md:gap-3 border-[3px] hover:text-purple-600 hover:border-purple-600 text-gray-700 px-2 md:px-4 h-12 rounded-xl'>
                    <span className='flex items-center text-base'>New Complaint</span>
                    <span className='flex items-center text-base'><i className='fa fa-plus'></i></span>
                </button>
            </div>
        </div>
        <div className='w-full h-full flex overflow-auto pt-2 md:pt-6'>
            {complaintCategory}
        </div>
    </div>
  )
}

export default Complaints