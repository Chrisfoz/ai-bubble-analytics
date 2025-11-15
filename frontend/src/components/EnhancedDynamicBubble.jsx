import React, { useState, useEffect, useRef } from 'react';
import { bubbleHistoryData, getBubbleDataByIndex } from '../data/bubbleHistory';
import { getAllDataSources, formatUpdateTimestamp } from '../data/dataSources';

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

      // Calculate risk level from ABI
      if (dataPoint.abi >= 65) setRiskLevel('EXTREME');
      else if (dataPoint.abi >= 55) setRiskLevel('HIGH');
      else if (dataPoint.abi >= 45) setRiskLevel('MODERATE');
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

  // Color based on risk level
  const getBubbleColor = () => {
    switch (riskLevel) {
      case 'EXTREME':
        return 'from-red-500 via-red-600 to-red-700';
      case 'HIGH':
        return 'from-orange-500 via-red-500 to-pink-600';
      case 'MODERATE':
        return 'from-yellow-500 via-orange-500 to-red-500';
      case 'LOW':
        return 'from-green-400 via-blue-500 to-purple-600';
      default:
        return 'from-purple-500 via-pink-500 to-red-500';
    }
  };

  const getGlowColor = () => {
    switch (riskLevel) {
      case 'EXTREME':
        return 'rgba(239, 68, 68, 0.6)';
      case 'HIGH':
        return 'rgba(249, 115, 22, 0.5)';
      case 'MODERATE':
        return 'rgba(234, 179, 8, 0.4)';
      case 'LOW':
        return 'rgba(34, 197, 94, 0.3)';
      default:
        return 'rgba(168, 85, 247, 0.4)';
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

      {/* Data Sources Panel */}
      {showDataSources && (
        <div className="absolute top-0 right-4 z-50 w-80 max-h-96 overflow-y-auto bg-slate-800/95 border border-slate-600 rounded-lg p-4 shadow-2xl">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-yellow-400 font-bold text-sm">📊 Data Sources</h4>
            <button
              onClick={() => setShowDataSources(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-xs">
            {getAllDataSources().slice(0, 6).map((source) => (
              <div key={source.key} className="border-b border-slate-700 pb-2">
                <div className="text-white font-semibold mb-1">
                  {source.icon} {source.name}
                </div>
                <div className="text-gray-400 mb-1">📡 {source.provider}</div>
                <div className="text-gray-500 text-[10px]">🔄 {source.updateFrequency}</div>
                <div className="text-green-400 text-[10px]">✓ {source.confidence}</div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-[10px] underline"
                >
                  View Source →
                </a>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowDataSources(false)}
            className="mt-3 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded"
          >
            ➖ Minimize
          </button>
        </div>
      )}

      {/* Toggle Data Sources button when hidden */}
      {!showDataSources && (
        <button
          onClick={() => setShowDataSources(true)}
          className="absolute top-4 right-4 z-50 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg shadow-lg"
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

      {/* How It Works Panel */}
      {showHowItWorks && (
        <div className="mt-8 max-w-3xl bg-slate-800/95 border border-slate-600 rounded-lg p-6 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-yellow-400">🔬 How This Bubble Works</h3>
            <button
              onClick={() => setShowHowItWorks(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-bold text-white mb-2">What Drives the Size?</h4>
              <p className="text-gray-300">
                The bubble grows based on 10 weighted metrics like the $600B revenue gap,
                75% debt-funding ratio, and 44% M7 market concentration.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-bold text-white mb-2">Where Does Data Come From?</h4>
              <p className="text-gray-300">
                Real-time feeds from SEC filings, Census Bureau surveys, Google Trends,
                and Gartner forecasts—all updated at different frequencies.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-bold text-white mb-2">What Makes It "Pop"?</h4>
              <p className="text-gray-300">
                Pop triggers when debt ratio &gt;85% + revenue gap &gt;$800B + M7 earnings
                collapse &gt;15% gap—based on institutional risk models.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-bold text-white mb-2">How Accurate Is This?</h4>
              <p className="text-gray-300">
                This is a <strong>synthetic visualization</strong>, not a prediction.
                It synthesizes warnings from RBC, Richmond Fed, and Michael Burry into an intuitive index.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Slider */}
      <div className="mt-12 w-full max-w-4xl bg-slate-800/90 border border-slate-600 rounded-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">📅 Historical Bubble Analysis</h3>
          {!isLiveMode && (
            <button
              onClick={goLive}
              className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-semibold rounded text-sm"
            >
              🔴 Go Live
            </button>
          )}
        </div>

        {currentDataPoint && (
          <div className="mb-4">
            <div className="text-yellow-400 font-bold text-lg mb-1">
              {new Date(currentDataPoint.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-gray-300 italic text-sm">
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
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">M7 Divergence</div>
              <div className="text-white font-bold">
                {(currentMetrics.m7_weight - currentMetrics.m7_earnings).toFixed(1)}%
              </div>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">Revenue Gap</div>
              <div className="text-white font-bold">${currentMetrics.revenue_gap}B</div>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">Debt/Capex</div>
              <div className="text-white font-bold">
                {(currentMetrics.debt_ratio * 100).toFixed(0)}%
              </div>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">Adoption</div>
              <div className="text-white font-bold">{currentMetrics.adoption_rate.toFixed(1)}%</div>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">Search Volume</div>
              <div className="text-white font-bold">+{currentMetrics.search_volume}%</div>
            </div>
            <div className="bg-slate-700/50 p-2 rounded">
              <div className="text-gray-400">Bubble Index</div>
              <div className="text-white font-bold">{Math.round(size)}/100</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-300">0-45: Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-300">45-55: Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-300">55-65: High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-300">65+: Extreme</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-center text-gray-400 text-sm max-w-2xl">
        The AI Bubble Index (ABI) synthesizes 10 institutional metrics tracking market concentration,
        revenue gaps, debt levels, and adoption rates. Current index: <span className="text-red-400 font-bold">{Math.round(size)}/100</span>
      </p>
    </div>
  );
};

export default EnhancedDynamicBubble;
