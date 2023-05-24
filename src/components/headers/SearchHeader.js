import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import StoreIcon from '@mui/icons-material/Store';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'

// functions for search bar start here

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({childToParent}) {

  let[searchQuery,setSearchQuery]=useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleIconClick = ()=>{

    const redirectPath = location.state?.path || '/'  //nav to home page 
    navigate(redirectPath, {replace: false}) 

  }

  return (
    <Box >
      <AppBar position="static">
     
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={()=>{handleIconClick()}}
            sx={{ mr: 2 }}
          >
            <StoreIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            LEEBAY
          </Typography>
          
          <Search>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onInput={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </Search>

          <Button variant="filled" color="success" onClick={() => childToParent(searchQuery)}><SearchIcon /></Button>

        </Toolbar>
       
      </AppBar>
    </Box>
  );
}