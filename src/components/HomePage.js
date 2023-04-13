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
import BasicPagination from './Pagination'

export default function HomePage() {
  let [searchName, setSearchName] = useState(""); // for search input
  let [category, setCategory] = useState(""); // for category select button
  let [allAuctionItems, setAllAuctionItems] = useState([]); // data from all auctions
  let [allDisplayItems, setAllDisplayItems] = useState([]); // all current display items (Including pages not visable)

  // states for pagination
  let [pageItems, setPageItems] = useState([]); // visable Page items / data
  let [pages, setPages] = useState(0);
  let [page, setPage] = useState(1);
  let pageResults = 8;

  // get all auction item data (productData) on initial page load

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:4000/findAllAuctionItems",
    };

    axios
      .request(options)
      .then((res) => {
        setAllAuctionItems(res.data);
        setAllDisplayItems(res.data);
        // setPages(Math.ceil(res.data.length / pageResults));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); //only run once

  // pagination

  useEffect(() => {

    setPages(Math.ceil(allDisplayItems.length / pageResults));

    let endSlice = page * pageResults;
    setPageItems(allDisplayItems.slice(endSlice - pageResults, endSlice));
  }, [allDisplayItems, page]);

  const paginationChildToParent = (childData) => {
    setPage(childData);
  };

  //get search data from child component (Search navbar)

  const searchBarChildToParent = (childData) => {
    setSearchName(childData);
  };

  //// handle search for item here

  useEffect(() => {
    setAllDisplayItems([]); //empty display items first

    allAuctionItems.forEach((item) => {
      let currentAuctionTitle = item.auction_title;
      let currentAuctionLocation = item.item_location;
      let currentAuctionDescription = item.item_description;

      if (currentAuctionTitle.includes(searchName)) {
        setAllDisplayItems((oldArray) => [...oldArray, item]);
      } else if (currentAuctionLocation === searchName) {
        setAllDisplayItems((oldArray) => [...oldArray, item]);
      } else if (currentAuctionDescription.includes(searchName)) {
        setAllDisplayItems((oldArray) => [...oldArray, item]);
      }
    });
  }, [searchName]);

  //// once category is selected, only show items in that category

  useEffect(() => {
    if (category === "Reset") {
      setCategory("All Categories");
    } else if (category === "All Categories") {
      setAllDisplayItems(allAuctionItems);
    } else {
      setAllDisplayItems([]); //delete previous entries

      allAuctionItems.forEach((item) => {
        let currentCategory = item.category;

        if (currentCategory === category) {
          setAllDisplayItems((oldArray) => [...oldArray, item]);
        }
      });
    }
  }, [category]);

  return (
    <>
      <HeaderLinks pageName=" Home" linkName="Profile" linkTo="/Profile" />

      <SearchHeader childToParent={searchBarChildToParent} />

      <Container sx={{ py: 2, margin: "auto" }} maxWidth="lg">
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Button
            size="small"
            onClick={() => {
              setCategory("Home");
            }}
          >
            Home
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCategory("Vehicles");
            }}
          >
            Vehicles
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCategory("Clothing");
            }}
          >
            Clothing
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCategory("Sports & Hobbies");
            }}
          >
            Sports & Hobbies
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCategory("All Categories");
            }}
          >
            All Categories
          </Button>
        </Grid>

        <Typography
          sx={{ pt: 3, pb: 2 }}
          variant="h6"
          component="h2"
          textAlign="center"
        >
          {category}
        </Typography>

        {searchName && (
          <Box textAlign="center" sx={{ pb: 1 }}>
            <Button
              color="error"
              size="small"
              onClick={() => {
                setCategory("Reset");
                setSearchName("");
              }}
            >
              Clear Search
            </Button>
          </Box>
        )}

        <Box sx={{ py: 2 }}>
          <BasicPagination
            count={pages}
            childToParent={paginationChildToParent}
          />
        </Box>

        <Grid container spacing={2}>
          {pageItems &&
            pageItems.map((item, index) => (
              <Grid item key={item.auction_id} xs={12} sm={6} md={3} xl={3}>
                <HomeAuctionCards content={pageItems[index]} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
