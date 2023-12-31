import React from 'react'
import { styled } from '@mui/system';
import { Container,Typography } from '@mui/material';
import Carousel from "./Carousel";
import  '../CoinTable.css';
const AppWrapper = styled('div')({
    backgroundImage: "url(./crypto.jpg)",
    backgroundRepeat: "no-repeat",
    height: '100vh',
    opacity: '.8',
    backgroundSize:"cover"
  });
  
  const BannerContent = styled('div')({
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  });
  
  const Tagline = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  });
  
  const carousel = {
    height: "50%",
    display: "flex",
    alignItems: "center",
  };
  
const Banner = () => {
  return (
    <AppWrapper>
        

        <BannerContent>
        <Container>

        <Tagline>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              // marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Trade Crypto
          </Typography>
          <Typography
          className='carousel'
            variant="h6"
            style={{
              color: "white",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            All Details regarding your favourite Crypto Coin
          </Typography>
        </Tagline>

<Carousel/>
        </Container>
        </BannerContent>

    </AppWrapper>
  )
}

export default Banner