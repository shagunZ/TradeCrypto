import React from 'react'
import { AppBar,Container,Toolbar,Typography,Select,MenuItem } from '@mui/material'
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../ContextCrypto';

const AppWrapper = styled('div')({
  flex: 1,
  color: "purple",
  fontFamily: "Montserrat",
  fontWeight: "bold !important",
  cursor: "pointer",
});


const Header = () => {


  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const { currency,setCurrency } = CryptoState();
// console.log(currency);
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
      <Toolbar>
        <AppWrapper>
          <Typography onClick={()=>navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1,fontWeight:"bold" }}>
            TradeCrypto
          </Typography>
        </AppWrapper>
          <Select variant='outlined'
          style={{
            width:100,
            color:'white',
            height:40,
            // marginRight:15,
          }}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={currency}
    onChange={(e)=>setCurrency(e.target.value)}
  >
    <MenuItem value={'INR'}>INR</MenuItem>
    <MenuItem value={'USD'}>USD</MenuItem>

  </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header