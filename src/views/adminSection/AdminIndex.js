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

import { mainListItems, secondaryListItems } from './components/ListItems';
import Chart from './components/Chart';
import Deposits from './components/Deposits';
import Orders from './components/Orders';

import { useNavigate } from 'react-router-dom';
import  checkLogin from './functions/checkAdminLogin';
import Loader from '../../components/Loader';
import logo from '../../images/logo.png';
import AdminDashboard from './components/AdminDashboard'
import Complaints from './components/Complaints';
import Drafts from './components/Drafts';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import People from '@mui/icons-material/People';
import BarChart from '@mui/icons-material/BarChart';
import Layers from '@mui/icons-material/Layers';

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
  

const AdminIndex = () => {
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentAdmin, setCurrentAdmin ] = useState({});
    const [ isPageLoading, setIsPageLoading ] = useState(false);
    const [ showSidebar, setShowSidebar ] = useState(false);

    const pages = {
        dashboard: <AdminDashboard />,
        complaints: <Complaints /> ,
        drafts: <Drafts />,
        // chat: <WelfareComplaint filter='welfare' />,
    }

    const [ page, setPage ] = useState(pages.dashboard);
    const [ currentPage, setCurrentPage ] = useState('dashboard');

    useEffect(() => {
        checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
        console.log('Hello');
    }, []);


    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    const logout = () => {
        setIsPageLoading(true);
        localStorage.removeItem('adminAccessToken');
        setTimeout(() => {
            setIsPageLoading(false);
            checkLogin(setIsLoggedIn, setCurrentAdmin, navigate, setIsPageLoading);
        }, 2000);
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
                                <IconButton color="inherit" size='large' onClick={() => logout()}>
                                    <PowerSettingsNewIcon fontSize='inherit'/>
                                </IconButton>
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
                                        <ListItemButton onClick={(e) => {setPage(pages['dashboard']); setCurrentPage('dashboard')}}>
                                            <ListItemIcon>
                                                <Dashboard />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItemButton>

                                        <ListItemButton onClick={(e) => {setPage(pages['complaints']); setCurrentPage('complaints')}}>
                                            <ListItemIcon>
                                                <ShoppingCart />
                                            </ListItemIcon>
                                            <ListItemText primary="Complaints" />
                                        </ListItemButton>

                                        <ListItemButton onClick={(e) => {setPage(pages['drafts']); setCurrentPage('drafts')}}>
                                            <ListItemIcon>
                                                <People />
                                            </ListItemIcon>
                                            <ListItemText primary="Drafts" />
                                        </ListItemButton>

                                        <ListItemButton onClick={(e) => {setPage(pages['chat']); setCurrentPage('chat')}}>
                                            <ListItemIcon>
                                                <BarChart />
                                            </ListItemIcon>
                                            <ListItemText primary="Chat" />
                                        </ListItemButton>
                                    </React.Fragment>}
                                </List>
                            </Drawer>
                            {page}
                        </Box>
                    </ThemeProvider>
                </main>
                </>
            }
        </div>
    )
}

export default AdminIndex