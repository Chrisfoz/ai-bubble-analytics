import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Appears at bottom of all pages with links to Disclaimer and other pages
 */
const Footer = () => {
  return (
    <footer className="bg-[#0a0e14]/50 border-t border-[#4A5A6A]/30 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Navigation */}
            <div>
              <h3 className="text-[#E8E8E8] font-bold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/metrics" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Metrics Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/context" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Blog & Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    News & Commentary
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="text-[#E8E8E8] font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/newsletter" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Chrisfoz/ai-bubble-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C0C0C0] hover:text-[#800000] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="text-[#E8E8E8] font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/disclaimer" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Terms & Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer#privacy" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer#limitations" className="text-[#C0C0C0] hover:text-[#800000] transition-colors">
                    Limitations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="text-[#E8E8E8] font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:contact@aibubbleanalytics.com"
                    className="text-[#C0C0C0] hover:text-[#800000] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/aibubbleanalytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C0C0C0] hover:text-[#800000] transition-colors"
                  >
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/aibubbleanalytics"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C0C0C0] hover:text-[#800000] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle Section - Educational Disclaimer */}
          <div className="bg-[#2a1515] border border-[#800000]/40 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚠️</div>
              <div>
                <h4 className="text-[#E8E8E8] font-bold mb-2">Educational Purpose & Disclaimer</h4>
                <p className="text-[#C0C0C0] text-sm leading-relaxed">
                  <strong>NOT FINANCIAL ADVICE.</strong> This platform is for educational and informational purposes only.
                  All data is sourced from verified providers (RBC Capital Markets, Richmond Fed, Apollo Global Management,
                  S&P Global, Bureau of Economic Analysis, Google Trends, SEC EDGAR, and others), but we make no guarantees
                  about accuracy, completeness, or timeliness. Always do your own research and consult with qualified
                  financial professionals before making investment decisions.{' '}
                  <Link to="/disclaimer" className="text-[#800000] hover:text-[#A00000] underline font-semibold">
                    Read Full Disclaimer →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright & Data Sources */}
          <div className="border-t border-[#4A5A6A]/30 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[#A0A0A0] text-sm">
                © {new Date().getFullYear()} AI Bubble Analytics. All rights reserved.
              </div>
              <div className="text-[#A0A0A0] text-xs text-center md:text-right">
                <strong>Data Sources:</strong> S&P Global, RBC Capital Markets, Richmond Fed, Apollo Global,<br className="hidden md:inline"/>
                Bureau of Economic Analysis, Google Trends, SEC EDGAR, PitchBook, Bloomberg, IEA
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
