import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MetricsPage from './components/MetricsPage';
import ContextPage from './components/ContextPage';
import NewsPage from './components/NewsPage';
import NewsletterPage from './components/NewsletterPage';
import DisclaimerPage from './components/DisclaimerPage';

/**
 * Main App Component
 * AI Bubble Analytics - Real-time tracking platform
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/context" element={<ContextPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
