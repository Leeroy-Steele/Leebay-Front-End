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
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';

export default function ProfilePage() {

  const auth = useAuth()  //For when logged in
  let userName = auth.checkUserName()

  let[email,setEmail]= useState('')
  let [userID, setUserID] = useState(null)

  useEffect(()=>{

    //load user details on page load

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
      // console.log(JSON.stringify(response.data[0]));
      setEmail(response.data[0].email)
      setUserID(response.data[0].user_id)


    })
    .catch(function (error) {
      console.log(error);
    });

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


  return (
    <div>
      <HeaderLinks linkName='Home' linkTo='/'/>
      <PlainHeader/>

      <Typography
          sx={{ textAlign: 'center',py: 2  }}
          variant="h5"
          component="div"
        >
          Profile Information
        </Typography>

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
      
      <Box sx={{ textAlign: 'center',py: 2  }}>
        <Typography
            sx={{ py: 2  }}
            variant="h5"
            component="div"
          >
            My Auctions
        </Typography>

        <NavLink sx={{ margin: 'auto',py: 5  }} to={`/PostAuction`}>Post Auction</NavLink>

        {(userID!==null)? //  show when user data has been retrived (Stops backend error) 
          <MyAuctionCards seller_id={userID}/>
          // <></>
          :
          <p>Not logged in</p>
        }
        

      </Box>

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
          // <></>
          :
          <p>Not logged in</p>
        }
        
      </Box>

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
          // <></>
          :
          <p>Not logged in</p>
        }
        
      </Box>

    </div>
  )
}
