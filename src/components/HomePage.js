import React, { useState, useEffect } from 'react'
 
import SearchHeader from './SearchHeader'
import HeaderLinks from './HeaderLinks'
import HomeAuctionCards from './cards/HomeAuctionCards'

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
  
        if(currentAuctionTitle===searchName){
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
      if(category==='All Categories'){setDisplayData(productData)}
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

    useEffect(() => {
      // console.log(displayData[0].image_path)
  },[displayData])

return (
  <div>
    <HeaderLinks linkName='Profile' linkTo='/Profile'/>

    <SearchHeader childToParent={childToParent}/>

    <Container sx={{ py: 2 , margin:"auto"}} maxWidth="md">
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Button size="small" onClick={()=>{setCategory('Home')}}>Home</Button>
        <Button size="small" onClick={()=>{setCategory('Vehicles')}}>Vehicles</Button>
        <Button size="small" onClick={()=>{setCategory('Clothing')}}>Clothing</Button>
        <Button size="small" onClick={()=>{setCategory('Sports & Hobbies')}}>Sports & Hobbies</Button>
        <Button size="small" onClick={()=>{setCategory('All Categories')}}>All Categories</Button>
      </Grid>


      <Typography sx={{ py: 6 }}variant="h5" component="h2" textAlign='center'>
                  {category}
                  </Typography> 

      <Grid container rowSpacing={2}>

          {displayData &&

            displayData.map((item, index) => (

            <Grid item key={item.auction_id} xs={12} md={6} lg={4}>
                
                <HomeAuctionCards content={displayData[index]}/>
                
            </Grid>

            )) 
          
          }
          </Grid>
      </Container>
  </div>
)
}
