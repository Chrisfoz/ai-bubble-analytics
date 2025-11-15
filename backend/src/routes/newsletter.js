/**
 * Newsletter API Routes
 * Handles subscription, confirmation, and unsubscribe
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

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
 * POST /api/newsletter/subscribe
 * Subscribe a new user to the newsletter
 */
router.post('/subscribe', async (req, res) => {
  try {
    const { email, frequency = 'daily' } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return res.status(409).json({
          success: false,
          error: 'Email already subscribed'
        });
      }

      // If pending confirmation, resend confirmation email
      if (existing.status === 'pending_confirmation') {
        await sendConfirmationEmail(existing.email, existing.confirmation_token);
        return res.status(200).json({
          success: true,
          message: 'Confirmation email resent'
        });
      }
    }

    // Generate confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Insert new subscriber
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          frequency,
          status: 'pending_confirmation',
          confirmation_token: confirmationToken,
          metadata: {
            ip: req.ip,
            user_agent: req.get('user-agent'),
            referrer: req.get('referrer')
          }
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to subscribe'
      });
    }

    // Send confirmation email
    await sendConfirmationEmail(email, confirmationToken);

    res.status(201).json({
      success: true,
      message: 'Subscription successful. Please check your email to confirm.',
      data: { email }
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/newsletter/confirm/:token
 * Confirm email subscription
 */
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Find subscriber with this token
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('confirmation_token', token)
      .eq('status', 'pending_confirmation')
      .single();

    if (error || !subscriber) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/?error=invalid_token`);
    }

    // Update subscriber status
    await supabase
      .from('subscribers')
      .update({
        status: 'active',
        confirmed_at: new Date().toISOString(),
        confirmation_token: null
      })
      .eq('id', subscriber.id);

    // Send welcome email
    await sendWelcomeEmail(subscriber.email);

    // Redirect to success page
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/newsletter?subscribed=true`);

  } catch (error) {
    console.error('Confirm error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/?error=server_error`);
  }
});

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe from newsletter
 */
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase
      .from('subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email);

    if (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to unsubscribe'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * Send confirmation email via SendGrid
 */
async function sendConfirmationEmail(email, token) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('[DEV MODE] Confirmation email would be sent to:', email);
    console.log('[DEV MODE] Confirmation URL:', `${process.env.API_BASE_URL}/api/newsletter/confirm/${token}`);
    return;
  }

  const confirmUrl = `${process.env.API_BASE_URL}/api/newsletter/confirm/${token}`;

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME || 'AI Bubble Analytics'
    },
    subject: 'Confirm Your AI Bubble Analytics Subscription',
    text: `Please confirm your subscription by clicking: ${confirmUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #800000;">Confirm Your Subscription</h2>
        <p>Thank you for subscribing to AI Bubble Analytics!</p>
        <p>Click the button below to confirm your email address:</p>
        <a href="${confirmUrl}" style="display: inline-block; background-color: #800000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin: 16px 0;">
          Confirm Subscription
        </a>
        <p style="color: #666; font-size: 12px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="color: #666; font-size: 12px; word-break: break-all;">${confirmUrl}</p>
      </div>
    `
  };

  await sgMail.send(msg);
}

/**
 * Send welcome email via SendGrid
 */
async function sendWelcomeEmail(email) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('[DEV MODE] Welcome email would be sent to:', email);
    return;
  }

  const msg = {
    to: email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME || 'AI Bubble Analytics'
    },
    subject: 'Welcome to AI Bubble Analytics!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #800000;">Welcome to AI Bubble Analytics!</h2>
        <p>You're now subscribed to daily AI bubble updates.</p>
        <p>You'll receive your first newsletter tomorrow morning with:</p>
        <ul>
          <li>All 10 key bubble indicators</li>
          <li>Expert commentary from market leaders</li>
          <li>Latest news and developments</li>
          <li>Risk alerts when metrics cross critical thresholds</li>
        </ul>
        <p style="margin-top: 24px;">
          <a href="${process.env.FRONTEND_URL}" style="color: #800000; font-weight: bold;">Visit Dashboard →</a>
        </p>
      </div>
    `
  };

  await sgMail.send(msg);
}

module.exports = router;
