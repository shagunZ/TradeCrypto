import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from '../ContextCrypto';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { styled } from '@mui/system';
import CoinInfo from './CoinInfo';
import { Typography } from '@mui/material';
import ReactHtmlParser from "react-html-parser";

const Coin = () => {

  const {id } = useParams()
  const [coin,setCoin] = useState();
  const {currency,symbol} = CryptoState;

  const fetchCoin = async()=>{
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data);
  }

  useEffect(()=>{
    fetchCoin();
  },[coin]);

  const Styles = {
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,

      '@media (max-width: 500px)': {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
      
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      borderRight:"2px solid grey",

      '@media (max-width: 500px)': {
        width: "100%",
      },
    },
    chart: {
      color: "Black",
      backgroundColor: "white",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      padding: "10px",
      margin: "10px",
    },
    heading: {
      fontWeight: "bold",
      textAlign: "center",
      margin: "10px",
    },
    description: {
      fontWeight: "bold",
      textAlign: "center",
      margin: "10px",
    },
  };
  

  return (
<div style={Styles.container}>
  <div style={Styles.sidebar}> 
  <img src={coin?.image.large} 
alt={coin?.name}
height="200"
style={{marginBottom:20}}
/>

<Typography variant='h3' style={Styles.heading}>
  {coin?.name}
</Typography>
<Typography variant='subtitle1' style={Styles.description}>
{ReactHtmlParser(coin?.description.en.split(". ")[0])}.
</Typography>
  </div>

<div style={Styles.chart}>
<CoinInfo coin={coin}/>
</div>
</div>
  )
}

export default Coin