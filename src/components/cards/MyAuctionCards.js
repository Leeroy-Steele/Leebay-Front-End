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
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom'

// for dates

import moment from 'moment';

export default function MyAuctionCards(props) {

  const navigate = useNavigate()
  const location = useLocation()
  
  // console.log(props.seller_id)

    let [displayData, setDisplayData] = useState([])
    let axiosRequestOptions = {}


    useEffect(() => { 
      fetchData() // get all auction items on page load
      
      },[])

    let fetchData = () => {

      if(props.seller_id!=undefined){ //Do i need this now ???????????????????????????????????

        axiosRequestOptions = {
            method: 'GET',
            url: 'http://localhost:4000/findAllAuctionItems?user_id='+props.seller_id,
    
        };
      }
      else{return}
          
        axios.request(axiosRequestOptions)
            .then(res => {setDisplayData(res.data)})
            .catch(err => {
                console.log(err)
            })

      }

     let handlChangePicture = (auctionID)=>{

      const redirectPath = location.state?.path || '/UploadImage'  //define where to navigate to after submit 
      navigate(redirectPath, {state:{auction_id:auctionID}, replace: true}) //nav to upload images page

      }

      let handlDeleteAuction = (auctionID)=>{

        const data = JSON.stringify({
          "auction_id": auctionID
        });
        
        const config = {
          method: 'delete',
          url: 'http://localhost:4000/deleteAuctionItem',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));

          fetchData()

        })
        .catch(function (error) {
          console.log(error);
        });

      }

  return (
    <div>

      <Container sx={{ py: 4 , margin:"auto"}} maxWidth="md">

        <Grid container spacing={4}>

            {displayData.map((item, index) => (

              <Grid item key={item.auction_id} xs={12} sm={6}>
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

                <Button
                  onClick={()=>{handlChangePicture(item.auction_id)}}
                  sx={{ mx:'auto', my:2}}
                >
                  Change Picture
                </Button>

                <Button
                  onClick={()=>{handlDeleteAuction(item.auction_id)}}
                  sx={{ m:'auto'}}
                >
                  Delete Auction
                </Button>

                <CardContent sx={{ flexGrow: 1 }}>
                  
                  <Typography gutterBottom variant="body2">
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
