import React from 'react';
import {
  DivergenceChart,
  InvestmentComparisonChart,
  NetworkDependencyChart,
  RevenueGapChart,
  AdoptionVsInvestmentChart,
  SentimentChart,
} from './charts';

/**
 * Metrics Dashboard - Top 10 AI Bubble Indicators
 * Displays all evidence-based charts in organized grid layout
 * Based on institutional research from RBC Capital, Richmond Fed, Apollo Global
 */
const MetricsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          AI Bubble Analytics Dashboard
        </h1>
        <p className="text-lg text-slate-600">
          Evidence-based metrics tracking the AI investment bubble phenomenon
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
            ⚠️ 6 of 10 metrics in warning zone
          </span>
          <span className="text-slate-500">
            Last updated: {new Date().toISOString().split('T')[0]}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Tier 1: Market Structure Indicators */}
        <section id="metrics-structure">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-red-600">🔴</span>
            Tier 1: Market Structure Indicators
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DivergenceChart />
            <InvestmentComparisonChart />
          </div>
          <div className="mt-6">
            <RevenueGapChart />
          </div>
        </section>

        {/* Tier 2: Financial Risk Indicators */}
        <section id="metrics-financial">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-amber-600">🟡</span>
            Tier 2: Financial Risk Indicators
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <NetworkDependencyChart />
          </div>
          <div className="mt-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-3 text-slate-900">
              Debt-to-Capex Ratio for Hyperscalers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { company: 'Microsoft', ratio: 0.68, warning: false },
                { company: 'Google', ratio: 0.72, warning: false },
                { company: 'Amazon', ratio: 0.79, warning: true },
                { company: 'Meta', ratio: 0.81, warning: true },
              ].map((item) => (
                <div
                  key={item.company}
                  className={`p-4 rounded-lg border ${
                    item.warning
                      ? 'border-red-200 bg-red-50'
                      : 'border-emerald-200 bg-emerald-50'
                  }`}
                >
                  <div className="text-sm font-medium text-slate-600">
                    {item.company}
                  </div>
                  <div
                    className={`text-2xl font-semibold mt-1 ${
                      item.warning ? 'text-red-700' : 'text-emerald-700'
                    }`}
                  >
                    {item.ratio.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {item.warning ? '⚠️ Above 0.75' : '✓ Within comfort range'}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-4 border-t pt-3">
              <strong>Source:</strong> SEC filings, Q4 2024 ·
              <strong> Threshold:</strong> &gt;0.75 indicates elevated leverage risk.
            </p>
          </div>
        </section>

        {/* Tier 3: Adoption & Sentiment Indicators */}
        <section id="metrics-adoption">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-blue-600">🔵</span>
            Tier 3: Adoption & Sentiment Indicators
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdoptionVsInvestmentChart />
            <SentimentChart />
          </div>
        </section>

        {/* Tier 4: Valuation & Concentration */}
        <section id="metrics-valuation">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-purple-600">🟣</span>
            Tier 4: Valuation & Concentration Indicators
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-3 text-slate-900">
              Top 10 S&amp;P 500 Overvaluation Index
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3">Company</th>
                    <th className="text-right p-3">P/E Ratio</th>
                    <th className="text-right p-3">P/S Ratio</th>
                    <th className="text-right p-3">Market Cap ($B)</th>
                    <th className="text-center p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { name: 'Nvidia', pe: 68.4, ps: 38.2, cap: 2890, warning: true },
                    { name: 'Microsoft', pe: 34.1, ps: 13.5, cap: 3120, warning: false },
                    { name: 'Apple', pe: 29.8, ps: 8.2, cap: 3450, warning: false },
                    { name: 'Alphabet', pe: 24.5, ps: 6.8, cap: 1980, warning: false },
                    { name: 'Meta', pe: 28.3, ps: 9.1, cap: 1240, warning: false },
                  ].map((stock) => (
                    <tr key={stock.name} className={stock.warning ? 'bg-red-50' : ''}>
                      <td className="p-3 font-medium text-slate-900">{stock.name}</td>
                      <td
                        className={`text-right p-3 ${
                          stock.pe > 35 ? 'text-red-600 font-semibold' : 'text-slate-800'
                        }`}
                      >
                        {stock.pe.toFixed(1)}
                      </td>
                      <td
                        className={`text-right p-3 ${
                          stock.ps > 12 ? 'text-red-600 font-semibold' : 'text-slate-800'
                        }`}
                      >
                        {stock.ps.toFixed(1)}
                      </td>
                      <td className="text-right p-3 text-slate-800">
                        ${stock.cap.toLocaleString()}
                      </td>
                      <td className="text-center p-3 text-sm">
                        {stock.warning ? '⚠️ Overvaluation risk' : 'Within historical range'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-600 mt-4 border-t pt-3">
              <strong>Source:</strong> Bloomberg, Apollo Academy ·
              <strong> Thresholds:</strong> P/E &gt;35, P/S &gt;12 suggest elevated valuations.
            </p>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-3 text-slate-900">
              VC Funding Concentration
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: '54%' }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-slate-600">Other sectors</span>
                  <span className="font-semibold text-purple-700">54% to AI</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-semibold text-red-600">54%</div>
                <div className="text-xs text-slate-500">Share of VC flows into AI</div>
                <div className="text-xs text-red-600 font-medium mt-1">
                  ⚠️ Above 40% concentration threshold
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-4 border-t pt-3">
              <strong>Source:</strong> PitchBook, CB Insights ·
              <strong> Context:</strong> &gt;40% concentration has historically preceded sector drawdowns.
            </p>
          </div>
        </section>

        {/* Summary Card */}
        <section
          id="metrics-summary"
          className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            Bubble Risk Assessment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <div className="text-3xl font-semibold text-slate-900">6/10</div>
              <div className="text-sm mt-1 text-slate-600">Metrics in warning zone</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <div className="text-3xl font-semibold text-slate-900">10.4%</div>
              <div className="text-sm mt-1 text-slate-600">Weight–earnings divergence</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
              <div className="text-3xl font-semibold text-slate-900">$600B</div>
              <div className="text-sm mt-1 text-slate-600">Revenue expectation gap</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-slate-700">
            <p className="font-semibold mb-2">Expert commentary (summary):</p>
            <ul className="list-disc list-inside space-y-1">
              <li>RBC Capital: weight–earnings divergence surpasses dot-com peak.</li>
              <li>Richmond Fed: investment trajectory mirrors telecom boom at higher levels.</li>
              <li>Sam Altman: acknowledges elements of an AI-driven bubble.</li>
              <li>Michael Burry: warns of potential large-scale asset repricing.</li>
            </ul>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section
          id="metrics-disclaimer"
          className="bg-gray-50 border border-gray-300 p-6 rounded-lg text-sm text-slate-700"
        >
          <p className="font-bold text-slate-900 mb-2">⚖️ IMPORTANT DISCLAIMER</p>
          <p>
            This application is for <strong>educational purposes only</strong>. NOT FINANCIAL
            ADVICE. All forecasts are speculative. Historical patterns do not guarantee future
            results. Consult qualified financial professionals before making investment
            decisions. The developers are NOT registered investment advisors and make NO
            guarantees about prediction accuracy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MetricsDashboard;
