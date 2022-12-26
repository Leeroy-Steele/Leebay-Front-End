import React from 'react'
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'
import { useAuth } from './Auth'  //For when logged in

export default function HeaderLinks() {

  const auth = useAuth()  //For when logged in
  
  return (
    <div>
        <Container sx={{ py: 0.2 , margin:"auto"}} maxWidth="md">
            <Typography variant="body2" gutterBottom>

      

                {(auth.checkUserName()!==null)? //  if logged in show profile 
                    
                      <NavLink to='/Profile' >{auth.checkUserName()}....Profile</NavLink>
                      
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
