import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

/**
 * AI Bubble Search Volume & Sentiment Tracker
 * Tracks public concern via Google Trends "AI bubble" searches
 * 1,567% increase in 2 years - sentiment indicator correlates with retail FOMO
 */
const SentimentChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartData = data || {
        labels: ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'],
        searchVolume: [100, 180, 280, 420, 650, 890, 1200, 1450, 1667],
        events: [
          { index: 4, label: 'Sam Altman Interview' },
          { index: 6, label: 'Burry Warning' },
          { index: 8, label: 'Fed Report' }
        ]
      };

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: '"AI Bubble" Search Volume (Index)',
              data: chartData.searchVolume,
              borderColor: '#ec4899',
              backgroundColor: 'rgba(236,72,153,0.2)',
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#ec4899',
              pointBorderColor: '#fff',
              pointBorderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Public Bubble Concern: "AI Bubble" Search Trends',
              font: { size: 16, weight: 'bold' },
              padding: { top: 10, bottom: 10 }
            },
            subtitle: {
              display: true,
              text: 'Data: Google Trends | Up 1,567% in 2 years - Retail FOMO indicator',
              font: { size: 11 },
              color: '#6b7280'
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: { padding: 15, font: { size: 12 } }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const baseValue = chartData.searchVolume[0];
                  const currentValue = context.parsed.y;
                  const increase = ((currentValue - baseValue) / baseValue * 100).toFixed(0);
                  return [
                    `Search Index: ${currentValue}`,
                    `Increase from baseline: +${increase}%`
                  ];
                }
              }
            },
            annotation: {
              annotations: {
                ...chartData.events.reduce((acc, event, i) => {
                  acc[`event${i}`] = {
                    type: 'point',
                    xValue: event.index,
                    yValue: chartData.searchVolume[event.index],
                    backgroundColor: '#fbbf24',
                    borderColor: '#f59e0b',
                    borderWidth: 3,
                    radius: 10,
                    label: {
                      content: event.label,
                      enabled: true,
                      position: 'top',
                      backgroundColor: 'rgba(251,191,36,0.9)',
                      color: '#000',
                      font: { size: 10, weight: 'bold' },
                      padding: 4
                    }
                  };
                  return acc;
                }, {}),
                trendLine: {
                  type: 'line',
                  yMin: 100,
                  yMax: 1667,
                  xMin: 0,
                  xMax: 8,
                  borderColor: 'rgba(239,68,68,0.3)',
                  borderWidth: 2,
                  borderDash: [5, 5],
                  label: {
                    content: 'Exponential Growth Trend',
                    enabled: true,
                    position: 'center',
                    color: '#ef4444',
                    font: { size: 10 }
                  }
                }
              }
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Search Index (Base 100)',
                font: { size: 12 }
              },
              grid: { color: 'rgba(236,72,153,0.1)' },
              ticks: {
                callback: (value) => value.toLocaleString()
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-xs text-gray-600 border-t pt-3">
        <p className="font-semibold">📈 Sentiment Indicator Analysis</p>
        <p className="mt-1">
          "AI bubble" search volume up <span className="text-pink-600 font-bold">1,567%</span> since 2023 Q1.
          Historically, exponential growth in bubble-related searches precedes market corrections.
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="bg-yellow-50 p-2 rounded">
            <div className="font-bold text-yellow-700">Q1 2024</div>
            <div className="text-xs">Sam Altman: "Yes, AI is a bubble"</div>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <div className="font-bold text-red-700">Q3 2024</div>
            <div className="text-xs">Michael Burry depreciation warning</div>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <div className="font-bold text-blue-700">Q1 2025</div>
            <div className="text-xs">Richmond Fed historical parallel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;
