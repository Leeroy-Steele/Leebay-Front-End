import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './Auth'  //For when logged in
import Box from '@mui/material/Box';

export default function HeaderLinks(props) {

  // console.log(props.linkTo)
  const auth = useAuth()  //For when logged in
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = ()=>{
    console.log('logout code block')
    auth.logout()

    const redirectPath = location.state?.path || '/'  //define where to navigate to after logout
    navigate(redirectPath, {replace: true}) 

  }
  
  return (
    <div>
      <Container sx={{ py: 0.2 , margin:"auto"}} maxWidth="md">

          {(auth.checkUserName()!==null)? //  if logged in show profile 
            <>

              <Box
                sx={{
                    display:"grid",
                    gridTemplateColumns:"repeat(12, 1fr)",
                    height: 25,
                }}>
                <Box gridColumn="span 11">
                  <span> 
                    <Typography mt={0.5} variant="body2">
                    User {auth.checkUserName()} / 
                    <NavLink to={props.linkTo} >{props.linkName}</NavLink>
                    </Typography>
                 </span>
                </Box>
                <Box gridColumn="span 1">
                  <Button sx={{fontSize:10}} onClick={()=>{handleLogout()}}>Logout</Button>
                </Box>
              </Box>
              
            </>
            :
            <>
            <Typography mt={0.5} variant="body2">
                Hi!               
                <NavLink to='/SignIn' > Sign in </NavLink>
                or 
                <NavLink to='/SignUp' > Register </NavLink>
              </Typography>
            </>
          }
      
      </Container>
    </div>
  )
}
