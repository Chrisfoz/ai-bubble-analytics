import React from 'react';
import { Link } from 'react-router-dom';
import MetricsDashboard from './MetricsDashboard';

/**
 * Metrics Page - Full page wrapper for MetricsDashboard
 * Berkshire Hathaway color palette for professional credibility
 */
const MetricsPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block text-sm font-semibold">
            ← Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#E8E8E8] mb-2">
                AI Bubble Metrics Dashboard
              </h1>
              <p className="text-base md:text-lg text-[#C0C0C0]">
                Track all 10 institutional-grade indicators in real-time.
              </p>
            </div>
            {/* Metrics quick-jump dropdown */}
            <div className="w-full md:w-80">
              <label className="block text-xs font-medium text-[#C0C0C0] mb-1">
                Jump to metric group
              </label>
              <select
                className="w-full text-sm rounded-md border border-[#4A5A6A] bg-[#1a1f2e] text-[#E8E8E8] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#800000] focus:border-[#800000] backdrop-blur"
                defaultValue=""
                onChange={(e) => {
                  const targetId = e.target.value;
                  if (!targetId) return;
                  const el = document.getElementById(targetId);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <option value="" disabled>
                  Select a metric group…
                </option>
                <option value="metrics-structure">Tier 1 – Market structure</option>
                <option value="metrics-financial">Tier 2 – Financial risk</option>
                <option value="metrics-adoption">Tier 3 – Adoption & sentiment</option>
                <option value="metrics-valuation">Tier 4 – Valuation & concentration</option>
                <option value="metrics-summary">Summary – Bubble risk assessment</option>
                <option value="metrics-disclaimer">Legal disclaimer</option>
              </select>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-lg p-4 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-xs uppercase tracking-wide mb-1">Risk Level</div>
              <div className="text-2xl font-bold text-red-400">EXTREME</div>
            </div>
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-lg p-4 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-xs uppercase tracking-wide mb-1">Divergence</div>
              <div className="text-2xl font-bold text-red-400">10.4%</div>
            </div>
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-lg p-4 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-xs uppercase tracking-wide mb-1">Last Updated</div>
              <div className="text-2xl font-bold text-[#E8E8E8]">Today</div>
            </div>
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-lg p-4 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-xs uppercase tracking-wide mb-1">Metrics</div>
              <div className="text-2xl font-bold text-[#800000]">10/10</div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto">
          <MetricsDashboard />
        </div>

        {/* Footer CTA */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-[#800000]/20 border border-[#800000]/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Get Daily Updates</h2>
            <p className="text-[#C0C0C0] mb-6">
              Subscribe to our newsletter for daily metric updates and expert analysis
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#4A5A6A]/30">
          <p className="text-center text-[#A0A0A0] text-sm">
            ⚠️ <strong>Educational purposes only.</strong> Not financial advice.
            Data sourced from Bureau of Economic Analysis, RBC Capital Markets, Richmond Fed,
            Apollo Global Management, and public filings. Last updated: November 15, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
