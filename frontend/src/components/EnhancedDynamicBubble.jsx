import React, { useState, useEffect, useRef } from 'react';
import { bubbleHistoryData, getBubbleDataByIndex } from '../data/bubbleHistory';
import { formatUpdateTimestamp } from '../data/dataSources';
import { dataSourcesCitations } from '../data/citations';

/**
 * Enhanced Dynamic Bubble Visualization Component
 * Features: Historical timeline, data source transparency, timestamp tracking
 */
const EnhancedDynamicBubble = ({ initialSize = 70, initialRiskLevel = 'HIGH' }) => {
  const bubbleRef = useRef(null);
  const [size, setSize] = useState(initialSize);
  const [riskLevel, setRiskLevel] = useState(initialRiskLevel);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [timelineIndex, setTimelineIndex] = useState(bubbleHistoryData.timePoints.length - 1);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [showDataSources, setShowDataSources] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState(null);

  // Get current bubble data (live or historical)
  useEffect(() => {
    const dataPoint = getBubbleDataByIndex(timelineIndex);
    if (dataPoint) {
      setSize(dataPoint.abi);
      setCurrentMetrics(dataPoint.metrics);

      // Calculate risk level from ABI using RAG system
      // GREEN (0-40): LOW risk
      // AMBER (41-60): MODERATE risk
      // ORANGE (61-80): HIGH risk
      // RED (81-100): EXTREME risk
      if (dataPoint.abi >= 81) setRiskLevel('EXTREME');
      else if (dataPoint.abi >= 61) setRiskLevel('HIGH');
      else if (dataPoint.abi >= 41) setRiskLevel('MODERATE');
      else setRiskLevel('LOW');
    }
  }, [timelineIndex]);

  // Update bubble scale animation
  useEffect(() => {
    if (bubbleRef.current) {
      const scale = size / 70; // Normalize to baseline
      bubbleRef.current.style.transform = `scale(${scale})`;
    }
  }, [size]);

  // Auto-refresh in live mode
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // In production, this would fetch fresh data from API
      }, 300000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  // Handle timeline slider change
  const handleTimelineChange = (e) => {
    const index = parseInt(e.target.value);
    setTimelineIndex(index);
    setIsLiveMode(index === bubbleHistoryData.timePoints.length - 1);
  };

  // Return to live mode
  const goLive = () => {
    setTimelineIndex(bubbleHistoryData.timePoints.length - 1);
    setIsLiveMode(true);
    setLastUpdate(new Date());
  };

  // Color based on risk level - RAG (Red-Amber-Green) System
  const getBubbleColor = () => {
    switch (riskLevel) {
      case 'EXTREME':
        // RED (ABI 81-100): Critical risk - Deep red
        return 'from-red-900 via-red-800 to-red-700';
      case 'HIGH':
        // ORANGE (ABI 61-80): High risk - Burnt orange to dark orange
        return 'from-orange-700 via-orange-600 to-orange-500';
      case 'MODERATE':
        // AMBER (ABI 41-60): Moderate risk - Amber/yellow tones
        return 'from-amber-600 via-yellow-600 to-yellow-500';
      case 'LOW':
        // GREEN (ABI 0-40): Low risk - Green tones
        return 'from-green-700 via-green-600 to-green-500';
      default:
        return 'from-slate-700 via-slate-600 to-slate-500';
    }
  };

  const getGlowColor = () => {
    switch (riskLevel) {
      case 'EXTREME':
        // RED glow for extreme risk
        return 'rgba(185, 28, 28, 0.6)'; // red-700
      case 'HIGH':
        // ORANGE glow for high risk
        return 'rgba(234, 88, 12, 0.5)'; // orange-600
      case 'MODERATE':
        // AMBER/YELLOW glow for moderate risk
        return 'rgba(217, 119, 6, 0.4)'; // amber-600
      case 'LOW':
        // GREEN glow for low risk
        return 'rgba(21, 128, 61, 0.4)'; // green-700
      default:
        return 'rgba(71, 85, 105, 0.4)';
    }
  };

  const currentDataPoint = getBubbleDataByIndex(timelineIndex);

  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
      {/* Timestamp Header */}
      <div className="absolute top-0 left-4 z-50 font-mono text-sm">
        <div className="text-gray-300 mb-1">
          🕒 <strong>Last Updated:</strong> {formatUpdateTimestamp(lastUpdate)}
        </div>
        {isLiveMode && (
          <div className="text-gray-400 text-xs">
            ⏱️ Next refresh in ~5 minutes
          </div>
        )}
        {!isLiveMode && currentDataPoint && (
          <div className="text-yellow-400 text-xs">
            📅 Viewing historical data: {new Date(currentDataPoint.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        )}
      </div>

      {/* Data Sources Panel - Berkshire Conservative Styling */}
      {showDataSources && (
        <div className="absolute top-0 right-4 z-50 w-80 max-h-96 overflow-y-auto bg-[#0D1117]/95 border border-[#4A5A6A] rounded-lg p-4 shadow-2xl">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-[#800000] font-bold text-sm">📊 Data Sources</h4>
            <button
              onClick={() => setShowDataSources(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-xs">
            {/* S&P 500 Data */}
            <div className="border-b border-slate-700 pb-2">
              <div className="text-white font-semibold mb-1">
                📊 S&P 500 Index Data
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.sp500Data.source}</div>
              <div className="text-gray-500 text-[10px]">
                🔄 {dataSourcesCitations.sp500Data.updateFrequency}<br/>
                ⏰ Last: {new Date(dataSourcesCitations.sp500Data.lastUpdated).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </div>
              <a
                href={dataSourcesCitations.sp500Data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>

            {/* Gartner/IDC Forecasts */}
            <div className="border-b border-slate-700 pb-2">
              <div className="text-white font-semibold mb-1">
                💰 AI Revenue Forecasts
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.gartnerForecasts.source}</div>
              <div className="text-gray-500 text-[10px]">
                📄 {dataSourcesCitations.gartnerForecasts.report}<br/>
                📅 Published: {new Date(dataSourcesCitations.gartnerForecasts.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <a
                href={dataSourcesCitations.gartnerForecasts.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>

            {/* SEC Filings */}
            <div className="border-b border-slate-700 pb-2">
              <div className="text-white font-semibold mb-1">
                💳 SEC Corporate Filings
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.secFilings.source}</div>
              <div className="text-gray-500 text-[10px]">
                🔄 {dataSourcesCitations.secFilings.updateFrequency}<br/>
                ⏰ Last: {new Date(dataSourcesCitations.secFilings.lastUpdated).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <a
                href={dataSourcesCitations.secFilings.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>

            {/* Census Bureau */}
            <div className="border-b border-slate-700 pb-2">
              <div className="text-white font-semibold mb-1">
                📈 Business AI Adoption
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.censusBureau.source}</div>
              <div className="text-gray-500 text-[10px]">
                🔄 {dataSourcesCitations.censusBureau.updateFrequency}<br/>
                👥 Sample: {dataSourcesCitations.censusBureau.sampleSize}<br/>
                ⏰ Last: {new Date(dataSourcesCitations.censusBureau.lastUpdated).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <a
                href={dataSourcesCitations.censusBureau.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>

            {/* Google Trends */}
            <div className="border-b border-slate-700 pb-2">
              <div className="text-white font-semibold mb-1">
                🔍 Search Interest Data
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.googleTrends.source}</div>
              <div className="text-gray-500 text-[10px]">
                🔄 {dataSourcesCitations.googleTrends.updateFrequency}<br/>
                ⏰ Last: {new Date(dataSourcesCitations.googleTrends.lastUpdated).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <a
                href={dataSourcesCitations.googleTrends.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>

            {/* PitchBook */}
            <div>
              <div className="text-white font-semibold mb-1">
                🔄 VC & Investment Flows
              </div>
              <div className="text-gray-400 mb-1">📡 {dataSourcesCitations.pitchbookData.source}</div>
              <div className="text-gray-500 text-[10px]">
                🔄 {dataSourcesCitations.pitchbookData.updateFrequency}<br/>
                ⏰ Last: {new Date(dataSourcesCitations.pitchbookData.lastUpdated).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <a
                href={dataSourcesCitations.pitchbookData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#800000] hover:text-[#A00000] text-[10px] underline"
              >
                View Source →
              </a>
            </div>
          </div>
          <button
            onClick={() => setShowDataSources(false)}
            className="mt-3 w-full py-2 bg-[#4A5A6A] hover:bg-[#5A6A7A] text-white text-xs rounded"
          >
            ➖ Minimize
          </button>
        </div>
      )}

      {/* Toggle Data Sources button when hidden */}
      {!showDataSources && (
        <button
          onClick={() => setShowDataSources(true)}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-[#800000] hover:bg-[#A00000] text-white text-sm rounded-lg shadow-lg"
        >
          📊 Show Data Sources
        </button>
      )}

      {/* Bubble Container */}
      <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
        {/* Background rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-white/10 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full border border-white/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main Bubble */}
        <div
          ref={bubbleRef}
          className={`relative w-64 h-64 rounded-full bg-gradient-to-br ${getBubbleColor()}
            animate-float transition-transform duration-1000 ease-out cursor-pointer`}
          style={{
            boxShadow: `0 0 60px ${getGlowColor()}, 0 0 120px ${getGlowColor()}`,
          }}
          onClick={() => setShowHowItWorks(!showHowItWorks)}
        >
          {/* Shine effect */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-white/30 rounded-full blur-2xl"></div>

          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-6xl font-bold mb-2">{Math.round(size)}</div>
            <div className="text-sm uppercase tracking-wider opacity-90">ABI Index</div>
            <div className="text-xs opacity-70 mt-1">(Click for info)</div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Risk indicators around bubble */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
            riskLevel === 'EXTREME' ? 'bg-red-500 text-white' :
            riskLevel === 'HIGH' ? 'bg-orange-500 text-white' :
            riskLevel === 'MODERATE' ? 'bg-yellow-500 text-black' :
            'bg-green-500 text-white'
          }`}>
            {riskLevel} RISK
          </div>
        </div>
      </div>

      {/* RAG (Red-Amber-Green) Risk Scale Legend */}
      <div className="mt-8 max-w-2xl">
        <div className="text-center mb-3">
          <h4 className="text-sm font-semibold text-[#E8E8E8] uppercase tracking-wide">
            Risk Scale (RAG System)
          </h4>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {/* GREEN - LOW */}
          <div className="bg-[#1a1f2e]/70 border border-green-700/50 rounded-lg p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-green-700 via-green-600 to-green-500"
                 style={{ boxShadow: '0 0 20px rgba(21, 128, 61, 0.4)' }}></div>
            <div className="font-bold text-green-400 mb-1">LOW</div>
            <div className="text-[#A0A0A0]">ABI 0-40</div>
            <div className="text-[#808080] text-[10px] mt-1">Minimal Risk</div>
          </div>

          {/* AMBER - MODERATE */}
          <div className="bg-[#1a1f2e]/70 border border-amber-600/50 rounded-lg p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-600 via-yellow-600 to-yellow-500"
                 style={{ boxShadow: '0 0 20px rgba(217, 119, 6, 0.4)' }}></div>
            <div className="font-bold text-amber-400 mb-1">MODERATE</div>
            <div className="text-[#A0A0A0]">ABI 41-60</div>
            <div className="text-[#808080] text-[10px] mt-1">Watch Closely</div>
          </div>

          {/* ORANGE - HIGH */}
          <div className="bg-[#1a1f2e]/70 border border-orange-600/50 rounded-lg p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-orange-700 via-orange-600 to-orange-500"
                 style={{ boxShadow: '0 0 20px rgba(234, 88, 12, 0.5)' }}></div>
            <div className="font-bold text-orange-400 mb-1">HIGH</div>
            <div className="text-[#A0A0A0]">ABI 61-80</div>
            <div className="text-[#808080] text-[10px] mt-1">Elevated Risk</div>
          </div>

          {/* RED - EXTREME */}
          <div className="bg-[#1a1f2e]/70 border border-red-700/50 rounded-lg p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-red-900 via-red-800 to-red-700"
                 style={{ boxShadow: '0 0 20px rgba(185, 28, 28, 0.6)' }}></div>
            <div className="font-bold text-red-400 mb-1">EXTREME</div>
            <div className="text-[#A0A0A0]">ABI 81-100</div>
            <div className="text-[#808080] text-[10px] mt-1">Critical Risk</div>
          </div>
        </div>
        <div className="text-center mt-3 text-[10px] text-[#808080]">
          Current ABI: <span className="font-bold text-[#E8E8E8]">{Math.round(size)}</span>
          {' • '}
          Color indicates risk level based on AI Bubble Index score
        </div>
      </div>

      {/* How It Works Panel - Conservative Styling */}
      {showHowItWorks && (
        <div className="mt-8 max-w-3xl bg-[#0D1117]/95 border border-[#4A5A6A] rounded-lg p-6 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-[#800000]">🔬 How This Bubble Works</h3>
            <button
              onClick={() => setShowHowItWorks(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-4 rounded">
              <h4 className="font-bold text-[#E8E8E8] mb-2">What Drives the Size?</h4>
              <p className="text-[#C0C0C0]">
                The bubble grows based on 10 weighted metrics like the $600B revenue gap,
                75% debt-funding ratio, and 44% M7 market concentration.
              </p>
            </div>

            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-4 rounded">
              <h4 className="font-bold text-[#E8E8E8] mb-2">Where Does Data Come From?</h4>
              <p className="text-[#C0C0C0]">
                Real-time feeds from SEC filings, Census Bureau surveys, Google Trends,
                and Gartner forecasts—all updated at different frequencies.
              </p>
            </div>

            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-4 rounded">
              <h4 className="font-bold text-[#E8E8E8] mb-2">What Makes It "Pop"?</h4>
              <p className="text-[#C0C0C0]">
                Pop triggers when debt ratio &gt;85% + revenue gap &gt;$800B + M7 earnings
                collapse &gt;15% gap—based on institutional risk models.
              </p>
            </div>

            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-4 rounded">
              <h4 className="font-bold text-[#E8E8E8] mb-2">How Accurate Is This?</h4>
              <p className="text-[#C0C0C0]">
                This is a <strong>synthetic visualization</strong>, not a prediction.
                It synthesizes warnings from RBC, Richmond Fed, and Michael Burry into an intuitive index.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Slider - Conservative Styling */}
      <div className="mt-12 w-full max-w-4xl bg-[#0D1117]/90 border border-[#4A5A6A] rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#E8E8E8]">📅 Historical Bubble Analysis</h3>
          {!isLiveMode && (
            <button
              onClick={goLive}
              className="px-4 py-2 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded text-sm"
            >
              🔴 Go Live
            </button>
          )}
        </div>

        {currentDataPoint && (
          <div className="mb-4">
            <div className="text-[#800000] font-bold text-lg mb-1">
              {new Date(currentDataPoint.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-[#C0C0C0] italic text-sm">
              Key Event: {currentDataPoint.catalyst}
            </div>
          </div>
        )}

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={bubbleHistoryData.timePoints.length - 1}
          value={timelineIndex}
          onChange={handleTimelineChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />

        {/* Timeline markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {bubbleHistoryData.timePoints.map((point, i) => {
            if (i % 3 === 0 || i === bubbleHistoryData.timePoints.length - 1) {
              return (
                <span key={i}>
                  {new Date(point.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: '2-digit'
                  })}
                </span>
              );
            }
            return <span key={i}></span>;
          })}
        </div>

        {/* Current metrics display */}
        {currentMetrics && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">M7 Divergence</div>
              <div className="text-[#E8E8E8] font-bold">
                {(currentMetrics.m7_weight - currentMetrics.m7_earnings).toFixed(1)}%
              </div>
            </div>
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">Revenue Gap</div>
              <div className="text-[#E8E8E8] font-bold">${currentMetrics.revenue_gap}B</div>
            </div>
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">Debt/Capex</div>
              <div className="text-[#E8E8E8] font-bold">
                {(currentMetrics.debt_ratio * 100).toFixed(0)}%
              </div>
            </div>
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">Adoption</div>
              <div className="text-[#E8E8E8] font-bold">{currentMetrics.adoption_rate.toFixed(1)}%</div>
            </div>
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">Search Volume</div>
              <div className="text-[#E8E8E8] font-bold">+{currentMetrics.search_volume}%</div>
            </div>
            <div className="bg-[#1a1f2e]/70 border border-[#4A5A6A]/30 p-2 rounded">
              <div className="text-[#A0A0A0]">Bubble Index</div>
              <div className="text-[#E8E8E8] font-bold">{Math.round(size)}/100</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend - Conservative Colors */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-[#C0C0C0]">0-45: Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500"></div>
          <span className="text-[#C0C0C0]">45-55: Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-800"></div>
          <span className="text-[#C0C0C0]">55-65: High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-900"></div>
          <span className="text-[#C0C0C0]">65+: Extreme</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-center text-[#C0C0C0] text-sm max-w-2xl">
        The AI Bubble Index (ABI) synthesizes 10 institutional metrics tracking market concentration,
        revenue gaps, debt levels, and adoption rates. Current index: <span className="text-[#800000] font-bold">{Math.round(size)}/100</span>
      </p>
    </div>
  );
};

export default EnhancedDynamicBubble;
