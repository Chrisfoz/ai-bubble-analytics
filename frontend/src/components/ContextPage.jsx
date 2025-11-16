import React from 'react';
import { Link } from 'react-router-dom';
import { expertQuotes, formatCitation } from '../data/citations';

/**
 * Context Page - Comprehensive Blog about the AI Bubble
 * Based on content from context folder (AI bubble.md & transcript)
 * Covers: Context, History, Market Views, Metrics Explained, Why This App
 */
const ContextPage = () => {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            Understanding the AI Bubble
          </h1>
          <p className="text-xl text-[#C0C0C0]">
            A comprehensive analysis of circular financing, valuation concerns, and expert warnings
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* What is the AI Bubble */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">What is the AI Bubble?</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              The AI bubble is a theorized stock market bubble growing amid the current AI boom, a period of rapid
              progression in artificial intelligence that is affecting the broader economy. Speculation about a bubble
              largely originates from concerns that leading AI tech firms are involved in a <span className="text-[#800000] font-semibold">circular
              flow of investments</span> that are artificially inflating the value of their stocks.
            </p>
            <p className="text-[#C0C0C0] leading-relaxed">
              As of 2025, ChatGPT is the 5th most visited website globally behind Google, YouTube, Facebook, and Instagram.
              The unexpectedly successful launch of DeepSeek in January 2025 resulted in concerns about a possible AI bubble,
              with Nvidia's shares dropping 17% in one day before recovering 8.8% the following day.
            </p>
          </section>

          {/* History Section */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">📜 History of the AI Boom</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-[#800000] pl-4">
                <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">2010-2016: The Foundation</h3>
                <p className="text-[#C0C0C0] leading-relaxed">
                  The current AI boom originally started between 2010 and 2016, driven by advances in machine learning,
                  deep neural networks, and increased computational power. This period is sometimes referred to as an
                  <strong className="text-[#E8E8E8]"> AI spring</strong>, contrasting with previous AI winters where
                  progress stalled due to limited technology and funding.
                </p>
              </div>

              <div className="border-l-4 border-[#800000] pl-4">
                <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">2020s: Acceleration</h3>
                <p className="text-[#C0C0C0] leading-relaxed">
                  The boom saw massive acceleration in the 2020s with the emergence of generative AI technologies.
                  OpenAI's ChatGPT launched in late 2022, demonstrating unprecedented natural language capabilities.
                  Scientific breakthroughs followed, including Google DeepMind's protein folding predictions that
                  revolutionized biology research.
                </p>
              </div>

              <div className="border-l-4 border-[#800000] pl-4">
                <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">2023-2024: Valuation Explosion</h3>
                <p className="text-[#C0C0C0] leading-relaxed mb-3">
                  Nvidia became the world's highest-valued company and the first to reach $4 trillion market value
                  in July 2024 (quadrupling since 2023). By October 2025, it surpassed $5 trillion—higher than the
                  GDP of every country except the US and China.
                </p>
                <div className="bg-[#2a1515] rounded-lg p-4 border border-[#800000]/40">
                  <p className="text-[#A00000] font-semibold text-sm">
                    ⚠️ Microsoft spent almost $35 billion on AI infrastructure in just three months (Q3 2025).
                    Over 2025, AI-related enterprises accounted for roughly 80% of gains in the American stock market.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-[#800000] pl-4">
                <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">Late 2025: Concentration Concerns</h3>
                <p className="text-[#C0C0C0] leading-relaxed">
                  30% of the US S&P 500 and 20% of the MSCI World index became solely held by the five largest
                  companies—the greatest concentration in half a century. Share valuations reached levels not seen
                  since the dot-com bubble, with the Case-Shiller P/E ratio exceeding 40 for the first time since
                  the dot-com crash.
                </p>
              </div>
            </div>
          </section>

          {/* Circular Financing Explained */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">🔄 Circular Financing: The Core Problem</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-6">
              At the center of concerns is a feedback loop where money circulates between the same companies,
              creating the illusion of growth without real economic value creation:
            </p>

            <div className="bg-[#1a1f2e] rounded-lg p-6 mb-6 border border-[#4A5A6A]/50">
              <h3 className="text-xl font-bold text-[#800000] mb-4">The Money Flow:</h3>
              <ol className="space-y-3 text-[#C0C0C0]">
                <li className="flex items-start">
                  <span className="text-[#800000] font-bold mr-3">1.</span>
                  <span><strong className="text-[#E8E8E8]">Nvidia</strong> invests $100 billion into OpenAI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#800000] font-bold mr-3">2.</span>
                  <span><strong className="text-[#E8E8E8]">OpenAI</strong> commits to huge cloud contracts with Oracle and Microsoft</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#800000] font-bold mr-3">3.</span>
                  <span><strong className="text-[#E8E8E8]">Oracle/Microsoft</strong> appear to have growing demand and revenue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#800000] font-bold mr-3">4.</span>
                  <span><strong className="text-[#E8E8E8]">Oracle</strong> buys tens of billions in Nvidia GPUs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#800000] font-bold mr-3">5.</span>
                  <span><strong className="text-[#E8E8E8]">Nvidia</strong> invests more money back into OpenAI</span>
                </li>
              </ol>
              <p className="mt-4 text-[#800000] font-semibold">
                → Total circular flow: &gt;$180 billion circulating in the system
              </p>
            </div>

            <div className="bg-[#2a1515] rounded-lg p-4 border border-[#800000]/40">
              <p className="text-[#A00000]">
                <strong>⚠️ The Issue:</strong> Everyone looks like they're growing, even if the money being spent was borrowed.
                No real value is necessarily being created—it's money passing hands in a closed loop. Much of this debt
                is hidden through private credit, structured vehicles (SPVs), and joint ventures.
              </p>
            </div>
          </section>

          {/* Market Statistics */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">📊 Key Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">40%</div>
                <p className="text-[#C0C0C0] text-sm">
                  of every dollar in S&P 500 index funds goes to just 10 companies (including Nvidia at ~8% alone)
                </p>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">$2 Trillion</div>
                <p className="text-[#C0C0C0] text-sm">
                  Annual revenue needed to justify current AI company valuations (more than all major tech companies combined in 2024)
                </p>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">$330B</div>
                <p className="text-[#C0C0C0] text-sm">
                  AI tech company spending in 2025 on data centers and infrastructure
                </p>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">30%</div>
                <p className="text-[#C0C0C0] text-sm">
                  Of S&P 500 held by just 5 companies—highest concentration in 50 years
                </p>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">95%</div>
                <p className="text-[#C0C0C0] text-sm">
                  of organizations getting zero return despite $30-40bn in enterprise GenAI investment (MIT report, August 2025)
                </p>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40">
                <div className="text-3xl font-bold text-[#800000] mb-2">$1.6T</div>
                <p className="text-[#C0C0C0] text-sm">
                  Total expected AI spending between 2026-2029 from US mega caps
                </p>
              </div>
            </div>
          </section>

          {/* Expert Warnings */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">💬 What Experts Are Saying</h2>

            <div className="space-y-4">
              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#800000]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👨‍💼</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">
                      {expertQuotes.samAltman.speaker} ({expertQuotes.samAltman.title})
                    </h3>
                    <p className="text-[#C0C0C0] italic mb-2">
                      "{expertQuotes.samAltman.fullQuote}"
                    </p>
                    <p className="text-sm text-[#A0A0A0] mb-3">
                      {formatCitation(expertQuotes.samAltman).formattedDate} at {expertQuotes.samAltman.time}<br/>
                      <a href={expertQuotes.samAltman.url} target="_blank" rel="noopener noreferrer" className="text-[#800000] hover:text-[#A00000] underline">
                        {expertQuotes.samAltman.source} →
                      </a>
                    </p>
                    <div className="bg-[#2a1515] rounded p-3 border border-[#800000]/40">
                      <p className="text-sm text-[#A00000]">
                        <strong>Context:</strong> When questioned about $1.4T spending commitments vs current revenue,
                        Altman suggested government might become "insurer of last resort" for AI infrastructure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#4A5A6A]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📈</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">
                      {expertQuotes.rayDalio.speaker} ({expertQuotes.rayDalio.title})
                    </h3>
                    <p className="text-[#C0C0C0] italic mb-2">
                      "{expertQuotes.rayDalio.fullQuote}"
                    </p>
                    <p className="text-sm text-[#A0A0A0]">
                      {formatCitation(expertQuotes.rayDalio).formattedDate}<br/>
                      <a href={expertQuotes.rayDalio.url} target="_blank" rel="noopener noreferrer" className="text-[#800000] hover:text-[#A00000] underline">
                        {expertQuotes.rayDalio.source} →
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#800000]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">
                      {expertQuotes.michaelBurry.speaker} ({expertQuotes.michaelBurry.title})
                    </h3>
                    <p className="text-[#C0C0C0] italic mb-2">
                      "{expertQuotes.michaelBurry.fullQuote}"
                    </p>
                    <p className="text-sm text-[#A0A0A0] mb-3">
                      {formatCitation(expertQuotes.michaelBurry).formattedDate} at {expertQuotes.michaelBurry.time}<br/>
                      <a href={expertQuotes.michaelBurry.url} target="_blank" rel="noopener noreferrer" className="text-[#800000] hover:text-[#A00000] underline">
                        {expertQuotes.michaelBurry.source} →
                      </a>
                    </p>
                    <div className="bg-[#2a1515] rounded p-3 border border-[#800000]/40">
                      <p className="text-sm text-[#A00000]">
                        <strong>Context:</strong> {expertQuotes.michaelBurry.context}.
                        Burry is famous for predicting the 2008 financial crisis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#4A5A6A]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏦</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">
                      {expertQuotes.warrenBuffett.speaker} ({expertQuotes.warrenBuffett.title})
                    </h3>
                    <p className="text-[#C0C0C0] italic mb-2">
                      "{expertQuotes.warrenBuffett.fullQuote}"
                    </p>
                    <p className="text-sm text-[#A0A0A0] mb-3">
                      {formatCitation(expertQuotes.warrenBuffett).formattedDate} at {expertQuotes.warrenBuffett.time}<br/>
                      <a href={expertQuotes.warrenBuffett.url} target="_blank" rel="noopener noreferrer" className="text-[#800000] hover:text-[#A00000] underline">
                        {expertQuotes.warrenBuffett.source} →
                      </a>
                    </p>
                    <div className="bg-[#2a1515] rounded p-3 border border-[#800000]/40">
                      <p className="text-sm text-[#A00000]">
                        <strong>Context:</strong> {expertQuotes.warrenBuffett.context} — signaling caution
                        about current market valuations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#800000]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏛️</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">Bank of England & IMF</h3>
                    <p className="text-[#C0C0C0] italic mb-2">
                      Warned of global market correction risks due to possible overvaluation of AI tech firms.
                      OpenAI's valuation more than tripled from $157B (Oct 2024) to $500B (2025).
                    </p>
                    <p className="text-sm text-[#A0A0A0]">
                      Kristalina Georgieva (IMF Managing Director) drew comparisons to the dot-com bubble of 2001,
                      highlighting that a market correction could stunt global growth and weaken developing economies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f2e] rounded-lg p-6 border-l-4 border-[#4A5A6A]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💼</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E8E8E8] mb-2">Jamie Dimon (JP Morgan CEO)</h3>
                    <p className="text-[#C0C0C0] italic">
                      "AI is real, but some money invested now will be wasted... AI will pay off—just like cars
                      and TVs paid off—but most people involved didn't do well. The level of uncertainty should
                      be higher in most people's minds." (October 2025)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The "Too Big to Fail" Problem */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">🏛️ The "Too Big to Fail" Scenario</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              Deutsche Bank data suggests: <span className="text-[#800000] font-bold">"If it wasn't for AI spending right now,
              we'd be in a recession."</span>
            </p>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              If AI companies represent such a huge part of the US economy, they cannot be allowed to fail because:
            </p>
            <ul className="space-y-2 text-[#C0C0C0] mb-4">
              <li className="flex items-start">
                <span className="text-[#800000] mr-2">•</span>
                Letting them fail would hurt national competitiveness vs. China
              </li>
              <li className="flex items-start">
                <span className="text-[#800000] mr-2">•</span>
                It would impact jobs, employees, and the country's strategic interests
              </li>
              <li className="flex items-start">
                <span className="text-[#800000] mr-2">•</span>
                Market corrections would affect retirement accounts and index fund investors
              </li>
              <li className="flex items-start">
                <span className="text-[#800000] mr-2">•</span>
                Political pressure to bailout would be immense
              </li>
            </ul>
            <div className="bg-[#2a1515] rounded-lg p-4 border border-[#800000]/40">
              <p className="text-[#A00000]">
                <strong>⚠️ Implication:</strong> Even if you don't invest in AI directly, you're likely exposed through
                index funds. Because AI companies now represent 30%+ of major indexes, any market correction would
                affect millions of retirement accounts. Taxpayers may ultimately backstop any failures.
              </p>
            </div>
          </section>

          {/* Metrics Explained in Layman's Terms */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">📊 Our Metrics Explained (Layman's Terms)</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-6">
              We track 10 institutional-grade metrics to measure bubble risk. Here's what each one means in plain English:
            </p>

            <div className="space-y-4">
              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">1. Magnificent 7 Weight vs. Earnings</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> Compares how much of the S&P 500 is owned by 7 big tech companies
                  (Apple, Microsoft, Google, Amazon, Nvidia, Meta, Tesla) versus how much profit they actually make.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> If these companies represent 44% of the index but only
                  make 34% of earnings, there's a 10% gap. That gap means they're overvalued relative to their actual profits.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">2. Revenue Expectation Gap</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> The difference between how much money AI companies need
                  to make to justify their stock price versus what they actually make.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> AI companies need to make $2 trillion per year
                  to justify current valuations, but they're nowhere close. That's a $600B+ gap that needs to be filled.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">3. Circular Financing Flows</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> Money passing in a circle between AI companies
                  (Nvidia → OpenAI → Oracle → back to Nvidia).
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> When companies invest in each other, it creates
                  fake growth. They all look profitable, but it's just the same money moving around. Over $180B is circulating this way.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">4. AI Valuation Premium</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> How much more expensive AI stocks are compared to
                  regular stocks (measured by P/E ratio—price divided by earnings).
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> AI stocks trade at 85x forward earnings while
                  the S&P 500 average is 23x. That's a 270% premium—meaning investors are paying almost 3x more for AI stocks
                  than normal stocks.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">5. Debt-Funded AI Expansion</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> How much AI companies are borrowing to fund
                  their growth versus using actual profits.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> 75% of AI investments are debt-financed
                  (similar to pre-2000 dot-com levels). If revenues don't materialize, companies can't pay back the debt.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">6. Google Search Volume for "AI Bubble"</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> How many people are Googling "AI bubble" compared to 2 years ago.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> Search volume increased 1,567% (15x). When
                  regular people start searching for "is this a bubble?", it often means the bubble is near its peak.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">7. Business AI Adoption vs. Investment</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> How fast businesses are actually using AI versus
                  how much money is being invested.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> Only 9.8% of US businesses use AI, but investment
                  is 35x ahead of adoption. That's like building 35 restaurants when only 1 has customers.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">8. Index Concentration (Top 5 Holdings)</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> What percentage of the S&P 500 index is owned by
                  just the top 5 companies.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> The top 5 companies now represent 30% of the
                  index—the highest concentration in 50 years. If these companies fall, the entire market falls with them.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">9. Historical Bubble Comparison (P/E Ratio)</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> Comparing today's stock valuations to the
                  dot-com bubble (2000) and other historical bubbles.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> The Case-Shiller P/E ratio exceeded 40 for
                  the first time since the dot-com crash. That's a warning sign we're in similar territory.
                </p>
              </div>

              <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-5">
                <h3 className="text-lg font-bold text-[#800000] mb-2">10. Energy Footprint as % of US Grid</h3>
                <p className="text-[#C0C0C0] text-sm mb-2">
                  <strong className="text-[#E8E8E8]">What it is:</strong> How much of America's electricity is consumed
                  by AI data centers.
                </p>
                <p className="text-[#C0C0C0] text-sm">
                  <strong className="text-[#E8E8E8]">Why it matters:</strong> AI data centers use 2.5% of US electricity (2025),
                  projected to hit 4.1% by 2027. If infrastructure costs become too high, it threatens profitability.
                </p>
              </div>
            </div>
          </section>

          {/* Why This Application Is Useful */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6">🎯 Why This Application Is Useful</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">For Individual Investors</h3>
                <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-4">
                  <p className="text-[#C0C0C0] leading-relaxed mb-3">
                    Even if you don't directly invest in AI stocks, <strong className="text-[#E8E8E8]">you're likely exposed</strong>.
                    If you have a 401(k), IRA, or buy S&P 500 index funds, approximately 40% of your money is going to just
                    10 companies—many of them AI-related.
                  </p>
                  <ul className="space-y-2 text-[#C0C0C0] text-sm">
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Know your risk:</strong> Understand how concentrated your retirement
                      savings are in AI stocks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Make informed decisions:</strong> Decide whether to stay invested,
                      reduce exposure, or hedge your position</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Track changes daily:</strong> See real-time updates on all 10
                      bubble indicators</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">For Financial Professionals</h3>
                <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-4">
                  <ul className="space-y-2 text-[#C0C0C0] text-sm">
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Institutional-grade data:</strong> All metrics sourced from
                      verified providers (RBC, Goldman Sachs, Apollo, Fed data)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Complete transparency:</strong> Every data point includes
                      source, date, time, and URL for verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Historical context:</strong> 2-year timeline shows bubble
                      expansion/contraction trends</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#800000] mb-3">For Policy Makers & Researchers</h3>
                <div className="bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-4">
                  <ul className="space-y-2 text-[#C0C0C0] text-sm">
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Systemic risk monitoring:</strong> Track "too big to fail"
                      concentration in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Circular financing visibility:</strong> See how money flows
                      between AI companies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#800000] mr-2">✓</span>
                      <span><strong className="text-[#E8E8E8]">Economic impact analysis:</strong> Understand AI's role in
                      GDP, energy consumption, and job markets</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#2a1515] rounded-lg p-6 border border-[#800000]/40 mt-6">
                <h3 className="text-xl font-bold text-[#E8E8E8] mb-3">Our Unique Value Proposition</h3>
                <p className="text-[#C0C0C0] leading-relaxed mb-3">
                  Unlike financial news that reports <em>what</em> happened, we show you <em>why</em> it matters and
                  <em>what</em> to watch for next.
                </p>
                <ul className="space-y-2 text-[#C0C0C0] text-sm">
                  <li className="flex items-start">
                    <span className="text-[#800000] mr-2">1.</span>
                    <span><strong className="text-[#E8E8E8]">Aggregated data:</strong> All 10 metrics in one place
                    (normally scattered across Bloomberg, Reuters, Fed reports)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#800000] mr-2">2.</span>
                    <span><strong className="text-[#E8E8E8]">Visual clarity:</strong> Dynamic bubble visualization shows
                    risk level at a glance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#800000] mr-2">3.</span>
                    <span><strong className="text-[#E8E8E8]">Educational focus:</strong> We explain metrics in plain English,
                    not jargon</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#800000] mr-2">4.</span>
                    <span><strong className="text-[#E8E8E8]">No paywalls:</strong> Critical market information should be
                    accessible to everyone</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Opposing Views */}
          <section className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-8 border border-[#4A5A6A]/50">
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-4">⚖️ Opposing Views</h2>
            <p className="text-[#C0C0C0] leading-relaxed mb-4">
              Not everyone agrees there's a bubble. Here are the counterarguments:
            </p>
            <div className="space-y-4">
              <div className="bg-[#1a1f2e] rounded-lg p-4 border-l-4 border-[#4A5A6A]">
                <p className="text-[#C0C0C0]">
                  <strong className="text-[#E8E8E8]">Goldman Sachs:</strong> The rapid increase in valuations is likely
                  justified by powerful and sustained profit growth. Current valuations are modest compared to the dot-com bubble.
                  Unlike 2000, today's AI companies have real revenues and strong fundamentals.
                </p>
              </div>
              <div className="bg-[#1a1f2e] rounded-lg p-4 border-l-4 border-[#4A5A6A]">
                <p className="text-[#C0C0C0]">
                  <strong className="text-[#E8E8E8]">Morgan Stanley:</strong> Median cash flow for the top 500 US companies
                  is roughly triple what it was in 1999, with much more robust margin profiles. Companies are in far better
                  financial health than during the dot-com era.
                </p>
              </div>
              <div className="bg-[#1a1f2e] rounded-lg p-4 border-l-4 border-[#4A5A6A]">
                <p className="text-[#C0C0C0]">
                  <strong className="text-[#E8E8E8]">Jerome Powell (Federal Reserve Chair):</strong> AI differs from other
                  technology bubbles like dot-com because the corporations behind it are generating large amounts of revenue,
                  and investment into AI data centers is generating significant economic growth. This is real infrastructure
                  spending, not speculative hype.
                </p>
              </div>
            </div>
            <div className="mt-6 bg-[#1a1f2e] border border-[#4A5A6A]/50 rounded-lg p-4">
              <p className="text-[#C0C0C0] text-sm">
                <strong className="text-[#E8E8E8]">Our Take:</strong> Both sides have valid points. We provide the data
                and let you decide. Our goal isn't to predict the future, but to help you understand the present with
                transparency and institutional-grade analysis.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-[#800000]/20 border border-[#800000]/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Track the Bubble in Real-Time</h2>
            <p className="text-[#C0C0C0] mb-6">
              Monitor all 10 institutional-grade metrics and see how the bubble evolves
            </p>
            <Link
              to="/metrics"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              View Metrics Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-[#4A5A6A]/30">
          <p className="text-center text-[#A0A0A0] text-sm">
            <strong>Data Sources:</strong> S&P Global, RBC Capital Markets, Goldman Sachs, Apollo Global Management,
            Richmond Fed, Bank of England, IMF, Bureau of Economic Analysis, U.S. Census Bureau, Google Trends,
            SEC EDGAR, PitchBook Data, Bloomberg Terminal, IEA Energy Reports
          </p>
          <p className="text-center text-[#A0A0A0] text-xs mt-4">
            ⚠️ Educational purposes only. Not financial advice. Always do your own research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;
