import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Grid } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({value}) {

    const [ displayValues, setDisplayValues ] = useState({
        allCases: {
            title: 'All Cases',
            resolved: '10',
            open: '60'
        },
        liveEmergency: {
            title: 'Live Emergency',
            resolved: '10',
            open: '60'
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
            <Grid item xs={12}>
                <Title>
                    <Typography component="h2" variant="h4">
                        Pending
                    </Typography>
                </Title>
                <Typography component="p" variant="h4">
                    {currentDisplay.open}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Title>
                    <Typography component="h2" variant="h4">
                        Resolved
                    </Typography>
                </Title>
                <Typography component="p" variant="h4">
                    {currentDisplay.resolved}
                </Typography>
            </Grid>
        </Grid>

    </React.Fragment>
  );
}