import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import Loader from '../../components/Loader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  

const theme = createTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const navigate = useNavigate();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginMessage, setLoginMessage ] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showLoader, setShowLoader ] = useState(false);

  const toggleMessageContent = (setTarget, message) => {
    setTarget(message);
    setTimeout(() => {
      setTarget('')
    }, 2000)
  }

  const login = () => {
    setIsLoading(true);
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
    .then(data => {
      console.log(data)
        if (data.error) {
          toggleMessageContent(setLoginMessage, data.error);
          setLoginStatus(false);
        } else {
          toggleMessageContent(setLoginMessage, '');
          setLoginStatus(true);
          localStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
          localStorage.setItem('adminUsername', JSON.stringify(username));
          localStorage.setItem('adminLocation', JSON.stringify(data.location));
          setTimeout(() => {
            setShowLoader(true);
          }, 2000);
          setTimeout(() => {
            navigate('/admin');
          }, 4000)
        }
        setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      toggleMessageContent(setLoginMessage, 'Login failed');
      setLoginStatus(false);
      setIsLoading(false);
    })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bWFuaXRhcmlhbnNlcnZjYW1wbWFoYXJhc2giLCJpYXQiOjE2Njk1NjEzMjAsImV4cCI6MTY3MDE2NjEyMH0.1flPPKkBNYbJHlOu4njWzzuiabA8rxhWW-rJ0MKgEqI
}
  return (
    <div className=''>
      {
        showLoader?
        <Loader />
        :
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <div className='w-full max-w-[100px] h-30px'>
              <img alt='' src={logo} />
            </div>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(e) => setUsername(e.target.value)} 
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
                onChange={(e) => setPassword(e.target.value)} 
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              { loginMessage !== '' &&
              <div className='login-message'>
                  <span className={`login-message-content block text-start font-semibold pb-3 italic text-${loginStatus === 'success'? 'green-500': 'purple-800'}`}>{loginMessage}</span>
              </div>
              }
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={() => login()} 
                sx={{ mt: 3, mb: 2, py: 2, backgroundColor: 'rgb(88 28 135)' }}
              >
                <div className='flex gap-3'>
                  Sign In
                  {
                    isLoading &&
                    <span className='flex w-5 h-5 rounded-full border-2 border-gray-300 border-r-white animate-spin'></span>
                  }
                </div>
              </Button>
              <Grid container>
                <Grid item>
                  <Link href='/admin/register' variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      }
    </div>
  )
}

export default AdminLogin