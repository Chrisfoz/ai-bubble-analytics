/**
 * Historical AI Bubble Index Data (2023-2025)
 * Tracks the evolution of bubble metrics over critical 2-year period
 */

export const bubbleHistoryData = {
  timePoints: [
    {
      date: '2023-01-01',
      abi: 35,
      catalyst: 'ChatGPT launch afterglow',
      metrics: {
        m7_weight: 32.5,
        m7_earnings: 29.8,
        revenue_gap: 45,
        debt_ratio: 0.35,
        adoption_rate: 3.7,
        search_volume: 100
      }
    },
    {
      date: '2023-03-01',
      abi: 38,
      catalyst: 'Microsoft $10B OpenAI investment',
      metrics: {
        m7_weight: 33.2,
        m7_earnings: 30.1,
        revenue_gap: 65,
        debt_ratio: 0.38,
        adoption_rate: 4.2,
        search_volume: 180
      }
    },
    {
      date: '2023-06-01',
      abi: 42,
      catalyst: 'Nvidia hits first $1T valuation',
      metrics: {
        m7_weight: 35.8,
        m7_earnings: 31.2,
        revenue_gap: 85,
        debt_ratio: 0.42,
        adoption_rate: 4.8,
        search_volume: 320
      }
    },
    {
      date: '2023-09-01',
      abi: 38,
      catalyst: 'Adoption rate 3.7% - early stage correction',
      metrics: {
        m7_weight: 34.1,
        m7_earnings: 30.5,
        revenue_gap: 75,
        debt_ratio: 0.40,
        adoption_rate: 5.1,
        search_volume: 280
      }
    },
    {
      date: '2023-12-01',
      abi: 45,
      catalyst: 'Sam Altman first bubble warning',
      metrics: {
        m7_weight: 37.5,
        m7_earnings: 31.8,
        revenue_gap: 120,
        debt_ratio: 0.48,
        adoption_rate: 5.6,
        search_volume: 450
      }
    },
    {
      date: '2024-03-01',
      abi: 52,
      catalyst: 'Revenue gap emerges at $180B',
      metrics: {
        m7_weight: 39.8,
        m7_earnings: 32.4,
        revenue_gap: 180,
        debt_ratio: 0.55,
        adoption_rate: 6.3,
        search_volume: 620
      }
    },
    {
      date: '2024-06-01',
      abi: 58,
      catalyst: 'M7 weight hits 41% vs 31.7% earnings',
      metrics: {
        m7_weight: 41.0,
        m7_earnings: 31.7,
        revenue_gap: 280,
        debt_ratio: 0.62,
        adoption_rate: 7.1,
        search_volume: 890
      }
    },
    {
      date: '2024-09-01',
      abi: 55,
      catalyst: 'Adoption climbs to 7.1%, slight correction',
      metrics: {
        m7_weight: 40.2,
        m7_earnings: 32.1,
        revenue_gap: 250,
        debt_ratio: 0.60,
        adoption_rate: 7.8,
        search_volume: 750
      }
    },
    {
      date: '2024-12-01',
      abi: 62,
      catalyst: 'Michael Burry opens $1B short position',
      metrics: {
        m7_weight: 42.8,
        m7_earnings: 32.9,
        revenue_gap: 380,
        debt_ratio: 0.68,
        adoption_rate: 8.5,
        search_volume: 1120
      }
    },
    {
      date: '2025-01-15',
      abi: 65,
      catalyst: 'Search volume spike 1,567% (panic phase)',
      metrics: {
        m7_weight: 43.5,
        m7_earnings: 33.2,
        revenue_gap: 450,
        debt_ratio: 0.72,
        adoption_rate: 9.1,
        search_volume: 1567
      }
    },
    {
      date: '2025-03-01',
      abi: 63,
      catalyst: 'MicroStrategy debt concerns surface',
      metrics: {
        m7_weight: 43.1,
        m7_earnings: 33.5,
        revenue_gap: 420,
        debt_ratio: 0.70,
        adoption_rate: 9.4,
        search_volume: 1340
      }
    },
    {
      date: '2025-06-01',
      abi: 67,
      catalyst: 'Oracle posts $100M quarterly AI loss',
      metrics: {
        m7_weight: 44.0,
        m7_earnings: 33.6,
        revenue_gap: 520,
        debt_ratio: 0.73,
        adoption_rate: 9.7,
        search_volume: 1450
      }
    },
    {
      date: '2025-09-01',
      abi: 70,
      catalyst: 'Current: $600B revenue gap milestone',
      metrics: {
        m7_weight: 44.2,
        m7_earnings: 33.8,
        revenue_gap: 600,
        debt_ratio: 0.75,
        adoption_rate: 9.8,
        search_volume: 1567
      }
    }
  ]
};

/**
 * Get the latest (current) bubble data point
 */
export const getCurrentBubbleData = () => {
  return bubbleHistoryData.timePoints[bubbleHistoryData.timePoints.length - 1];
};

/**
 * Get bubble data for a specific date
 */
export const getBubbleDataByDate = (dateString) => {
  return bubbleHistoryData.timePoints.find(point => point.date === dateString);
};

/**
 * Get bubble data by index
 */
export const getBubbleDataByIndex = (index) => {
  if (index < 0 || index >= bubbleHistoryData.timePoints.length) {
    return null;
  }
  return bubbleHistoryData.timePoints[index];
};
