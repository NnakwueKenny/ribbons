import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Grid } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({values, compare}) {
    
  return (
    <React.Fragment>
        <Title>
            <Typography sx={{color: `${values.allCases === 'All Cases'? 'rgb(88 28 135)': 'rgb(225 29 72)'}`}} component="h2" variant="h5">
                {compare === 'allCases'? values.allCases?.title: values.liveEmergency?.title}
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
                    {compare === 'allCases'? values.allCases?.open: values.liveEmergency?.open}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Title>
                    <Typography component="h2" variant="h5">
                        Closed
                    </Typography>
                </Title>
                <Typography component="p" variant="h6">
                    {compare === 'allCases'? values.allCases?.resolved: values.liveEmergency?.resolved}
                </Typography>
            </Grid>
        </Grid>

    </React.Fragment>
  );
}