# AI Bubble Analytics - API Documentation

**Version:** 1.0.0
**Last Updated:** November 15, 2025
**Base URL:** `http://localhost:5000/api` (development) | `https://api.aibubbleanalytics.com` (production)

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Rate Limiting](#rate-limiting)
4. [Data Sources](#data-sources)
5. [API Endpoints](#api-endpoints)
6. [Data Models](#data-models)
7. [Error Handling](#error-handling)
8. [Webhook Integration](#webhook-integration)
9. [Testing](#testing)
10. [Deployment](#deployment)

---

## Overview

The AI Bubble Analytics API provides institutional-grade data on AI market concentration, valuation metrics, and bubble risk indicators. All data is sourced from verified providers and updated on schedules matching their official release cadences.

### Key Features

- **10 Institutional Metrics**: Real-time tracking of AI bubble indicators
- **Historical Data**: 2+ years of historical bubble index data
- **Expert Citations**: Verified quotes with timestamps and URLs
- **Data Transparency**: Every metric includes source, update frequency, and confidence level
- **Rate Limited**: Fair usage policies to ensure API stability

### Technology Stack

- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Caching**: Redis (optional)
- **Authentication**: JWT (optional)
- **Scheduling**: node-cron

---

## Authentication

### Public Endpoints

Most read endpoints are public and require no authentication. Rate limiting applies.

```bash
GET /api/metrics/bubble-index
GET /api/metrics/magnificent7
GET /api/citations/experts
```

### Protected Endpoints (Admin)

Admin endpoints require an API key passed in headers:

```bash
POST /api/admin/refresh-data
DELETE /api/admin/cache/clear

Headers:
  X-API-Key: your-api-secret-key
```

### JWT Authentication (Optional)

If user authentication is implemented:

```bash
POST /api/auth/register
POST /api/auth/login
GET /api/user/profile

Headers:
  Authorization: Bearer <jwt-token>
```

---

## Rate Limiting

**Default Limits:**
- **Public API**: 100 requests per 15 minutes per IP
- **Authenticated**: 500 requests per 15 minutes per user
- **Admin**: Unlimited

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1731686400
```

**Rate Limit Exceeded Response:**
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 5 minutes.",
  "retryAfter": 300
}
```

---

## Data Sources & API Keys Setup

### Priority Setup Guide

**High Priority (Get These First):**
1. Alpha Vantage - Core stock data
2. Financial Modeling Prep - S&P 500 composition
3. Finnhub - Real-time quotes and earnings

**Medium Priority (Within 1 Week):**
4. NewsAPI - News feed functionality
5. FRED - Economic indicators

**Low Priority (Optional/Future):**
6. SerpAPI - Search trends (free alternative: pytrends)
7. Census Bureau - Business AI adoption data

---

### 1. Alpha Vantage (Stock Market Data) ⭐ HIGH PRIORITY

**Purpose:** Real-time and historical stock prices, S&P 500 data, market capitalization

**Free Tier:** 25 API requests per day (5 requests per minute)

**Sign Up:**
1. Visit https://www.alphavantage.co/support/#api-key
2. Enter your email and click "GET FREE API KEY"
3. Copy the API key immediately

**Configuration:**
```bash
# Add to backend/.env
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
# Daily stock prices
GET https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NVDA&apikey=YOUR_KEY

# Company overview and market cap
GET https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=YOUR_KEY

# Earnings data
GET https://www.alphavantage.co/query?function=EARNINGS&symbol=MSFT&apikey=YOUR_KEY
```

**Data Points Tracked:**
- Market cap of Magnificent 7 (AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA)
- Combined weight in S&P 500
- Earnings contribution
- Forward P/E ratios

**Testing:**
```bash
curl "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=YOUR_KEY"
```

**Cost for Upgrade:** $49.99/month for 75 requests/minute

---

### 2. Financial Modeling Prep (S&P 500 Data) ⭐ HIGH PRIORITY

**Purpose:** S&P 500 constituents, sector weightings, comprehensive financial statements

**Free Tier:** 250 API requests per day

**Sign Up:**
1. Visit https://site.financialmodelingprep.com/developer/docs
2. Click "Get Your Free API KEY Today"
3. Complete registration
4. Find API key in your dashboard

**Configuration:**
```bash
# Add to backend/.env
FMP_API_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
# S&P 500 company list
GET https://financialmodelingprep.com/api/v3/sp500_constituent?apikey=YOUR_KEY

# Stock quotes
GET https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=YOUR_KEY

# Income statements
GET https://financialmodelingprep.com/api/v3/income-statement/NVDA?apikey=YOUR_KEY

# Financial ratios including P/E
GET https://financialmodelingprep.com/api/v3/ratios/GOOGL?apikey=YOUR_KEY
```

**Testing:**
```bash
curl "https://financialmodelingprep.com/api/v3/sp500_constituent?apikey=YOUR_KEY"
```

**Cost for Upgrade:** $29/month for 750 requests/day

---

### 3. Finnhub (Real-time Market Data) ⭐ HIGH PRIORITY

**Purpose:** Real-time stock quotes, company financials, earnings, news

**Free Tier:** 60 API calls per minute

**Sign Up:**
1. Visit https://finnhub.io/register
2. Create account with email
3. Navigate to Dashboard → API Keys
4. Copy your API key

**Configuration:**
```bash
# Add to backend/.env
FINNHUB_API_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
# Real-time stock quotes
GET https://finnhub.io/api/v1/quote?symbol=NVDA&token=YOUR_KEY

# Company metrics and financials
GET https://finnhub.io/api/v1/stock/metric?symbol=NVDA&metric=all&token=YOUR_KEY

# Earnings data
GET https://finnhub.io/api/v1/calendar/earnings?symbol=AAPL&token=YOUR_KEY

# Company news
GET https://finnhub.io/api/v1/company-news?symbol=MSFT&from=2025-01-01&to=2025-11-21&token=YOUR_KEY
```

**Testing:**
```bash
curl "https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_KEY"
```

**Cost for Upgrade:** $59.99/month for 300 calls/minute

---

### 4. NewsAPI (News Aggregation) ⭐ MEDIUM PRIORITY

**Purpose:** AI-related news, sentiment analysis, headline aggregation

**Free Tier:** 100 requests per day (Developer plan)

**Sign Up:**
1. Visit https://newsapi.org/register
2. Create account
3. Copy API key from account page

**Configuration:**
```bash
# Add to backend/.env
NEWS_API_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
# Search news articles
GET https://newsapi.org/v2/everything?q=artificial%20intelligence%20OR%20ai%20bubble&sortBy=publishedAt&apiKey=YOUR_KEY

# Top headlines
GET https://newsapi.org/v2/top-headlines?category=technology&apiKey=YOUR_KEY
```

**Limitations:**
- Free tier: Articles from last 30 days only
- No commercial use on free tier

**Testing:**
```bash
curl "https://newsapi.org/v2/everything?q=ai+bubble&sortBy=publishedAt&apiKey=YOUR_KEY"
```

**Cost for Upgrade:** $449/month for Business plan (unrestricted access)

---

### 5. FRED (Federal Reserve Economic Data) ⭐ MEDIUM PRIORITY

**Purpose:** Economic indicators, yield curve, inflation data, macro metrics

**Free Tier:** Unlimited (with rate limiting)

**Sign Up:**
1. Visit https://fred.stlouisfed.org/docs/api/api_key.html
2. Create account
3. Request API key
4. API key sent via email

**Configuration:**
```bash
# Add to backend/.env
FRED_API_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
# Time series data
GET https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=YOUR_KEY&file_type=json

# Series IDs we track:
# - DGS10: 10-Year Treasury Constant Maturity Rate
# - DGS2: 2-Year Treasury Constant Maturity Rate
# - CPIAUCSL: Consumer Price Index
# - VIXCLS: VIX volatility index
```

**Testing:**
```bash
curl "https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=YOUR_KEY&file_type=json"
```

**Cost:** Free (public service)

---

### 6. SerpAPI (Google Trends Data) - OPTIONAL

**Purpose:** Track "AI bubble" search interest over time

**Free Tier:** 100 searches per month

**Sign Up:**
1. Visit https://serpapi.com/users/sign_up
2. Create account
3. Get API key from dashboard

**Configuration:**
```bash
# Add to backend/.env
SERPAPI_KEY=your_api_key_here
```

**API Endpoints Used:**
```bash
GET https://serpapi.com/search.json?engine=google_trends&q=ai+bubble&data_type=TIMESERIES&api_key=YOUR_KEY
```

**Free Alternative - Pytrends (Unofficial Google Trends API):**
```python
from pytrends.request import TrendReq
pytrends = TrendReq(hl='en-US', tz=360)
pytrends.build_payload(['ai bubble'], timeframe='today 24-m')
data = pytrends.interest_over_time()
```

**Cost for Upgrade:** $50/month for 5,000 searches

---

### 7. U.S. Census Bureau (Business AI Adoption) - OPTIONAL

**Provider:** U.S. Census Bureau - Business Trends and Outlook Survey (BTOS)
**Update Frequency:** Monthly (first Tuesday)
**API:** Census Bureau API
**Access:** Free, requires API key

**Sign Up:**
1. Visit https://api.census.gov/data/key_signup.html
2. Complete registration
3. API key sent via email

**Configuration:**
```bash
# Add to backend/.env
CENSUS_API_KEY=your_api_key_here
```

**API Request:**
```bash
GET https://api.census.gov/data/2024/btos?get=ADOPTION_AI&key=YOUR_CENSUS_API_KEY
```

---

### 8. Additional Data Sources (Manual/Future)

#### Revenue & Earnings Forecasts
**Provider:** Gartner, Inc. + IDC Research
**Update Frequency:** Quarterly reports
**Access:** Manual data entry from published reports
**Cost:** Paid subscription required for real-time access

**Alternative:** Company quarterly earnings reports (10-K, 10-Q from SEC EDGAR)

**SEC EDGAR API:**
```bash
# Get company filings
GET https://data.sec.gov/submissions/CIK0001318605.json
```
**Rate Limits:** 10 requests/second

#### Venture Capital Data (Circular Financing)
**Provider:** PitchBook Data, Inc.
**Update Frequency:** Weekly (Fridays)
**Access:** Paid subscription ($20,000+/year for institutional access)
**Alternative:** Crunchbase API (partial data, $29/month)

**Crunchbase API:**
```bash
GET https://api.crunchbase.com/api/v4/entities/organizations/nvidia?user_key=YOUR_KEY
```

**Manual Tracking:** For circular financing flows, manual tracking from public press releases and SEC filings.

#### Energy Consumption Data
**Provider:** International Energy Agency (IEA)
**Update Frequency:** Annual reports + quarterly updates
**Access:** Manual data entry from published reports
**Reports:** https://www.iea.org/reports/electricity-2025

**Alternative:** U.S. Energy Information Administration (EIA) API
```bash
GET https://api.eia.gov/v2/electricity/retail-sales/data/?api_key=YOUR_EIA_KEY
```

---

### 9. SendGrid (Email Delivery) ✅ ALREADY CONFIGURED

**Purpose:** Newsletter delivery, transactional emails

**Status:** ✅ Already configured

**Free Tier:** 100 emails per day

**Current Configuration:**
```bash
# Already in backend/.env
SENDGRID_API_KEY=BY1zHG1DbJQQ0E5ZwZiDcrGogVliyahL
SENDGRID_FROM_EMAIL=newsletter@aibubbleanalytics.com
```

**Important:**
- Verify sender email in SendGrid dashboard
- Set up domain authentication for better deliverability
- Monitor email reputation and bounce rates

**Cost for Upgrade:** $19.95/month for 50,000 emails

---

### 10. Supabase (Database) ✅ ALREADY CONFIGURED

**Purpose:** PostgreSQL database, user authentication, real-time subscriptions

**Status:** ✅ Already configured

**Current Configuration:**
```bash
# Already in backend/.env and frontend/.env
SUPABASE_URL=https://evhxrrkuaqgvyvdhfoow.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Free Tier:**
- Up to 500MB database
- 2GB bandwidth per month
- 50,000 monthly active users

**Cost for Upgrade:** $25/month for Pro plan (8GB database, no bandwidth limits)

---

## API Endpoints

### Metrics Endpoints

#### Get AI Bubble Index
```http
GET /api/metrics/bubble-index
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bubbleIndex": 70,
    "riskLevel": "HIGH",
    "lastUpdated": "2025-11-15T16:30:00-05:00",
    "nextRefresh": "2025-11-15T16:35:00-05:00",
    "components": {
      "magnificent7Divergence": 10.4,
      "revenueGap": 600,
      "circularFinancing": 180,
      "valuationPremium": 270,
      "debtRatio": 0.75,
      "searchVolume": 1567,
      "adoptionRate": 9.8,
      "indexConcentration": 30,
      "peRatio": 40.2,
      "energyFootprint": 2.5
    }
  },
  "timestamp": "2025-11-15T16:30:00-05:00"
}
```

---

#### Get Magnificent 7 Metrics
```http
GET /api/metrics/magnificent7
```

**Response:**
```json
{
  "success": true,
  "data": {
    "weight": 44.2,
    "earnings": 33.8,
    "divergence": 10.4,
    "companies": [
      {
        "symbol": "NVDA",
        "name": "Nvidia",
        "marketCap": 5000000000000,
        "weight": 7.3,
        "earningsContribution": 5.1
      },
      // ... other 6 companies
    ],
    "lastUpdated": "2025-11-15T16:30:00-05:00",
    "source": {
      "provider": "S&P Global Market Intelligence",
      "url": "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
      "updateFrequency": "Daily at 4:30 PM EST"
    }
  }
}
```

---

#### Get Historical Bubble Data
```http
GET /api/metrics/history?start=2023-01-01&end=2025-11-15&interval=monthly
```

**Query Parameters:**
- `start` (string): Start date (ISO 8601 format)
- `end` (string): End date (ISO 8601 format)
- `interval` (string): `daily`, `weekly`, `monthly` (default: `monthly`)

**Response:**
```json
{
  "success": true,
  "data": {
    "timePoints": [
      {
        "date": "2023-01-01",
        "bubbleIndex": 35,
        "riskLevel": "MODERATE",
        "catalyst": "ChatGPT launch afterglow",
        "metrics": {
          "m7_weight": 32.5,
          "m7_earnings": 29.8,
          "revenue_gap": 45,
          "debt_ratio": 0.35,
          "adoption_rate": 3.7,
          "search_volume": 100
        }
      }
      // ... more time points
    ],
    "count": 33,
    "interval": "monthly"
  }
}
```

---

#### Get All Metrics
```http
GET /api/metrics/all
```

**Response:** Complete snapshot of all 10 metrics with sources and timestamps.

---

### Citations Endpoints

#### Get Expert Quotes
```http
GET /api/citations/experts
```

**Response:**
```json
{
  "success": true,
  "data": {
    "samAltman": {
      "quote": "AI is a bubble",
      "speaker": "Sam Altman",
      "title": "CEO, OpenAI",
      "date": "2024-01-16",
      "time": "14:30 EST",
      "source": "World Economic Forum, Davos",
      "url": "https://www.weforum.org/events/...",
      "fullQuote": "There's definitely elements of a bubble here...",
      "context": "Interview at WEF panel discussing AI investment trends"
    }
    // ... other experts
  }
}
```

---

#### Get Data Source Citations
```http
GET /api/citations/sources
```

**Response:** Complete metadata for all 10+ data sources with update frequencies and URLs.

---

### Newsletter Endpoints

#### Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "frequency": "weekly"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "email": "user@example.com",
    "frequency": "weekly",
    "subscribedAt": "2025-11-15T16:30:00Z"
  }
}
```

---

### Admin Endpoints

#### Trigger Data Refresh
```http
POST /api/admin/refresh-data
X-API-Key: your-api-secret-key
Content-Type: application/json

{
  "metrics": ["magnificent7", "searchVolume", "all"]
}
```

#### Clear Cache
```http
DELETE /api/admin/cache/clear
X-API-Key: your-api-secret-key
```

---

## Data Models

### BubbleMetric
```typescript
interface BubbleMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  lastUpdated: string; // ISO 8601 timestamp
  source: DataSource;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

### DataSource
```typescript
interface DataSource {
  provider: string;
  dataset: string;
  url: string;
  updateFrequency: string;
  lastUpdated: string;
  apiEndpoint?: string;
}
```

### BubbleIndex
```typescript
interface BubbleIndex {
  value: number; // 0-100
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  components: {
    [metricName: string]: number;
  };
  lastUpdated: string;
  nextRefresh: string;
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid date format",
    "details": {
      "field": "start",
      "expected": "ISO 8601 date string"
    }
  },
  "timestamp": "2025-11-15T16:30:00Z"
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid API key |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | External API unavailable |

---

## Webhook Integration

### Newsletter Webhook
When a user subscribes, send webhook to Mailchimp/SendGrid:

```http
POST https://api.mailchimp.com/3.0/lists/{AUDIENCE_ID}/members
Authorization: Bearer YOUR_MAILCHIMP_API_KEY

{
  "email_address": "user@example.com",
  "status": "subscribed",
  "merge_fields": {
    "FREQUENCY": "weekly"
  }
}
```

---

## Testing

### Manual Testing with cURL

```bash
# Get bubble index
curl http://localhost:5000/api/metrics/bubble-index

# Get historical data
curl "http://localhost:5000/api/metrics/history?start=2023-01-01&end=2025-11-15&interval=monthly"

# Subscribe to newsletter
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","frequency":"weekly"}'
```

### Automated Testing

```bash
# Run backend tests
cd backend
npm test
```

---

## Deployment

### Environment Variables

See `.env.example` for complete list. Critical variables:

```bash
NODE_ENV=production
PORT=5000
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
API_SECRET_KEY=your-admin-api-key
```

### Deployment Platforms

**Recommended:**
- **Backend API**: Vercel, Railway, Render, AWS Lambda
- **Database**: Supabase (managed PostgreSQL)
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Caching**: Upstash Redis (serverless)

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t ai-bubble-api .
docker run -p 5000:5000 --env-file .env ai-bubble-api
```

---

## API Rate Limiting & Caching Strategy

To avoid hitting rate limits and optimize costs, implement the following:

### 1. Caching Strategy

**Stock Prices:**
- Cache for 15 minutes during market hours (9:30 AM - 4:00 PM ET)
- Cache for 24 hours after market close
- Invalidate cache on weekends

**S&P 500 Composition:**
- Cache for 24 hours
- Only refresh on index rebalancing announcements

**News Articles:**
- Cache for 1 hour
- Store in database for historical reference

**Economic Indicators (FRED):**
- Cache for 24 hours
- Most series update daily at most

### 2. Batch Requests

- Fetch all Magnificent 7 stocks in single batch request
- Use bulk endpoints where available (e.g., FMP batch quotes)
- Group API calls to minimize request count

### 3. Scheduled Jobs

**Daily at 4:30 PM ET (Market Close):**
- Fetch stock prices for all Magnificent 7 companies
- Calculate market cap and S&P 500 weights
- Update bubble index
- Store snapshot in database

**Weekly on Mondays:**
- Refresh news articles
- Update expert quotes database
- Check for index composition changes

**Monthly:**
- Aggregate historical data
- Generate trend reports
- Clean up old cache entries

### 4. Fallback Mechanisms

- If API fails, serve cached data with disclaimer
- Display "Last updated: X hours ago" timestamps
- Log all API failures for monitoring
- Implement exponential backoff for retries

### 5. Request Prioritization

**High Priority (Real-time):**
- Health check endpoint
- Current bubble index
- Newsletter subscriptions

**Medium Priority (15-min cache):**
- Historical data queries
- Metrics dashboard

**Low Priority (24-hour cache):**
- Expert quotes
- Data source citations
- Static content

---

## Security Best Practices

### 1. API Key Management

**Never commit API keys to Git:**
```bash
# Add to .gitignore
.env
.env.local
.env.production
*.key
```

**Use environment-specific keys:**
- Separate keys for development and production
- Rotate keys every 90 days
- Monitor usage in each API provider's dashboard

**Immediately rotate if exposed:**
```bash
# If keys are accidentally committed:
1. Revoke exposed keys in provider dashboard
2. Generate new keys
3. Update .env files
4. Use git-secrets or similar tools to prevent future leaks
```

### 2. Rate Limiting (Backend API)

**Implement rate limiting on your API endpoints:**
```javascript
// Already configured in backend with express-rate-limit
const rateLimit = require('express-rate-limit');

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', publicLimiter);
```

### 3. Input Validation

**Validate all user inputs:**
- Email addresses (newsletter signup)
- Date ranges (historical data queries)
- Query parameters (prevent injection attacks)

**Example:**
```javascript
// Validate date format
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};
```

### 4. CORS Configuration

**Restrict CORS to your domain:**
```javascript
// backend/src/server.js
const cors = require('cors');

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://aibubbleanalytics.com'
    : 'http://localhost:3000',
  credentials: true
}));
```

### 5. Error Handling

**Never expose sensitive information in errors:**
```javascript
// ❌ Bad - exposes internal details
res.status(500).json({ error: err.message });

// ✅ Good - generic error message
res.status(500).json({
  error: 'Internal server error',
  code: 'INTERNAL_ERROR'
});
```

### 6. Monitoring & Alerts

**Set up monitoring for:**
- API usage approaching rate limits
- Unusual traffic patterns
- Failed authentication attempts
- Error rates above threshold
- Database connection issues

**Tools:**
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)
- Log aggregation (Papertrail, Loggly)

---

## API Costs Breakdown

### Free Tier (Hobby/MVP) - $0/month
**Recommended for initial development:**

- **Alpha Vantage**: Free tier (25 requests/day)
  - Sufficient for daily updates of 7 stocks
- **Financial Modeling Prep**: Free tier (250 requests/day)
  - More than enough for S&P 500 composition checks
- **Finnhub**: Free tier (60 calls/minute)
  - Sufficient for daily price updates
- **NewsAPI**: Free tier (100 requests/day)
  - Adequate for daily news aggregation
- **FRED**: Free unlimited
  - All economic indicators
- **Census API**: Free unlimited
  - Business AI adoption data
- **SendGrid**: Free (100 emails/day)
  - Newsletter delivery for initial users
- **Supabase**: Free tier
  - Database and authentication

**Limitations:**
- Manual news aggregation may be needed
- Limited to daily data updates (not real-time)
- Newsletter limited to 100 subscribers per day

**Total Cost**: **$0/month**

---

### Budget-Friendly Production - $29-79/month
**Recommended for small-scale production:**

- **Financial Modeling Prep Starter**: $29/month
  - 750 requests/day, comprehensive data
- **Alpha Vantage**: Free tier (sufficient)
- **Finnhub**: Free tier (sufficient)
- **NewsAPI**: Free tier OR RSS alternative ($0)
- **SendGrid**: $19.95/month (up to 50,000 emails)
  - Upgrade when newsletter grows past 100/day
- **Supabase**: Free tier (upgrade to $25 when needed)
- **SerpAPI**: $50/month (optional, use pytrends free alternative)

**Total Cost**: **$29-79/month**

---

### Recommended Tier (Production) - $575/month
**For serious production deployment:**

- **Alpha Vantage Premium**: $49.99/month
  - 75 requests/minute, real-time updates
- **Finnhub Premium**: $59.99/month
  - 300 calls/minute, comprehensive metrics
- **Financial Modeling Prep Pro**: $79/month
  - 10,000 requests/day, all datasets
- **NewsAPI Business**: $449/month
  - Unlimited historical access, no rate limits
  - **Note**: This is expensive - consider alternatives like Bing News API or custom RSS aggregation
- **SerpAPI**: $50/month
  - Google Trends data
- **SendGrid**: $19.95/month
  - 50,000 emails/month
- **Supabase Pro**: $25/month
  - 8GB database, no bandwidth limits

**Total**: **~$575/month** (or ~$200/month with NewsAPI alternative)

---

### Enterprise Tier - $44,000+/year
**For institutional-grade data:**

- **Bloomberg Terminal**: $24,000/year
  - Real-time market data, analytics
- **PitchBook**: $20,000+/year
  - Comprehensive VC and private equity data
- **FactSet**: ~$30,000/year
  - Financial data and analytics platform
- **Refinitiv Eikon**: ~$25,000/year
  - Alternative to Bloomberg

**Total**: **$44,000+/year**

---

### Cost Optimization Tips

1. **Start with free tiers** - All APIs provide free tiers sufficient for development
2. **Use caching aggressively** - Reduce API calls by 80-90%
3. **Batch requests** - Fetch multiple stocks in one call when possible
4. **Schedule wisely** - Only fetch data when markets are open
5. **Monitor usage** - Set up alerts before hitting rate limits
6. **Consider alternatives**:
   - NewsAPI Business ($449/month) → Bing News API ($30/month) or RSS feeds (free)
   - SerpAPI ($50/month) → Pytrends library (free, unofficial)
7. **Scale gradually** - Only upgrade when free tiers become insufficient

---

## Support & Contributing

**Issues:** https://github.com/Chrisfoz/ai-bubble-analytics/issues
**Documentation:** https://github.com/Chrisfoz/ai-bubble-analytics#readme
**License:** MIT

---

**Last Updated:** November 15, 2025
**Version:** 1.0.0
