/**
 * Data Source Transparency Metadata
 * Documents the origin, update frequency, and reliability of each metric
 */

export const dataSourcesMetadata = {
  sources: {
    magnificent7_divergence: {
      name: 'Magnificent 7 Weight vs. Earnings',
      provider: 'S&P Global via Yahoo Finance API',
      updateFrequency: 'Daily at 4:30 PM EST (market close)',
      dataPoints: 'S&P 500 constituent weights, quarterly earnings reports',
      url: 'https://finance.yahoo.com/quote/%5EGSPC/holdings',
      confidence: 'High - Real-time market data',
      icon: '📊',
      description: 'Tracks the divergence between the Magnificent 7 companies\' market weight in the S&P 500 versus their actual earnings contribution.'
    },
    revenue_gap: {
      name: 'AI Revenue Expectation Gap',
      provider: 'Gartner + IDC + Corporate Earnings',
      updateFrequency: 'Quarterly (after earnings season)',
      dataPoints: 'Gartner forecasts ($500B expected), actual revenue ($320B actual)',
      url: 'https://www.gartner.com/en/newsroom',
      confidence: 'Medium - Based on analyst projections',
      icon: '💰',
      description: 'Measures the gap between projected AI revenue ($1.1T by 2027) and actual realized revenue across hyperscalers.'
    },
    debt_to_capex: {
      name: 'Hyperscaler Debt-to-Capex Ratio',
      provider: 'SEC Filings (10-K/10-Q)',
      updateFrequency: 'Quarterly',
      dataPoints: 'Meta ($10B debt), Amazon ($175B capex), Google ($25B capex)',
      url: 'https://www.sec.gov/edgar',
      confidence: 'High - Regulatory filings',
      icon: '💳',
      description: 'Ratio of debt-financed investments to total capital expenditures on AI infrastructure. Above 70% indicates risk.'
    },
    adoption_rate: {
      name: 'Business AI Adoption Rate',
      provider: 'U.S. Census Bureau',
      updateFrequency: 'Monthly (first Tuesday)',
      dataPoints: 'BTOS survey of 200,000+ businesses, current: 9.8%',
      url: 'https://www.census.gov/programs-surveys/btos.html',
      confidence: 'High - Government survey data',
      icon: '📈',
      description: 'Percentage of U.S. businesses actively using AI tools in operations, from Census Bureau Business Trends surveys.'
    },
    search_sentiment: {
      name: '"AI Bubble" Search Volume',
      provider: 'Google Trends API',
      updateFrequency: 'Hourly',
      dataPoints: 'Search interest index, baseline: 100 (Jan 2023), current: 1,567',
      url: 'https://trends.google.com/trends',
      confidence: 'Medium - Sentiment proxy',
      icon: '🔍',
      description: 'Relative search volume for "AI bubble" terms. 1,567% increase indicates mainstream awareness and concern.'
    },
    network_density: {
      name: 'Circular Investment Flows',
      provider: 'PitchBook + Corporate Disclosures',
      updateFrequency: 'Weekly (Friday)',
      dataPoints: 'Nvidia→OpenAI ($100B), Microsoft→Startups ($150B), Oracle→AI ($50B)',
      url: 'https://pitchbook.com',
      confidence: 'Medium - Private market data',
      icon: '🔄',
      description: 'Tracks circular financing where tech giants invest in AI companies that buy their own infrastructure.'
    },
    valuation_metrics: {
      name: 'AI Company Valuation Ratios',
      provider: 'Bloomberg Terminal + FactSet',
      updateFrequency: 'Real-time (15-min delay)',
      dataPoints: 'P/E ratios, Price/Sales, Market Cap data for 50+ AI companies',
      url: 'https://www.bloomberg.com/markets',
      confidence: 'High - Professional trading data',
      icon: '💹',
      description: 'Forward P/E ratios averaging 85x for AI stocks vs. 23x S&P 500 average.'
    },
    institutional_sentiment: {
      name: 'Institutional Warning Index',
      provider: 'RBC, Goldman Sachs, Apollo Research',
      updateFrequency: 'Weekly research reports',
      dataPoints: 'Analyst ratings, risk warnings, positioning data',
      url: 'https://www.rbc.com/our-research.html',
      confidence: 'High - Wall Street research',
      icon: '⚠️',
      description: 'Composite of bubble warnings from major investment banks and hedge funds.'
    },
    venture_funding: {
      name: 'AI Venture Capital Flow',
      provider: 'Crunchbase + PitchBook',
      updateFrequency: 'Daily',
      dataPoints: '$180B deployed in 2024, 75% from corporate VCs',
      url: 'https://www.crunchbase.com',
      confidence: 'High - Deal tracking platforms',
      icon: '💼',
      description: 'Total venture capital deployed to AI startups, with breakdown by corporate vs. traditional VC.'
    },
    energy_consumption: {
      name: 'AI Infrastructure Energy Costs',
      provider: 'IEA + Data Center Reports',
      updateFrequency: 'Monthly',
      dataPoints: '2.5% of U.S. electricity for AI data centers (2025)',
      url: 'https://www.iea.org',
      confidence: 'Medium - Industry estimates',
      icon: '⚡',
      description: 'Energy consumption of AI training and inference infrastructure as proxy for real economic impact.'
    }
  },

  // Last update timestamp (to be set dynamically)
  lastGlobalUpdate: null,

  // Update frequency in milliseconds for different data types
  updateIntervals: {
    realtime: 60000,      // 1 minute (search, stock prices)
    hourly: 3600000,      // 1 hour
    daily: 86400000,      // 24 hours
    weekly: 604800000,    // 7 days
    quarterly: 7776000000 // ~90 days
  }
};

/**
 * Get data source by key
 */
export const getDataSource = (sourceKey) => {
  return dataSourcesMetadata.sources[sourceKey] || null;
};

/**
 * Get all data sources as array
 */
export const getAllDataSources = () => {
  return Object.entries(dataSourcesMetadata.sources).map(([key, value]) => ({
    key,
    ...value
  }));
};

/**
 * Get sources by confidence level
 */
export const getSourcesByConfidence = (confidenceLevel) => {
  return Object.entries(dataSourcesMetadata.sources)
    .filter(([_, source]) => source.confidence.toLowerCase().includes(confidenceLevel.toLowerCase()))
    .map(([key, value]) => ({ key, ...value }));
};

/**
 * Format last update timestamp
 */
export const formatUpdateTimestamp = (date = new Date()) => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

/**
 * Calculate time until next update
 */
export const getTimeUntilNextUpdate = (updateFrequency) => {
  const now = new Date();
  const intervals = dataSourcesMetadata.updateIntervals;

  switch (updateFrequency.toLowerCase()) {
    case 'hourly':
      return intervals.hourly - (now.getTime() % intervals.hourly);
    case 'daily':
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(16, 30, 0, 0); // 4:30 PM EST
      return tomorrow.getTime() - now.getTime();
    case 'weekly':
      const nextFriday = new Date(now);
      nextFriday.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
      return nextFriday.getTime() - now.getTime();
    default:
      return intervals.daily;
  }
};
