import React, { useState, useEffect } from 'react'
import PlainHeader from './PlainHeader'
import HeaderLinks from './HeaderLinks'
import BiddingOnAuctionCards from './cards/BiddingOnAuctionCards'
import MyAuctionCards from './cards/MyAuctionCards'
import WonAuctionCards from './cards/WonAuctionCards'
import { useAuth } from './Auth'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation  } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ProfilePage() {

  const auth = useAuth()  //For when logged in
  const navigate = useNavigate()
  const location = useLocation()

  let userName = auth.checkUserName()
  let[email,setEmail]= useState('')
  let [userID, setUserID] = useState(null)
  
  useEffect(()=>{

    //load user details on page load
    if(userName){
    
    var userData = JSON.stringify({
      "user_name": userName

    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:4000/findUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : userData
    };
    
    axios(config)
    .then(function (response) {

      setEmail(response.data[0].email)
      setUserID(response.data[0].user_id)

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  },[])

  // populate profile information table

  function createData(label, value) {
    return { label, value };
  }
  
  const rows = [
    createData('user name',userName),
    createData('email',email),
    createData('user ID',userID)
  
  ];

  let handleDeleteAccount = ()=>{

    const data = JSON.stringify({
      "user_id": auth.checkUserID()
    });
    
    const config = {
      method: 'delete',
      url: 'http://localhost:4000/deleteUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
   
      auth.logout()
      const redirectPath = location.state?.path || '/'  //navigate to home page after deleting account
      navigate(redirectPath, {replace: true}) 

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  let handlePostAuction = ()=>{

    const redirectPath = location.state?.path || '/PostAuction'  //navigate to post auction page
    navigate(redirectPath, {replace: false}) 

  }

  return (
    <div>
      <HeaderLinks pageName=' Profile' linkName='Home ' linkTo='/'/>
      
      <PlainHeader/>

      {/* Profile Information section */}

      <Typography
          sx={{ textAlign: 'center',py: 2  }}
          variant="h5"
          component="div"
        >
          Profile Information
      </Typography>

      {userID!==null&&
        <Box textAlign='center' sc={{p:1}}>
          <Button onClick={handleDeleteAccount} variant='text'>
          Delete Account
          </Button>
        </Box>
      }

      <TableContainer component={Paper}  sx={{ maxWidth: 400, margin:"auto", py:2 }}>
        <Table aria-label="simple table">
    
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >
                  {row.label}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* My auctions section */}
      
      <Box sx={{ textAlign: 'center',py: 2  }}>
        <Typography
            sx={{ py: 2  }}
            variant="h5"
            component="div"
          >
            My Auctions
        </Typography>

        {(userID!==null)? //  show when user data has been retrived (Stops backend error) 

          <>
          <Box textAlign='center'>
            <Button onClick={handlePostAuction} variant='text'>
              Post Auction
            </Button>
          </Box>
  
          <MyAuctionCards seller_id={userID}/>
          </>
          :
          <p>Not logged in</p>
        }
        
      </Box>

      {/* Currently Bidding on section */}

      <Box sx={{ textAlign: 'center',py: 2  }}>
        <Typography
            sx={{ py: 2  }}
            variant="h5"
            component="div"
          >
            Currently Bidding on
        </Typography>
        
        {(userID!==null)? //  show when user data has been retrived (Stops backend error) ****** first create bidding history data ******* 
          
          <BiddingOnAuctionCards bidder_id={userID}/>
          
          :
          <p>Not logged in</p>
        }
        
      </Box>

      {/* Won Auctions section */}

      <Box sx={{ textAlign: 'center',py: 2  }}>
        <Typography
            sx={{ py: 2  }}
            variant="h5"
            component="div"
          >
            Won Auctions
        </Typography>
        
        {(userID!==null)? //  show when user data has been retrived (Stops backend error) 
          
          <WonAuctionCards buyer_id={userID}/>
          
          :
          <p>Not logged in</p>
        }
        
      </Box>

    </div>
  )
}
