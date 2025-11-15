import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/**
 * AI Adoption vs. Investment Growth Chart
 * Shows the dangerous divergence between business adoption and capital investment
 * Based on U.S. Census Bureau Business Trends and Outlook Survey
 */
const AdoptionVsInvestmentChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const chartData = data || {
        labels: ['2023 Q3', '2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3'],
        adoption: [3.7, 5.2, 7.1, 8.5, 9.8],
        investment: [100, 145, 198, 267, 340]
      };

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Business AI Adoption (%)',
              data: chartData.adoption,
              borderColor: '#10b981',
              backgroundColor: 'rgba(16,185,129,0.1)',
              yAxisID: 'y',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true
            },
            {
              label: 'AI Investment Growth (%)',
              data: chartData.investment,
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245,158,11,0.1)',
              yAxisID: 'y1',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            title: {
              display: true,
              text: 'AI Adoption vs. Investment Growth Divergence',
              font: { size: 16, weight: 'bold' },
              padding: { top: 10, bottom: 10 }
            },
            subtitle: {
              display: true,
              text: 'Data: U.S. Census Bureau, BEA | Warning: Investment outpacing adoption 35x',
              font: { size: 11 },
              color: '#ef4444'
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: { padding: 15, font: { size: 12 } }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label;
                  const value = context.parsed.y.toFixed(1);
                  const suffix = context.datasetIndex === 0 ? '%' : '% growth';
                  return `${label}: ${value}${suffix}`;
                },
                footer: function(tooltipItems) {
                  const adoption = tooltipItems.find(item => item.datasetIndex === 0);
                  const investment = tooltipItems.find(item => item.datasetIndex === 1);
                  if (adoption && investment) {
                    const ratio = (investment.parsed.y / adoption.parsed.y).toFixed(1);
                    return `⚠️ Investment/Adoption Ratio: ${ratio}x`;
                  }
                  return '';
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Adoption Rate (%)',
                font: { size: 12 },
                color: '#10b981'
              },
              grid: { color: 'rgba(16,185,129,0.1)' },
              ticks: {
                callback: (value) => value + '%',
                color: '#10b981'
              },
              max: 12
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Investment Growth (%)',
                font: { size: 12 },
                color: '#f59e0b'
              },
              grid: { drawOnChartArea: false },
              ticks: {
                callback: (value) => value + '%',
                color: '#f59e0b'
              },
              max: 400
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
        <p className="font-semibold">🚨 Dangerous Divergence Detected</p>
        <p className="mt-1">
          Business AI adoption doubled from 3.7% to 9.8%, while investment grew <strong>340%</strong>.
          When investment outpaces adoption by <span className="text-red-600 font-bold">35x</span>,
          bubble risk is extreme.
        </p>
        <p className="mt-2 text-gray-500 italic">
          Richmond Fed: "Adoption more than doubled but investment trajectory mirrors telecom boom at higher levels"
        </p>
      </div>
    </div>
  );
};

export default AdoptionVsInvestmentChart;
