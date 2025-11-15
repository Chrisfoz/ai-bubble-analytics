import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Context Page - Comprehensive explanation of the AI Bubble
 * Based on content from context folder (AI bubble.md & cleaned transcript)
 */
const ContextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link to="/" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Understanding the AI Bubble
          </h1>
          <p className="text-xl text-gray-300">
            A comprehensive analysis of circular financing, valuation concerns, and expert warnings
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* What is the AI Bubble */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">What is the AI Bubble?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The AI bubble is a theorized stock market bubble growing amid the current AI boom, a period of rapid 
              progression in artificial intelligence that is affecting the broader economy. Speculation about a bubble 
              largely originates from concerns that leading AI tech firms are involved in a <span className="text-purple-400 font-semibold">circular 
              flow of investments</span> that are artificially inflating the value of their stocks.
            </p>
            <p className="text-gray-300 leading-relaxed">
              As of 2025, ChatGPT is the 5th most visited website globally behind Google, YouTube, Facebook, and Instagram. 
              The unexpectedly successful launch of DeepSeek in January 2025 resulted in concerns about a possible AI bubble, 
              with Nvidia's shares dropping 17% in one day before recovering 8.8% the following day.
            </p>
          </section>

          {/* Circular Financing Explained */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">🔄 Circular Financing: The Core Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              At the center of concerns is a feedback loop where money circulates between the same companies, 
              creating the illusion of growth without real economic value creation:
            </p>
            
            <div className="bg-purple-900/30 rounded-lg p-6 mb-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-300 mb-4">The Money Flow:</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 font-bold mr-3">1.</span>
                  <span><strong className="text-white">Nvidia</strong> invests $100 billion into OpenAI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 font-bold mr-3">2.</span>
                  <span><strong className="text-white">OpenAI</strong> commits to huge cloud contracts with Oracle and Microsoft</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 font-bold mr-3">3.</span>
                  <span><strong className="text-white">Oracle/Microsoft</strong> appear to have growing demand and revenue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 font-bold mr-3">4.</span>
                  <span><strong className="text-white">Oracle</strong> buys tens of billions in Nvidia GPUs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 font-bold mr-3">5.</span>
                  <span><strong className="text-white">Nvidia</strong> invests more money back into OpenAI</span>
                </li>
              </ol>
              <p className="mt-4 text-yellow-300 font-semibold">
                → Total recursive flow: &gt;$180 billion circulating in the system
              </p>
            </div>

            <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
              <p className="text-red-300">
                <strong>⚠️ The Issue:</strong> Everyone looks like they're growing, even if the money being spent was borrowed. 
                No real value is necessarily being created—it's money passing hands in a closed loop.
              </p>
            </div>
          </section>

          {/* Market Statistics */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">📊 Key Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-lg p-6 border border-red-500/30">
                <div className="text-3xl font-bold text-red-400 mb-2">40%</div>
                <p className="text-gray-300 text-sm">
                  of every dollar in S&P 500 index funds goes to just 10 companies
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg p-6 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">$2 Trillion</div>
                <p className="text-gray-300 text-sm">
                  Annual revenue needed to justify current AI company valuations
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 rounded-lg p-6 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400 mb-2">$330B</div>
                <p className="text-gray-300 text-sm">
                  AI tech company spending in 2025 on data centers and infrastructure
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg p-6 border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
                <p className="text-gray-300 text-sm">
                  Of S&P 500 held by just 5 companies—highest concentration in 50 years
                </p>
              </div>
            </div>
          </section>

          {/* Expert Warnings */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">💬 What Experts Are Saying</h2>
            
            <div className="space-y-4">
              <div className="bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👨‍💼</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sam Altman (OpenAI CEO)</h3>
                    <p className="text-gray-300 italic mb-2">
                      "Yes, AI is a bubble" and suggested government might become "insurer of last resort"
                    </p>
                    <p className="text-sm text-gray-400">
                      When questioned about $1.4T spending commitments vs $20B revenue: "If you want to sell your shares, 
                      I'll find you a buyer."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📈</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ray Dalio (Bridgewater Associates)</h3>
                    <p className="text-gray-300 italic">
                      Current AI investment levels are "very similar" to the dot-com bubble
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 rounded-lg p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Michael Burry (Scion Capital)</h3>
                    <p className="text-gray-300 italic mb-2">
                      Filed 13F showing 80% of portfolio betting against Nvidia and Palantir
                    </p>
                    <p className="text-sm text-gray-400">
                      The investor who predicted the 2008 financial crisis
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏦</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Warren Buffett (Berkshire Hathaway)</h3>
                    <p className="text-gray-300 italic">
                      Sold billions in stock, now sitting on the biggest cash pile in the world
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 rounded-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏛️</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Bank of England & IMF</h3>
                    <p className="text-gray-300 italic">
                      Warned of global market correction risks due to possible overvaluation of AI tech firms. 
                      OpenAI's valuation more than tripled from $157B (Oct 2024) to $500B (2025).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The "Too Big to Fail" Problem */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">🏛️ The "Too Big to Fail" Scenario</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Deutsche Bank data suggests: <span className="text-red-400 font-bold">"If it wasn't for AI spending right now, 
              we'd be in a recession."</span>
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              If AI companies represent such a huge part of the US economy, they cannot be allowed to fail because:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Letting them fail would hurt national competitiveness vs. China
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                It would impact jobs, employees, and the country's strategic interests
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Market corrections would affect retirement accounts and index fund investors
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Political pressure to bailout would be immense
              </li>
            </ul>
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
              <p className="text-yellow-300">
                <strong>⚠️ Implication:</strong> Even if you don't invest in AI, you're likely exposed through 
                index funds, and taxpayers may ultimately backstop any failures.
              </p>
            </div>
          </section>

          {/* Opposing Views */}
          <section className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">⚖️ Opposing Views</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Not everyone agrees there's a bubble:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-300">
                  <strong className="text-white">Goldman Sachs:</strong> The rapid increase in valuations is likely 
                  justified by powerful and sustained profit growth. Current valuations are modest compared to dot-com bubble.
                </p>
              </div>
              <div className="bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <p className="text-gray-300">
                  <strong className="text-white">Morgan Stanley:</strong> Median cash flow for top 500 US companies 
                  is roughly triple what it was in 1999, with much more robust margin profiles.
                </p>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-gray-300">
                  <strong className="text-white">Jerome Powell (Federal Reserve):</strong> AI differs from dot-com 
                  bubble because corporations are generating large revenue amounts and data center investment is 
                  generating significant economic growth.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Track the Bubble in Real-Time</h2>
            <p className="text-white/90 mb-6">
              Monitor all 10 institutional-grade metrics and see how the bubble evolves
            </p>
            <Link 
              to="/metrics" 
              className="inline-block px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              View Metrics Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            Sources: Wikipedia, RBC Capital Markets, Richmond Fed, Apollo Global Management, Bank of England, 
            IMF, Bureau of Economic Analysis, Google Trends, company filings
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;
