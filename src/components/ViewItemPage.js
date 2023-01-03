
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'
import { useAuth } from './Auth'  //For when logged in

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';  //for material card template
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import moment from 'moment';
import { NavLink } from 'react-router-dom'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import HeaderLinks from './HeaderLinks';
import PlainHeader from './PlainHeader'


export default function ViewItemPage() {

  const auth = useAuth()  //For when logged in

    const { auction_id } = useParams();

    let [displayData, setDisplayData] = useState([])

    useEffect(() => { // get all auction items on page load
        
        var config = {
            method: 'get',
            url: `http://localhost:4000/findAuctionItem?auction_id=${auction_id}`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data[0].auction_title);
            setDisplayData(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
            
    },[]) //only run once 


    const handleBid = (event)=>{

      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      const bidPrice = data.get('bidPrice')
      
      // place bid

      const bidRequestData = JSON.stringify({
        "bidder_id": 17,
        "auction_id": auction_id,
        "bid": bidPrice
      });
      
      const config = {
        method: 'patch',
        url: 'http://localhost:4000/placeBid',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : bidRequestData
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }



  return (
    <div>

      <HeaderLinks linkName='Home' linkTo='/'/>
      <PlainHeader/>  

        <Container sx={{ py: 2 , margin:"auto"}} maxWidth="md">
   
        <Grid container spacing={4}>

            {displayData.map((item, index) => (

            <Grid item key={item.auction_id} xs={12}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth:'800px' }}
                >
                  <Typography variant="h5" component="h2" textAlign='center'>
                    {item.auction_title}
                  </Typography>

                  <CardMedia
                    component="img"
                    sx={{pt: 2}}
                    image={item.image_path}
                    alt="random"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="body1">
                      {item.category}
                    </Typography>
                    
       
                    <Typography gutterBottom variant="body2">
                      {item.item_description}
                    </Typography>
                    
         
                    <Typography gutterBottom variant="body2">
                      Location: {item.item_location}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                      Current Bid: ${item.current_price}
                    </Typography>

                    <Typography gutterBottom variant="body2">
                      End date: {moment(item.end_date).format('DD.MM.YYYY HH:mm')}
                    </Typography>

       
                    </CardContent>

                    {/* bid option below only if user is logged in */}

                    {(auth.checkUserName()!==null)?

                      <Box component="form" onSubmit={handleBid} noValidate sx={{ m: 3 }}>
                        <FormControl fullWidth >
                          <InputLabel htmlFor="outlined-adornment-amount">Bid Price</InputLabel>
                          <OutlinedInput
                              id="outlined-adornment-amount"
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              name="bidPrice"
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Place Bid
                        </Button>
                      </Box>

                      :
                      <></>
                      
                    }

                </Card>
              </Grid>

            ))} 
            </Grid>
        </Container>
    </div>
  )
}
