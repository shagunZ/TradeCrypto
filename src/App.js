import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import Coin from './Pages/Coin';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';


const AppWrapper = styled('div')({
  backgroundColor: '#14161a',
  color:"white",
  minHeight:"100vh"
  // Add more style properties if needed
});

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;