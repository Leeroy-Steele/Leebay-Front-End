import React from 'react'
import { NavLink, Link } from 'react-router-dom'

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


// for dates

import moment from 'moment';


export default function HomeAuctionCards(props) {

  let displayData = [props.content]

  return (
    <div>

      <Container >

        <Grid container >

            {displayData.map((item, index) => (

            <Grid item key={item.auction_id}>

            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
              
            >
              <NavLink to={`/ViewItem/${item.auction_id}`}>

                <Typography variant="h5" component="h2" textAlign='center' sx={{  color: 'black', textDecoration: 'none' }} >
                  {item.auction_title}
                </Typography>

                <CardMedia
                  component="img"
                  sx={{pt: 0.5}}
                  image={item.image_path}
                  alt="random"
                />
              </NavLink>

              <CardContent sx={{ flexGrow: 1 }}>
                
                <Typography gutterBottom variant="body2">
                  {item.item_description}
                </Typography>
                
                <List
                  sx={{
                    width: '100%',
                    // maxWidth: 360,
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
