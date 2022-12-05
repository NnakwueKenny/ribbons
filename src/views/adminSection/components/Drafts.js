import React, { useState } from 'react';
import AllDrafts from '../components/AllDrafts';
import HealthDraft from '../components/HealthDraft';
import SuppliesDraft from '../components/SuppliesDraft';
import WASHDraft from '../components/WASHDraft';
import LegalDraft from '../components/LegalDraft';
import PsychosocialDraft from '../components/PsychosocialDraft';

import {
    Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, 
    Typography, Slide, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, Fade, Backdrop, IconButton, Tooltip
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

const Drafts = () => {
    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });

    const [ showPreviewDraft, setShowPreviewDraft ] = useState(false);
    const [ draftDetails, setDraftDetails ] = useState({})

    const toggleEditDraft = (draft) => {
        setDraftDetails(draft);
        setShowPreviewDraft(true);
    }
    
    const [ filter, setFilter ] = useState('');

    const draftCategories = {
        all: <AllDrafts value='all' filter={filter} toggleEditDraft={toggleEditDraft}/> ,
        health: <HealthDraft value='all' filter={filter} toggleEditDraft={toggleEditDraft}/>,
        supplies: <SuppliesDraft value='all' filter={filter} toggleEditDraft={toggleEditDraft}/>,
        wash: <WASHDraft value='all' filter={filter} toggleEditDraft={toggleEditDraft} />,
        legal: <LegalDraft value='all' filter={filter} toggleEditDraft={toggleEditDraft} />,
        psychosocial: <PsychosocialDraft value='all' filter={filter} toggleEditDraft={toggleEditDraft} />,
    }

    const [ draftCategory, setDraftCategory ] = useState(draftCategories.all);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ showCreateDraft , setShowCreateDraft ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);

    const [ dept , setDept ] = useState('');
    const [ severity , setSeverity ] = useState('');
    const [ complainantName , setComplainantName ] = useState('');
    const [ desc , setDesc ] = useState('');
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
                setShowCreateDraft(false);
            }, 3000)
        } else {
            setTarget(message);
            setTimeout(() => {
                setTarget('');
            }, 3000)
        }
    }

    const [ showTopNav, setShowTopNav ] = useState(false);

    const saveDraft = () => {
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
                    phone: complainantPhone
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

    const resaveDraft = (draftID) => {
        setIsSaving(true);
        console.log(draftID);
        fetch('https://ribbons.onrender.com/draft/send-draft',
            {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cat: draftDetails.cat,
                    name: draftDetails.name,
                    desc: draftDetails.desc,
                    medium: 'online',
                    status: false,
                    loc: JSON.parse(localStorage.getItem('adminLocation')),
                    phone: draftDetails.phone,
                    id: draftID
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
                    cat: draftDetails.cat,
                    severity: severity,
                    name: draftDetails.name,
                    desc: draftDetails.desc,
                    medium: 'online',
                    status: false,
                    loc: JSON.parse(localStorage.getItem('adminLocation')),
                    phone: draftDetails.phone,
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
                fetch('https://ribbons.onrender.com/draft/delete-draft',
                {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        draftID: draftDetails.id
                    })
                }
            )
            .then(response => response.json())
            .then(draftRes => {
                console.log();
                toggleMessageContent(setRequestMessage, `${data} and ${draftRes.message}`);
            })
            .catch(err => {
                console.log(err);
                setIsSubmitting(false);
                toggleMessageContent(setRequestMessage, 'An error just occurred. Please, try again!', 'error');
            })
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
            setDraftCategory(draftCategories[`${e.target.textContent}`]);
            setCurrentCategory(e.target.textContent);
        } else {
            setDraftCategory(draftCategories[`${e}`]);
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
            open={showCreateDraft}
            onClose={() => setShowCreateDraft(prevValue => !prevValue)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className='relative bg-white w-full max-w-3xl h-auto max-h-[700px] rounded-2xl p-6'>
                <button onClick={() => setShowCreateDraft(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                <div className='w-full flex justify-start md:justify-center text-purple-900'>
                    <Typography variant='h5' sx={{ mt: 1 }}>
                        Create New Draft
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
                        <Button onClick={saveDraft} variant='outlined' color='secondary' backgroundColor = 'purple[500]' className='w-full bg-gray-500'>
                            {
                                isSaving &&
                                <span className='flex mr-2 h-5 w-5 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                            }
                            Save
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
        <Modal
            className='h-full w-full flex justify-center items-center p-3'
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showPreviewDraft}
            onClose={() => setShowPreviewDraft(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showPreviewDraft}>
                <Box className='relative bg-white w-full max-w-2xl h-auto max-h-[700px] rounded-xl p-6 md:px-8 pt-8'>
                <button onClick={() => setShowPreviewDraft(false)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                <div className='w-full flex justify-start md:justify-center text-purple-900'>
                    <Typography variant='h5' sx={{ mt: 1 }}>
                        Edit Draft
                    </Typography>
                </div>
                <div className='py-2 md:p-8 h-auto flex flex-col gap-3'>
                    <div className='grid md:grid-cols-2 gap-2 md:gap-6 py-2 '>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="dept-label">Department</InputLabel>
                            <Select
                            labelId="dept-label"
                            id="dept"
                            value={draftDetails.cat}
                            onChange={(e) => setDraftDetails(prevValue => {
                                return {
                                    ...prevValue,
                                    cat: e.target.value
                                }
                            })}
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
                            onChange={(e) =>  setSeverity(e.target.value)}
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
                            value={draftDetails.name}
                            className='w-full focus:outline-none'
                            onChange={(e) => setDraftDetails(prevValue => {
                                return {
                                    ...prevValue,
                                    name: e.target.value
                                }
                            })}
                        />
                    </div>
                    <div className="mb-2 w-full px-2">
                        <TextField
                            id="complainant-phone"
                            label="Complainant Phone (Eg. +2348137926904)"
                            type="text"
                            autoComplete="complainant-phone"
                            variant="standard"
                            value={draftDetails.phone}
                            className='w-full focus:outline-none'
                            onChange={(e) => setDraftDetails(prevValue => {
                                return {
                                    ...prevValue,
                                    phone: e.target.value
                                }
                            })}
                        />
                    </div>
                    <div className="mb-2 w-full px-2 flex flex-col">
                        <label htmlFor='desc' className='text-gray-600 text-xl mb-1'>Description</label>
                        <TextField
                            id="filled-multiline-flexible"
                            multiline
                            rows={3}
                            p={2}
                            value={draftDetails.desc}
                            onChange={(e) => setDraftDetails(prevValue => {
                                return {
                                    ...prevValue,
                                    desc: e.target.value
                                }
                            })}
                            variant="standard"
                        /> 
        
                    </div>
                    <div className='mb-auto flex text-purple-800 font-semibold italic text-lg'>{requestMessage}</div>
                    <div className='flex flex-col md:flex-row w-full gap-4'>
                        <Button onClick={() => resaveDraft(draftDetails.id)}
                            variant='outlined' color='secondary'
                            backgroundColor = 'purple[500]'
                            className='w-full bg-gray-500'>
                                Save
                                {
                                    isSaving &&
                                    <span className='flex mx-2 h-5 w-5 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                }
                        </Button>
                        <Button onClick={() => sendComplaint()}
                            variant='outlined' color='secondary'
                            backgroundColor = 'purple[500]'
                            py = {2}
                            className='w-full bg-gray-500'>
                                Submit
                                {
                                    isSubmitting &&
                                    <span className='flex mx-2 h-5 w-5 border-4 border-b-purple-300 rounded-full animate-spin'></span>
                                }
                        </Button>
                    </div>
                </div>
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
                <Button onClick={() => setShowCreateDraft(prevValue => !prevValue)} variant='outlined' color='secondary' backgroundColor = 'purple[500]' className='shrink-0 flex items-center gap-1 md:gap-3 border-[3px] hover:text-purple-600 hover:border-purple-600 text-gray-700 px-2 md:px-4 h-12 rounded-xl'>
                    <span className='flex items-center text-base'>New Draft</span>
                    <span className='flex items-center text-base'><i className='fa fa-plus'></i></span>
                </Button>
            </div>
        </div>
        <div className='w-full h-full flex overflow-auto pt-2 md:pt-6'>
            {draftCategory}
        </div>
    </div>
  )
}

export default Drafts;