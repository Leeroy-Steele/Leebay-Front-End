import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import PlainHeader from './PlainHeader'
import HeaderLinks from './HeaderLinks'
import { Button } from '@mui/material';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//for modal styling

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 8,
};


function FileUploadSingle() {

  const [file, setFile] = useState();
  const location = useLocation()

  // for modal

  const [open, setOpen] = React.useState(false);  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    //   console.log(file)
    }
  };

  const handleUploadClick = (event) => {

    event.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
	  formData.append('auctionImage', file);

    axios.post(
        "http://localhost:4000/addAuctionPhoto?auction_id="+location.state.auction_id,    // post image file to correct auction 
        formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }
      ).then(response => {
          console.log(response)
          handleOpen()  //open modal for successfull image upload
          return
      })   
    }

  return (
    <>
      <HeaderLinks linkName='Home' linkTo='/'/>
      <PlainHeader/>  


      <Box
        sx={{
            display:"grid",
            gridTemplateColumns:"repeat(12, 1fr)",
            gap:1,
            mx: 'auto',
            my:3,
            width: 486,
            height: 150,
        }}>

        <Box gridColumn="span 8">
          <Typography variant="h6">
            Please choose auction image
          </Typography>
        </Box>

        <Box gridColumn="span 4">
          <Button
            variant="contained"
            component="label"
            onChange={handleFileChange}
          >
            Select image
            <input
              type="file"
              hidden
            />
          </Button>
        </Box>
            
        <Box gridColumn="span 8">
          {file && <Typography variant="h6"> Selected file: {file.name} </Typography>}
        </Box>

        <Box gridColumn="span 4">
          {file && <Button 
            variant="contained"
            component="label"
            
            type='button' 
            onClick={handleUploadClick}
            >
              Upload
            </Button>}
        </Box>
      
      </Box>
    
      <div>
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Your image has been uploaded
              </Typography>
              {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                You now lead the auction at $
              </Typography> */}
              <Box sx={{ py: 3 , margin:"auto"}}><NavLink  to='/Profile' > Return to profile </NavLink></Box>
              
            </Box>
          </Fade>
        </Modal>

      </div>
    
    </>
  );
}

export default FileUploadSingle;