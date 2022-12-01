import React from 'react';
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
      <Toolbar />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Chart */}
          {/* All Cases */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 320 }} >
              <DisplayComponents value={'allCases'}/>
            </Paper>
          </Grid>

          {/* Emergency Cases */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 320 }} >
              <DisplayComponents value={'liveEmergency'}/>
            </Paper>
          </Grid>

          {/* Top Cases */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: 320 }}
            >
              <Title>
                <Typography sx={{color: 'rgb(22 163 74)'}} component="h2" variant="h4">
                    Top Cases Solved
                </Typography>
              </Title>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Department
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Solved
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Shelter
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          39
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Legal
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          15
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Counselling
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          70
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Welfare
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          150
                        </Typography>
                      </ListItem>
                    </Stack>
                  </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: 320 }}
            >
              <Chart />
            </Paper>
          </Grid>
          
          {/* Feedback */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 320 }} >
              <DisplayComponents value={'liveEmergency'}/>
            </Paper>
          </Grid>

          {/* Agent Status */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{ p: 2,  display: 'flex', flexDirection: 'column', height: 320 }}
            >
              <Title>
                <Typography sx={{color: 'gray'}} component="h2" variant="h4">
                    Agent Status
                </Typography>
              </Title>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <div className='w-full flex justify-between'>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h5">
                                Name
                            </Typography>
                          </Title>
                          <Title>
                            <Typography sx={{color: 'gray'}} component="h3" variant="h5">
                                Status
                            </Typography>
                          </Title>
                        </div>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Salma50
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Online
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Dujo38
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'color='red'>
                          Offline
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Prince40
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5' color='green'>
                          Online
                        </Typography>
                      </ListItem>
                    </Stack>

                    <Stack direction="col" spacing={2} justifyContent="between">
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5'>
                          Kene70
                        </Typography>
                      </ListItem>
                      <ListItem textAlign = 'end'>
                        <Typography variant='h5' color='red'>
                          Offline
                        </Typography>
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