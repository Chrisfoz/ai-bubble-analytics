/**
 * Finnhub API Service
 * Fetches real-time stock quotes, company metrics, and financial data
 */

const axios = require('axios');

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

/**
 * Get real-time stock quote
 */
async function getQuote(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol: symbol,
        token: API_KEY
      },
      timeout: 10000
    });

    if (!response.data || !response.data.c) {
      throw new Error('Invalid quote data received');
    }

    return {
      symbol: symbol,
      currentPrice: response.data.c,
      change: response.data.d,
      percentChange: response.data.dp,
      highPrice: response.data.h,
      lowPrice: response.data.l,
      openPrice: response.data.o,
      previousClose: response.data.pc,
      timestamp: response.data.t
    };
  } catch (error) {
    console.error(`[Finnhub] Error fetching quote for ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get company profile including market cap
 */
async function getCompanyProfile(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/stock/profile2`, {
      params: {
        symbol: symbol,
        token: API_KEY
      },
      timeout: 10000
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('No company profile data available');
    }

    return {
      symbol: symbol,
      name: response.data.name,
      marketCap: response.data.marketCapitalization || 0,
      industry: response.data.finnhubIndustry,
      exchange: response.data.exchange,
      currency: response.data.currency,
      logo: response.data.logo,
      weburl: response.data.weburl
    };
  } catch (error) {
    console.error(`[Finnhub] Error fetching profile for ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get company basic financials including P/E ratio
 */
async function getBasicFinancials(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/stock/metric`, {
      params: {
        symbol: symbol,
        metric: 'all',
        token: API_KEY
      },
      timeout: 10000
    });

    if (!response.data || !response.data.metric) {
      throw new Error('No financial metrics available');
    }

    const metrics = response.data.metric;

    return {
      symbol: symbol,
      peRatio: metrics.peBasicExclExtraTTM || metrics.peNormalizedAnnual || 0,
      eps: metrics.epsBasicExclExtraItemsTTM || 0,
      marketCap: metrics.marketCapitalization || 0,
      dividendYield: metrics.dividendYieldIndicatedAnnual || 0,
      beta: metrics.beta || 0,
      week52High: metrics['52WeekHigh'] || 0,
      week52Low: metrics['52WeekLow'] || 0
    };
  } catch (error) {
    console.error(`[Finnhub] Error fetching financials for ${symbol}:`, error.message);
    throw error;
  }
}

/**
 * Get batch quotes for multiple symbols
 * Finnhub free tier: 60 calls/minute
 */
async function getBatchQuotes(symbols) {
  const results = [];
  const delay = 1100; // 1.1 seconds between requests to stay under rate limit

  for (const symbol of symbols) {
    try {
      const quote = await getQuote(symbol);
      results.push(quote);

      // Add delay between requests (except for last one)
      if (symbols.indexOf(symbol) < symbols.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`[Finnhub] Failed to fetch ${symbol}, using fallback`);
      results.push({
        symbol: symbol,
        currentPrice: 0,
        change: 0,
        percentChange: 0,
        error: error.message
      });
    }
  }

  return results;
}

/**
 * Get company news
 */
async function getCompanyNews(symbol, from, to) {
  try {
    const response = await axios.get(`${BASE_URL}/company-news`, {
      params: {
        symbol: symbol,
        from: from,
        to: to,
        token: API_KEY
      },
      timeout: 10000
    });

    return response.data || [];
  } catch (error) {
    console.error(`[Finnhub] Error fetching news for ${symbol}:`, error.message);
    throw error;
  }
}

module.exports = {
  getQuote,
  getCompanyProfile,
  getBasicFinancials,
  getBatchQuotes,
  getCompanyNews
};
