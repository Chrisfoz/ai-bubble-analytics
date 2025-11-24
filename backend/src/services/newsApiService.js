/**
 * NewsAPI Service
 * Fetches AI-related news articles for sentiment and trend analysis
 */

const axios = require('axios');

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Get top AI-related news headlines
 */
async function getAINews(options = {}) {
  try {
    const params = {
      q: options.query || 'artificial intelligence OR AI bubble OR AI investment',
      language: options.language || 'en',
      sortBy: options.sortBy || 'publishedAt',
      pageSize: options.pageSize || 20,
      page: options.page || 1,
      apiKey: API_KEY
    };

    // Add optional date filters
    if (options.from) params.from = options.from;
    if (options.to) params.to = options.to;

    const response = await axios.get(`${BASE_URL}/everything`, {
      params: params,
      timeout: 10000
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'NewsAPI error');
    }

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articles: response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        author: article.author,
        publishedAt: article.publishedAt,
        content: article.content
      })),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[NewsAPI] Error fetching AI news:', error.message);
    throw error;
  }
}

/**
 * Get top technology headlines
 */
async function getTopTechHeadlines(options = {}) {
  try {
    const params = {
      category: 'technology',
      language: options.language || 'en',
      country: options.country || 'us',
      pageSize: options.pageSize || 20,
      apiKey: API_KEY
    };

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: params,
      timeout: 10000
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'NewsAPI error');
    }

    return {
      status: response.data.status,
      totalResults: response.data.totalResults,
      articles: response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt
      })),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[NewsAPI] Error fetching top headlines:', error.message);
    throw error;
  }
}

/**
 * Get AI bubble sentiment from recent news
 * Analyzes recent articles mentioning "AI bubble" or related terms
 */
async function getAIBubbleSentiment() {
  try {
    // Get recent articles about AI bubble
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const bubbleNews = await getAINews({
      query: '"AI bubble" OR "artificial intelligence bubble" OR "AI overvaluation"',
      from: lastWeek.toISOString().split('T')[0],
      sortBy: 'relevancy',
      pageSize: 50
    });

    // Simple sentiment analysis based on keywords
    const negativeKeywords = ['bubble', 'crash', 'overvalued', 'risk', 'concern', 'warning', 'decline'];
    const positiveKeywords = ['growth', 'opportunity', 'innovation', 'breakthrough', 'progress'];

    let negativeCount = 0;
    let positiveCount = 0;

    bubbleNews.articles.forEach(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();

      negativeKeywords.forEach(keyword => {
        if (text.includes(keyword)) negativeCount++;
      });

      positiveKeywords.forEach(keyword => {
        if (text.includes(keyword)) positiveCount++;
      });
    });

    const totalMentions = negativeCount + positiveCount;
    const sentimentScore = totalMentions > 0
      ? ((positiveCount - negativeCount) / totalMentions) * 100
      : 0;

    return {
      articleCount: bubbleNews.totalResults,
      negativeM entions: negativeCount,
      positiveMentions: positiveCount,
      sentimentScore: sentimentScore, // -100 (very negative) to +100 (very positive)
      recentArticles: bubbleNews.articles.slice(0, 5),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('[NewsAPI] Error analyzing AI bubble sentiment:', error.message);
    throw error;
  }
}

/**
 * Search for news about specific companies
 */
async function getCompanyNews(company, daysBack = 7) {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysBack);

    return await getAINews({
      query: company,
      from: fromDate.toISOString().split('T')[0],
      sortBy: 'relevancy',
      pageSize: 10
    });
  } catch (error) {
    console.error(`[NewsAPI] Error fetching news for ${company}:`, error.message);
    throw error;
  }
}

module.exports = {
  getAINews,
  getTopTechHeadlines,
  getAIBubbleSentiment,
  getCompanyNews
};
