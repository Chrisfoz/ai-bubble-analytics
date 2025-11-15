import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import MetricsPage from './components/MetricsPage';
import ContextPage from './components/ContextPage';
import NewsPage from './components/NewsPage';
import NewsletterPage from './components/NewsletterPage';

/**
 * Main App Component
 * AI Bubble Analytics - Real-time tracking platform
 */
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="App min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/context" element={<ContextPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />
          </Routes>
        </div>
        <footer className="bg-slate-50 border-t border-slate-200 mt-8">
          <div className="container mx-auto px-4 py-4 text-center text-[11px] md:text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="text-slate-500">
              © {new Date().getFullYear()} AI Bubble Analytics · For educational purposes only
            </div>
            <div>
              <span className="font-semibold text-slate-800 tracking-wide">E:</span>{' '}
              <span className="text-purple-700 font-medium">digitalhumanassistants.io</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
