import * as React from 'react';
import PlainHeader from './PlainHeader'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useAuth } from './Auth'
import { useNavigate, useLocation } from 'react-router-dom'

const theme = createTheme();

export default function SignUpSide() {

  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'  //go back to home page after login

  const handleSubmit = (event) => {
    event.preventDefault();

    //get form data
    const data = new FormData(event.currentTarget);
    let userName = data.get('userName')
    let email = data.get('email')
    let password = data.get('password')

    // form error handling
    if(!email || !password || !userName){alert(`you need to enter an email address and password`)}

    // check db for existing username and email
    else{

      //AXIOS add user
    
      const bodyData = JSON.stringify({
        "user_name":userName,
        "email": email,
        "user_password": password
      });
      
      const config = {
        method: 'post',
        url: 'http://localhost:4000/addUser',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : bodyData
      };
      
      axios(config)
      .then(function (response) { // add user success

          if(typeof response.data[2]=== 'number'){
            auth.login(userName,response.data[2])
            navigate(redirectPath, { replace: true }) //nav to home page
          }
          
          //error handling 
          
          else if(response.data==='Failed, email already in use'){   
            alert("email already regestered, please login instead",                  <Link href="/SignIn" variant="body2">
            {"Already have an account? Sign In"}
          </Link>)
          }else if(response.data==='Failed, user name already in use'){
            alert("user name already in use, please try a different user name")
          }else{
            alert("Something went wrong, try again later")
            console.log(response.data)
          }

      })
      .catch(function (error) { // add user fail / error

        console.log(error);alert(`Problem with sign up `)

      });
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <PlainHeader/>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',   //change background image here
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
              />
              <TextField
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

