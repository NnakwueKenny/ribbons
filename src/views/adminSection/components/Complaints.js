import React, { useState } from 'react';
import AllComplaints from '../components/AllComplaints';
import HealthComplaint from '../components/HealthComplaint';
import CounsellingComplaint from '../components/CounsellingComplaints';
import WelfareComplaint from '../components/WelfareComplaints';
import LegalComplaint from '../components/LegalComplaints';

const Complaints = () => {
    const complaintCategories = {
        all: <AllComplaints filter='all' /> ,
        health: <HealthComplaint filter='health' />,
        counselling: <CounsellingComplaint filter='counselling' />,
        welfare: <WelfareComplaint filter='welfare' />,
        legal: <LegalComplaint filter='legal' />,
    }

    const [ complaintCategory, setComplaintCategory ] = useState(complaintCategories.all);
    const [ currentCategory, setCurrentCategory ] = useState('all');
    const [ showCreateComplaint , setShowCreateComplain ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);

    const [ dept , setDept ] = useState('');
    const [ severity , setSeverity ] = useState('');
    const [ complainantName , setComplainantName ] = useState('');
    const [ desc , setDesc ] = useState('');
    const [ complainantPhone , setComplainantPhone ] = useState('');
    const [ requestMessage, setRequestMessage ] = useState('');

    const toggleMessageContent = (setTarget, message, err) => {
        if (err !== undefined) {
            setTarget(message);
            setDept('');
            setDesc('');
            setSeverity('');
            setComplainantName('');
            setComplainantPhone('');
            setTimeout(() => {
              setTarget('');
              setShowCreateComplain(false);
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
    
  return (
    <div className='flex flex-col h-'>
        {
            showCreateComplaint &&
            <div className='fixed z-20 top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex justify-center items-center p-3'>
                <div className='relative bg-white w-full max-w-4xl h-full max-h-[700px] rounded-2xl p-6'>
                    <button onClick={() => setShowCreateComplain(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                    <div className='w-full flex justify-center text-lg md:text-2xl font-bold text-purple-900'>Send New Complaint</div>
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
                </div>
            </div>
        }
        <div className='flex items-center justify-center shadow px-8 py-5'>
            <div className='w-full max-w-6xl flex items-center justify-between'>
                <div className='flex gap-4 py-4 w-full max-w-6xl'>
                    <button onClick={(e) => {setComplaintCategory(complaintCategories[`${e.target.textContent}`]); setCurrentCategory(e.target.textContent)}} className={`${currentCategory === 'all'? 'bg-purple-900 text-white': 'bg-white text-purple-900'} border border-purple-900 px-7 py-2 text-white rounded-lg capitalize`}>all</button>
                    <button onClick={(e) => {setComplaintCategory(complaintCategories[`${e.target.textContent}`]); setCurrentCategory(e.target.textContent)}} className={`${currentCategory === 'health'? 'bg-green-600 text-white': 'bg-white text-green-600'} border border-green-600 px-7 py-2 text-white rounded-lg capitalize`}>health</button>
                    <button onClick={(e) => {setComplaintCategory(complaintCategories[`${e.target.textContent}`]); setCurrentCategory(e.target.textContent)}} className={`${currentCategory === 'counselling'? 'bg-red-600 text-white': 'bg-white text-red-600'} border border-red-600 px-7 py-2 text-white rounded-lg capitalize`}>counselling</button>
                    <button onClick={(e) => {setComplaintCategory(complaintCategories[`${e.target.textContent}`]); setCurrentCategory(e.target.textContent)}} className={`${currentCategory === 'welfare'? 'bg-yellow-600 text-white': 'bg-white text-yellow-600'} border border-yellow-600 px-7 py-2 text-white rounded-lg capitalize`}>welfare</button>
                    <button onClick={(e) => {setComplaintCategory(complaintCategories[`${e.target.textContent}`]); setCurrentCategory(e.target.textContent)}} className={`${currentCategory === 'legal'? 'bg-purple-600 text-white': 'bg-white text-purple-600'} border border-purple-600 px-7 py-2 text-white rounded-lg capitalize`}>legal</button>
                </div>
                <button onClick={() => setShowCreateComplain(prevValue => !prevValue)} className='shrink-0 flex items-center gap-3 border-[3px] hover:text-purple-600 hover:border-purple-600 text-gray-700 px-4 h-12 rounded-xl'>
                    <span className='flex items-center text-xl'>New Complaint</span>
                    <span className='flex items-center text-xl'><i className='fa fa-plus'></i></span>
                </button>
            </div>
        </div>
        <div className='w-full h-full flex justify-center overflow-auto'>
            {complaintCategory}
        </div>
    </div>
  )
}

export default Complaints