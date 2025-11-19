import React from 'react';
import { Link } from 'react-router-dom';

/**
 * About Page - Simple explanation of the project
 * Mobile-first, concise, no repetition from other pages
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            About This Project
          </h1>
          <p className="text-lg md:text-xl text-[#C0C0C0]">
            Independent analysis of AI market concentration and valuation risks
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto space-y-8">

          {/* What We Do */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#4A5A6A]/50">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">What We Do</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              AI Bubble Analytics tracks <strong className="text-[#E8E8E8]">10 institutional-grade metrics</strong> to
              measure market concentration, valuation divergence, and systemic risks in AI-related equities.
            </p>
            <p className="text-[#C0C0C0] leading-relaxed">
              Our proprietary AI Bubble Index (ABI) aggregates these indicators into a single, easy-to-understand
              risk score with a visual RAG (Red-Amber-Green) system—helping individual investors make sense of
              complex market dynamics.
            </p>
          </section>

          {/* Why We Built This */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#4A5A6A]/50">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Why We Built This</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              Institutional investors at hedge funds and investment banks have access to sophisticated tools for
              tracking market concentration and bubble risks. Individual investors don't.
            </p>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              We believe <strong className="text-[#E8E8E8]">transparency and access to institutional-grade data</strong> should
              be available to everyone—not just Wall Street insiders.
            </p>
            <div className="bg-[#800000]/10 border border-[#800000]/30 rounded-lg p-4">
              <p className="text-[#C0C0C0] text-sm">
                <strong className="text-[#800000]">Our Mission:</strong> Democratize access to the same market intelligence
                that professional money managers use to protect capital during periods of extreme valuation.
              </p>
            </div>
          </section>

          {/* Data Sources */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#4A5A6A]/50">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Data Sources</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              All metrics are sourced from reputable institutional research and public data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-1">Market Data</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• RBC Capital Markets</li>
                  <li>• S&P Global</li>
                  <li>• SEC EDGAR filings</li>
                </ul>
              </div>
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-1">Economic Data</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• Bureau of Economic Analysis</li>
                  <li>• Richmond Fed</li>
                  <li>• FRED (Federal Reserve)</li>
                </ul>
              </div>
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-1">Research</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• Apollo Global Management</li>
                  <li>• McKinsey & Company</li>
                  <li>• Goldman Sachs Research</li>
                </ul>
              </div>
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-1">Alternative Data</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• Google Trends</li>
                  <li>• Crunchbase (VC funding)</li>
                  <li>• PitchBook</li>
                </ul>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm mt-4">
              All data is updated regularly and cross-referenced for accuracy. See our{' '}
              <Link to="/disclaimer" className="text-[#800000] hover:text-[#A00000] underline">
                disclaimer
              </Link>{' '}
              for important limitations.
            </p>
          </section>

          {/* Independence & Transparency */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-[#4A5A6A]/50">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Independence & Transparency</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔓</span>
                <div>
                  <h3 className="text-[#E8E8E8] font-semibold mb-1">Open Methodology</h3>
                  <p className="text-[#C0C0C0] text-sm">
                    Our calculations and data sources are transparent. Visit our{' '}
                    <Link to="/metrics" className="text-[#800000] hover:text-[#A00000] underline">
                      Metrics page
                    </Link>{' '}
                    to see how each indicator is calculated.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚫</span>
                <div>
                  <h3 className="text-[#E8E8E8] font-semibold mb-1">No Conflicts of Interest</h3>
                  <p className="text-[#C0C0C0] text-sm">
                    We do not accept payment from tech companies, investment firms, or asset managers.
                    Our analysis is independent and unbiased.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="text-[#E8E8E8] font-semibold mb-1">Educational Purpose Only</h3>
                  <p className="text-[#C0C0C0] text-sm">
                    This tool is for informational purposes only. We do not provide financial advice,
                    investment recommendations, or portfolio management services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The AI Bubble Context */}
          <section className="bg-[#2a1515] border border-[#800000]/50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Understanding the AI Bubble</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              The <strong className="text-[#E8E8E8]">"AI bubble"</strong> refers to concerns that artificial intelligence
              companies are overvalued due to circular financing patterns, where tech giants invest in each other's
              AI ventures, artificially inflating stock prices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#0D1117] border border-[#800000]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-2">Key Concerns</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• Circular financing &gt;$180B</li>
                  <li>• Investment 35x ahead of adoption</li>
                  <li>• $600B revenue expectation gap</li>
                  <li>• Debt-funded expansion at risk</li>
                </ul>
              </div>
              <div className="bg-[#0D1117] border border-[#800000]/30 rounded-lg p-4">
                <div className="text-[#800000] font-semibold mb-2">Historical Context</div>
                <ul className="text-[#C0C0C0] text-sm space-y-1">
                  <li>• Nvidia +400% since 2023</li>
                  <li>• S&amp;P 500: 30% in 5 companies</li>
                  <li>• Case-Shiller P/E ratio &gt;40</li>
                  <li>• Concentration highest in 50 years</li>
                </ul>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm">
              Learn more about market dynamics on our{' '}
              <Link to="/news" className="text-[#800000] hover:text-[#A00000] underline">
                News page
              </Link>.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-[#800000]/10 border border-[#800000]/30 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-3">Stay Updated</h2>
            <p className="text-[#C0C0C0] mb-6">
              Subscribe to our daily newsletter for AI Bubble Index updates and market analysis
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
