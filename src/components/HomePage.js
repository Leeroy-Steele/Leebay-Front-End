import React, { useState, useEffect } from 'react'
 
import SearchHeader from './SearchHeader'
import HeaderLinks from './HeaderLinks'
import HomeAuctionCards from './cards/HomeAuctionCards'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function HomePage() {
  
  let [searchName, setSearchName] = useState('')
  let[category,setCategory]= useState('')
  let [productData, setProductData] = useState([])
  let [displayData, setDisplayData] = useState([])



  // get all auction item data (productData) on initial page load

  useEffect(() => { 

    const options = {
        method: 'GET',
        url: 'http://localhost:4000/findAllAuctionItems',

    };
      
    axios.request(options)
        .then(res => {setProductData(res.data);setDisplayData(res.data)})
        .catch(err => {
            console.log(err)
        })
        
  },[]) //only run once 


  // pagination



  //get search data from child component (Search navbar)

  const childToParent = (childdata) => {  
    setSearchName(childdata);
  }



  //// handle search for item here

  useEffect(()=>{   

    setDisplayData([])  //empty display items first
  
    productData.forEach((item)=>{

      let currentAuctionTitle = item.auction_title
      let currentAuctionLocation = item.item_location
      let currentAuctionDescription = item.item_description

      if(currentAuctionTitle.includes(searchName)){
        setDisplayData(oldArray => [...oldArray, item]);
      }
      else if(currentAuctionLocation===searchName){
        setDisplayData(oldArray => [...oldArray, item]);
      }
      else if(currentAuctionDescription.includes(searchName)){
        setDisplayData(oldArray => [...oldArray, item]);
      }
    })

  },[searchName])




  //// once category is selected, only show items in that category

  useEffect(() => {

    if (category === "Reset") {
      setCategory("All Categories");
    } else if (category === "All Categories") {
      setDisplayData(productData);
    } else {
      setDisplayData([]); //delete previous entries

      productData.forEach((item) => {
        let currentCategory = item.category;

        if (currentCategory === category) {
          setDisplayData((oldArray) => [...oldArray, item]);
        }
      });
    }
  }, [category]);





return (
  <>
    <HeaderLinks pageName=' Home' linkName='Profile' linkTo='/Profile'/>

    <SearchHeader childToParent={childToParent}/>

    <Container sx={{ py: 2 , margin:"auto"}} maxWidth="lg">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Button size="small" onClick={()=>{setCategory('Home')}}>Home</Button>
        <Button size="small" onClick={()=>{setCategory('Vehicles')}}>Vehicles</Button>
        <Button size="small" onClick={()=>{setCategory('Clothing')}}>Clothing</Button>
        <Button size="small" onClick={()=>{setCategory('Sports & Hobbies')}}>Sports & Hobbies</Button>
        <Button size="small" onClick={()=>{setCategory('All Categories')}}>All Categories</Button>
      </Grid>


      <Typography sx={{ pt: 3,pb:2 }} variant="h6" component="h2" textAlign='center'>
        {category}
      </Typography> 

      {searchName&&
        <Box textAlign='center' sx={{pb:1 }}>
          <Button color="error" size="small" onClick={()=>{setCategory('Reset');setSearchName('')}}>Clear Search</Button>
        </Box>
      }

      <Grid container spacing={2}>

          {displayData &&

            displayData.map((item, index) => (

            <Grid item key={item.auction_id} xs={12} sm={6} md={3} xl={3}>
                
                <HomeAuctionCards content={displayData[index]}/>
                
            </Grid>

            )) 
          
          }

      </Grid>
    </Container>
  </>
)
}
