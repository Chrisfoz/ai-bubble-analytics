# AI Bubble Impact Analytics

A comprehensive data-driven web application that helps users visualize and analyze the real-world impact of their AI investments against the backdrop of an expanding AI bubble, featuring live metrics, expert warnings, and predictive analytics.

## Overview

This platform provides investors with critical insights into the AI bubble phenomenon, combining:
- **Real-time bubble size tracking** ($1.5+ trillion global AI spending)
- **Portfolio impact simulation** with 4 scenario models
- **Expert warning aggregation** from industry leaders
- **Comprehensive analytics system** for user engagement tracking

## Key Features

### 1. Analytics Tracking System
- **Login Events**: IP, device type, location, session duration
- **User Activity**: Page views, simulations, interactions
- **Portfolio Simulations**: Investment scenario tracking
- **Metrics Dashboard**: DAU, trends, user statistics

### 2. Bubble Metrics Dashboard
- Real-time bubble valuation ($1.5T+)
- Historical comparison (dot-com, housing crisis)
- Debt-to-equity ratios for major AI players
- Market concentration metrics
- Bubble stress index (0-100 scale)

### 3. Investment Impact Simulator
- Personal portfolio scenario analysis
- 4 scenarios: Boom, Soft Landing, Bubble Pop, Stagflation
- Monte Carlo simulation engine (1000 iterations)
- Depreciation tsunami risk assessment
- Timeline projections (6 months to 5 years)

### 4. Expert Warning System
- High-profile observations (Sam Altman, Michael Burry, Jamie Dimon)
- Severity classification
- Real-time alerts
- Historical pattern analysis

### 5. Pop Date Predictor
- Algorithmic probability scoring
- Historical pattern matching
- Trigger event monitoring
- Confidence intervals

## Tech Stack

**Frontend**:
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- D3.js + Recharts (visualizations)
- Zustand (state management)

**Backend**:
- Node.js + Express
- Supabase (PostgreSQL database)
- RESTful API architecture
- Cron jobs for data updates

**Analytics**:
- Custom SQL functions
- Row-Level Security (RLS)
- Real-time metrics tracking
- Performance indexes

## Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
# Clone repository
git clone https://github.com/Chrisfoz/ai-bubble-analytics.git
cd ai-bubble-analytics

# Install dependencies
npm install
```

### Database Setup
1. Create a Supabase project at https://supabase.com
2. Run the migration:
   ```sql
   -- In Supabase SQL Editor
   -- Copy and run: database/migrations/001_analytics_system.sql
   ```
3. Get your API credentials from Settings > API

### Configuration
Create `.env` files:

**Backend** (`backend/.env`):
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
PORT=3001
```

**Frontend** (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm start
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Analytics System

### Database Schema

**Tables**:
- `login_events` - User login tracking
- `user_activity` - Activity monitoring
- `portfolio_simulations` - Simulation history
- `bubble_metrics` - Bubble size/stress data
- `expert_warnings` - Expert commentary

### SQL Analytics Functions

```sql
-- User login statistics
SELECT * FROM get_user_login_stats('user-uuid');
-- Returns: total_logins, avg_session_duration, last_login, most_common_device

-- Daily Active Users (last 30 days)
SELECT * FROM get_daily_active_users(30);
-- Returns: date, active_users

-- Simulation trends
SELECT * FROM get_simulation_trends(30);
-- Returns: scenario_type, simulation_count, avg_investment, avg_timeline
```

### Metrics Captured

**User Metrics**:
- Total users, DAU, MAU
- Session duration (avg, median)
- Device distribution
- Geographic breakdown

**Engagement Metrics**:
- Simulations per user
- Scenario preferences
- Completion rates
- Return user percentage

**Business Metrics**:
- Conversion funnel
- Average investment simulated
- Risk tolerance distribution
- Feature usage patterns

## API Endpoints

### Analytics
- `POST /api/analytics/login` - Record login event
- `POST /api/analytics/activity` - Track user activity
- `GET /api/analytics/user-stats/:userId` - Get user statistics
- `GET /api/analytics/dau` - Daily active users
- `GET /api/analytics/trends` - Simulation trends

### Bubble Metrics
- `GET /api/bubble/metrics` - Current bubble metrics
- `GET /api/bubble/historical` - Historical data
- `GET /api/bubble/stress-index` - Bubble stress index

### Portfolio
- `POST /api/portfolio/simulate` - Run simulation
- `GET /api/portfolio/history/:userId` - User's simulation history

### Warnings
- `GET /api/warnings` - Expert warnings
- `GET /api/warnings/recent` - Recent warnings

## Security

- Row-Level Security (RLS) enabled
- Users can only access their own data
- Rate limiting on API endpoints
- SQL injection protection
- XSS protection headers
- CORS restrictions

## Legal Disclaimer

**THIS APPLICATION IS FOR EDUCATIONAL PURPOSES ONLY. NOT FINANCIAL ADVICE.**

All bubble forecasts are speculative. Past performance does not guarantee future results. Consult qualified financial professionals before making investment decisions.

The developers and operators of this platform:
- Are NOT registered investment advisors
- Do NOT provide personalized financial advice
- Make NO guarantees about prediction accuracy
- Are NOT liable for investment losses

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

## Support

For issues or questions:
- GitHub Issues: https://github.com/Chrisfoz/ai-bubble-analytics/issues
- Documentation: See docs/ folder

## Roadmap

- [ ] Video content integration
- [ ] Email alert system
- [ ] PDF export reports
- [ ] Mobile app version
- [ ] Premium subscription tiers
- [ ] Real-time WebSocket updates
- [ ] Advanced Monte Carlo modeling

---

**Built for investors who want to understand AI investment risks**
