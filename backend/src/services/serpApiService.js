/**
 * SerpAPI Service
 * Fetches Google Trends data for search interest analysis
 */

const axios = require('axios');

const API_KEY = process.env.SERPAPI_KEY;
const BASE_URL = 'https://serpapi.com/search.json';

/**
 * Get Google Trends data for a search query
 */
async function getGoogleTrends(query, options = {}) {
  try {
    const params = {
      engine: 'google_trends',
      q: query,
      data_type: options.dataType || 'TIMESERIES',
      tz: options.tz || '360', // US timezone
      api_key: API_KEY
    };

    // Add optional parameters
    if (options.geo) params.geo = options.geo;
    if (options.date) params.date = options.date;

    const response = await axios.get(BASE_URL, {
      params: params,
      timeout: 15000
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error(`[SerpAPI] Error fetching trends for "${query}":`, error.message);
    throw error;
  }
}

/**
 * Get interest over time for "AI bubble" search term
 */
async function getAIBubbleSearchInterest() {
  try {
    const trendsData = await getGoogleTrends('AI bubble', {
      dataType: 'TIMESERIES',
      date: 'today 24-m' // Last 2 years
    });

    // Extract timeline data
    const timeline = trendsData.interest_over_time?.timeline_data || [];

    if (timeline.length === 0) {
      throw new Error('No timeline data available');
    }

    // Get most recent value
    const latest = timeline[timeline.length - 1];
    const earliest = timeline[0];

    const currentInterest = latest.values?.[0]?.extracted_value || 0;
    const baselineInterest = earliest.values?.[0]?.extracted_value || 1;

    const percentIncrease = ((currentInterest - baselineInterest) / baselineInterest) * 100;

    return {
      currentInterest: currentInterest,
      baselineInterest: baselineInterest,
      percentIncrease: percentIncrease,
      timeline: timeline.slice(-12), // Last 12 data points
      lastUpdated: new Date().toISOString(),
      query: 'AI bubble'
    };
  } catch (error) {
    console.error('[SerpAPI] Error fetching AI bubble trends:', error.message);
    throw error;
  }
}

/**
 * Get related queries for a search term
 */
async function getRelatedQueries(query) {
  try {
    const trendsData = await getGoogleTrends(query, {
      dataType: 'RELATED_QUERIES'
    });

    return {
      risingQueries: trendsData.related_queries?.rising || [],
      topQueries: trendsData.related_queries?.top || []
    };
  } catch (error) {
    console.error(`[SerpAPI] Error fetching related queries for "${query}":`, error.message);
    throw error;
  }
}

/**
 * Compare multiple search terms
 */
async function compareSearchTerms(terms) {
  try {
    const compareQuery = Array.isArray(terms) ? terms.join(',') : terms;

    const trendsData = await getGoogleTrends(compareQuery, {
      dataType: 'TIMESERIES'
    });

    return trendsData;
  } catch (error) {
    console.error('[SerpAPI] Error comparing search terms:', error.message);
    throw error;
  }
}

module.exports = {
  getGoogleTrends,
  getAIBubbleSearchInterest,
  getRelatedQueries,
  compareSearchTerms
};
