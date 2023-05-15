import React, { useState, useEffect } from 'react'
import axios from 'axios'

//for material card template

import Card from '@mui/material/Card';  
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { NavLink } from 'react-router-dom'
import moment from 'moment';  // for dates

import { useAuth } from '../Auth'  //For changing backend URL eg, localhost to AWS


export default function BiddingOnAuctionCards(props) {

  const auth = useAuth()  //For changing backend URL eg, localhost to AWS

  let [displayData, setDisplayData] = useState([])
  let axiosRequestOptions = {}

  useEffect(() => { // get all auction items on page load

    if(props.bidder_id!==undefined){

      axiosRequestOptions = {
          method: 'GET',
          url: `${auth.backendURL}/find-all-auction-items?bidder_id=${props.bidder_id}`,
  
      };
    }
    else{return}
        
      axios.request(axiosRequestOptions)
          .then(res => {
            console.log(res.data[0].auction_id)
            setDisplayData(res.data)
          })
          .catch(err => {
              console.log(err)
          })

    
    },[]) //only run once on page load

  return (
    <div>

      <Container sx={{ py: 4 , margin:"auto"}} maxWidth="lg">

        <Grid container spacing={4}>

          {displayData.map((item, index) => (
  
              <Grid item key={item.auction_id} xs={12} sm={6} md={4}  xl={3}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="h5" component="h2" textAlign='center'>
                  {item.auction_title}
                </Typography>

                <NavLink to={`/ViewItem/${item.auction_id}`}> 
                  <CardMedia
                    component="img"
                    sx={{pt: 0.5,height:300}}
                    image={`${auth.backendURL}/get-auction-image?fileName=` + item.image_path} // Will change to AWS path - http://leebay-expressjs-backend-v2-dev602.ap-southeast-2.elasticbeanstalk.com/get-auction-image?fileName=
                    alt="random"
                  />
                </NavLink>

                <CardContent sx={{ flexGrow: 1 }}>
                  
                  <Typography  sx={{minHeight:150}} gutterBottom variant="body2">
                    {item.item_description}
                  </Typography>
                  
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                  >

                    <Divider component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Location" secondary={item.item_location} />
                    </ListItem>

                    <Divider variant="inset" component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Current Price" secondary={"$"+ item.current_price} />
                    </ListItem>

                    <Divider variant="inset" component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ScheduleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Auction Ends" secondary={moment(item.end_date).format('DD.MM.YYYY HH:mm')} />
                    </ListItem>

                  </List>


                </CardContent>

              </Card>
              </Grid>

            ))} 
            </Grid>
        </Container>
    </div>
  )
}
