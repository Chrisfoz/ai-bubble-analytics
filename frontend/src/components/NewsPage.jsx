import React from 'react';
import { Link } from 'react-router-dom';

/**
 * News & Commentary Page
 * Curated market news, videos, and expert analysis
 * Berkshire Hathaway color scheme for institutional credibility
 */
const NewsPage = () => {
  // Mock data - in production, this would come from News API
  const videos = [
    {
      id: 1,
      title: "The AI Bubble Is A Lot Worse Than You Think",
      channel: "Market Analysis",
      thumbnail: "https://via.placeholder.com/400x225/800000/ffffff?text=AI+Bubble+Analysis",
      url: "https://youtube.com",
      duration: "18:42"
    },
    {
      id: 2,
      title: "Sam Altman on AI Valuations and Future Spending",
      channel: "Tech Insights",
      thumbnail: "https://via.placeholder.com/400x225/4A5A6A/ffffff?text=Sam+Altman+Interview",
      url: "https://youtube.com",
      duration: "12:15"
    },
    {
      id: 3,
      title: "Circular Financing: How Money Flows in AI",
      channel: "Financial Deep Dive",
      thumbnail: "https://via.placeholder.com/400x225/800000/ffffff?text=Circular+Financing",
      url: "https://youtube.com",
      duration: "15:30"
    }
  ];

  const news = [
    {
      id: 1,
      title: "Nvidia Shares Drop 17% on AI Bubble Concerns",
      source: "Financial Times",
      date: "2025-01-28",
      excerpt: "DeepSeek launch triggers market concerns about AI valuations, but stock recovers 8.8% the next day.",
      url: "#",
      category: "Breaking"
    },
    {
      id: 2,
      title: "Bank of England Warns of AI Overvaluation Risk",
      source: "Reuters",
      date: "2025-10-15",
      excerpt: "Central bank highlights growing risks of global market correction due to AI tech firm valuations.",
      url: "#",
      category: "Regulatory"
    },
    {
      id: 3,
      title: "Warren Buffett's Record Cash Pile Signals Market Caution",
      source: "Bloomberg",
      date: "2025-11-01",
      excerpt: "Berkshire Hathaway sitting on largest cash reserve in history amid AI valuation concerns.",
      url: "#",
      category: "Investor Moves"
    },
    {
      id: 4,
      title: "OpenAI Valuation Triples to $500B in One Year",
      source: "Wall Street Journal",
      date: "2025-10-20",
      excerpt: "Company's value surges from $157B despite questions about revenue sustainability.",
      url: "#",
      category: "Valuations"
    },
    {
      id: 5,
      title: "Michael Burry Bets 80% Against Nvidia and Palantir",
      source: "CNBC",
      date: "2025-11-10",
      excerpt: "Big Short investor files 13F showing massive short positions on AI stocks.",
      url: "#",
      category: "Investor Moves"
    },
    {
      id: 6,
      title: "'AI Bubble' Google Searches Up 1,567% in Two Years",
      source: "Google Trends",
      date: "2025-11-12",
      excerpt: "Exponential growth in search interest mirrors pre-crash warning signals from past bubbles.",
      url: "#",
      category: "Sentiment"
    }
  ];

  const commentary = [
    {
      id: 1,
      author: "Sam Altman",
      role: "OpenAI CEO",
      quote: "Yes, AI is a bubble. Some level when something gets sufficiently huge, the federal government is kind of the insurer of last resort.",
      date: "2025-01-15",
      context: "During presentation on $1.4T spending commitments"
    },
    {
      id: 2,
      author: "Ray Dalio",
      role: "Bridgewater Associates",
      quote: "Current levels of investment in AI are very similar to the dot-com bubble.",
      date: "2025-01-10",
      context: "Bloomberg interview on market conditions"
    },
    {
      id: 3,
      author: "Jamie Dimon",
      role: "JP Morgan CEO",
      quote: "AI is real, but there's a higher chance of a meaningful drop in stocks over the next two years than the market is reflecting.",
      date: "2025-10-15",
      context: "Quarterly earnings call commentary"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <Link to="/" className="text-[#800000] hover:text-[#A00000] mb-4 inline-block font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#E8E8E8] mb-4">
            News & Commentary
          </h1>
          <p className="text-xl text-[#C0C0C0]">
            Latest developments, expert analysis, and market insights on the AI bubble
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-12">

          {/* Featured Videos */}
          <section>
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6 flex items-center gap-3">
              <span>📹</span> Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map(video => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl overflow-hidden border border-[#4A5A6A]/50 hover:border-[#800000] transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs font-semibold">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 bg-[#800000]/0 group-hover:bg-[#800000]/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#E8E8E8]/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 text-[#800000]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#E8E8E8] font-semibold mb-1 group-hover:text-[#800000] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-[#A0A0A0] text-sm">{video.channel}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section>
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6 flex items-center gap-3">
              <span>📰</span> Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map(article => (
                <a
                  key={article.id}
                  href={article.url}
                  className="group bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 border border-[#4A5A6A]/50 hover:border-[#800000] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      article.category === 'Breaking' ? 'bg-[#800000] text-white' :
                      article.category === 'Regulatory' ? 'bg-[#A00000] text-white' :
                      article.category === 'Investor Moves' ? 'bg-[#4A5A6A] text-white' :
                      article.category === 'Valuations' ? 'bg-[#800000]/70 text-white' :
                      'bg-[#4A5A6A]/70 text-white'
                    }`}>
                      {article.category}
                    </span>
                    <span className="text-[#A0A0A0] text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#E8E8E8] mb-2 group-hover:text-[#800000] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#C0C0C0] text-sm mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A0A0A0] text-xs">{article.source}</span>
                    <span className="text-[#800000] text-sm group-hover:text-[#A00000]">
                      Read more →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Expert Commentary */}
          <section>
            <h2 className="text-3xl font-bold text-[#E8E8E8] mb-6 flex items-center gap-3">
              <span>💬</span> Expert Commentary
            </h2>
            <div className="space-y-6">
              {commentary.map(comment => (
                <div
                  key={comment.id}
                  className="bg-[#1a1f2e]/70 backdrop-blur-lg rounded-xl p-6 border border-[#4A5A6A]/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#800000] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#E8E8E8] font-bold text-lg">{comment.author}</h3>
                          <p className="text-[#A0A0A0] text-sm">{comment.role}</p>
                        </div>
                        <span className="text-[#A0A0A0] text-xs">{comment.date}</span>
                      </div>
                      <blockquote className="text-[#C0C0C0] text-lg italic mb-2 border-l-4 border-[#800000] pl-4">
                        "{comment.quote}"
                      </blockquote>
                      <p className="text-[#A0A0A0] text-sm">
                        <span className="font-semibold">Context:</span> {comment.context}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="bg-[#800000]/20 border border-[#800000]/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#E8E8E8] mb-4">Never Miss an Update</h2>
            <p className="text-[#C0C0C0] mb-6">
              Get daily news, videos, and expert commentary delivered to your inbox
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-8 py-4 bg-[#800000] hover:bg-[#A00000] text-white font-semibold rounded-lg transition-all duration-300"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#4A5A6A]/30">
          <p className="text-center text-[#A0A0A0] text-sm">
            <strong>Sources:</strong> Financial Times, Reuters, Bloomberg, WSJ, CNBC, Google Trends<br/>
            Links open in new tab. Always verify information independently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
