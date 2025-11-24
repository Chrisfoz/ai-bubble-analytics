# AI Bubble Trend Diagrams: Code & Top 10 Metrics

Ready-to-implement, evidence-based chart configurations using Chart.js (lightweight, CDN-ready) plus the **top 10 metrics** prioritized by institutional research from RBC Capital Markets, the Richmond Fed, and Apollo Global Management.

---

## **Top 10 AI Bubble Metrics to Track**

### **Tier 1: Market Structure Indicators**

#### 1. **Magnificent 7 Weight vs. Earnings Share** (RBC Capital Markets)
- **Why it matters**: When index weight > earnings share, divergence signals overvaluation. Currently at 44%+ weight vs. lagging profit share—surpassing dot-com extremes.
- **Source**: S&P 500 composition data, quarterly earnings reports
- **Update Frequency**: Quarterly
- **Warning Threshold**: Divergence > 10%

#### 2. **Private Fixed Investment Growth Rate** (Richmond Fed)
- **Why it matters**: AI hardware/software investment trajectory mirrors 1990s telecom boom but at **higher absolute levels**. Tracks real capex inflation.
- **Source**: Bureau of Economic Analysis, Haver Analytics
- **Update Frequency**: Quarterly
- **Warning Threshold**: YoY growth > 40%

#### 3. **Revenue Expectation Gap** (Exploding Topics)
- **Why it matters**: $600B gap between AI revenue expectations vs. actual revenue in 2024. Widening gap = bubble inflation.
- **Source**: Gartner forecasts, corporate earnings, IDC reports
- **Update Frequency**: Quarterly
- **Warning Threshold**: Gap > $500B

### **Tier 2: Financial Risk Indicators**

#### 4. **Debt-to-Capex Ratio for Hyperscalers**
- **Why it matters**: $1.5T of projected $2T 2028 AI capex will be debt-funded. DSCR <1.5x indicates unsustainable leverage.
- **Source**: SEC filings, corporate bond issuance data
- **Update Frequency**: Quarterly (earnings reports)
- **Warning Threshold**: Debt-to-Capex > 0.75

#### 5. **Network Dependency Index** (Medium analysis)
- **Why it matters**: Maps circular investments (e.g., Nvidia → OpenAI → Nvidia chips). Density >0.4 indicates systemic risk.
- **Source**: Venture funding data, corporate investment disclosures
- **Update Frequency**: Monthly
- **Warning Threshold**: Network density > 0.4

#### 6. **Hardware Depreciation vs. Claimed Lifespan** (Michael Burry warning)
- **Why it matters**: Companies claim 5-year GPU lifespans but write down in 3 years. Gap reveals accounting distortion.
- **Source**: 10-K filings, capex schedules, IRS depreciation tables
- **Update Frequency**: Annual (10-K filings)
- **Warning Threshold**: Gap > 2 years

### **Tier 3: Adoption & Sentiment Indicators**

#### 7. **AI Adoption Rate in Business**
- **Why it matters**: Surged from 3.7% (Sept 2023) to 10% (Sept 2025). If adoption stalls while investment grows, bubble risk increases.
- **Source**: U.S. Census Bureau Business Trends and Outlook Survey
- **Update Frequency**: Quarterly
- **Warning Threshold**: Adoption growth < 20% while investment growth > 50%

#### 8. **AI Bubble Search Volume**
- **Why it matters**: "AI bubble" searches up **1,567%** in 2 years. Sentiment indicator correlates with retail FOMO.
- **Source**: Google Trends, Twitter/X API
- **Update Frequency**: Daily
- **Warning Threshold**: YoY increase > 500%

### **Tier 4: Valuation & Concentration Indicators**

#### 9. **Top 10 S&P 500 Overvaluation Index** (Apollo Academy)
- **Why it matters**: Current top 10 more overvalued than 1990s IT bubble. Tracks P/E, P/S ratios vs. historical norms.
- **Source**: Bloomberg, company financials
- **Update Frequency**: Daily
- **Warning Threshold**: P/E > 35, P/S > 12

#### 10. **VC Funding Concentration**
- **Why it matters**: >50% of global VC now flows to AI. Concentration >40% historically precedes sector crashes.
- **Source**: PitchBook, CB Insights, NVCA
- **Update Frequency**: Quarterly
- **Warning Threshold**: Concentration > 40%

---

## **Chart Implementations**

See `/frontend/src/components/charts/` for implementation:

1. **DivergenceChart.jsx** - Magnificent 7 Weight vs. Earnings
2. **InvestmentComparisonChart.jsx** - AI vs. Telecom Bubble Trajectory
3. **NetworkDependencyChart.jsx** - Circular Investment Visualization
4. **RevenueGapChart.jsx** - Revenue Expectation vs. Reality
5. **AdoptionVsInvestmentChart.jsx** - Adoption Rate vs. Investment Growth
6. **SentimentChart.jsx** - AI Bubble Search Volume
7. **RecursiveFlowChart.jsx** - Sankey Diagram of Circular Investments

---

## **Data Sources & API Endpoints**

### Free APIs
- **FRED (St. Louis Fed)**: BEA investment data
  - Endpoint: `https://api.stlouisfed.org/fred/series/observations`
  - Rate Limit: 120 requests/minute

- **Alpha Vantage**: Stock data, market cap, earnings
  - Endpoint: `https://www.alphavantage.co/query`
  - Rate Limit: 25 requests/day (free tier), 75 requests/minute (premium)

- **Finnhub**: Real-time stock quotes, company financials
  - Endpoint: `https://finnhub.io/api/v1/`
  - Rate Limit: 60 API calls/minute (free tier)

- **Google Trends** (via unofficial API):
  - Library: `google-trends-api` npm package
  - Rate Limit: Conservative use (avoid bans)

### Paid APIs (Optional)
- **Alpha Vantage**: $49.99/month for professional
- **IEX Cloud**: $9/month for essentials
- **Refinitiv**: Enterprise pricing

---

## **Implementation Notes**

### **Data Refresh Schedule**
- **Daily**: Stock weights, market caps, search volume, sentiment
- **Weekly**: Network dependency updates
- **Quarterly**: BEA investment data, earnings shares, adoption rates, VC funding
- **Annually**: Revenue expectation models, depreciation schedules

### **Credibility Markers**
Each chart includes:
- **Source badge**: "Data: BEA, Census Bureau, Apollo Research"
- **Last updated**: ISO timestamp
- **Confidence interval**: Shaded areas for projections
- **Expert quote overlay**: e.g., "Sam Altman: 'Yes, AI is a bubble'"
- **Warning indicators**: Color-coded thresholds

### **Performance Optimization**
- Use Chart.js `decimation` plugin for >10k data points
- Lazy-load D3.js only for network diagrams
- Cache static data (historical bubbles) in localStorage
- Debounce real-time updates to max 1/second
- Use Web Workers for heavy calculations (Monte Carlo)

---

## **Key Visual Insights to Highlight**

1. **Crossover Points**: When investment growth exceeds adoption growth (Q3 2024)
2. **Divergence Magnitude**: Current weight-earnings gap = 10.4% vs. 6.2% at dot-com peak
3. **Circular Flows**: >$180B in recursive AI investments (Nvidia→Startups→Nvidia)
4. **Search Spike Correlation**: 1,567% search increase precedes accounting concerns
5. **Debt Acceleration**: Debt-to-Capex ratio trending toward 0.75 danger zone

---

## **Chart Configuration Standards**

All charts follow these standards:

### Colors
- **Warning Red**: `#ef4444`
- **Caution Amber**: `#f59e0b`
- **Normal Blue**: `#3b82f6`
- **Positive Green**: `#10b981`
- **Historical Gray**: `#6b7280`

### Annotations
- Bubble zones: Red overlay with opacity 0.1
- Historical peaks: Vertical dashed lines
- Thresholds: Horizontal warning lines

### Responsive Breakpoints
- Mobile: Single column, height 300px
- Tablet: 2 columns, height 400px
- Desktop: 3 columns, height 500px

---

## **Usage Examples**

### Import Chart Component
```jsx
import DivergenceChart from './components/charts/DivergenceChart';

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DivergenceChart />
      <InvestmentComparisonChart />
      <NetworkDependencyChart />
    </div>
  );
}
```

### Update Data Programmatically
```javascript
// Fetch latest metrics
const metrics = await fetch('/api/bubble/metrics/latest');

// Update chart
chartInstance.data.datasets[0].data = metrics.magnificent7Weight;
chartInstance.update();
```

### Export Chart as Image
```javascript
const canvas = document.getElementById('divergenceChart');
const image = canvas.toDataURL('image/png');
// Download or share
```

---

## **Legal Disclaimers for Charts**

All charts must include:
- "Educational purposes only. Not financial advice."
- "Historical patterns do not guarantee future results."
- "Data sourced from [specific sources], last updated [timestamp]"
- "Projections are estimates based on current trends"

---

## **Future Enhancements**

- [ ] Real-time WebSocket updates for daily metrics
- [ ] Export to PDF with all charts
- [ ] Custom date range selection
- [ ] Comparison overlays (multiple historical bubbles)
- [ ] Alert triggers when metrics cross thresholds
- [ ] Mobile app with push notifications
- [ ] Interactive tooltips with expert commentary
