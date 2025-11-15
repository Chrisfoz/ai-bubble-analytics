import React from 'react';
import { Link } from 'react-router-dom';
import MetricsDashboard from './MetricsDashboard';

/**
 * Metrics Page - Full page wrapper for MetricsDashboard
 */
const MetricsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <Link to="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Bubble Metrics Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Track all 10 institutional-grade indicators in real-time
          </p>
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/10">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Risk Level</div>
              <div className="text-2xl font-bold text-red-400">EXTREME</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/10">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Divergence</div>
              <div className="text-2xl font-bold text-red-400">10.4%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/10">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Last Updated</div>
              <div className="text-2xl font-bold text-white">Today</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/10">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Metrics</div>
              <div className="text-2xl font-bold text-purple-400">10/10</div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto">
          <MetricsDashboard />
        </div>

        {/* Footer CTA */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Get Daily Updates</h2>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter for daily metric updates and expert analysis
            </p>
            <Link 
              to="/newsletter" 
              className="inline-block px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
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
