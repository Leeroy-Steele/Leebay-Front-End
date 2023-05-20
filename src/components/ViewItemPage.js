import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAuth } from "./Auth"; //For when logged in
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"; //for material card template
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import moment from "moment";
import { NavLink } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import HeaderLinks from "./HeaderLinks";
import PlainHeader from "./PlainHeader";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AuctionComments from "./AuctionComments";

//for modal styling

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 8,
};

export default function ViewItemPage() {
  const auth = useAuth(); //To get user details when logged in

  const { auction_id } = useParams();

  let [displayData, setDisplayData] = useState([]);
  let [bidPrice, setBidPrice] = useState(0);
  let [bidHistory, setBidHistory] = useState([]);

  // for modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // get auction item data on page load

    // config for auction item axios request
    var auctionItemAxiosConfig = {
      method: "get",
      url: `${auth.backendURL}/find-auction-item?auction_id=${auction_id}`,
      headers: {},
    };

    axios(auctionItemAxiosConfig)
      .then(function (response) {
        setDisplayData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // config for bid register axios request
    let bidRegisterAxiosConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${auth.backendURL}/auction-bids?auction_id=${auction_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // get auction bids here from bid register table / backend
    axios
      .request(bidRegisterAxiosConfig)
      .then((response) => {
        setBidHistory(response.data.reverse());
        bidHistory.pop();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); //only run once

  const handleBid = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bidPrice = data.get("bidPrice");

    // place bid conditions here
    if (bidPrice > displayData[0].current_price) {
      const bidRequestData = JSON.stringify({
        bidder_id: auth.checkUserID(),
        bidder_userName: auth.checkUserName(),
        auction_id: auction_id,
        bid: bidPrice,
      });

      // place bid API call - config
      const config = {
        method: "patch",
        url: `${auth.backendURL}/place-bid`,
        headers: {
          "Content-Type": "application/json",
        },
        data: bidRequestData,
      };

      axios(config).catch(function (error) {
        console.log(error);
      });

      setBidPrice(bidPrice);
      handleOpen(); //open modal for successfull bid
    } else {
      alert("bid must be higher than " + displayData[0].current_price);
    }
  };

  return (
    <div>
      <HeaderLinks linkName="Home" linkTo="/" />
      <PlainHeader />

      <Container sx={{ py: 3, margin: "auto" }} maxWidth="sm">
        <Grid container spacing={4}>
          {displayData.map((item, index) => (
            <Grid item key={item.auction_id} xs={12}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ pt: 2 }}
                  variant="h4"
                  component="h2"
                  textAlign="center"
                >
                  {item.auction_title}
                </Typography>

                <CardMedia
                  component="img"
                  sx={{ pt: 2 }}
                  image={`${auth.backendURL}/get-auction-image?fileName=${item.image_path}`} // Will change to AWS path - http://leebay-expressjs-backend-v2-dev602.ap-southeast-2.elasticbeanstalk.com/get-auction-image?fileName=
                  alt=" Auction Image"
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="body2" sx={{ m: 2 }}>
                    {item.item_description}
                  </Typography>

                  <List
                    sx={{
                      width: "100%",
                      // maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Divider component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Location"
                        secondary={item.item_location}
                      />
                    </ListItem>

                    <Divider variant="inset" component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Current Price $" + item.current_price}
                      />
                    </ListItem>

                    {bidHistory.map((bid) => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            {/* <Avatar>
                              <AttachMoneyIcon />
                            </Avatar> */}
                          </ListItemAvatar>
                          <ListItemText
                            sx={{my:-0.5}}
                            secondary={
                              "$" + bid.bid_price + " ..." + bid.bidder_userName
                            }
                          />
                        </ListItem>
                      );
                    })}

                    <Divider variant="inset" component="li" />

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ScheduleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Auction Ends"
                        secondary={moment(item.end_date).format(
                          "DD.MM.YYYY HH:mm"
                        )}
                      />
                    </ListItem>
                  </List>

                  <Divider />

                  {/* bid option below only if user is logged in */}

                  {auth.checkUserName() !== null ? (
                    <Box
                      display="flex"
                      component="form"
                      onSubmit={handleBid}
                      noValidate
                      sx={{ mx: "auto", my: 1, maxWidth: 300 }}
                    >
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        {/* <InputLabel htmlFor="outlined-adornment-amount">Bid Price</InputLabel> */}
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start"> $</InputAdornment>
                          }
                          name="bidPrice"
                          placeholder={item.current_price + 1}
                          sx={{ height: 37 }}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Place Bid
                      </Button>
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Box sx={{ m: 5 }}>
                    <AuctionComments auctionID={auction_id} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* modal starts here */}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Your bid has been placed
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                You now lead the auction at ${bidPrice}
              </Typography>
              <Box sx={{ py: 3, margin: "auto" }}>
                <NavLink to="/"> Return to home </NavLink>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
