import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from '../ContextCrypto';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from './CoinInfo';
import { Typography } from '@mui/material';
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from '../components/CoinTable';
import { LinearProgress } from '@mui/material';

const Coin = () => {

  const {id } = useParams()
  const [coin,setCoin] = useState();
  const {currency,symbol} = CryptoState();

  const fetchCoin = async()=>{
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data);
  }

  useEffect(()=>{
    fetchCoin();
  },[coin]);


  
  const Styles = {
    container: {
      // width: "75%",
      // display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,

      '@media screen and (maxWidth: 800px)': {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
      
    },
    sidebar: {
      // width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 25,
      // borderRight:"2px solid grey",

      '@media screen and (minWidth: 800px)': {
        width: "100%",
      },
      '@media screen and (maxWidth: 800px)': {
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
    marketdata:{
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      '@media (maxWidth: 500px)': {
        display: "flex",
        justifyContent: "space-around",
      },
      '@media (maxWidth: 300px)': {
        flexDirection: "column",
        alignItems: "center",
      },
      '@media (maxWidth: 200px)': {
        alignItems: "start",
      },
    },
  };
  
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

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


<div className={Styles.marketdata}>
<span style={{display:"flex"}}>
  <Typography variant='h5' style={Styles.heading}>
    Rank:
  </Typography>
  &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
         {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
</span>
<span style={{display:"flex"}}>
  <Typography variant='h5' style={Styles.heading}>
    Current Price:
  </Typography>
  &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
             {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
</span>
<span style={{display:"flex"}}>
  <Typography variant='h5' style={Styles.heading}>
    Market Cap:
  </Typography>
  &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
             {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
</span>
</div>

  </div>

{/* chart  */}
<div style={Styles.chart}>
<CoinInfo coin={coin}/>
</div>
</div>
  )
}

export default Coin