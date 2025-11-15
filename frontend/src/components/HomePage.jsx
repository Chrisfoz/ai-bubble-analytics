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
    <div className="min-h-screen bg-[#0D1117]">
      {/* Hero Section with Dynamic Bubble - Berkshire Hathaway Styling */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-[#E8E8E8] mb-6" style={{fontFamily: 'Georgia, serif'}}>
              AI Bubble <span className="text-[#800000]">Analytics</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#C0C0C0] max-w-3xl mx-auto" style={{fontFamily: 'Georgia, serif'}}>
              Institutional-grade analysis of AI market concentration using data from RBC Capital Markets, Richmond Fed, and Apollo Global Management
            </p>
          </div>

          {/* Enhanced Dynamic Bubble Visualization with Timeline & Transparency */}
          <EnhancedDynamicBubble initialSize={bubbleSize} initialRiskLevel={riskLevel} />

          {/* Key Metrics Summary - Conservative Styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-sm uppercase tracking-wide mb-2">Current Divergence</div>
              <div className="text-4xl font-bold text-[#800000]">10.4%</div>
              <div className="text-[#C0C0C0] text-sm mt-2">Weight exceeds earnings share</div>
            </div>

            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-sm uppercase tracking-wide mb-2">Bubble Risk Level</div>
              <div className={`text-4xl font-bold ${
                riskLevel === 'EXTREME' ? 'text-red-900' :
                riskLevel === 'HIGH' ? 'text-red-800' :
                riskLevel === 'MODERATE' ? 'text-slate-500' :
                'text-gray-500'
              }`}>{riskLevel}</div>
              <div className="text-[#C0C0C0] text-sm mt-2">Based on 10 key indicators</div>
            </div>

            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 border border-[#4A5A6A]/50">
              <div className="text-[#A0A0A0] text-sm uppercase tracking-wide mb-2">Search Interest</div>
              <div className="text-4xl font-bold text-[#800000]">+1,567%</div>
              <div className="text-[#C0C0C0] text-sm mt-2">"AI bubble" searches (2yr)</div>
            </div>
          </div>

          {/* CTA Buttons - Conservative Styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              to="/metrics"
              className="px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300 text-center"
            >
              View Full Metrics Dashboard
            </Link>
            <Link
              to="/context"
              className="px-8 py-4 bg-[#4A5A6A]/20 backdrop-blur-lg text-[#E8E8E8] font-semibold rounded-lg border border-[#4A5A6A] hover:bg-[#4A5A6A]/40 transition-all duration-300 text-center"
            >
              Understand the AI Bubble
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Context Section - Conservative Styling */}
      <div className="bg-[#0a0e14]/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6 text-center" style={{fontFamily: 'Georgia, serif'}}>What is the AI Bubble?</h2>
            <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
              <p className="text-[#C0C0C0] text-lg leading-relaxed mb-4">
                The AI bubble refers to a theorized stock market bubble growing amid the current AI boom.
                Concerns originate from <span className="text-[#800000] font-semibold">circular financing</span> patterns
                where leading tech firms pass investments between each other, artificially inflating valuations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#2a1515] border border-[#800000]/40 rounded-lg p-4">
                  <div className="text-[#A00000] font-bold mb-2">⚠️ Warning Signs</div>
                  <ul className="text-[#C0C0C0] text-sm space-y-1">
                    <li>• $600B revenue expectation gap</li>
                    <li>• Investment 35x ahead of adoption</li>
                    <li>• Circular financing flows &gt;$180B</li>
                    <li>• Debt-funded expansion at risk</li>
                  </ul>
                </div>
                <div className="bg-[#1a1f2e] border border-[#4A5A6A]/40 rounded-lg p-4">
                  <div className="text-[#4A5A6A] font-bold mb-2">📊 Expert Views</div>
                  <ul className="text-[#C0C0C0] text-sm space-y-1">
                    <li>• Sam Altman: "AI is a bubble"</li>
                    <li>• Ray Dalio: "Similar to dot-com"</li>
                    <li>• Warren Buffett: Record cash pile</li>
                    <li>• Michael Burry: 80% short AI</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/context" className="text-[#800000] hover:text-[#A00000] font-semibold">
                  Read Full Analysis →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA - Conservative Styling */}
      <div className="bg-[#800000]/10 border-y border-[#800000]/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4" style={{fontFamily: 'Georgia, serif'}}>Stay Informed</h2>
            <p className="text-[#C0C0C0] mb-8">
              Receive institutional-grade AI market analysis and commentary
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-[#0D1117] py-8 border-t border-[#4A5A6A]/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-[#A0A0A0] text-sm">
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
