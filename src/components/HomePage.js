import React, { useState, useEffect } from 'react'
 
import SearchHeader from './SearchHeader'
import HeaderLinks from './HeaderLinks'
import HomeAuctionCards from './cards/HomeAuctionCards'
import axios from 'axios'
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';



export default function HomePage() {
  
  let [searchName, setSearchName] = useState('')
  let[category,setCategory]= useState('')
  let [productData, setProductData] = useState('')
  let [displayData, setDisplayData] = useState([])

  const childToParent = (childdata) => {  //get search data from child component (Search navbar)
    setSearchName(childdata);
  }

  useEffect(()=>{   // handle search for item here
    // console.log(searchName)

    setDisplayData([])  //delete previous entries
  
      for(let i in productData){
  
        let currentAuctionTitle = productData[i].auction_title
        let currentAuctionLocation = productData[i].item_location
        let currentAuctionDescription = productData[i].item_description

        if(currentAuctionTitle.includes(searchName)){
          setDisplayData(oldArray => [...oldArray, productData[i]]);
        }
        else if(currentAuctionLocation===searchName){
          setDisplayData(oldArray => [...oldArray, productData[i]]);
        }
        else if(currentAuctionDescription.includes(searchName)){
          setDisplayData(oldArray => [...oldArray, productData[i]]);
        }
        
      }

  },[searchName])

  useEffect(() => { // get all auction items on page load

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

  useEffect(()=>{   // once category is selected, only show items in category
    if(category==='Reset'){setCategory('All Categories')}
    
    else if(category==='All Categories'){setDisplayData(productData)}

    else{
      setDisplayData([])  //delete previous entries

      for(let i in productData){

        let currentCategory = productData[i].category

        if(currentCategory===category){
          setDisplayData(oldArray => [...oldArray, productData[i]]);
        }
        
      }
    }
  },[category])


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
        <Button size="small" onClick={()=>{setCategory('');setCategory('All Categories')}}>All Categories</Button>
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
