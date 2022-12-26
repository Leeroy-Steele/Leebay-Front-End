
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'


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



export default function ViewItemPage() {

    const { id } = useParams();

    // console.log(id)

    let [displayData, setDisplayData] = useState([])

    // if(category==='Home'||category==='Vehicles'||category==='Clothing'||category==='Sports & Hobbies'){console.log(category)}

    useEffect(() => { // get all auction items on page load
        
        var config = {
            method: 'get',
            url: `http://localhost:4000/findAuctionItem?auction_id=${id}`,
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



  return (
    <div>
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
                    <CardActions>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                    {/* <Button onClick={handleViewItem} value={item.auction_id} size="small">View</Button> */}
                    {/* <NavLink to={`/ViewItem/${item.auction_id}`}>View</NavLink> */}
                    <Button size="small">Bid</Button>
                  </CardActions>
                </Card>
              </Grid>

            ))} 
            </Grid>
        </Container>
    </div>
  )
}
