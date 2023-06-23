import {useState,useEffect} from 'react'
import { styled } from '@mui/system';
import axios from 'axios';
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../ContextCrypto";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

const CarouselStyle = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
  marginTop:"33px"
});
const CarouselItem = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
  
});


export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}


const Carousel = () => {

  const [trending, setTrending] = useState([]);
  //from context
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    fetchTrendingCoins();
  }, [currency]);

const items = trending.map((coin)=>{

  let profit = coin.price_change_percentage_24h >=0
  //then its true

  return(
    <Link to={`/coins/${coin.id}`}>
    <CarouselItem>

<img src={coin?.image} alt={coin.name} height="80"
style={{ marginBottom: 10  }}/>

    <span style={{color:'gold',fontSize:"12px",fontWeight:"bold"}}>RANK:{coin.market_cap_rank}</span>

       <span>{coin?.symbol} &nbsp;
       <span style={{  profit: Boolean, 
      color: profit>0 ? "#58e458" : "red",fontWeight:"bold"}}>
{profit && "+"} {coin.price_change_percentage_24h.toFixed(3)}%
       </span>
       </span>

       <span style={{fontWeight:'bold'}}>
        {/* we sent coinprice to regex to display commas */}
      {symbol}  {numberWithCommas(coin?.current_price.toFixed(3))}
       </span>
    </CarouselItem>
    </Link>
  )
})
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };


  return (
    <CarouselStyle>
       <AliceCarousel 
       mouseTracking 
       infinite
        autoPlayInterval={1000}
       animationDuration={1000}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       items={items} 
       autoPlay/>
    </CarouselStyle>
  )
}

export default Carousel