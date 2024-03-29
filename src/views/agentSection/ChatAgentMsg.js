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
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';

import { mainListItems, secondaryListItems } from './components/ListItems';
import Chart from './components/Chart';
import Deposits from './components/Deposits';
import Orders from './components/Orders';

import { useNavigate, useParams } from 'react-router-dom';
import  checkLogin from './functions/checkAgentLogin';
import Loader from '../../components/Loader';
import logo from '../../images/logo.png';
import AgentDashboard from './components/AgentDashboard';
import Complaints from './components/Complaints';
import { AvatarGroup, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Tooltip } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import People from '@mui/icons-material/People';
import BarChart from '@mui/icons-material/BarChart';
import Layers from '@mui/icons-material/Layers';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

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
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
        main: 'rgb(88 28 135)',
        darker: 'rgb(88 40 120)',
        },
        neutral: {
        main: '#64748B',
        contrastText: '#fff',
        },
    },
});

const ChatAgentMsg = () => {
	const { number } = useParams();

    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAdmin, setCurrentAdmin ] = useState({});
    const [ isPageLoading, setIsPageLoading ] = useState(false);
    const [ showSidebar, setShowSidebar ] = useState(false);

    const pages = {
        dashboard: <AgentDashboard />,
        complaints: <Complaints /> ,
        // chat: <WelfareComplaint filter='welfare' />,
    }

    const [ page, setPage ] = useState(pages.dashboard);
    const [ currentPage, setCurrentPage ] = useState('dashboard');

    useEffect(() => {
        // checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
        console.log('Hello');
    }, []);


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    const [ showLogoutModal, setShowLogoutModal ] = useState(false);
    const logout = () => {
        setShowLogoutModal(false);
        setIsPageLoading(true);
        localStorage.removeItem('agentAccessToken');
        setTimeout(() => {
            setIsPageLoading(false);
            checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
        }, 2000);
    }

    const openChat = (number) => {
        navigate(`/agent/chat/:${number}`);
    }
    const closeChat = (number) => {
        navigate(`/agent/chat`);
    }

    const openAgentPage = () => {
        navigate('/agent');
    }
    
    const [ chatUsers, setChatUsers ] = useState([]);
    const [ userNumber, setUserNumber ] = useState('');
    const [ currentUserMessage, setCurrentUserMessage ] = useState([]);
    const [ myMessage, setMyMessage ] = useState('');

    const getAllChats = () => {
        fetch('https://ribbons.onrender.com/chat/my-chats',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    loc: JSON.parse(localStorage.getItem('adminLocation'))
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setChatUsers(data);
            setUserNumber(number.split(':')[1])
            const thisUser = data.filter(item => item.user === number.split(':')[1]);
            setCurrentUserMessage(thisUser.length > 0? thisUser[0].message: []);
            console.log('This is the current user: ', thisUser[0].message);
        })
    }
    useEffect(() => {
        getAllChats();
        // console.log('Hello');
    }, [number]);

    const sendMessage = () => {
        console.log('Sending message');
        // fetch(`https://fancy.com/api/sms/sendsms?username=farex&password=faruqcomputers&sender=Ribbons&recipient=%22${'+2348137926904'}%22&message=${myMessage}`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         }
        //     }
        // )
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err))

        fetch('https://ribbons.onrender.com/admin/chat',
            {
                method: 'post',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender: JSON.parse(localStorage.getItem('agentPhone')),
                    receiver: userNumber,
                    msg: myMessage,
                    dept: "medical",
                    loc: JSON.parse(localStorage.getItem('agentLocation')),
                    status: 2
                })
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setMyMessage('');
            getAllChats();
            // fetch(`https://fancy.com/api/sms/sendsms?username=farex&password=faruqcomputers&sender=Ribbons&recipient=%22${'+2348137926904'}%22&message=${myMessage}`)
            // .then(response => response.json())
            // .then(data => console.log(data))
        })
    }

    return (
        <div className='w-full h-full flex flex-col'>
            {
                isPageLoading?
                <Loader />
                :
                <>
                    <main className='h-full w-full flex flex-col overflow-y-auto'>
                        <ThemeProvider theme={mdTheme}>
                            {
                                <Dialog
                                open={showLogoutModal}
                                onClose={() => setShowLogoutModal(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                <span className='text-purple-900'>{"Log Out of Ribbons Agent Panel"}</span>
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you really want to logout?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={() => setShowLogoutModal(false)}>
                                    <span className='text-purple-900'>Cancel</span>
                                </Button>
                                <Button onClick={() => logout()} autoFocus>
                                    <span className='text-red-600'>Logout</span>
                                </Button>
                                </DialogActions>
                            </Dialog>
                            }
                            <Box sx={{ display: 'flex' }}>
                                <CssBaseline />
                                
                                <AppBar position="absolute" sx={{backgroundColor: 'rgb(88 28 135)'}} open={open}>
                                <Toolbar
                                    sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                    }}
                                >
                                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && { display: 'none' }),
                                    }}
                                    >
                                    <MenuIcon />
                                    </IconButton>
                                    <Typography component="h1" variant="h4" color="inherit" noWrap
                                    sx={{ flexGrow: 1 }}
                                    >
                                    Help Desk
                                    </Typography>
                                    <Tooltip title="Logout">
                                        <IconButton color="inherit" size='large' onClick={() => setShowLogoutModal(true)}>
                                            <PowerSettingsNewIcon fontSize='inherit'/>
                                        </IconButton>
                                    </Tooltip>
                                    <IconButton color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <NotificationsIcon/>
                                        </Badge>
                                    </IconButton>
                                </Toolbar>
                                </AppBar>

                                <Drawer variant="permanent" open={open}>
                                    <Toolbar
                                        sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        px: [1],
                                        }}
                                    >
                                        <div className='text-center font-semibold block w-full text-purple-900 '>
                                            <Typography component="h1" variant="h4" color="inherit" noWrap
                                            sx={{ flexGrow: 1 }}
                                            >
                                            Ribbons
                                            </Typography>
                                        </div>
                                        <IconButton onClick={toggleDrawer}>
                                        <ChevronLeftIcon />
                                        </IconButton>
                                    </Toolbar>
                                    <Divider />
                                    <List component="nav">
                                        {
                                            <React.Fragment>
                                                <ListItemButton onClick={() => openAgentPage()}>
                                                    <ListItemIcon>
                                                        <Dashboard />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Dashboard" />
                                                </ListItemButton>
    
                                                <ListItemButton onClick={() => openAgentPage()}>
                                                    <ListItemIcon>
                                                        <DriveFileRenameOutlineIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Complaints" />
                                                </ListItemButton>
    
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <SpeakerNotesIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Chat" />
                                                </ListItemButton>
                                            </React.Fragment>
                                        }
                                    </List>
                                </Drawer>
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
                                }}>
                                    <Container maxWidth="xl" className='h-full w-full pt-24'>
                                        <Grid container spacing={3} height='100%' columns={{ xs: 12}} direction='col'>
                                            <div className='flex w-full h-full shadow'>
                                                <div className='hidden lg:flex flex-col h-full overflow-y-auto shadow w-2/5 divide-y px-2'>
                                                    {
                                                        chatUsers.map(user => {
                                                            return (
                                                                <button onClick={() => openChat(user.user)} className='w-full flex items-center gap-2 py-3 px-2 text-base'>
                                                                    <Avatar></Avatar>
                                                                    {user.user}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='flex flex-col gap-2 font-semibold text-purple-900 w-full'>
                                                    <div className='flex w-full shadow py-2 px-4'>
                                                        <ListItemButton onClick={() => closeChat()} width={2}>
                                                            <ListItemIcon>
                                                                <ArrowBackIcon />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                        <div className='flex gap-2 w-full justify-between'>
                                                            <div className='flex items-center justify-center text-gray-600'>
                                                                {number.split(':')[1]}
                                                            </div>
                                                            <div className='w-14 h-14 flex items-center justify-center border rounded-full shadow'>
                                                                <span className='text-gray-600 text-2xl'><i className='fa fa-user'></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col justify-end px-2 h-full overflow-auto'>
                                                        <div style={{ fontFamily: `'Lato', sans-serif` }} className='flex flex-col py-2 w-full h-full gap-2 rounded-lg'>
                                                            <div className='mb-auto'></div>
                                                            <div className='relative flex justify-center py-1'>
                                                                <div className='absolute w-full border top-[50%] z-20'></div>
                                                                <span className='bg-gray-500 px-3 py-1 rounded-lg text-xs text-white z-30'>Today</span>
                                                            </div>
                                                            {
                                                                currentUserMessage.map(item => {
                                                                    return (item.status === 'received' ?
                                                                        <div className='flex justify-end px-2 mb-1'>
                                                                            <div className='max-w-xs text-start border border-purple-900 bg-white text-purple-900 px-2.5 py-1 rounded-2xl rounded-tr-none'>{item.content}</div>
                                                                        </div>
                                                                        :
                                                                        <div className='flex justify-start px-2 mb-1'>
                                                                            <div className='max-w-xs text-start bg-purple-900 text-white px-2.5 py-1 rounded-2xl rounded-tl-none'>{item.content}</div>
                                                                        </div>)
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='w-full px-4 py-4'>
                                                        <div className='relative'>
                                                            <div className='absolute top-0 right-0 h-full px-3 flex items-center z-10'>
                                                                <button onClick={() => sendMessage()} className=''><SendIcon color='primary'/></button>
                                                            </div>
                                                            <TextField onChange={(e) => setMyMessage(e.target.value)} value={myMessage} id="outlined-basic" placeholder='Type Message' variant="outlined" className='w-full rounded-xl'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Container>
                                </Box>
                            </Box>
                        </ThemeProvider>
                    </main>
                </>
            }
        </div>
    )
}

export default ChatAgentMsg