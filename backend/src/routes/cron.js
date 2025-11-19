/**
 * Cron Routes
 * Handles scheduled jobs triggered by Vercel Cron or external schedulers
 * Security: Verifies cron secret to prevent unauthorized access
 */

const express = require('express');
const router = express.Router();
const { runDailyNewsletter } = require('../jobs/dailyNewsletter');

/**
 * POST /api/cron/daily-newsletter
 * Triggered by Vercel Cron at 7:00 AM daily
 *
 * Security: Vercel automatically adds authorization header
 * Format: Authorization: Bearer <CRON_SECRET>
 */
router.post('/daily-newsletter', async (req, res) => {
  console.log('\n📬 Daily Newsletter Cron Job Triggered');
  console.log(`⏰ ${new Date().toISOString()}`);
  console.log(`🔑 Auth Header: ${req.headers.authorization ? 'Present' : 'Missing'}\n`);

  try {
    // Verify cron secret (security measure)
    // Vercel automatically adds this, but we double-check
    const authHeader = req.headers.authorization;
    const expectedAuth = `Bearer ${process.env.CRON_SECRET || 'development-secret'}`;

    if (authHeader !== expectedAuth) {
      console.error('❌ Unauthorized cron request - invalid secret');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // Run the daily newsletter job
    const result = await runDailyNewsletter();

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Daily newsletter job completed',
      timestamp: new Date().toISOString(),
      ...result
    });

  } catch (error) {
    console.error('\n❌ Cron job failed:', error);

    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/cron/test-newsletter
 * Test endpoint for manual testing (development only)
 * Should be disabled in production or require additional auth
 */
router.get('/test-newsletter', async (req, res) => {
  // Only allow in development or with admin secret
  if (process.env.NODE_ENV === 'production' && req.query.admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({
      success: false,
      error: 'Test endpoint disabled in production'
    });
  }

  console.log('\n🧪 Running Newsletter Test...\n');

  try {
    const result = await runDailyNewsletter();

    res.status(200).json({
      success: true,
      message: 'Test newsletter completed',
      timestamp: new Date().toISOString(),
      ...result
    });

  } catch (error) {
    console.error('Test failed:', error);

    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/cron/status
 * Health check for cron system
 */
router.get('/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cron system operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    jobs: [
      {
        name: 'daily-newsletter',
        schedule: '0 7 * * *', // 7:00 AM daily
        description: 'Send daily AI Bubble Index newsletter to all active subscribers'
      }
    ]
  });
});

module.exports = router;
