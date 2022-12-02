import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Grid } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({value}) {

    const [ resolvedCases, setResolvedCases ] = useState(0);
    const [ pendingCases, setPendingCases ] = useState(0);
    const [ resolvedEmergency, setResolvedEmergency ] = useState(0);
    const [ pendingEmergency, setPendingEmergency ] = useState(0);

    const getAllComplaints = () => {
        console.log('Fetching all request...');
        fetch('https://ribbons.onrender.com/complaint/get-all-complaints',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "loc": JSON.parse(localStorage.getItem('adminLocation')),
                    "username": JSON.parse(localStorage.getItem('adminUsername'))
                  })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
    }

    useEffect(() => {
        getAllComplaints();
    })

    const [ displayValues, setDisplayValues ] = useState({
        allCases: {
            title: 'All Cases',
            resolved: resolvedCases,
            open: pendingCases,
        },
        liveEmergency: {
            title: 'Emergency Cases',
            resolved: resolvedEmergency,
            open: pendingEmergency,
        },
    })
    const [ currentDisplay, setCurrentDisplay ] = useState(displayValues[`${value}`]);

  return (
    <React.Fragment>
        <Title>
            <Typography sx={{color: `${currentDisplay.title === 'All Cases'? 'rgb(88 28 135)': 'rgb(225 29 72)'}`}} component="h2" variant="h4">
                {currentDisplay.title}
            </Typography>
        </Title>

        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Title>
                    <Typography component="h2" variant="h5">
                        Open
                    </Typography>
                </Title>
                <Typography component="p" variant="h6">
                    {currentDisplay.open}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Title>
                    <Typography component="h2" variant="h5">
                        Closed
                    </Typography>
                </Title>
                <Typography component="p" variant="h6">
                    {currentDisplay.resolved}
                </Typography>
            </Grid>
        </Grid>

    </React.Fragment>
  );
}