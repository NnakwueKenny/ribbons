import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { mainListItems, secondaryListItems } from './ListItems';
import Chart from './Chart';
import Deposits from './Deposits';
import DisplayComponents from './DisplayComponents';
import Orders from './Orders';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import People from '@mui/icons-material/People';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import BarChart from '@mui/icons-material/BarChart';
import Layers from '@mui/icons-material/Layers';
import Dashboard from '@mui/icons-material/Dashboard';
import Title from './Title';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ribbons
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();

const AdminDashboard = () => {
  const [displayValues, setDisplayValues] = useState({
    allCases: {
      title: 'All Cases',
      resolved: 0,
      open: 0,
    },

    liveEmergency: {
      title: 'Emergency Cases',
      resolved: 0,
      open: 0,
    },
  });

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
      setDisplayValues(prevValue => {
        return {
          ...prevValue,
          allCases: {
            title: 'All Cases',
            resolved: data.filter(item => item.status === true).length,
            open: data.filter(item => item.status === false).length,
          }
        }
      });
      setDisplayValues(prevValue => {
        return {
          ...prevValue,
          liveEmergency: {
            title: 'Emergency Cases',
            resolved: data.filter(item => item.status === true && item.severity === 'emergency').length,
            open: data.filter(item => item.status === false && item.severity === 'emergency').length,
          }
        }
      });
    })
  }
  useEffect(() => {
    getAllComplaints();
  }, []);

  return (
    <>
      <Box
      component="main"
      sx={{
          backgroundColor: (theme) =>
          theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
      }}
      >
      <Toolbar />
      <div className='pl-5 py-4'>
        <Title>
          <Typography color='rgb(88 28 135)' component='h2' variant='h5'>{JSON.parse(localStorage.getItem('adminName'))}</Typography>
        </Title>
      </div>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Chart */}
          {/* All Cases */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}} >
              <DisplayComponents  values={displayValues} compare='allCases'/>
            </Paper>
          </Grid>

          {/* Emergency Cases */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}} >
              <DisplayComponents values={displayValues} compare='emergencyCases'/>
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}} >
              <Chart />
            </Paper>
          </Grid>

          {/* Top Cases */}

          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Title>
                <Typography sx={{color: 'gray'}} component="h2" variant="h5">
                  Top Cases Solved
                </Typography>
              </Title>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                                Department
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                                Cases
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Health
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                89
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Supplies
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              82
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                WASH
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              80
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>
                    
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Psychosocial
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              80
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Legal
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              80
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                  </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Feedback */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Title>
                <Typography sx={{color: 'gray'}} component="h2" variant="h5">
                  Feedback
                </Typography>
              </Title>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                                Name
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                                Review
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                              Date
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Faruq Hassa
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Great
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              1, Dec, 2022
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Alameen Magaga
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Excellent
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                            29 Nov, 2022
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Kene Nnakwue
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Very Disappointing
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              28 Nov, 2022
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Salma Gambo
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              No response
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              25 Nov, 2022
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Agent Status */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <Title>
                <Typography sx={{color: 'gray'}} component="h2" variant="h5">
                  Agent Status
                </Typography>
              </Title>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="subtitle1">
                              Name
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                              Dept.
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h6">
                                Status
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Salma50
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                WASH
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Online
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Dujo38
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                                Psychosocial
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                            Offline
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Kene70
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Medical
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                            Offline
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Prince40
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                              Supplies
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="body2">
                            Online
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4, pb: 2 }} />
      </Container>
      </Box>
    </>
  )
}

export default AdminDashboard;