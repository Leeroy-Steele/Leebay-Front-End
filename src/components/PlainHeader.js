import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate, useLocation } from 'react-router-dom'


export default function ButtonAppBar() {

  const navigate = useNavigate()
  const location = useLocation()

  const handleIconClick = ()=>{

    const redirectPath = location.state?.path || '/'  //nav to home page 
    navigate(redirectPath, {replace: false}) 

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={()=>{handleIconClick()}}
            sx={{ mr: 0 }}
          >
            <StoreIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LEEBAY
          </Typography>
     
        </Toolbar>
      </AppBar>
    </Box>
  );
}