import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Newsletter Subscription Page
 * Allows users to subscribe to daily AI bubble updates
 * KEY PAGE for brand recognition and user engagement
 */
const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this would connect to your backend API
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-12 border border-[#4A5A6A]/50 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-[#E8E8E8] mb-4">You're Subscribed!</h1>
            <p className="text-xl text-[#C0C0C0] mb-8">
              Check your inbox for a confirmation email. You'll start receiving daily AI bubble updates tomorrow morning.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            Daily Newsletter
          </h1>
          <p className="text-xl text-[#C0C0C0]">
            Stay ahead of the market with institutional-grade AI bubble analytics
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50 mb-8">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-6">What You'll Get</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📊</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">Daily Metrics Update</h3>
                  <p className="text-[#C0C0C0]">
                    All 10 key bubble indicators updated with latest data from RBC, Richmond Fed, and Apollo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">Expert Commentary</h3>
                  <p className="text-[#C0C0C0]">
                    Curated insights from Warren Buffett, Michael Burry, Ray Dalio, and other market leaders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📰</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">Market News</h3>
                  <p className="text-[#C0C0C0]">
                    Key developments in AI investments, valuations, and regulatory warnings
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">Risk Alerts</h3>
                  <p className="text-[#C0C0C0]">
                    Immediate notifications when metrics cross critical thresholds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-3xl">📈</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E8E8E8] mb-1">Weekly Analysis</h3>
                  <p className="text-[#C0C0C0]">
                    Deep-dive reports every Sunday with trend analysis and historical comparisons
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[#E8E8E8] font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0D1117] border border-[#4A5A6A] text-[#E8E8E8] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent"
                />
              </div>

              {error && (
                <div className="bg-[#2a1515] border border-[#800000]/40 rounded-lg p-3 text-[#A00000]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe to Daily Updates'}
              </button>

              <p className="text-[#A0A0A0] text-sm text-center">
                Free forever. Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>

          {/* Sample Newsletter Preview */}
          <div className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">📧 Sample Newsletter</h2>
            <div className="bg-white rounded-lg p-6 text-gray-900">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-xl font-bold mb-1">AI Bubble Daily | November 15, 2025</h3>
                <p className="text-sm text-gray-600">Your daily dose of institutional-grade bubble analytics</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-red-600 mb-2">🚨 EXTREME RISK: Divergence Hits 10.4%</h4>
                  <p className="text-sm">
                    Magnificent 7 weight-to-earnings gap now exceeds dot-com peak.
                    RBC Capital Markets confirms this is the highest divergence in 25 years.
                  </p>
                </div>

                <div className="bg-gray-100 rounded p-3">
                  <h4 className="font-bold mb-2">📊 Today's Key Metrics</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Bubble Size: <span className="font-bold text-red-600">87%</span> ▲ 2%</li>
                    <li>• Search Interest: <span className="font-bold">+1,567%</span> (2yr)</li>
                    <li>• Revenue Gap: <span className="font-bold">$180B</span> ▼ $20B</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">💬 What They're Saying</h4>
                  <p className="text-sm italic">
                    "The concentration risk is unprecedented. Even Berkshire is sitting on record cash."
                    — Apollo Global Management
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">📰 Top Story</h4>
                  <p className="text-sm">
                    Bank of England doubles down on bubble warning, cites OpenAI's 3x valuation increase as "disconnect from fundamentals"
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <a href="#" className="text-[#800000] font-semibold hover:text-[#A00000]">
                  View Full Dashboard →
                </a>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E8E8E8]">10</div>
              <div className="text-sm text-[#A0A0A0]">Metrics Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E8E8E8]">Daily</div>
              <div className="text-sm text-[#A0A0A0]">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E8E8E8]">100%</div>
              <div className="text-sm text-[#A0A0A0]">Free</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E8E8E8]">0</div>
              <div className="text-sm text-[#A0A0A0]">Spam Ever</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-[#4A5A6A]/30">
          <p className="text-center text-[#A0A0A0] text-sm">
            ⚠️ <strong>Educational purposes only.</strong> Not financial advice.
            We respect your privacy and will never share your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
