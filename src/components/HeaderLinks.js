import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'
import { useAuth } from './Auth'  //For when logged in

export default function HeaderLinks(props) {

  // console.log(props.linkTo)
  const auth = useAuth()  //For when logged in

  const handleLogout = ()=>{
    console.log('logout code block')
    auth.logout()
  }
  
  return (
    <div>
      <Container sx={{ py: 0.2 , margin:"auto"}} maxWidth="md">
        <Typography variant="caption" gutterBottom>

  

          {(auth.checkUserName()!==null)? //  if logged in show profile 
            <>
              <span> 
                User {auth.checkUserName()} / 
                <NavLink to={props.linkTo} >{props.linkName}</NavLink>

                <Button onClick={()=>{handleLogout()}}>Logout</Button>
              </span>
              
            </>
            :
            <>
              Hi!               
              <NavLink to='/SignIn' > Sign in </NavLink>
              or 
              <NavLink to='/SignUp' > Register </NavLink>
            </>
          }
      
        </Typography>
      </Container>
    </div>
  )
}
