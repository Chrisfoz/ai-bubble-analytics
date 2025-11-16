# AI Bubble Analytics - Deployment Guide

**Version:** 1.0.0
**Last Updated:** November 15, 2025

This guide will help you deploy AI Bubble Analytics to production in under 30 minutes.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have accounts for:

- [ ] **Vercel** (or Netlify/Railway) - Frontend & Backend hosting
- [ ] **Supabase** - PostgreSQL database
- [ ] **SendGrid** - Email delivery (free tier: 100 emails/day)
- [ ] **GitHub** - Code repository
- [ ] **Domain** (optional) - Custom domain name

---

## 🚀 Quick Start (Fastest Deployment - Vercel)

### Step 1: Fork & Clone Repository

```bash
# Clone your repository
git clone https://github.com/Chrisfoz/ai-bubble-analytics.git
cd ai-bubble-analytics

# Install dependencies
npm run install:all
```

### Step 2: Set Up Supabase Database

1. **Create Supabase Project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Name: `ai-bubble-analytics`
   - Set a strong database password
   - Choose region closest to your users

2. **Run Database Initialization**
   - Go to your project → SQL Editor
   - Copy contents of `database/init.sql`
   - Click "Run"
   - Verify tables created: `subscribers`, `email_logs`, `daily_metrics_snapshots`

3. **Get API Keys**
   - Go to Settings → API
   - Copy `Project URL` (SUPABASE_URL)
   - Copy `anon public` key (SUPABASE_ANON_KEY)
   - Copy `service_role` key (SUPABASE_SERVICE_ROLE_KEY)

### Step 3: Set Up SendGrid

1. **Create SendGrid Account**
   - Go to https://sendgrid.com/
   - Sign up (free tier: 100 emails/day)
   - Verify your email address

2. **Create API Key**
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permission
   - Copy API key (starts with `SG.`)

3. **Verify Sender Email**
   - Go to Settings → Sender Authentication
   - Single Sender Verification (quick) OR Domain Authentication (better deliverability)
   - Add `newsletter@yourdomain.com` or use your email
   - Verify via email link

### Step 4: Deploy to Vercel

1. **Connect GitHub to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   ```

   Or use web interface:
   - Go to https://vercel.com/
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Environment Variables**

   In Vercel dashboard, go to Settings → Environment Variables and add:

   ```bash
   # Backend
   NODE_ENV=production
   PORT=5000
   API_BASE_URL=https://your-project.vercel.app
   FRONTEND_URL=https://your-project.vercel.app

   # Database (Supabase)
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJxxx...
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

   # Email (SendGrid)
   SENDGRID_API_KEY=SG.xxxxx
   SENDGRID_FROM_EMAIL=newsletter@yourdomain.com
   SENDGRID_FROM_NAME=AI Bubble Analytics

   # CORS
   CORS_ORIGINS=https://your-project.vercel.app

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Deploy**
   ```bash
   # Via CLI
   vercel --prod

   # Or via Vercel Dashboard
   # Push to main branch → auto-deploys
   ```

4. **Verify Deployment**
   - Visit `https://your-project.vercel.app`
   - Check `https://your-project.vercel.app/api/health`
   - Should return `{"status":"healthy"}`

---

## 🔧 Configuration Details

### Frontend Configuration

**File:** `frontend/.env.production`

```bash
REACT_APP_API_URL=https://your-project.vercel.app/api
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend Configuration

**File:** `.env` (DO NOT commit to Git)

```bash
# Copy from .env.example and fill in your values
cp .env.example .env
```

### Build Commands

- **Frontend**: `cd frontend && npm run build`
- **Backend**: `cd backend && npm start` (runs directly, no build needed)

---

## 📊 Database Management

### Accessing Supabase Database

```bash
# Via Supabase Dashboard
# Go to Table Editor to view/edit data

# Via SQL Editor
# Run custom queries

# Via Supabase CLI (optional)
npx supabase db push
```

### Common Database Operations

**View all subscribers:**
```sql
SELECT email, status, subscribed_at, confirmed_at
FROM subscribers
ORDER BY subscribed_at DESC;
```

**Count active subscribers:**
```sql
SELECT COUNT(*) FROM subscribers WHERE status = 'active';
```

**View recent email logs:**
```sql
SELECT email, subject, status, sent_at
FROM email_logs
ORDER BY sent_at DESC
LIMIT 100;
```

**Check email deliverability:**
```sql
SELECT
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM email_logs
WHERE sent_at >= NOW() - INTERVAL '7 days'
GROUP BY status;
```

---

## 📧 Newsletter Automation

### Option 1: Vercel Cron (Recommended for Vercel)

Already configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-newsletter",
      "schedule": "0 7 * * *"
    }
  ]
}
```

**Create cron endpoint:**

**File:** `backend/src/routes/cron.js`

```javascript
const express = require('express');
const router = express.Router();

router.get('/daily-newsletter', async (req, res) => {
  // Verify request is from Vercel
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Run newsletter send logic
  // ... (see NEWSLETTER_WORKFLOW.md)

  res.status(200).json({ success: true });
});

module.exports = router;
```

### Option 2: GitHub Actions (Free, Serverless)

Already configured in `.github/workflows/daily-newsletter.yml` (create if needed)

```yaml
name: Daily Newsletter

on:
  schedule:
    - cron: '0 12 * * *' # 7 AM EST = 12 PM UTC
  workflow_dispatch:

jobs:
  send-newsletter:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - name: Send Newsletter
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
          SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
          SENDGRID_FROM_EMAIL: ${{ secrets.SENDGRID_FROM_EMAIL }}
          SENDGRID_FROM_NAME: ${{ secrets.SENDGRID_FROM_NAME }}
          FRONTEND_URL: ${{ secrets.FRONTEND_URL }}
          API_BASE_URL: ${{ secrets.API_BASE_URL }}
        run: cd backend && node src/jobs/dailyNewsletter.js
```

Add secrets in GitHub: Settings → Secrets and variables → Actions

---

## 🧪 Testing

### Test Newsletter Subscription

```bash
# Test subscription endpoint
curl -X POST https://your-project.vercel.app/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Expected response:
# {"success":true,"message":"Subscription successful. Please check your email to confirm."}
```

### Test Health Endpoint

```bash
curl https://your-project.vercel.app/api/health

# Expected response:
# {"status":"healthy","timestamp":"2025-11-15T...","environment":"production"}
```

### Test Metrics Endpoint

```bash
curl https://your-project.vercel.app/api/metrics/bubble-index

# Should return bubble index data
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ **DO**: Use Vercel/platform environment variables
- ❌ **DON'T**: Commit `.env` files to Git
- ❌ **DON'T**: Hardcode API keys in code

### 2. Rate Limiting
- Already configured in `backend/src/index.js`
- Default: 100 requests per 15 minutes
- Adjust in environment variables if needed

### 3. CORS
- Only allow your frontend domain
- Update `CORS_ORIGINS` environment variable
- Example: `https://aibubbleanalytics.com,https://www.aibubbleanalytics.com`

### 4. Database Security
- ✅ Row Level Security (RLS) enabled
- ✅ Service role required for writes
- ✅ Anon key for public reads only

### 5. Email Verification
- ✅ Double opt-in (confirmation required)
- ✅ One-click unsubscribe
- ✅ CAN-SPAM Act compliant

---

## 📈 Monitoring & Analytics

### Supabase Dashboard
- View real-time database activity
- Monitor API usage
- Check error logs

### SendGrid Dashboard
- Email delivery rate
- Open rate
- Click rate
- Bounce rate
- Track engagement

### Vercel Analytics (Optional)
- Add Vercel Analytics for free
- Track page views, unique visitors
- Performance metrics

### Google Analytics (Optional)
- Add GA4 measurement ID to `REACT_APP_GA_MEASUREMENT_ID`
- Track user behavior
- Set up goals and conversions

---

## 🚨 Troubleshooting

### Frontend Issues

**Problem:** White screen / App not loading
```bash
# Check browser console for errors
# Verify API URL in environment variables
# Check network tab for failed requests
```

**Problem:** API calls failing
```bash
# Verify CORS_ORIGINS includes your frontend domain
# Check backend health endpoint
# Verify environment variables are set
```

### Backend Issues

**Problem:** 500 Internal Server Error
```bash
# Check Vercel logs: vercel logs
# Verify all environment variables are set
# Check Supabase connection
```

**Problem:** Newsletter not sending
```bash
# Verify SendGrid API key is valid
# Check sender email is verified
# Check Supabase subscribers table has active subscribers
# Review email_logs table for errors
```

### Database Issues

**Problem:** Can't connect to Supabase
```bash
# Verify SUPABASE_URL and keys are correct
# Check Supabase project is active
# Verify network/firewall settings
```

**Problem:** Row Level Security blocking queries
```bash
# Ensure using service_role key for backend operations
# Check RLS policies are correct
# Use anon key only for public reads
```

---

## 🔄 Updates & Maintenance

### Deploying Updates

```bash
# 1. Make changes locally
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Update feature X"
git push

# 4. Vercel auto-deploys from main branch
# Or manually deploy:
vercel --prod
```

### Database Migrations

```bash
# For schema changes:
# 1. Write migration SQL
# 2. Test in Supabase SQL Editor
# 3. Apply to production
# 4. Update init.sql for new deployments
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Or update specific package
npm install package@latest
```

---

## 💰 Cost Estimation

### Free Tier (Hobby/MVP)
- **Vercel**: Free (100GB bandwidth, unlimited sites)
- **Supabase**: Free (500MB database, 50MB file storage)
- **SendGrid**: Free (100 emails/day)
- **Total**: $0/month ✅

### Production Tier (Growing)
- **Vercel Pro**: $20/month (1TB bandwidth)
- **Supabase Pro**: $25/month (8GB database)
- **SendGrid Essentials**: $19.95/month (50,000 emails/month)
- **Total**: ~$65/month

### Scale Tier (High Traffic)
- **Vercel Enterprise**: Custom pricing
- **Supabase Team**: $599/month
- **SendGrid Pro**: $89.95/month (100,000 emails/month)
- **Total**: $690+/month

---

## 📚 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **SendGrid Documentation**: https://docs.sendgrid.com/
- **Vercel Documentation**: https://vercel.com/docs
- **React Documentation**: https://react.dev/
- **Express Documentation**: https://expressjs.com/

- **Project Documentation**:
  - `README.md` - Project overview
  - `API.md` - API endpoints and integration
  - `NEWSLETTER_WORKFLOW.md` - Newsletter automation
  - `METRICS.md` - Metrics explanations
  - `QUICKSTART.md` - Local development

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Test all pages load correctly
- [ ] Verify newsletter subscription works
- [ ] Confirm email confirmation works
- [ ] Test unsubscribe flow
- [ ] Check health endpoint returns 200
- [ ] Verify metrics endpoints return data
- [ ] Set up custom domain (optional)
- [ ] Configure DNS records
- [ ] Enable HTTPS (auto with Vercel)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Set up monitoring/alerts
- [ ] Schedule automated backups
- [ ] Document any customizations

---

## 🎉 Success!

Your AI Bubble Analytics platform is now live!

**Next Steps:**
1. Test the newsletter subscription flow
2. Monitor SendGrid deliverability metrics
3. Track subscriber growth
4. Implement real API data sources (see API.md)
5. Set up analytics and monitoring
6. Promote your newsletter for brand recognition

**Support:**
- GitHub Issues: https://github.com/Chrisfoz/ai-bubble-analytics/issues
- Email: contact@aibubbleanalytics.com

---

**Last Updated:** November 15, 2025
**Version:** 1.0.0
