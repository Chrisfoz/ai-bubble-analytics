import React, { useEffect, useRef } from 'react';

/**
 * Dynamic Bubble Visualization Component
 * Animated bubble that grows/shrinks based on real-time AI bubble metrics
 */
const DynamicBubble = ({ size = 50, riskLevel = 'MODERATE' }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (bubbleRef.current) {
      // Animate bubble size changes
      bubbleRef.current.style.transform = `scale(${size / 50})`;
    }
  }, [size]);

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

  return (
    <div className="flex flex-col items-center justify-center py-12">
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
            animate-float transition-transform duration-1000 ease-out`}
          style={{
            boxShadow: `0 0 60px ${getGlowColor()}, 0 0 120px ${getGlowColor()}`,
          }}
        >
          {/* Shine effect */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-white/30 rounded-full blur-2xl"></div>
          
          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-6xl font-bold mb-2">{Math.round(size)}%</div>
            <div className="text-sm uppercase tracking-wider opacity-90">Bubble Size</div>
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

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-300">0-5%: Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-300">5-7%: Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-300">7-10%: High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-300">10%+: Extreme</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-center text-gray-400 text-sm max-w-2xl">
        Bubble size represents the divergence between S&P 500 weight and earnings share 
        of the Magnificent 7 tech companies. Current divergence: <span className="text-red-400 font-bold">10.4%</span>
      </p>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(var(--scale, 1)); }
          50% { transform: translateY(-20px) scale(var(--scale, 1)); }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translate(0, 0); 
            opacity: 0.3;
          }
          50% { 
            transform: translate(
              ${Math.random() * 20 - 10}px, 
              ${Math.random() * 20 - 10}px
            ); 
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DynamicBubble;
