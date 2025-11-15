import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Component
 * Global navigation bar with responsive mobile menu
 */
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/metrics', label: 'Metrics' },
    { path: '/context', label: 'Context' },
    { path: '/news', label: 'News' },
    { path: '/newsletter', label: 'Newsletter' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#0D1117]/95 backdrop-blur-lg border-b border-[#4A5A6A]/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Berkshire Conservative */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#800000] flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <div className="hidden md:block">
              <div className="text-[#E8E8E8] font-bold text-lg group-hover:text-[#A00000] transition-colors">
                AI Bubble Analytics
              </div>
              <div className="text-[#A0A0A0] text-xs">Institutional-grade analysis</div>
            </div>
          </Link>

          {/* Desktop Navigation - Berkshire Colors */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-[#800000] text-white'
                    : 'text-[#C0C0C0] hover:bg-[#4A5A6A]/20 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop - Burgundy */}
          <Link
            to="/newsletter"
            className="hidden md:block px-6 py-2 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
          >
            Subscribe
          </Link>

          {/* Mobile Menu Button - Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#E8E8E8] hover:bg-[#4A5A6A]/20 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#4A5A6A]/30 bg-[#0D1117]/98">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-[#800000] text-white'
                      : 'text-[#C0C0C0] hover:bg-[#4A5A6A]/20 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg text-center"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
