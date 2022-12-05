import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';

const ResolvedComplaints = () => {
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
            console.log(data);
            setComplaints(data.filter(item => item.status === true));
            setIsLoading(false)
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
                    :<div className='relative w-full'>
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
                                        <div key={index+1} className="w-full h-80 flex flex-col p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
                                            <div className="block flex justify-between items-start mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                                                <span className='capitalize'>
                                                    {complaint.cat} Support Complaint
                                                </span>
                                                {
                                                    complaint.severity === 'emergency' &&
                                                    <span className='font-bold text-base flex text-red-500 text-lg capitalize'>{complaint.severity}</span>
                                                }
                                            </div>
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
                                                <a  href={`${complaint.status? 'tel:'+complaint.phone: 'javascript:void(0)'}`} id={complaint.id} className={`flex w-full items-center justify-center px-3 py-3 text-lg font-semibold text-center text-white ${complaint.status? 'bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300': 'bg-gray-500 cursor-default'} rounded-lg`}>
                                                    Call Victim
                                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        </>
                    }
                </div>
                }
                </>
            }
        </div>
    )
}

export default ResolvedComplaints;