import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import Loader from '../../components/Loader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://ribbons.vercel.app">
          Ribbons
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  
const AdminLogin = () => {

  const navigate = useNavigate();
  const theme = createTheme();

  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ location, setLocation ] = useState('');
  const [category, setCategory ] = useState('')

  const [ registerMessage, setregisterMessage ] = useState('');
  const [ registerStatus, setRegisterStatus ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showLoader, setShowLoader ] = useState(false);

  const toggleMessageContent = (setTarget, message) => {
    setTarget(message);
    setTimeout(() => {
      setTarget('')
    }, 2000)
  }

  const register = () => {
    setIsLoading(true);
    console.log(name, phone, email, username, password, confirmPassword, location)
    fetch('https://ribbons.onrender.com/agent/register',
        {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              phone: phone,
              email: email,
              username: username,
              password: password,
              confirmPassword: confirmPassword,
              loc: location,
              dept: category
          })
        }
    )
    .then(response => response.json())
    .then(regData => {
      console.log(regData)
        if (!regData.message) {
          toggleMessageContent(setregisterMessage, regData.error);
          setRegisterStatus(false);
        } else {
            toggleMessageContent(setregisterMessage, regData.messsage);
            fetch('https://ribbons.onrender.com/agent/login',
                {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    })
                }
            )
            .then(response => response.json())
            .then(loginData => {
                toggleMessageContent(setregisterMessage, regData.message);
                setRegisterStatus(true);
                localStorage.setItem('agentAccessToken', JSON.stringify(loginData.accessToken));
                localStorage.setItem('agentUsername', JSON.stringify(username));
                localStorage.setItem('agentLocation', JSON.stringify(loginData.accessToken));
                setTimeout(() => {
                    setShowLoader(true);
                }, 2000);
                setTimeout(() => {
                    setShowLoader(false);
                    navigate('/agent');
                }, 5000);
            })
            .catch(err => console.log(err));
        }
        setIsLoading(false);
    })
    .catch(err => {
      console.log(err)
      toggleMessageContent(setregisterMessage, 'Login failed');
      setRegisterStatus(false);
      setIsLoading(false);
    })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bWFuaXRhcmlhbnNlcnZjYW1wbWFoYXJhc2giLCJpYXQiOjE2Njk1NjEzMjAsImV4cCI6MTY3MDE2NjEyMH0.1flPPKkBNYbJHlOu4njWzzuiabA8rxhWW-rJ0MKgEqI
}
  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      {
        showLoader?
        <Loader />
        :
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <div className='w-full max-w-[100px] h-25px'>
                        <img alt='' src={logo} />
                    </div>
                    <Typography component="h1" variant="h5">
                        Agent Registration
                    </Typography>
                    <Box component="form" noValidate >
                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name (Eg. Humanitarian camp, Maharashtra, India)"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <FormControl fullWidth sx={{marginTop: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            >
                            <MenuItem value={'medical'}>Medical</MenuItem>
                            <MenuItem value={'health'}>Health</MenuItem>
                            <MenuItem value={'counselling'}>Counselling</MenuItem>
                            <MenuItem value={'welfare'}>Welfare</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            onChange={(e) => setPhone(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            onChange={(e) => setLocation(e.target.value)}
                            margin="normal"
                            required
                            fullWidth
                            name="location"
                            label="Location (Eg. Mumbai, India)"
                            id="location"
                            autoComplete="location"
                        />
                        {registerMessage !== '' &&
                            <div className='login-message'>
                                <span className={`login-message-content block text-start font-semibold pb-3 italic text-${registerStatus === 'success' ? 'green-500' : 'purple-800'}`}>{registerMessage}</span>
                            </div>
                        }
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={() => register()}
                            sx={{ mt: 3, mb: 2, py: 2, backgroundColor: 'rgb(88 28 135)' }}
                        >
                            <div className='flex gap-3'>
                                Register
                                {
                                    isLoading &&
                                    <span className='flex w-5 h-5 rounded-full border-2 border-gray-300 border-r-white animate-spin'></span>
                                }
                            </div>
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/agent/login' variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
        </ThemeProvider>
        </>
      }
    </div>
  )
}

export default AdminLogin;