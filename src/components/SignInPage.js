import * as React from 'react';
import PlainHeader from './headers/PlainHeader'
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
import { useAuth } from './Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const theme = createTheme();

export default function SignInSide() {

  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/'  //go back to home page after login

  const handleSubmit = (event) => {

    event.preventDefault();

    // get email and password from form

    const data = new FormData(event.currentTarget);

    let email = data.get('email')
    let password = data.get('password')

    // error handling

    if(!email || !password){alert(`you need to enter an email address and password`)}

    // check db for username and password

    else{

      //AXIOS find user & password
    
      const bodyData = JSON.stringify({
        "email": email,
        "user_password": password
      });
      
      const config = {
        method: 'post',
        url: `${auth.backendURL}/check-user-email-and-password`, // URL Will change to http://leebay-expressjs-backend-v2-dev602.ap-southeast-2.elasticbeanstalk.com/check-user-email-and-password
        headers: { 
          'Content-Type': 'application/json'
        },
        data : bodyData
      };
      
      axios(config)
      .then(function (response) { // login success

          let user_name = response.data[0].user_name
          let user_id = response.data[0].user_id

          if(user_name && user_id){
            auth.login(response.data[0].user_name,response.data[0].user_id)
            navigate(redirectPath, { replace: true }) //nav to home page
          }
          else{
            alert(`Sign in details are not correct`)
          }

      })
      .catch(function (error) { // login fail / error

        console.log(error);alert(`Sign in details are not correct`)

      });
    }
  }


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
            backgroundImage: 'url(https://i.redd.it/e6ez7pjx4o521.jpg)',   //change background image here
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
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
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

