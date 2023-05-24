import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Auth'  //For when logged in
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function HeaderLinks(props) {

  const auth = useAuth()  //For when logged in
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = ()=>{
    auth.logout()

    const redirectPath = location.state?.path || '/'  //define where to navigate to after logout
    navigate(redirectPath, {replace: true}) 

  }

  const handleProfileButton = ()=>{
    const redirectPath = location.state?.path || props.linkTo  //define where to navigate to after logout
    navigate(redirectPath, {replace: false}) 
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

                <Box gridColumn="span 8">
                  <span> 
                    <Typography mt={0.5} variant="body2">
                    User {auth.checkUserName()} / 
                     {props.pageName}
                    </Typography>
                 </span>
                </Box>
                
                <Box gridColumn="span 4" textAlign='right'>

                  <Link underline="hover" component="button" onClick={()=>{handleProfileButton()}} >{props.linkName} </Link>
                  <Link underline="hover" component="button" onClick={()=>{handleLogout()}}> / Logout</Link>
              
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
