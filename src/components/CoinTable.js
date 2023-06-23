import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api'
import { CryptoState } from '../ContextCrypto';
import axios from 'axios';
import { styled } from '@mui/system';
import "./CoinTable.css"
import { Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper, 
    CircularProgress,
    Pagination} from '@mui/material';

    export function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


const CoinTable = () => {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const navigate = useNavigate();



    const RowStyle = {
      backgroundColor: "pink",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    };


    const paginationStyle = styled('div')({
      
        color: "gold",
    
    });


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });


    const {currency,symbol} = CryptoState();
    const fetchCoins = async()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }
console.log(coins);
    useEffect(()=>{
        fetchCoins();
        //when currency will change 
    },[currency]);


    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };

  return (
    
    <ThemeProvider theme={darkTheme}>
<Container style={{textAlign:"center"}}>
<Typography
          variant="h3"
          style={{ fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

{/* search feature  */}

<TextField
          variant='outlined'
          defaultValue="bitcoin"
          style={{marginBottom:20,width:"100%",background:"white"}}
          onChange={(e)=>setSearch(e.target.value)}
        />

        {/* now table  */}

        <TableContainer>
            {loading?
            (
                <CircularProgress color="secondary" />
            ) :
            (
                <Table
                 aria-label="simple table">
            <TableHead style={{ background:"purple" }}>
          <TableRow>
          {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}>
                      {head}
                    </TableCell>
                  ))}
          </TableRow>
        </TableHead>

        <TableBody>


          {/* slice 0 to 10  */}
{handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
  const profit =  row.price_change_percentage_24h > 0;
  return(
    <TableRow style={{background:"white"}}
    onClick={()=>navigate(`/coins/${row.id}`)} key={row.name}>
      {/* <RowStyle> */}
<TableCell className='RowStyles'
component="th" 
scope="row" 
style={{display:"flex",gap:15,}}>

<img src={row?.image}
     alt={row.name}
     height="50"
     style={{ marginBottom: 10 }}
/>
<div style={{display:"flex",flexDirection:"column"}}>
  <span style={{textTransform:"uppercase",fontSize:22,}}>
{row.symbol}
  </span>
  <span style={{color:"darkgrey"}}>{row.name}</span>
</div>
</TableCell>

<TableCell align="right">
    {symbol}{" "}
    {numberWithCommas(row.current_price.toFixed(2))}
</TableCell>


<TableCell
        align="right"
        style={{
        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
        fontWeight: 500,
        }}
        >
  {profit && "+"}
      {row.price_change_percentage_24h.toFixed(2)}%
</TableCell>


<TableCell align="right">
     {symbol}{" "}
     {numberWithCommas(
       row.market_cap.toString().slice(0, -6)
     )}
     M
   </TableCell>


      {/* </RowStyle> */}
    </TableRow>
  )
})}
        </TableBody>
                </Table>
            )
        }
        </TableContainer>


{/*now pagination  */}

<Pagination
style={{
  padding: 20,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background:"purple"
}}
count={(handleSearch()?.length/10).toFixed(0)}
onChange={(_,value)=>{
  setPage(value);
  window.scroll(0,450);
}}
>
 

  </Pagination>



</Container>
    </ThemeProvider>
  )
}

export default CoinTable