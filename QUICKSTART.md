# Quick Start Guide - 10 Minutes to Running

## Step 1: Prerequisites (1 minute)

Check you have the required versions:
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

If not installed, download from https://nodejs.org

## Step 2: Clone & Install (2 minutes)

```bash
git clone https://github.com/Chrisfoz/ai-bubble-analytics.git
cd ai-bubble-analytics
npm install
```

## Step 3: Supabase Setup (5 minutes)

1. **Create account**: Go to https://supabase.com
2. **New project**: Click "New Project"
   - Name: ai-bubble-analytics
   - Database Password: (save this!)
   - Region: (closest to you)
3. **Run migration**:
   - Go to SQL Editor
   - Click "New Query"
   - Copy entire contents of `database/migrations/001_analytics_system.sql`
   - Paste and click "Run"
   - Should see "Success. No rows returned"
4. **Get credentials**:
   - Go to Settings > API
   - Copy your `URL` and `anon/public` key

## Step 4: Configure Environment (2 minutes)

Create these files:

**backend/.env**:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
PORT=3001
NODE_ENV=development
```

**frontend/.env**:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project`, `your-anon-key-here`, etc. with your actual Supabase credentials.

## Step 5: Start Development Servers (1 minute)

Open two terminal windows:

**Terminal 1 - Backend**:
```bash
cd backend
npm install
npm run dev
```
Should see: `Server running on port 3001`

**Terminal 2 - Frontend**:
```bash
cd frontend
npm install
npm start
```
Should see: `Compiled successfully!`

## Step 6: Access the App

Open your browser:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## Verify It's Working

1. **Sign up**: Create a new account
2. **Check database**: Go to Supabase > Table Editor > `login_events`
   - You should see your login recorded!
3. **Run a simulation**: Try the Portfolio Simulator
4. **Check simulations table**: Supabase > `portfolio_simulations`
   - Your simulation should be saved!

## Common Issues

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 3001
npx kill-port 3001
```

### Database connection error
- Double-check your .env files
- Make sure you ran the migration SQL
- Verify credentials in Supabase dashboard

### Module not found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Explore analytics**: Check out the Supabase dashboard to see live data
2. **Run SQL queries**: Try the analytics functions:
   ```sql
   SELECT * FROM get_daily_active_users(7);
   SELECT * FROM get_simulation_trends(30);
   ```
3. **Customize**: Edit frontend components in `frontend/src/components/`
4. **Add features**: Extend backend services in `backend/src/services/`

## Testing Analytics Capture

Open browser console and watch network tab:
- Login → Should see POST to `/api/analytics/login`
- Navigate pages → Should see POST to `/api/analytics/activity`
- Run simulation → Should see POST to `/api/portfolio/simulate`

All these events are being tracked in your database!

## Deployment Ready?

See `DEPLOYMENT.md` for production deployment to:
- Frontend: Vercel (free tier)
- Backend: Railway or Render (free/cheap tiers)
- Database: Supabase (free tier supports 500MB)

---

**You're all set!** The app is running locally with full analytics tracking.
