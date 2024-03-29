import React, { useState } from 'react';
import AllComplaints from '../components/AllComplaints';
import HealthComplaint from '../components/HealthComplaint';
import SuppliesComplaint from '../components/SuppliesComplaints';
import PsychosocialComplaints from '../components/PsychosocialComplaints';
import WASHComplaints from '../components/WASHComplaints';
import LegalComplaint from '../components/LegalComplaint';

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
        all: <AllComplaints value='all' filter={filter} togglePrevComplaint={togglePrevComplaint}/> ,
        health: <HealthComplaint value='health' filter={filter} togglePrevComplaint={togglePrevComplaint}/>,
        supplies: <SuppliesComplaint value='supplies' filter={filter} togglePrevComplaint={togglePrevComplaint}/>,
        psychosocial: <PsychosocialComplaints value='psychosocial' filter={filter} togglePrevComplaint={togglePrevComplaint}/>,
        wash: <WASHComplaints value='wash' filter={filter} togglePrevComplaint={togglePrevComplaint}/>,
        legal: <LegalComplaint value='legal' filter={filter} togglePrevComplaint={togglePrevComplaint}/>
    }

    const [ complaintCategory, setComplaintCategory ] = useState(complaintCategories.all);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ showCreateComplaint , setShowCreateComplaint ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);

    const [ dept , setDept ] = useState('');
    const [ severity , setSeverity ] = useState('');
    const [ complainantName , setComplainantName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ complainantPhone , setComplainantPhone ] = useState('');
    const [ requestMessage, setRequestMessage ] = useState('');

    const toggleMessageContent = (setTarget, message, err) => {
        if (err === undefined) {
            setTarget(message);
            setDept('');
            setDesc('');
            setSeverity('');
            setComplainantName('');
            setComplainantPhone('');
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

    const [ showTopNav, setShowTopNav ] = useState(false);

    const sendComplaint = () => {
        setIsSubmitting(true);
        console.log(dept, severity, complainantName, complainantPhone, desc);
        fetch('https://ribbons.onrender.com/complaint/send-complaint',
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
        console.log(dept, severity, complainantName, complainantPhone, desc);
        fetch('https://ribbons.onrender.com/draft/send-draft',
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
            open={showCreateComplaint}
            onClose={() => setShowCreateComplaint(prevValue => !prevValue)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className='relative bg-white w-full max-w-3xl h-auto max-h-[700px] rounded-2xl p-6'>
                <button onClick={() => setShowCreateComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                <div className='w-full flex justify-start md:justify-center text-purple-900'>
                    <Typography variant='h5' sx={{ mt: 1 }} color='secondary'>
                        Create New Complaint
                    </Typography>
                </div>
                <div className='py-2 md:p-8 h-auto flex flex-col gap-3'>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-6 py-2 '>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="dept-label" color='secondary'>Department</InputLabel>
                            <Select
                            labelId="dept-label"
                            id="dept"
                            value={dept}
                            color='secondary'
                            onChange={(e) => setDept(e.target.value)}
                            label="Department"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'supplies'}>Supplies</MenuItem>
                            <MenuItem value={'health'}>Health</MenuItem>
                            <MenuItem value={'wash'}>WASH</MenuItem>
                            <MenuItem value={'psychosocial'}>Psychosocial</MenuItem>
                            <MenuItem value={'legal'}>Legal</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="severity-label" color='secondary'>Severity</InputLabel>
                            <Select
                            labelId="severity-label"
                            id="severity"
                            value={severity}
                            color='secondary'
                            onChange={(e) => setSeverity(e.target.value)}
                            label="Severity"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'emergency'}>Emergency</MenuItem>
                            <MenuItem value={'normal'}>Normal</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="mb-2 w-full px-2">
                        <TextField
                            id="complainant-name"
                            label="Complainant Name"
                            type="text"
                            autoComplete="complainant-name"
                            variant="standard"
                            value={complainantName}
                            color='secondary'
                            className='w-full focus:outline-none'
                            onChange={(e) => setComplainantName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 w-full px-2">
                        <TextField
                            id="complainant-phone"
                            label="Complainant Phone (Eg. +2348137926904)"
                            type="text"
                            autoComplete="complainant-phone"
                            variant="standard"
                            value={complainantPhone}
                            color='secondary'
                            className='w-full focus:outline-none'
                            onChange={(e) => setComplainantPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 w-full px-2 flex flex-col">
                        <InputLabel htmlFor='desc' color='secondary' className='text-xl mb-1'>Description</InputLabel>
                        <TextField
                            id="filled-multiline-flexible"
                            multiline
                            rows={3}
                            p={2}
                            value={desc}
                            color='secondary'
                            onChange={(e) => setDesc(e.target.value)}
                            variant="standard"
                        /> 
        
                    </div>
                    <Typography className='mb-auto flex text-purple-800 font-semibold italic text-lg'>{requestMessage}</Typography>
                    <div className='flex flex-col md:flex-row w-full gap-4'>
                        <Button onClick={saveComplaint} type="button" disabled={isSaving? true: '' } variant='outlined' color='secondary' backgroundColor = 'purple[500]' className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                            {
                                isSaving?
                                <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                :
                                <span>Save</span>
                            }
                        </Button>
                        <Button onClick={sendComplaint} type="button" disabled={isSubmitting? true: '' } variant='outlined' color='secondary' backgroundColor = 'purple[500]' className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                            {
                                isSubmitting?
                                <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                :
                                <span>Submit</span>
                            }
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
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
                        complaintDetails.comment &&
                        <div className='w-full mb-2 flex flex-col justify-between text-gray-700 text-base'>
                            <Typography component='div' variant='h6' className=''>
                                Agent's Comment:
                            </Typography>
                            <Typography component='p' className='text-green-500 text-justify'>
                                {complaintDetails.comment}
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
                        <div className='flex items-center justify-between mb-4 mt-6'>
                        <p className='text-red-500 text-xl'>Pending</p>
                            <Tooltip title="Call Agent">
                                <a  href={`tel:${complaintDetails.agent_phone}`} id={complaintDetails.id} className={`text-purple-800 text:bg-purple-900`}>
                                    <IconButton color={`${complaintDetails.status? 'secondary': 'gray'}`}>
                                        <PhoneEnabledIcon />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </div>
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
                <Button onClick={() => setShowCreateComplaint(prevValue => !prevValue)} variant='outlined' color='secondary' backgroundColor = 'purple[500]' className='shrink-0 flex items-center gap-1 md:gap-3 border-[3px] hover:text-purple-600 hover:border-purple-600 text-gray-700 px-2 md:px-4 h-12 rounded-xl'>
                    <span className='flex items-center text-base'>New Complaint</span>
                    <span className='flex items-center text-base'><i className='fa fa-plus'></i></span>
                </Button>
            </div>
        </div>
        <div className='w-full h-full flex overflow-auto pt-2 md:pt-6'>
            {complaintCategory}
        </div>
    </div>
  )
}

export default Complaints