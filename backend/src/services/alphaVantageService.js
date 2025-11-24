/**
 * Alpha Vantage API Service
 * Fetches stock market data including quotes, earnings, and company overviews
 */

const axios = require('axios');

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Get company overview including market cap
 */
async function getCompanyOverview(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: API_KEY
      },
      timeout: 10000
    });

    if (response.data['Note']) {
      throw new Error('Alpha Vantage API rate limit reached');
    }

    if (response.data['Error Message']) {
      throw new Error(response.data['Error Message']);
    }

    return {
      symbol: response.data.Symbol,
      marketCap: parseInt(response.data.MarketCapitalization) || 0,
      peRatio: parseFloat(response.data.PERatio) || 0,
      eps: parseFloat(response.data.EPS) || 0,
      name: response.data.Name
    };
  } catch (error) {
    console.error(`[AlphaVantage] Error fetching ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get current stock quote
 */
async function getQuote(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: API_KEY
      },
      timeout: 10000
    });

    if (response.data['Note']) {
      throw new Error('Alpha Vantage API rate limit reached');
    }

    const quote = response.data['Global Quote'];
    if (!quote || !quote['05. price']) {
      throw new Error('Invalid quote data received');
    }

    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'],
      volume: parseInt(quote['06. volume'])
    };
  } catch (error) {
    console.error(`[AlphaVantage] Error fetching quote for ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get multiple company overviews with rate limiting
 * Alpha Vantage free tier: 25 requests/day, 5 requests/minute
 */
async function getBatchCompanyData(symbols) {
  const results = [];
  const delay = 12000; // 12 seconds between requests to stay under rate limit

  for (const symbol of symbols) {
    try {
      const data = await getCompanyOverview(symbol);
      results.push(data);

      // Add delay between requests (except for last one)
      if (symbols.indexOf(symbol) < symbols.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`[AlphaVantage] Failed to fetch ${symbol}, using fallback`);
      // Return fallback data to prevent complete failure
      results.push({
        symbol: symbol,
        marketCap: 0,
        peRatio: 0,
        eps: 0,
        name: symbol,
        error: error.message
      });
    }
  }

  return results;
}

module.exports = {
  getCompanyOverview,
  getQuote,
  getBatchCompanyData
};
