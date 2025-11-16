import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Disclaimer Page
 * Comprehensive legal disclaimers, limitations, privacy policy
 * CRITICAL PAGE for legal protection and transparency
 */
const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            Terms, Disclaimer & Privacy Policy
          </h1>
          <p className="text-xl text-[#C0C0C0]">
            Last Updated: November 15, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Financial Disclaimer */}
          <section id="financial-disclaimer" className="bg-[#2a1515] border border-[#800000]/50 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">Financial Disclaimer</h2>
                <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
                  <p>
                    <strong className="text-[#E8E8E8]">NOT FINANCIAL, INVESTMENT, OR TAX ADVICE.</strong>
                  </p>
                  <p>
                    The information provided on AI Bubble Analytics (the "Platform") is for <strong className="text-[#E8E8E8]">educational
                    and informational purposes only</strong>. Nothing contained on this Platform constitutes financial advice,
                    investment advice, trading advice, or any other type of professional advice.
                  </p>
                  <p>
                    <strong className="text-[#E8E8E8]">You should not make any financial, investment, trading, or other decisions
                    based solely on the information presented on this Platform.</strong> Always consult with a qualified financial
                    advisor, accountant, or other professional before making any financial or investment decisions.
                  </p>
                  <p>
                    The creators, contributors, and operators of this Platform <strong className="text-[#E8E8E8]">are not
                    registered financial advisors, investment advisors, brokers, or dealers</strong>. We do not provide personalized
                    investment recommendations or advice tailored to your individual circumstances.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Accuracy & Limitations */}
          <section id="limitations" className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Data Accuracy & Limitations</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6 mb-3">Data Sources</h3>
              <p>
                Our metrics are sourced from the following institutional providers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>S&P Global Market Intelligence (stock market data)</li>
                <li>RBC Capital Markets (investment research)</li>
                <li>Richmond Federal Reserve (economic data)</li>
                <li>Apollo Global Management (research reports)</li>
                <li>U.S. Bureau of Economic Analysis (BEA)</li>
                <li>U.S. Census Bureau (business adoption surveys)</li>
                <li>Google Trends (search volume data)</li>
                <li>SEC EDGAR (company filings)</li>
                <li>PitchBook Data (venture capital data)</li>
                <li>Bloomberg Terminal / FactSet (market valuations)</li>
                <li>International Energy Agency (IEA - energy data)</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6 mb-3">Known Limitations</h3>
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded-lg p-4 space-y-3">
                <div>
                  <strong className="text-[#E8E8E8]">1. Data Lag:</strong>
                  <p className="text-sm mt-1">
                    Some metrics update with a delay. For example, Census Bureau data is released monthly, SEC filings are
                    quarterly, and venture capital data may lag by weeks. Real-time market data has a 15-minute delay on
                    free tier APIs.
                  </p>
                </div>
                <div>
                  <strong className="text-[#E8E8E8]">2. Third-Party Dependencies:</strong>
                  <p className="text-sm mt-1">
                    We rely on external APIs and data providers. If these sources experience outages, errors, or delays,
                    our metrics will be affected. We cannot guarantee 100% uptime or data availability.
                  </p>
                </div>
                <div>
                  <strong className="text-[#E8E8E8]">3. Calculation Methodology:</strong>
                  <p className="text-sm mt-1">
                    Our "AI Bubble Index" is a proprietary composite metric. The weightings and calculation method are our
                    interpretation of institutional research. Other analysts may use different methodologies and arrive at
                    different conclusions.
                  </p>
                </div>
                <div>
                  <strong className="text-[#E8E8E8]">4. Historical Data Limitations:</strong>
                  <p className="text-sm mt-1">
                    Historical timeline data before January 2023 is limited. Some earlier data points are estimates based on
                    available public information and may not be as precise as recent data.
                  </p>
                </div>
                <div>
                  <strong className="text-[#E8E8E8]">5. Expert Quotes:</strong>
                  <p className="text-sm mt-1">
                    Quotes from experts (Sam Altman, Ray Dalio, Warren Buffett, Michael Burry, etc.) are sourced from public
                    interviews, speeches, filings, and media reports. Context is provided, but quotes may be abbreviated.
                    Always verify original sources via the provided URLs.
                  </p>
                </div>
                <div>
                  <strong className="text-[#E8E8E8]">6. Predictive Limitations:</strong>
                  <p className="text-sm mt-1">
                    <strong>This platform does NOT predict the future.</strong> Past performance does not guarantee future results.
                    Market conditions can change rapidly and unpredictably. No metric, no matter how comprehensive, can predict
                    market crashes, corrections, or timing with certainty.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6 mb-3">No Warranties</h3>
              <p>
                We provide all data and information <strong className="text-[#E8E8E8]">"AS IS"</strong> without any warranty of any kind,
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Accuracy, completeness, or reliability of data</li>
                <li>Timeliness or currency of information</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
            </div>
          </section>

          {/* Risk Warnings */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Investment Risk Warnings</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <div className="bg-[#2a1515] border border-[#800000]/40 rounded-lg p-4">
                <p className="font-semibold text-[#E8E8E8] mb-2">⚠️ Investing in stocks, especially AI-related stocks, involves substantial risk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li><strong>Market Risk:</strong> Stock prices can fluctuate dramatically and you can lose your entire investment</li>
                  <li><strong>Concentration Risk:</strong> Heavy allocation to AI stocks increases exposure to sector-specific downturns</li>
                  <li><strong>Bubble Risk:</strong> As documented on this Platform, AI stocks may be overvalued and subject to sharp corrections</li>
                  <li><strong>Liquidity Risk:</strong> During market stress, you may not be able to sell positions at desired prices</li>
                  <li><strong>Regulatory Risk:</strong> Government actions can significantly impact AI companies</li>
                  <li><strong>Technology Risk:</strong> Rapid technological change can render companies obsolete</li>
                </ul>
              </div>
              <p>
                <strong className="text-[#E8E8E8]">Only invest money you can afford to lose.</strong> Diversify your portfolio.
                Understand your risk tolerance. Past performance is not indicative of future results.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Privacy Policy</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <h3 className="text-xl font-semibold text-[#E8E8E8]">Information We Collect</h3>
              <p>
                When you subscribe to our newsletter, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Email address</strong> (required for newsletter delivery)</li>
                <li><strong>Subscription date and time</strong></li>
                <li><strong>Email open and click-through rates</strong> (via SendGrid analytics)</li>
                <li><strong>IP address and browser information</strong> (via web analytics)</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6">How We Use Your Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>To send you the daily AI Bubble Analytics newsletter</li>
                <li>To improve our content and user experience</li>
                <li>To analyze aggregate subscriber behavior and engagement</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6">Data Sharing</h3>
              <p>
                <strong className="text-[#E8E8E8]">We will NEVER sell, rent, or share your email address with third parties</strong> except:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Providers:</strong> We use SendGrid (Twilio) for email delivery and Supabase for data storage.
                These providers are bound by strict privacy agreements.</li>
                <li><strong>Legal Requirements:</strong> If required by law or to protect our legal rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Unsubscribe</strong> at any time via the link in every email</li>
                <li><strong>Request deletion</strong> of your data by emailing contact@aibubbleanalytics.com</li>
                <li><strong>Request a copy</strong> of your data</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6">Cookies & Analytics</h3>
              <p>
                We use Google Analytics to understand how users interact with our Platform. You can opt out via browser settings
                or extensions like uBlock Origin. We do not use cookies for advertising or tracking across other websites.
              </p>

              <h3 className="text-xl font-semibold text-[#E8E8E8] mt-6">Data Security</h3>
              <p>
                We use industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HTTPS/TLS encryption for all data transmission</li>
                <li>Supabase Row Level Security (RLS) for database protection</li>
                <li>Regular security audits and updates</li>
              </ul>
              <p className="mt-4">
                However, <strong className="text-[#E8E8E8]">no method of transmission over the internet is 100% secure</strong>.
                We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Liability Limitations */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Limitation of Liability</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <p>
                <strong className="text-[#E8E8E8]">TO THE FULLEST EXTENT PERMITTED BY LAW</strong>, the creators, contributors,
                and operators of AI Bubble Analytics shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any investment losses or damages arising from use of this Platform</li>
                <li>Any direct, indirect, incidental, consequential, or punitive damages</li>
                <li>Any loss of profits, revenue, data, or business opportunities</li>
                <li>Any errors, inaccuracies, or omissions in the data or information provided</li>
                <li>Any interruption or cessation of service</li>
                <li>Any third-party actions or omissions</li>
              </ul>
              <p className="mt-4">
                <strong className="text-[#E8E8E8]">YOU ASSUME ALL RISK</strong> associated with your use of this Platform and
                any investment decisions you make. By using this Platform, you acknowledge and agree to these limitations.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Third-Party Links & Content</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <p>
                This Platform contains links to third-party websites (news sources, data providers, etc.). We do not control,
                endorse, or assume responsibility for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The content, accuracy, or availability of third-party sites</li>
                <li>The privacy practices or security of third-party sites</li>
                <li>Any products, services, or information offered by third parties</li>
              </ul>
              <p className="mt-4">
                <strong className="text-[#E8E8E8]">Clicking on external links is at your own risk.</strong> Always verify information
                from multiple independent sources.
              </p>
            </div>
          </section>

          {/* Open Source & Attribution */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Open Source & Attribution</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <p>
                This Platform is open source and available on{' '}
                <a
                  href="https://github.com/Chrisfoz/ai-bubble-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800000] hover:text-[#A00000] underline font-semibold"
                >
                  GitHub
                </a>{' '}
                under the MIT License. You are free to use, modify, and distribute the code, subject to the license terms.
              </p>
              <p>
                If you use or reference data or analysis from this Platform, please provide attribution:
              </p>
              <div className="bg-[#0D1117] border border-[#4A5A6A]/30 rounded p-3 font-mono text-xs">
                "Data from AI Bubble Analytics (https://aibubbleanalytics.com)"
              </div>
            </div>
          </section>

          {/* Changes to Disclaimer */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Changes to This Disclaimer</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <p>
                We reserve the right to modify this Disclaimer, Privacy Policy, and Terms of Use at any time. Changes will be
                effective immediately upon posting. Your continued use of the Platform after changes constitutes acceptance of
                the updated terms.
              </p>
              <p>
                <strong className="text-[#E8E8E8]">Last Updated:</strong> November 15, 2025
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">Contact Us</h2>
            <div className="text-[#C0C0C0] space-y-4 leading-relaxed">
              <p>
                If you have questions about this Disclaimer, Privacy Policy, or the Platform in general, please contact us:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong className="text-[#E8E8E8]">Email:</strong>{' '}
                  <a href="mailto:contact@aibubbleanalytics.com" className="text-[#800000] hover:text-[#A00000] underline">
                    contact@aibubbleanalytics.com
                  </a>
                </li>
                <li>
                  <strong className="text-[#E8E8E8]">GitHub Issues:</strong>{' '}
                  <a
                    href="https://github.com/Chrisfoz/ai-bubble-analytics/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#800000] hover:text-[#A00000] underline"
                  >
                    Report a Bug or Request a Feature
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Back to Top */}
          <div className="text-center pt-8">
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
