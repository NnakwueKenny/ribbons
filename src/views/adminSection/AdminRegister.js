import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import Loader from '../../components/Loader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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

const AdminRegister = () => {
  const navigate = useNavigate();
  const theme = createTheme();

  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ location, setLocation ] = useState('');

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
    fetch('https://ribbons.onrender.com/admin/register',
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
          loc: location
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
        fetch('https://ribbons.onrender.com/admin/login',
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
          localStorage.setItem('adminAccessToken', JSON.stringify(loginData.accessToken));
          localStorage.setItem('adminUsername', JSON.stringify(loginData.username));
          localStorage.setItem('adminLocation', JSON.stringify(loginData.location));
          localStorage.setItem('adminPhone', JSON.stringify(loginData.phone));
          setTimeout(() => {
            setShowLoader(true);
          }, 2000);
          setTimeout(() => {
            setShowLoader(false);
            navigate('/admin');
          }, 5000);
        })
        .catch(err => console.log(err));
      }
      setIsLoading(false);
    })
    .catch(err => {
      toggleMessageContent(setregisterMessage, 'Login failed');
      setRegisterStatus(false);
      setIsLoading(false);
    })
  }

  return (
    <div className='relative w-full h-full flex justify-center items-center'>
      {
        showLoader?
        <Loader />
        :
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
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
                      Admin Registration
                  </Typography>
                  <Box component="form" noValidate className='w-full'>
                    <div className='flex flex-col md:flex-row md:gap-4 w-full'>
                      <TextField
                        onChange={(e) => setName(e.target.value)} margin="normal" required
                        fullWidth id="name" label="Name (Eg. Humanitarian camp, Maharashtra, India)"
                        name="name" autoComplete="name" autoFocus
                      />
                      <TextField
                        onChange={(e) => setLocation(e.target.value)} margin="normal" required fullWidth
                        name="location" label="Location (Eg. Mumbai, India)" id="location" autoComplete="location"
                      />
                    </div>
                    <div className='flex flex-col md:flex-row md:gap-4'>
                      <TextField
                        onChange={(e) => setPhone(e.target.value)} margin="normal" required
                        fullWidth id="phone" label="Phone" name="phone" autoComplete="phone" autoFocus
                      />
                      <TextField onChange={(e) => setEmail(e.target.value)} margin="normal" required
                        fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus
                      />
                    </div>
                    <TextField
                      onChange={(e) => setUsername(e.target.value)} margin="normal" required fullWidth
                      id="username" label="Username" name="username" autoComplete="username" autoFocus
                    />
                    <div className='flex flex-col md:flex-row md:gap-4'>
                      <TextField
                        onChange={(e) => setPassword(e.target.value)} margin="normal" required
                        fullWidth id="password" name="password" label="Password" type="password"
                        autoComplete="current-password" autoFocus
                      />
                      <TextField
                          onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" required
                          fullWidth id="confirmPassword" name="confirmPassword" label="Confirm Password"
                          type="password" autoComplete="current-password"
                      />
                    </div>
                    {registerMessage !== '' &&
                      <div className='login-message'>
                        <span className={`login-message-content block text-start font-semibold pb-3 italic text-${registerStatus === 'success' ? 'green-500' : 'purple-800'}`}>{registerMessage}</span>
                      </div>
                    }
                    <Button
                      type="button" fullWidth variant="contained" onClick={() => register()}
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
                        <Link href='/admin/login' variant="body2">
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

export default AdminRegister;