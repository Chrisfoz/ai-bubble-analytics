# Deployment Guide - AI Bubble Analytics

## Overview

This guide covers deploying the AI Bubble Analytics application to **Vercel** (recommended) and alternative platforms.

---

## 🚀 Vercel Deployment (Recommended)

### Why Vercel?

- ✅ **Optimized for React**: Built by the creators of Next.js
- ✅ **Zero Configuration**: Automatic detection of Create React App
- ✅ **Global CDN**: Fast worldwide delivery
- ✅ **Automatic HTTPS**: SSL certificates included
- ✅ **GitHub Integration**: Auto-deploy on push
- ✅ **Free Tier**: Generous limits for personal projects
- ✅ **Edge Functions**: Ready for future backend needs

### Prerequisites

1. GitHub account with your repository pushed
2. Vercel account (sign up at https://vercel.com)
3. Working local build: `cd frontend && npm run build`

### Step 1: Prepare Your Repository

Ensure your repository is ready:

```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: ai-bubble-analytics
# - Directory: ./ (current directory)
# - Override settings? No

# For production deployment
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository: `Chrisfoz/ai-bubble-analytics`
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Click "Deploy"

### Step 3: Configure Environment Variables (Optional)

If you need environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables:
   ```
   REACT_APP_API_BASE_URL=https://your-api.com
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_key
   ```

3. Redeploy for changes to take effect

### Step 4: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain: `aibubble.com`
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL

### Step 5: Enable Automatic Deployments

Already enabled by default! Every push to `main` will auto-deploy.

**Branch Previews**: Pushes to other branches create preview URLs.

---

## 📋 Vercel Configuration File

Create `vercel.json` in your repository root (optional, for advanced config):

```json
{
  "version": 2,
  "name": "ai-bubble-analytics",
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔧 Build Optimization for Production

### 1. Optimize Bundle Size

```bash
cd frontend

# Analyze bundle
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### 2. Enable Compression

Vercel automatically enables:
- ✅ Gzip compression
- ✅ Brotli compression
- ✅ Image optimization

### 3. Add Performance Monitoring

Update `frontend/src/index.js`:

```javascript
import { reportWebVitals } from './reportWebVitals';

// Send to analytics
reportWebVitals(console.log);
```

---

## 🌐 Alternative Deployment Options

### Netlify

1. **Setup**:
   ```bash
   npm install -g netlify-cli
   cd frontend
   netlify deploy
   ```

2. **Configuration** (`netlify.toml`):
   ```toml
   [build]
     base = "frontend"
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update `frontend/package.json`**:
   ```json
   {
     "homepage": "https://chrisfoz.github.io/ai-bubble-analytics",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

---

## 🔒 Security Best Practices

### 1. Environment Variables

Never commit secrets! Use Vercel's environment variables:

```bash
# Add via CLI
vercel env add REACT_APP_API_KEY production
```

### 2. Content Security Policy

Add to `frontend/public/index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### 3. HTTPS Only

Vercel enforces HTTPS automatically. For custom servers:

```javascript
// server.js
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## 📊 Performance Optimization

### Lighthouse Targets

Run Lighthouse audit:

```bash
npm install -g lighthouse
lighthouse https://your-vercel-url.vercel.app
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Optimization Checklist

- [x] Code splitting with React.lazy()
- [x] Image optimization (WebP)
- [x] Minification and compression
- [x] Service worker for offline support
- [x] CDN delivery (Vercel Edge Network)
- [ ] Lazy load charts (implement with React.lazy)
- [ ] Implement image lazy loading
- [ ] Add service worker caching strategy

---

## 🐛 Troubleshooting

### Issue: Build Fails on Vercel

**Solution**: Check build logs for errors

```bash
# Test build locally first
cd frontend
npm run build

# If successful locally but fails on Vercel:
# 1. Check Node version matches (v20.x)
# 2. Verify all dependencies are in package.json
# 3. Check for environment-specific code
```

### Issue: Blank Page After Deploy

**Solution**: Check routing configuration

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Environment Variables Not Working

**Solution**: Prefix must be `REACT_APP_`

```bash
# ✅ Correct
REACT_APP_API_URL=https://api.example.com

# ❌ Wrong
API_URL=https://api.example.com
```

### Issue: Large Bundle Size

**Solution**: Analyze and optimize

```bash
npx source-map-explorer 'build/static/js/*.js'

# Common fixes:
# 1. Use React.lazy() for route-based code splitting
# 2. Remove unused dependencies
# 3. Replace large libraries with smaller alternatives
```

---

## 📈 Monitoring & Analytics

### 1. Vercel Analytics (Recommended)

Enable in Vercel dashboard:
- Real User Monitoring
- Web Vitals tracking
- Geographic distribution

### 2. Google Analytics 4

Add to `frontend/public/index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
// frontend/src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Automatic Testing Before Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'
          
      - name: Install dependencies
        run: cd frontend && npm install
        
      - name: Run tests
        run: cd frontend && npm test -- --coverage
        
      - name: Build
        run: cd frontend && npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

---

## 🎯 Post-Deployment Checklist

After deploying to Vercel:

- [ ] Verify all pages load correctly
- [ ] Test navigation between routes
- [ ] Check responsive design on mobile
- [ ] Verify data sources panel works
- [ ] Test historical timeline slider
- [ ] Check newsletter form submission
- [ ] Verify all charts render correctly
- [ ] Test error logging
- [ ] Run Lighthouse audit (target 90+)
- [ ] Check console for errors
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify HTTPS works
- [ ] Check SEO meta tags
- [ ] Test Open Graph preview (Twitter, LinkedIn)

---

## 📱 Progressive Web App (PWA)

Your app is PWA-ready! To enhance:

1. **Update `frontend/public/manifest.json`** (already created)

2. **Add iOS meta tags** to `frontend/public/index.html`:
   ```html
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
   <meta name="apple-mobile-web-app-title" content="AI Bubble">
   <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png">
   ```

3. **Register Service Worker**:
   Already configured in Create React App!

---

## 🌍 Global Performance

### Vercel Edge Network

Your app automatically deploys to:
- 🇺🇸 North America: 6 regions
- 🇪🇺 Europe: 8 regions  
- 🇦🇺 Asia-Pacific: 10 regions
- 🇧🇷 South America: 2 regions

**Total: 26+ global locations**

### Performance Metrics

Expected performance:
- **TTFB**: < 100ms (global average)
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **TTI**: < 3.5s

---

## 💡 Tips & Best Practices

### 1. Use Preview Deployments

Every PR gets a unique URL:
```
https://ai-bubble-analytics-git-feature-branch-chrisfoz.vercel.app
```

### 2. Environment-Specific Builds

```javascript
// Use environment to toggle features
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}; // Disable logs in production
}
```

### 3. Cache Control

Vercel automatically sets optimal cache headers:
- Static assets: 1 year
- HTML: No cache (for instant updates)

### 4. Monitor Bundle Size

Add to `frontend/package.json`:

```json
{
  "scripts": {
    "analyze": "npm run build && source-map-explorer 'build/static/js/*.js'"
  }
}
```

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **React Deployment**: https://create-react-app.dev/docs/deployment
- **Performance Tips**: https://web.dev/vitals/
- **Vercel Community**: https://github.com/vercel/vercel/discussions

---

## 🎉 Success!

Your AI Bubble Analytics app is now live at:
- **Production**: `https://your-project.vercel.app`
- **Custom Domain**: `https://aibubble.com` (after configuration)

**Preview your deployment**: Every commit to main auto-deploys in ~30 seconds!

---

**Last Updated**: November 15, 2025  
**Deployment Platform**: Vercel  
**Build Time**: ~2 minutes  
**Global CDN**: 26+ locations
