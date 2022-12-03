import React, { useState } from 'react';
import AllComplaints from '../components/AllComplaints';
import HealthComplaint from '../components/HealthComplaint';
import SuppliesComplaint from '../components/SuppliesComplaints';
import PsychosocialComplaints from '../components/PsychosocialComplaints';
import WASHComplaints from '../components/WASHComplaints';
import LegalComplaint from '../components/LegalComplaint';
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material';

const Complaints = () => {
    const [ filter, setFilter ] = useState('');
    const complaintCategories = {
        all: <AllComplaints value='all' filter={filter}/> ,
        health: <HealthComplaint value='health' filter={filter} />,
        supplies: <SuppliesComplaint value='supplies' filter={filter} />,
        psychosocial: <PsychosocialComplaints value='psychosocial' filter={filter} />,
        wash: <WASHComplaints value='wash' filter={filter} />,
        legal: <LegalComplaint value='legal' filter={filter} />
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

    const updateCategory = (e) => {
        setComplaintCategory('');
        setCurrentCategory('');
        setTimeout(() => {
            setComplaintCategory(complaintCategories[`${e.target.textContent}`]);
            setCurrentCategory(e.target.textContent);
        }, 200);
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
                    <Typography variant='h5' sx={{ mt: 1 }}>
                        Create New Complaint
                    </Typography>
                </div>
                <div className='py-2 md:p-8 h-auto flex flex-col gap-3'>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-6 py-2 '>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="dept-label">Department</InputLabel>
                            <Select
                            labelId="dept-label"
                            id="dept"
                            value={dept}
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
                            <InputLabel id="severity-label">Severity</InputLabel>
                            <Select
                            labelId="severity-label"
                            id="severity"
                            value={severity}
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
                            className='w-full focus:outline-none'
                            onChange={(e) => setComplainantPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 w-full px-2 flex flex-col">
                        <label htmlFor='desc' className='text-gray-600 text-xl mb-1'>Description</label>
                        <TextField
                            id="filled-multiline-flexible"
                            multiline
                            rows={3}
                            p={2}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            variant="standard"
                        /> 
        
                    </div>
                    <div className='mb-auto flex text-purple-800 font-semibold italic text-lg'>{requestMessage}</div>
                    <div className='flex flex-col md:flex-row w-full gap-4'>
                        <button onClick={saveComplaint} type="button" disabled={isSaving? true: '' } className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                            {
                                isSaving?
                                <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                :
                                <span>Save</span>
                            }
                        </button>
                        <button onClick={sendComplaint} type="button" disabled={isSubmitting? true: '' } className={`w-full max-w-sm flex justify-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-400 font-semibold rounded-lg text-base w-full px-5 py-3 text-center`}>
                            {
                                isSubmitting?
                                <span className='flex h-8 w-8 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                :
                                <span>Submit</span>
                            }
                        </button>
                    </div>
                </div>
            </Box>
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
                            onChange={(e) => {setFilter(e.target.value)}}
                            className='w-full lg:w-24 h-12'
                            >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={'open'}>Open</MenuItem>
                            <MenuItem value={'closed'}>Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'all'? 'bg-purple-900 text-white': 'bg-white text-purple-900'} border border-purple-900 px-6 py-2 text-white rounded-lg capitalize`}>all</button>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'health'? 'bg-green-600 text-white': 'bg-white text-green-600'} border border-green-600 px-4 py-2 text-white rounded-lg capitalize`}>health</button>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'supplies'? 'bg-red-600 text-white': 'bg-white text-red-600'} border border-red-600 px-4 py-2 text-white rounded-lg capitalize`}>supplies</button>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'psychosocial'? 'bg-blue-600 text-white': 'bg-white text-blue-600'} border border-blue-600 px-4 py-2 text-white rounded-lg capitalize`}>psychosocial</button>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'wash'? 'bg-purple-600 text-white': 'bg-white text-purple-600'} border border-purple-600 px-4 py-2 text-white rounded-lg uppercase`}>wash</button>
                    <button onClick={(e) => updateCategory(e)} className={`${currentCategory === 'legal'? 'bg-orange-600 text-white': 'bg-white text-orange-600'} border border-orange-600 px-4 py-2 text-white rounded-lg capitalize`}>legal</button>
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