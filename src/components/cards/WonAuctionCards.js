import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';

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
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


export default function WonAuctionCards(props) {

    let [displayData, setDisplayData] = useState([])

    useEffect(() => { // get all auction items on page load

        const options = {
            method: 'GET',
            url: 'http://localhost:4000/findAllExpiredAuctionItems?highest_bidder_id='+ props.buyer_id,
    
        };
          
        axios.request(options)
            .then(res => {setDisplayData(res.data)})
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
                  
                  <CardMedia
                    component="img"
                    sx={{pt: 0.5,height:300}}
                    image={item.image_path}
                    alt="random"
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    
                    <Typography sx={{minHeight:150}} gutterBottom variant="body2">
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
                        <ListItemText primary="Winning Bid" secondary={"$"+ item.sold_price} />
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <ScheduleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Ended" secondary={moment(item.end_date).format('DD.MM.YYYY HH:mm')} />
                      </ListItem>

                      <Divider component="li" />

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Seller Name" secondary={item.seller_user_name} />
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AlternateEmailIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Seller Email" secondary={item.seller_email} />
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
