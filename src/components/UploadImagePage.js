import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PlainHeader from "./headers/PlainHeader";
import HeaderLinks from "./headers/HeaderLinks";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeAuctionCards from "./cards/HomeAuctionCards";

import { useAuth } from "./Auth"; //For changing backend URL eg, localhost to AWS

function FileUploadSingle() {
  const auth = useAuth(); //For changing backend URL eg, localhost to AWS

  let [displayData, setDisplayData] = useState(null);
  let [imageUploaded, setImageUploaded] = useState(false);
  const [file, setFile] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //load auction details on page load

    let config = {
      method: "get",
      url:
        `${auth.backendURL}/find-auction-item?auction_id=` +
        location.state.auction_id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setDisplayData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = (event) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("auctionImage", file);

    axios
      .post(
        `${auth.backendURL}/add-auction-photo?auction_id=` +
          location.state.auction_id, // post image file to correct auction
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);

        let config = {
          method: "get",
          url:
            `${auth.backendURL}/find-auction-item?auction_id=` +
            location.state.auction_id,
          headers: {},
        };

        axios(config)
          .then(function (response) {
            setDisplayData(response.data);
            setImageUploaded(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };

  let handleSkipPhoto = () => {
    const redirectPath = location.state?.path || "/Profile"; //navigate to post auction page
    navigate(redirectPath, { replace: true });
  };

  return (
    <>
      <HeaderLinks pageName=" Upload Image" linkName="Home" linkTo="/" />
      <PlainHeader />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 1,
          mx: "auto",
          mt: 3,
          width: 486,
          height: 150,
        }}
      >
        <Box gridColumn="span 6">
          <Typography variant="subtitle1" textAlign="right">
            Please choose an auction image
          </Typography>
        </Box>

        <Box gridColumn="span 6">
          <Stack spacing={1} direction="row">
            <Button
              size="small"
              variant="outlined"
              component="label"
              onChange={handleFileChange}
              // sx={{width:150}}
            >
              Select image
              <input type="file" hidden />
            </Button>

            {file && (
              <Button
                size="small"
                variant="contained"
                component="label"
                sx={{ width: 110 }}
                type="button"
                onClick={handleUploadClick}
              >
                Upload
              </Button>
            )}
          </Stack>
        </Box>

        <Box gridColumn="span 12">
          {file && (
            <Typography variant="subtitle1" textAlign="center">
              {" "}
              Selected file: {file.name}{" "}
            </Typography>
          )}
        </Box>
      </Box>

      <Box textAlign="center" sc={{ p: 1 }}>
        {imageUploaded === false ? (
          <Button onClick={handleSkipPhoto} variant="outlined" size="small">
            Skip Photo
          </Button>
        ) : (
          <Button onClick={handleSkipPhoto} variant="outlined" size="small">
            Back to Profile
          </Button>
        )}
      </Box>

      <Box
        sx={{
          mx: "auto",
          my: 3,
          width: 400,
          // height: 150,
        }}
      >
        {displayData && <HomeAuctionCards content={displayData[0]} />}
      </Box>
    </>
  );
}

export default FileUploadSingle;
