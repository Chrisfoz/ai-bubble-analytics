import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MetricsPage from './components/MetricsPage';
import AboutPage from './components/AboutPage';
import NewsPage from './components/NewsPage';
import NewsletterPage from './components/NewsletterPage';
import DisclaimerPage from './components/DisclaimerPage';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
