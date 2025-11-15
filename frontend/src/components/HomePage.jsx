import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EnhancedDynamicBubble from './EnhancedDynamicBubble';

/**
 * Home Page Component
 * Features dynamic bubble visualization that grows/shrinks based on market metrics
 */
const HomePage = () => {
  const [bubbleSize, setBubbleSize] = useState(60); // Percentage size
  const [riskLevel, setRiskLevel] = useState('HIGH');
  
  // Simulate real-time data updates (in production, this would fetch from API)
  useEffect(() => {
    // Mock calculation based on key metrics
    const calculateBubbleMetrics = () => {
      // This would be replaced with actual API calls
      const magnificent7Weight = 44.2; // Current weight
      const earningsShare = 33.8; // Current earnings
      const divergence = magnificent7Weight - earningsShare;
      
      // Calculate bubble size (normalized to 0-100%)
      const size = Math.min(100, (divergence / 12) * 100);
      setBubbleSize(size);
      
      // Determine risk level
      if (divergence > 10) setRiskLevel('EXTREME');
      else if (divergence > 7) setRiskLevel('HIGH');
      else if (divergence > 5) setRiskLevel('MODERATE');
      else setRiskLevel('LOW');
    };
    
    calculateBubbleMetrics();
    const interval = setInterval(calculateBubbleMetrics, 5000); // Update every 5s
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Dynamic Bubble */}
      <div className="relative overflow-hidden">
        {/* Subtle grid/gradient background (removed external /grid.svg asset to avoid bundler errors) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/60 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI Bubble <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Analytics</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Real-time tracking of the AI market bubble using institutional-grade metrics from RBC Capital Markets, Richmond Fed, and Apollo Global Management
            </p>
          </div>

          {/* Enhanced Dynamic Bubble Visualization with Timeline & Transparency */}
          <EnhancedDynamicBubble initialSize={bubbleSize} initialRiskLevel={riskLevel} />

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Current Divergence</div>
              <div className="text-4xl font-bold text-red-400">10.4%</div>
              <div className="text-gray-300 text-sm mt-2">Weight exceeds earnings share</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Bubble Risk Level</div>
              <div className={`text-4xl font-bold ${
                riskLevel === 'EXTREME' ? 'text-red-500' :
                riskLevel === 'HIGH' ? 'text-orange-500' :
                riskLevel === 'MODERATE' ? 'text-yellow-500' :
                'text-green-500'
              }`}>{riskLevel}</div>
              <div className="text-gray-300 text-sm mt-2">Based on 10 key indicators</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Search Interest</div>
              <div className="text-4xl font-bold text-pink-400">+1,567%</div>
              <div className="text-gray-300 text-sm mt-2">"AI bubble" searches (2yr)</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link 
              to="/metrics" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-center"
            >
              View Full Metrics Dashboard
            </Link>
            <Link 
              to="/context" 
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
            >
              Understand the AI Bubble
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Context Section */}
      <div className="bg-black/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">What is the AI Bubble?</h2>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The AI bubble refers to a theorized stock market bubble growing amid the current AI boom. 
                Concerns originate from <span className="text-purple-400 font-semibold">circular financing</span> patterns 
                where leading tech firms pass investments between each other, artificially inflating valuations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="text-red-400 font-bold mb-2">⚠️ Warning Signs</div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• $600B revenue expectation gap</li>
                    <li>• Investment 35x ahead of adoption</li>
                    <li>• Circular financing flows &gt;$180B</li>
                    <li>• Debt-funded expansion at risk</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 font-bold mb-2">📊 Expert Views</div>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Sam Altman: "AI is a bubble"</li>
                    <li>• Ray Dalio: "Similar to dot-com"</li>
                    <li>• Warren Buffett: Record cash pile</li>
                    <li>• Michael Burry: 80% short AI</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/context" className="text-purple-400 hover:text-purple-300 font-semibold">
                  Read Full Analysis →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Informed</h2>
            <p className="text-gray-200 mb-8">
              Get daily AI bubble metrics and expert commentary delivered to your inbox
            </p>
            <Link 
              to="/newsletter" 
              className="inline-block px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-black/50 py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            ⚠️ <strong>Educational purposes only.</strong> Not financial advice. 
            Data sourced from Bureau of Economic Analysis, RBC Capital Markets, Richmond Fed, 
            Apollo Global Management, and public filings. Always do your own research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
