import React, { useEffect, useState } from 'react'

const AllComplaints = ({filter}) => {
    const [ complaints, setComplaints ] = useState([])

    
    // const getGeoLocation = async (data) => {
    //     // extracting the latitude and longitude from the data
    //     let latitude = data.coords.latitude;
    //     let longitude = data.coords.longitude;

    //     console.log('Getting geolocation');
    //     fetch(`https://api.opencagedata.com/geocode/v1/json?q=19.076111+72.877500&key=3fc01ec0efd54fec9f12d22b658a4752`,
    //     // fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3fc01ec0efd54fec9f12d22b658a4752`,
    //         {
    //             method: 'get',
    //             headers: {
    //                 accept: 'application/json',
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         }
    //     )
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         const fetchedLocation = data.results[0].formatted.split(',').slice(-2);
    //         console.log(fetchedLocation);
    //         setUserData(prevValue => {
    //             return {
    //                 ...prevValue,
    //                 loc: `${fetchedLocation[0]}, ${fetchedLocation[1]}`
    //             }
    //         })
    //         setLocation(`${fetchedLocation[0]}, ${fetchedLocation[1]}`);
    //     })
    //     .catch(err => console.log(err));
    // }
    
    // const getUserLoc = () => {
    //     if (userData.loc !== '') {
    //         setLocation(userData.loc)
    //     } else {
    //         console.log('No location');
    //         console.log('Getting Location!');
    //         if (navigator.geolocation) {
    //             window.navigator.geolocation
    //                 .getCurrentPosition(getGeoLocation, console.error);
    //         } else {
    //             // alert('Location is required! Reload Page to activate');
    //             // return false;
    //         }
    //     }
    // }

    const getAllComplaints = () => {
        fetch('http://localhost:3500/complaint/get-all-complaints',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loc: "Maharashtra, India"
                })
            }
        )
        .then(response => response.json())
        .then(data =>{
             console.log(data);
             setComplaints(data)
        })
    }

    useEffect(() => {
        getAllComplaints()
    }, {})
  return (
    <div className='w-full grid lg:grid-cols-2 p-8 gap-8'>
        {
            complaints.map((complaint, index) => {
                return (
                    <div key={index+1} className='h-80 w-full rounded-xl border-2 shadow'>wesd</div>
                )
            })
        }
    </div>
  )
}

export default AllComplaints