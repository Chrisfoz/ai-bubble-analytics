/**
 * Daily Newsletter Job
 * Orchestrates the entire daily newsletter workflow:
 * 1. Fetch all 10 metrics from live sources
 * 2. Calculate AI Bubble Index
 * 3. Generate email content
 * 4. Send to all active subscribers via SendGrid batch API
 * 5. Log results to Supabase
 */

const { createClient } = require('@supabase/supabase-js');
const sgMail = require('@sendgrid/mail');
const { fetchAllMetrics } = require('../utils/metricsAggregator');
const { calculateABI } = require('../utils/abiCalculator');
const { generateDailyNewsletterHTML, generateDailyNewsletterText } = require('../utils/emailTemplates');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Main function - runs daily at 7:00 AM
 */
async function runDailyNewsletter() {
  const startTime = Date.now();
  console.log('\n═══════════════════════════════════════════════');
  console.log('🚀 Starting Daily Newsletter Job');
  console.log(`⏰ ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════════\n');

  const stats = {
    metricsCollected: 0,
    subscribersFetched: 0,
    emailsSent: 0,
    emailsFailed: 0,
    errors: []
  };

  try {
    // ========================================
    // STEP 1: Fetch All Metrics from Real APIs
    // ========================================
    console.log('📊 [Step 1/5] Fetching all 10 metrics from live sources...');
    const metrics = await fetchAllMetrics();
    stats.metricsCollected = Object.keys(metrics.data).length;
    console.log(`✓ Collected ${stats.metricsCollected} metrics\n`);

    // ========================================
    // STEP 2: Calculate AI Bubble Index
    // ========================================
    console.log('🧮 [Step 2/5] Calculating AI Bubble Index...');
    const abiData = calculateABI(metrics);
    console.log(`✓ ABI Score: ${abiData.abi}/100 (${abiData.riskLevel} Risk)`);
    console.log(`✓ Risk Color: ${abiData.riskColor}\n`);

    // ========================================
    // STEP 3: Save Snapshot to Database
    // ========================================
    console.log('💾 [Step 3/5] Saving metrics snapshot to database...');
    await saveMetricsSnapshot(abiData, metrics);
    console.log('✓ Snapshot saved\n');

    // ========================================
    // STEP 4: Fetch Active Subscribers
    // ========================================
    console.log('👥 [Step 4/5] Fetching active subscribers...');
    const { data: subscribers, error: subError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('status', 'active')
      .eq('frequency', 'daily');

    if (subError) {
      throw new Error(`Failed to fetch subscribers: ${subError.message}`);
    }

    stats.subscribersFetched = subscribers.length;
    console.log(`✓ Found ${subscribers.length} active daily subscribers\n`);

    if (subscribers.length === 0) {
      console.log('⚠️  No active subscribers found. Skipping email send.\n');
      return {
        success: true,
        message: 'No subscribers to send to',
        stats
      };
    }

    // ========================================
    // STEP 5: Send Emails via SendGrid
    // ========================================
    console.log('📧 [Step 5/5] Sending newsletter emails...');
    const emailResults = await sendBatchEmails(subscribers, abiData, metrics);
    stats.emailsSent = emailResults.sent;
    stats.emailsFailed = emailResults.failed;
    stats.errors = emailResults.errors;

    console.log(`✓ Sent: ${emailResults.sent}`);
    console.log(`✗ Failed: ${emailResults.failed}\n`);

    // ========================================
    // COMPLETION
    // ========================================
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('═══════════════════════════════════════════════');
    console.log('✅ Daily Newsletter Job Complete');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📊 Metrics: ${stats.metricsCollected}/10`);
    console.log(`👥 Subscribers: ${stats.subscribersFetched}`);
    console.log(`📧 Sent: ${stats.emailsSent}`);
    console.log(`❌ Failed: ${stats.emailsFailed}`);
    console.log('═══════════════════════════════════════════════\n');

    return {
      success: true,
      message: 'Newsletter sent successfully',
      stats,
      abi: abiData.abi,
      riskLevel: abiData.riskLevel
    };

  } catch (error) {
    console.error('\n❌ FATAL ERROR in Daily Newsletter Job:');
    console.error(error);
    console.error('\n');

    // Log error to database
    try {
      await logError(error, stats);
    } catch (logError) {
      console.error('Failed to log error to database:', logError);
    }

    return {
      success: false,
      error: error.message,
      stats
    };
  }
}

/**
 * Save metrics snapshot to Supabase for historical tracking
 */
async function saveMetricsSnapshot(abiData, metrics) {
  try {
    const snapshot = {
      snapshot_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      bubble_index: abiData.abi,
      risk_level: abiData.riskLevel,
      risk_color: abiData.riskColor,

      // Store all 10 normalized metrics
      mag7_divergence: metrics.data.magnificent7Divergence?.normalized || null,
      sp500_concentration: metrics.data.sp500Concentration?.normalized || null,
      cape_ratio: metrics.data.capeRatio?.normalized || null,
      vc_funding: metrics.data.vcFunding?.normalized || null,
      search_interest: metrics.data.searchInterest?.normalized || null,
      ai_spending: metrics.data.aiSpending?.normalized || null,
      gpu_spending: metrics.data.gpuSpending?.normalized || null,
      circular_financing: metrics.data.circularFinancing?.normalized || null,
      debt_ratios: metrics.data.debtRatios?.normalized || null,
      fed_indicator: metrics.data.fedIndicator?.normalized || null,

      // Store breakdown for analysis
      breakdown: abiData.breakdown,
      raw_metrics: metrics.data
    };

    // Upsert (update if exists, insert if not)
    const { error } = await supabase
      .from('daily_metrics_snapshots')
      .upsert(snapshot, {
        onConflict: 'snapshot_date'
      });

    if (error) {
      console.error('Error saving snapshot:', error);
      throw error;
    }

    return snapshot;
  } catch (error) {
    console.error('Failed to save metrics snapshot:', error);
    throw error;
  }
}

/**
 * Send emails in batches via SendGrid
 * SendGrid allows 1000 recipients per batch
 */
async function sendBatchEmails(subscribers, abiData, metrics) {
  const BATCH_SIZE = 1000;
  let sent = 0;
  let failed = 0;
  const errors = [];

  const emailSubject = `AI Bubble Daily | ABI ${abiData.abi} (${abiData.riskLevel} Risk) - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  // Process in batches
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    console.log(`  📤 Sending batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(subscribers.length / BATCH_SIZE)} (${batch.length} emails)...`);

    try {
      // Prepare messages for this batch
      const messages = batch.map(subscriber => {
        const htmlContent = generateDailyNewsletterHTML(abiData, metrics, subscriber);
        const textContent = generateDailyNewsletterText(abiData, metrics, subscriber);

        return {
          to: subscriber.email,
          from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: process.env.SENDGRID_FROM_NAME || 'AI Bubble Analytics'
          },
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
          trackingSettings: {
            clickTracking: { enable: true },
            openTracking: { enable: true }
          },
          customArgs: {
            subscriber_id: subscriber.id,
            abi_score: abiData.abi.toString(),
            risk_level: abiData.riskLevel
          }
        };
      });

      // Send batch via SendGrid
      await sgMail.send(messages);
      sent += batch.length;

      // Log successful sends to database
      await logEmailBatch(batch, 'sent', null, abiData);

    } catch (error) {
      console.error(`  ✗ Batch failed:`, error.message);
      failed += batch.length;
      errors.push({
        batch: Math.floor(i / BATCH_SIZE) + 1,
        error: error.message
      });

      // Log failed sends
      await logEmailBatch(batch, 'failed', error.message, abiData);
    }

    // Small delay between batches to avoid rate limits
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return { sent, failed, errors };
}

/**
 * Log email batch to database
 */
async function logEmailBatch(subscribers, status, errorMessage, abiData) {
  try {
    const logs = subscribers.map(sub => ({
      subscriber_id: sub.id,
      email: sub.email,
      subject: `AI Bubble Daily | ABI ${abiData.abi}`,
      status: status,
      error_message: errorMessage,
      metadata: {
        abi: abiData.abi,
        risk_level: abiData.riskLevel,
        risk_color: abiData.riskColor
      }
    }));

    const { error } = await supabase
      .from('email_logs')
      .insert(logs);

    if (error) {
      console.error('Failed to log emails:', error);
    }
  } catch (error) {
    console.error('Error logging email batch:', error);
  }
}

/**
 * Log errors to database
 */
async function logError(error, stats) {
  try {
    await supabase
      .from('job_errors')
      .insert({
        job_name: 'daily_newsletter',
        error_message: error.message,
        error_stack: error.stack,
        stats: stats,
        occurred_at: new Date().toISOString()
      });
  } catch (err) {
    console.error('Failed to log error:', err);
  }
}

module.exports = {
  runDailyNewsletter
};
