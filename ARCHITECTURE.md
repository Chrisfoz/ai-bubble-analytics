# AI Bubble Analytics - Architecture Documentation

## Project Overview

**Name**: AI Bubble Analytics  
**Version**: 1.0.0  
**Description**: Real-time tracking platform for AI market bubble using institutional-grade metrics  
**Repository**: https://github.com/Chrisfoz/ai-bubble-analytics  
**License**: MIT  

---

## Technology Stack

### Frontend

#### Core Framework
- **React**: ^18.2.0
- **React DOM**: ^18.2.0
- **React Scripts**: 5.0.1 (Create React App)

#### Routing & Navigation
- **React Router DOM**: ^6.20.1

#### State Management
- **Zustand**: ^4.4.7 (Lightweight state management)

#### HTTP Client
- **Axios**: ^1.6.2

#### Charting Libraries
- **Recharts**: ^2.10.3 (React charting library)
- **D3**: ^7.8.5 (Data manipulation)
- **Chart.js**: ^4.4.1
- **chartjs-plugin-annotation**: ^3.0.1

#### Styling
- **Tailwind CSS**: ^3.4.0
- **Autoprefixer**: ^10.4.16
- **PostCSS**: ^8.4.32

#### Backend Integration
- **Supabase JS**: ^2.39.0 (Database & Auth)

### Backend

#### Database
- **PostgreSQL** (via Supabase)
- **SQL Migrations**: Located in `database/migrations/`

#### API Structure
- RESTful API endpoints
- Real-time subscriptions via Supabase

---

## Package Versions & Dependencies

### Frontend Dependencies (package.json)

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "recharts": "^2.10.3",
    "d3": "^7.8.5",
    "zustand": "^4.4.7",
    "axios": "^1.6.2",
    "chart.js": "^4.4.1",
    "chartjs-plugin-annotation": "^3.0.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

---

## Node & npm Versions

- **Node.js**: v20.x or higher (Recommended: LTS)
- **npm**: 9.x or higher
- **Package Manager**: npm (can use pnpm or yarn as alternatives)

---

## Browser Support

### Target Browsers (from package.json)

**Production:**
- \>0.2% market share
- Not dead browsers
- Not Opera Mini

**Development:**
- Last 1 Chrome version
- Last 1 Firefox version
- Last 1 Safari version

### Polyfills Included
- ES6+ features via React Scripts
- CSS Grid & Flexbox (native)
- Fetch API (native in modern browsers)

---

## Project Structure

```
ai-bubble-analytics/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DynamicBubble.jsx
│   │   │   ├── EnhancedDynamicBubble.jsx
│   │   │   ├── ContextPage.jsx
│   │   │   ├── MetricsPage.jsx
│   │   │   ├── MetricsDashboard.jsx
│   │   │   ├── NewsPage.jsx
│   │   │   ├── NewsletterPage.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── charts/
│   │   │       ├── DivergenceChart.jsx
│   │   │       ├── AdoptionVsInvestmentChart.jsx
│   │   │       ├── InvestmentComparisonChart.jsx
│   │   │       ├── RevenueGapChart.jsx
│   │   │       ├── SentimentChart.jsx
│   │   │       ├── NetworkDependencyChart.jsx
│   │   │       └── index.js
│   │   ├── data/
│   │   │   ├── bubbleHistory.js
│   │   │   └── dataSources.js
│   │   ├── utils/
│   │   │   └── chartConfig.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── server.js
│   └── package.json
├── database/
│   └── migrations/
│       └── 001_analytics_system.sql
├── context/
│   ├── AI bubble.md
│   └── -cdJQ8UyVLA_cleaned.md
├── ARCHITECTURE.md
├── BUBBLE_ENHANCEMENTS.md
├── METRICS.md
├── QUICKSTART.md
├── README.md
└── package.json
```

---

## Key Features & Components

### 1. Enhanced Dynamic Bubble Visualization
- **Component**: `EnhancedDynamicBubble.jsx`
- **Features**:
  - Historical timeline slider (2-year data)
  - Data source transparency panel
  - Real-time updates every 5 minutes
  - Interactive "How It Works" panel
  - Risk level indicators (Low/Moderate/High/Extreme)

### 2. Metrics Dashboard
- **Component**: `MetricsDashboard.jsx`
- **Charts**: 6 institutional-grade metrics
  - Divergence Chart (S&P 500 weight vs earnings)
  - Adoption vs Investment Gap
  - Investment Comparison (AI vs Telecom bubble)
  - Revenue Gap Analysis
  - Sentiment Tracking (Google Trends)
  - Network Dependency Graph

### 3. Context & Education
- **Component**: `ContextPage.jsx`
- **Content**: Circular financing, expert warnings, opposing views

### 4. News & Commentary
- **Component**: `NewsPage.jsx`
- **Features**: Video links, curated news, expert quotes

### 5. Newsletter Subscription
- **Component**: `NewsletterPage.jsx`
- **Integration**: Email collection (backend API pending)

---

## Data Sources

### Real-time Metrics
1. **S&P Global** - Magnificent 7 Weight vs Earnings (Daily @ 4:30 PM EST)
2. **Gartner + IDC** - AI Revenue Expectation Gap (Quarterly)
3. **SEC Filings** - Hyperscaler Debt-to-Capex Ratio (Quarterly, 10-K/10-Q)
4. **U.S. Census Bureau** - Business AI Adoption Rate (Monthly, first Tuesday)
5. **Google Trends** - "AI Bubble" Search Volume (Hourly)
6. **PitchBook** - Circular Investment Flows (Weekly, Friday)
7. **Bloomberg + FactSet** - AI Company Valuation Ratios (Daily @ 5:00 PM EST)
8. **Institutional Warnings** - RBC, Goldman Sachs, Apollo (Ad-hoc)
9. **Crunchbase** - AI Venture Capital Flow (Weekly, Monday)
10. **IEA** - AI Infrastructure Energy Costs (Monthly)

---

## API Endpoints (Backend)

### Planned Endpoints
- `GET /api/metrics` - Fetch current bubble metrics
- `GET /api/metrics/history` - Historical data points
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `GET /api/news` - Latest news articles
- `GET /api/data-sources` - Data source metadata

---

## Environment Variables

### Frontend (.env)
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
DATABASE_URL=your_postgres_connection_string
```

---

## Build & Deployment

### Development
```bash
# Frontend
cd frontend
npm install
npm start  # Runs on http://localhost:3000

# Backend
cd backend
npm install
npm start  # Runs on http://localhost:3001
```

### Production Build
```bash
cd frontend
npm run build
# Creates optimized build in frontend/build/

# Deploy to:
# - Vercel (recommended for frontend)
# - Netlify
# - GitHub Pages
```

### Database Migration
```bash
# Execute initial migration
psql -U your_user -d your_db -f database/migrations/001_analytics_system.sql
```

---

## Known Issues & Deprecation Warnings

### npm Warnings (Non-Critical)
1. **inflight@1.0.6** - Deprecated, leaks memory
2. **glob@7.2.3** - Use v9+
3. **rimraf@3.0.2** - Use v4+
4. **eslint@8.57.1** - Update to v9+
5. **@babel/plugin-proposal-*** - Merged into ES standard

### Security Vulnerabilities
- **27 vulnerabilities** (24 moderate, 3 high)
- Run `npm audit fix` to address non-breaking changes
- Run `npm audit fix --force` for breaking changes (not recommended without review)

### React Router Warnings
- **v7_startTransition** - Future flag for React.startTransition
- **v7_relativeSplatPath** - Relative route resolution changes

**Action**: These are future-proofing warnings for React Router v7. No immediate action required.

---

## Performance Considerations

### Optimization Strategies
1. **Code Splitting**: React.lazy() for route-based splitting
2. **Memoization**: React.memo() for expensive components
3. **Image Optimization**: WebP format, lazy loading
4. **Bundle Size**: Current ~2MB (acceptable for dashboard app)
5. **Caching**: Service worker for offline support (PWA-ready)

### Bundle Analysis
```bash
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

---

## Testing Strategy

### Unit Tests (To Be Implemented)
- **Framework**: Jest + React Testing Library
- **Coverage Target**: 80%+
- **Test Files**: `*.test.js` co-located with components

### Integration Tests
- **Framework**: Cypress or Playwright
- **E2E Scenarios**:
  - Navigation flow
  - Timeline slider interaction
  - Data source panel toggle
  - Newsletter subscription

### Performance Tests
- **Lighthouse CI**: Scores > 90 for all categories
- **Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Compatibility Matrix

### Verified Combinations

| React | React Router | Tailwind | Node | Status |
|-------|-------------|----------|------|--------|
| 18.2.0 | 6.20.1 | 3.4.0 | 20.x | ✅ Working |
| 18.2.0 | 6.20.1 | 3.4.0 | 18.x | ✅ Working |
| 18.2.0 | 6.20.1 | 3.4.0 | 16.x | ⚠️ May have issues |

### Breaking Changes to Watch
1. **React 19**: May require React Router DOM v7
2. **Tailwind CSS 4**: Configuration changes expected
3. **Chart.js 5**: API changes for plugins

---

## Security

### Authentication
- **Provider**: Supabase Auth
- **Methods**: Email/password, OAuth (Google, GitHub)
- **JWT**: Stored in localStorage (consider httpOnly cookies for production)

### API Security
- **CORS**: Configured for allowed origins
- **Rate Limiting**: TBD (implement express-rate-limit)
- **Input Validation**: Sanitize all user inputs

### Data Privacy
- **GDPR Compliance**: User consent for analytics
- **Newsletter**: Double opt-in required
- **Data Storage**: Encrypted at rest (Supabase default)

---

## Monitoring & Logging

### Error Tracking (To Be Implemented)
- **Frontend**: Sentry or LogRocket
- **Backend**: Winston or Pino logger

### Analytics
- **Google Analytics 4**: User behavior tracking
- **Plausible**: Privacy-friendly alternative

### Performance Monitoring
- **Web Vitals**: Built-in with React Scripts
- **Custom Metrics**: Track bubble interaction, timeline usage

---

## Future Enhancements

### Planned Features
1. **Real-time API Integration**: Replace static data with live feeds
2. **User Accounts**: Save custom watchlists, alert preferences
3. **Mobile App**: React Native version
4. **AI Predictions**: Machine learning model for bubble trajectory
5. **Social Features**: Share custom timeline views
6. **Export Reports**: PDF/CSV export of metrics

### Technical Debt
1. Replace deprecated npm packages
2. Upgrade to React Router v7 when stable
3. Implement comprehensive test suite
4. Add API rate limiting and caching
5. Optimize bundle size (code splitting)

---

## Contributing Guidelines

### Code Style
- **Linting**: ESLint (React recommended config)
- **Formatting**: Prettier (optional)
- **Naming**: PascalCase for components, camelCase for functions

### Git Workflow
- **Branches**: `main` (production), `develop` (staging), `feature/*`
- **Commits**: Conventional Commits format
- **PRs**: Require 1 approval, passing CI

---

## Support & Documentation

### Documentation Links
- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com/docs)
- [Recharts](https://recharts.org)

### Project Documentation
- `README.md` - Quick start guide
- `QUICKSTART.md` - Detailed setup
- `METRICS.md` - Metrics definitions
- `BUBBLE_ENHANCEMENTS.md` - Feature documentation
- `ARCHITECTURE.md` - This file

---

## Version History

### v1.0.0 (November 15, 2025)
- ✅ Initial release
- ✅ 5 main pages (Home, Metrics, Context, News, Newsletter)
- ✅ Enhanced bubble visualization with timeline
- ✅ 10 institutional-grade metrics
- ✅ Data source transparency
- ✅ Responsive design
- ✅ PWA-ready

---

## License

MIT License - See LICENSE file for full text

---

**Last Updated**: November 15, 2025  
**Maintained By**: Chris Foz  
**Contact**: https://github.com/Chrisfoz
