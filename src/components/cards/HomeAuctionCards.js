import React from 'react'
import { NavLink} from 'react-router-dom'

//for material card template

import Card from '@mui/material/Card';  
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { useAuth } from '../Auth'  //For changing backend URL eg, localhost to AWS


// for dates

import moment from 'moment';


export default function HomeAuctionCards(props) {

  const auth = useAuth()  //For changing backend URL eg, localhost to AWS

  let displayData = [props.content]

  return (
    <>
      
        <Grid >
   
            {displayData.map((item, index) => (

              <Grid item key={item.auction_id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
              >
                
                <Typography variant="h5" component="h2" textAlign='center' sx={{  color: 'black', textDecoration: 'none' }} >
                  {item.auction_title}
                </Typography>
                
                <NavLink to={`/ViewItem/${item.auction_id}`}> 
                  <CardMedia
                    component="img"
                    sx={{pt: 0.5,height:300}}
                    image={`${auth.backendURL}/get-auction-image?fileName=${item.image_path}` } // Will change to AWS path - http://leebay-expressjs-backend-v2-dev602.ap-southeast-2.elasticbeanstalk.com/get-auction-image?fileName=
                    alt="Auction Image"
                  />
                </NavLink>

                <CardContent sx={{ flexGrow: 1 }}>
                  
                  <Typography sx={{minHeight:150}} gutterBottom variant="body2">
                    {item.item_description}
                  </Typography>
                  
                  <List
                    sx={{
                      width: '100%',
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
      
    </>
  )
}
