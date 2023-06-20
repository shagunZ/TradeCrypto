const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000; // Choose a port number for your server

// Create a route that will serve as the proxy for the CoinGecko API
app.get('/api/coins', async (req, res) => {
  try {
    // Make the request to the CoinGecko API
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'INR',
        order: 'gecko_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });

    // Forward the API response to the client
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from CoinGecko API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
