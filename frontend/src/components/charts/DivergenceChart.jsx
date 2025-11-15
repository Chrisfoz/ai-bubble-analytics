import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

/**
 * Magnificent 7 Weight vs. Earnings Divergence Chart
 * Based on RBC Capital Markets' key warning indicator
 * Shows when S&P 500 index weight exceeds earnings share (overvaluation signal)
 */
const DivergenceChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Default data if none provided
      const chartData = data || {
        labels: ['2021 Q1', '2022 Q1', '2023 Q1', '2024 Q1', '2025 Q1'],
        weight: [27.5, 31.2, 35.8, 41.1, 44.2],
        earnings: [22.1, 24.5, 28.3, 31.7, 33.8]
      };

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'S&P 500 Weight (%)',
              data: chartData.weight,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239,68,68,0.1)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Earnings Share (%)',
              data: chartData.earnings,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59,130,246,0.1)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'AI Bubble Warning: Weight vs. Earnings Divergence',
              font: { size: 16, weight: 'bold' },
              padding: { top: 10, bottom: 20 }
            },
            subtitle: {
              display: true,
              text: 'Data: RBC Capital Markets | Updated: 2025-Q1',
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
                  const divergence = chartData.weight[context.dataIndex] -
                                   chartData.earnings[context.dataIndex];
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}% (Divergence: ${divergence.toFixed(1)}%)`;
                }
              }
            },
            annotation: {
              annotations: {
                dangerZone: {
                  type: 'box',
                  xMin: 3,
                  xMax: 4,
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderColor: 'rgba(239,68,68,0.3)',
                  borderWidth: 2,
                  label: {
                    content: 'Bubble Risk Zone',
                    enabled: true,
                    position: 'center',
                    color: '#ef4444',
                    font: { size: 11, weight: 'bold' }
                  }
                },
                dotComPeak: {
                  type: 'line',
                  yMin: 36.2,
                  yMax: 36.2,
                  borderColor: '#6b7280',
                  borderWidth: 2,
                  borderDash: [5, 5],
                  label: {
                    content: 'Dot-com Peak (2000)',
                    enabled: true,
                    position: 'end',
                    backgroundColor: 'rgba(107,114,128,0.8)',
                    color: 'white',
                    font: { size: 10 }
                  }
                }
              }
            }
          },
          scales: {
            y: {
              title: { display: true, text: 'Percentage (%)', font: { size: 12 } },
              grid: { color: 'rgba(0,0,0,0.05)' },
              ticks: { callback: (value) => value + '%' }
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
        <p className="font-semibold">⚠️ Educational purposes only. Not financial advice.</p>
        <p className="mt-1">
          <strong>Warning Threshold:</strong> Divergence &gt; 10% indicates overvaluation risk.
          Current divergence: <span className="text-red-600 font-bold">10.4%</span>
        </p>
      </div>
    </div>
  );
};

export default DivergenceChart;
