/**
 * Chart Configuration Utilities
 * Standardized colors, themes, and settings for all charts
 */

export const CHART_COLORS = {
  // Warning colors
  warningRed: '#ef4444',
  cautionAmber: '#f59e0b',
  normalBlue: '#3b82f6',
  positiveGreen: '#10b981',
  historicalGray: '#6b7280',

  // Additional colors
  purple: '#8b5cf6',
  pink: '#ec4899',
  violet: '#a855f7',

  // Transparent variants
  warningRedTransparent: 'rgba(239,68,68,0.1)',
  cautionAmberTransparent: 'rgba(245,158,11,0.1)',
  normalBlueTransparent: 'rgba(59,130,246,0.1)',
  positiveGreenTransparent: 'rgba(16,185,129,0.1)',
  historicalGrayTransparent: 'rgba(107,114,128,0.1)',
};

export const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  font: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
};

export const WARNING_THRESHOLDS = {
  // Tier 1: Market Structure Indicators
  magnificent7Divergence: 10, // percentage points
  investmentGrowthRate: 40, // YoY percentage
  revenueGap: 500, // billions USD

  // Tier 2: Financial Risk Indicators
  debtToCapex: 0.75,
  networkDensity: 0.4,
  depreciationGap: 2, // years

  // Tier 3: Adoption & Sentiment
  adoptionGrowthMin: 20, // percentage
  investmentGrowthMax: 50, // percentage
  searchVolumeIncrease: 500, // YoY percentage

  // Tier 4: Valuation & Concentration
  peRatio: 35,
  psRatio: 12,
  vcConcentration: 40 // percentage
};

export const DATA_SOURCES = {
  rbcCapital: 'RBC Capital Markets',
  richmondFed: 'Federal Reserve Bank of Richmond',
  apolloGlobal: 'Apollo Global Management',
  bea: 'Bureau of Economic Analysis',
  census: 'U.S. Census Bureau',
  gartner: 'Gartner',
  idc: 'IDC',
  googleTrends: 'Google Trends',
  bloomberg: 'Bloomberg',
  pitchbook: 'PitchBook'
};

export const UPDATE_FREQUENCIES = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  annual: 'Annual'
};

/**
 * Get color based on warning level
 * @param {number} value - Current value
 * @param {number} threshold - Warning threshold
 * @param {boolean} inverse - If true, warning when value < threshold
 * @returns {string} Color hex code
 */
export function getWarningColor(value, threshold, inverse = false) {
  const isWarning = inverse ? value < threshold : value > threshold;
  return isWarning ? CHART_COLORS.warningRed : CHART_COLORS.positiveGreen;
}

/**
 * Format large numbers for display
 * @param {number} value - Number to format
 * @param {string} suffix - Suffix to add (B, M, T, %)
 * @returns {string} Formatted string
 */
export function formatLargeNumber(value, suffix = '') {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'T' + suffix;
  } else if (value >= 1) {
    return value.toFixed(1) + 'B' + suffix;
  } else {
    return (value * 1000).toFixed(0) + 'M' + suffix;
  }
}

/**
 * Get standard annotation for threshold line
 * @param {number} yValue - Y-axis value
 * @param {string} label - Annotation label
 * @param {string} color - Line color
 * @returns {object} Chart.js annotation config
 */
export function getThresholdAnnotation(yValue, label, color = CHART_COLORS.warningRed) {
  return {
    type: 'line',
    yMin: yValue,
    yMax: yValue,
    borderColor: color,
    borderWidth: 2,
    borderDash: [5, 5],
    label: {
      content: label,
      enabled: true,
      position: 'end',
      backgroundColor: color,
      color: '#fff',
      font: { size: 10, weight: 'bold' },
      padding: 4
    }
  };
}

/**
 * Get standard disclaimer text
 * @returns {string} Legal disclaimer
 */
export function getDisclaimer() {
  return 'Educational purposes only. Not financial advice. Historical patterns do not guarantee future results.';
}

/**
 * Format timestamp for display
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatTimestamp(date = new Date()) {
  return date.toISOString().split('T')[0];
}

export default {
  CHART_COLORS,
  CHART_DEFAULTS,
  WARNING_THRESHOLDS,
  DATA_SOURCES,
  UPDATE_FREQUENCIES,
  getWarningColor,
  formatLargeNumber,
  getThresholdAnnotation,
  getDisclaimer,
  formatTimestamp
};
