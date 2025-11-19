/**
 * AI Bubble Index (ABI) Calculator
 * Aggregates 10 institutional metrics into single risk score (0-100)
 *
 * Risk Levels (RAG System):
 * - 0-40: LOW (Green)
 * - 41-60: MODERATE (Amber)
 * - 61-80: HIGH (Orange)
 * - 81-100: EXTREME (Red)
 */

/**
 * Calculate AI Bubble Index from normalized metrics
 * @param {Object} metrics - Object containing all 10 normalized metrics (0-100 scale)
 * @returns {Object} - ABI score, risk level, and breakdown
 */
function calculateABI(metrics) {
  // Weight each metric by importance
  // Total weights = 100%
  const weights = {
    magnificent7Divergence: 15,    // Highest weight - direct valuation mismatch
    sp500Concentration: 12,         // Market concentration risk
    capeRatio: 13,                  // Overall market valuation
    circularFinancing: 14,          // Core bubble mechanism
    debtRatios: 10,                 // Financial stability risk
    gpuSpending: 9,                 // Infrastructure investment pace
    aiSpending: 8,                  // Corporate commitment level
    vcFunding: 8,                   // Startup ecosystem froth
    fedIndicator: 7,                // Institutional warning
    searchInterest: 4               // Public sentiment (lagging indicator)
  };

  // Validate weights sum to 100
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  if (Math.abs(totalWeight - 100) > 0.01) {
    throw new Error(`Weights must sum to 100, got ${totalWeight}`);
  }

  // Calculate weighted average
  let weightedSum = 0;
  const breakdown = {};

  for (const [metric, weight] of Object.entries(weights)) {
    const normalizedValue = metrics.data[metric]?.normalized || 50; // Default to 50 if missing
    const contribution = (normalizedValue * weight) / 100;
    weightedSum += contribution;

    breakdown[metric] = {
      value: normalizedValue,
      weight: weight,
      contribution: contribution,
      raw: metrics.data[metric]?.raw || null
    };
  }

  const abi = Math.round(weightedSum * 100) / 100; // Round to 2 decimals

  // Determine risk level
  let riskLevel, riskColor;
  if (abi >= 81) {
    riskLevel = 'EXTREME';
    riskColor = 'RED';
  } else if (abi >= 61) {
    riskLevel = 'HIGH';
    riskColor = 'ORANGE';
  } else if (abi >= 41) {
    riskLevel = 'MODERATE';
    riskColor = 'AMBER';
  } else {
    riskLevel = 'LOW';
    riskColor = 'GREEN';
  }

  // Generate risk description
  const riskDescription = getRiskDescription(abi, riskLevel);

  // Calculate trend (if historical data available)
  const trend = calculateTrend(abi);

  return {
    abi: abi,
    riskLevel: riskLevel,
    riskColor: riskColor,
    riskDescription: riskDescription,
    trend: trend,
    breakdown: breakdown,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
}

/**
 * Get human-readable risk description
 */
function getRiskDescription(abi, riskLevel) {
  const descriptions = {
    'EXTREME': `AI Bubble Index at ${abi}/100 signals EXTREME risk. Multiple indicators show severe overvaluation, concentrated market structure, and unsustainable financing patterns. Consider defensive positioning.`,
    'HIGH': `AI Bubble Index at ${abi}/100 signals HIGH risk. Valuations are stretched, market concentration is elevated, and circular financing is accelerating. Monitor closely for correction signals.`,
    'MODERATE': `AI Bubble Index at ${abi}/100 signals MODERATE risk. Some valuation concerns and market concentration exist, but fundamentals remain relatively supportive. Maintain balanced approach.`,
    'LOW': `AI Bubble Index at ${abi}/100 signals LOW risk. Market metrics are within historical norms, valuations are reasonable, and financing patterns appear sustainable. Favorable environment for AI investments.`
  };

  return descriptions[riskLevel];
}

/**
 * Calculate trend vs. previous period
 * TODO: Fetch historical ABI from database to calculate real trend
 */
function calculateTrend(currentABI) {
  // For now, return neutral
  // In production, query Supabase for yesterday's ABI and compare

  // Example logic:
  // const previousABI = await fetchPreviousABI();
  // const change = currentABI - previousABI;
  // return { direction: change > 0 ? 'up' : 'down', change: Math.abs(change) };

  return {
    direction: 'neutral',
    change: 0,
    period: '24h'
  };
}

/**
 * Get top risk factors (metrics with highest normalized values)
 */
function getTopRiskFactors(breakdown, limit = 3) {
  const sorted = Object.entries(breakdown)
    .map(([metric, data]) => ({
      metric: formatMetricName(metric),
      value: data.value,
      contribution: data.contribution
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);

  return sorted;
}

/**
 * Format metric names for display
 */
function formatMetricName(metric) {
  const names = {
    magnificent7Divergence: 'Magnificent 7 Divergence',
    sp500Concentration: 'S&P 500 Concentration',
    capeRatio: 'Shiller CAPE Ratio',
    circularFinancing: 'Circular Financing Flow',
    debtRatios: 'Debt-to-Equity Ratios',
    gpuSpending: 'GPU Infrastructure Spending',
    aiSpending: 'Corporate AI Spending',
    vcFunding: 'Venture Capital Funding',
    fedIndicator: 'Richmond Fed Indicator',
    searchInterest: 'Google Search Interest'
  };

  return names[metric] || metric;
}

module.exports = {
  calculateABI,
  getTopRiskFactors,
  formatMetricName
};
