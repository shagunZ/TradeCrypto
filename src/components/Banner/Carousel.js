import {useState,useEffect} from 'react'
import { styled } from '@mui/system';
import axios from 'axios';
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../ContextCrypto";


const CarouselStyle = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
});
const CarouselItem = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});


const Carousel = () => {

  const [trending, setTrending] = useState([]);
  //from context
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };


  return (
    <CarouselStyle>
      <div>Carousel</div>
    </CarouselStyle>
  )
}

export default Carousel