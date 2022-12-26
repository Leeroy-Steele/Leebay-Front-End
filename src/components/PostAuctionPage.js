
import * as React from 'react'; //from material template (sign in)
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';  //for select category input
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';  //for date picker
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import axios from 'axios'


// function Copyright(props) {

//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignIn() {

    const pickerStartDate = moment().add(1, 'day'); // set start date for date picker
    const [auctionEndTime, setAuctionEndTime] = React.useState(pickerStartDate); //for datepicker
    const [category, setCategory] = React.useState('');


    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };


  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        "Title is ": data.get('Title'),
       "Location":data.get('Location'),
       "Description is ": data.get('Description'),
       "Category is ":category,
      "auctionEndTime is ":JSON.stringify(moment(auctionEndTime._d).format("YYYY-MM-DD HH:mm:ss"))    //convert date to string 
    });

    const itemData = { 
        "seller_user_id":5,
        "highest_bidder_id":5,
        "category":category,
        "image_path":"tbc",
        "auction_title":data.get('Title'),
        "item_location":data.get('Location'),
        "item_description":data.get('Description'),
        "current_price":1,
        "end_date":moment(auctionEndTime._d).format("YYYY-MM-DD HH:mm:ss")
    };
    axios.post('http://localhost:4000/addAuctionItem', itemData)
    .then(response => {console.log(response.data);console.log('The auction ID is '+ response.data[2])});    //need to navigate to image upload page with auction id



  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
            $$$$$$$$$$$$
          </Avatar>

          <Typography component="h1" variant="h4">
            Post New Auction
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleCategoryChange}
                >
                <MenuItem value={'Home'}>Home</MenuItem>
                <MenuItem value={'Vehicles'}>Vehicles</MenuItem>
                <MenuItem value={'Clothing'}>Clothing</MenuItem>
                <MenuItem value={'Sports & Hobbies'}>Sports & Hobbies</MenuItem>
                </Select>
            </FormControl>
            

            <TextField
              margin="normal"
              required
              fullWidth
              id="Title"
              label="Auction Title"
              name="Title"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="Location"
              label="Item Location"
              name="Location"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="Description"
              label="Auction Description"
              multiline
              minRows={6}
              maxRows={10}
              name="Description"
              autoFocus
            />

            {/* date/time picker starts here */}

            <LocalizationProvider dateAdapter={AdapterMoment} >      
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Auction End"
                    minDate={moment()}  
                    // minTime={moment()}
                    value={auctionEndTime}
                    onChange={(newValue) => {
                        setAuctionEndTime(newValue);
                    }}
                />
            </LocalizationProvider>

            {/* submit auction button */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Start Auction
            </Button>

          </Box>
          
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}








