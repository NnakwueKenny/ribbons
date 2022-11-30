import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader';

const WelfareComplaint = ({filter}) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ complaints, setComplaints ] = useState([]);
    const [ previewComplaint, setPreviewComplaint ] = useState(false)

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
            setComplaints(data.filter(item => item.cat === 'welfare'));
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getAllComplaints();
    }, [])

    return (
        <div className='relative w-full flex justify-center'>
            {
                previewComplaint &&
                <div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex justify-center items-center p-6'>
                    <div className='relative bg-white w-full max-w-4xl h-full max-h-[500px] rounded-2xl p-6'>
                        <button onClick={() => setPreviewComplaint(prevValue => !prevValue)} className='absolute top-8 right-8 text-2xl'><i className='fa fa-times'></i></button>
                        About Complaint
                    </div>
                </div>
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
                    <div className='w-full max-w-8xl h-full grid md:grid-cols-1 lg:grid-cols-3 gap-8'>
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
                                            View
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

export default WelfareComplaint;