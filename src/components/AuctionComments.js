
import Typography from '@mui/material/Typography';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from './Auth'  //For when logged in

export default function AuctionComments(props) {

    let auction_id = props.auctionID
    let [comments, setComments] = useState([])
    const auth = useAuth()  //For when logged in

    useEffect(() => { // get all auction comments on page load

        let config = {
            method: 'get',
            url: 'http://localhost:4000/findAllAuctionComments?auction_id=' + auction_id,
            headers: { }
        };
        
        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setComments(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },[]) //run once on page load

    const handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const itemData = { 
            "user_id":Number(auth.checkUserID()),
            "auction_id":Number(auction_id),
            "comment_text":data.get('Description')

        };
        axios.post('http://localhost:4000/addAuctionComment', itemData)
        .then(response => {
            // console.log(response.data);
            setComments(oldArray => [...oldArray, itemData]);        //not working??
        })    
        .catch(function (error) {
            console.log(error);
        });
      };

  return (
    <>      
        <Typography variant="h6" gutterBottom textAlign='center' sx={{m:2}}>
            Auction Comments
        </Typography>

        {comments &&    //show comments only if they have loaded

            comments.map((item, index) => (

            <Grid item key={index} xs={12}>
                <List>

                <Divider component="li" />

                <Typography display='flex' variant="body2"  sx={{m:2}}>
                    
                    {index + 1 +'. '}  
                    {item.comment_text}
                    
                    
                    ....{item.user_name}
                    
                </Typography>
                
                </List>
            </Grid>
            
            )) 
        }

        {auth.checkUserID() && //show comment inputs only if logged in

            <Box component="form" onSubmit={handleSubmit} noValidate >
                
                <TextField
                margin="normal"
                required
                fullWidth
                id="Description"
                label="Comment"
                multiline
                minRows={3}
                maxRows={6}
                name="Description"
                autoFocus
                
                />

                {/* submit comment button */}

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Post Comment
                </Button>

            </Box>

        }
    </>
  )
}
