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
        <footer className="bg-black/80 border-t border-white/10 mt-8">
          <div className="container mx-auto px-4 py-4 text-center text-xs md:text-sm text-gray-400">
            <span className="font-semibold text-white">E:</span>{' '}
            <span className="text-purple-400">digitalhumanassistants.io</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
