import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Card from '@mui/material/Card';  //for material card template
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import moment from 'moment';


export default function AuctionCards(props) {
  
  console.log(props.seller_id)

    let [displayData, setDisplayData] = useState([])

    useEffect(() => { // get all auction items on page load

        const options = {
            method: 'GET',
            url: 'http://localhost:4000/findAllAuctionItems?user_id='+props.seller_id,
    
        };
          
        axios.request(options)
            .then(res => {setDisplayData(res.data)})
            .catch(err => {
                console.log(err)
            })

            
      },[]) //only run once on page load

  return (
    <div>

      <Container sx={{ py: 4 , margin:"auto"}} maxWidth="md">

        <Grid container spacing={4}>

            {displayData.map((item, index) => (

            <Grid item key={item.auction_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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

                </Card>
              </Grid>

            ))} 
            </Grid>
        </Container>
    </div>
  )
}
