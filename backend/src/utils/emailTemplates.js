/**
 * Email Template Generator
 * Creates beautiful HTML emails with Berkshire Hathaway color palette
 * Mobile-optimized, inline CSS for email client compatibility
 */

/**
 * Generate daily newsletter HTML
 * @param {Object} abiData - ABI calculation results
 * @param {Object} metrics - Raw metrics data
 * @param {Object} subscriber - Subscriber info (for personalization)
 * @returns {String} - HTML email content
 */
function generateDailyNewsletterHTML(abiData, metrics, subscriber) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get RAG color based on risk level
  const ragColors = {
    'RED': '#DC2626',      // red-600
    'ORANGE': '#EA580C',   // orange-600
    'AMBER': '#D97706',    // amber-600
    'GREEN': '#16A34A'     // green-600
  };

  const riskColor = ragColors[abiData.riskColor];

  // Get top 3 risk factors
  const { getTopRiskFactors } = require('./abiCalculator');
  const topRisks = getTopRiskFactors(abiData.breakdown, 3);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Bubble Daily - ${date}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #0D1117; color: #E8E8E8;">

  <!-- Main Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0D1117;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Email Content (600px wide for compatibility) -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #0D1117;">

          <!-- Header with Logo -->
          <tr>
            <td style="padding: 0 0 30px 0; text-align: center;">
              <div style="display: inline-block; width: 50px; height: 50px; background-color: #800000; border-radius: 50%; text-align: center; line-height: 50px; margin-bottom: 15px;">
                <span style="color: white; font-size: 24px; font-weight: bold;">AI</span>
              </div>
              <h1 style="margin: 10px 0 5px 0; color: #E8E8E8; font-size: 28px; font-weight: bold;">AI Bubble Analytics</h1>
              <p style="margin: 0; color: #A0A0A0; font-size: 14px;">${date}</p>
            </td>
          </tr>

          <!-- AI Bubble Index Card -->
          <tr>
            <td style="padding: 0 0 30px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #1a1f2e 0%, #0D1117 100%); border: 1px solid #4A5A6A; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #A0A0A0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">AI Bubble Index</p>
                    <div style="font-size: 72px; font-weight: bold; color: ${riskColor}; margin: 10px 0;">${abiData.abi}</div>
                    <div style="display: inline-block; background-color: ${riskColor}; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; margin: 10px 0;">
                      ${abiData.riskLevel} RISK
                    </div>
                    <p style="margin: 20px 0 0 0; color: #C0C0C0; font-size: 14px; line-height: 1.6;">
                      ${abiData.riskDescription}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- RAG Scale Reference -->
          <tr>
            <td style="padding: 0 0 30px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="25%" style="padding: 15px; background-color: #1a1f2e; border: 1px solid #16A34A; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #16A34A; font-size: 12px; margin-bottom: 5px;">LOW</div>
                    <div style="color: #A0A0A0; font-size: 11px;">0-40</div>
                  </td>
                  <td width="25%" style="padding: 15px; background-color: #1a1f2e; border: 1px solid #D97706; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #D97706; font-size: 12px; margin-bottom: 5px;">MODERATE</div>
                    <div style="color: #A0A0A0; font-size: 11px;">41-60</div>
                  </td>
                  <td width="25%" style="padding: 15px; background-color: #1a1f2e; border: 1px solid #EA580C; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #EA580C; font-size: 12px; margin-bottom: 5px;">HIGH</div>
                    <div style="color: #A0A0A0; font-size: 11px;">61-80</div>
                  </td>
                  <td width="25%" style="padding: 15px; background-color: #1a1f2e; border: 1px solid #DC2626; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #DC2626; font-size: 12px; margin-bottom: 5px;">EXTREME</div>
                    <div style="color: #A0A0A0; font-size: 11px;">81-100</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Top Risk Factors -->
          <tr>
            <td style="padding: 0 0 30px 0;">
              <h2 style="margin: 0 0 20px 0; color: #E8E8E8; font-size: 20px; font-weight: bold;">Top Risk Factors</h2>
              ${topRisks.map((risk, index) => `
                <div style="background-color: #1a1f2e; border: 1px solid #4A5A6A; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="color: #E8E8E8; font-weight: bold; font-size: 14px; margin-bottom: 5px;">${index + 1}. ${risk.metric}</div>
                      <div style="color: #A0A0A0; font-size: 12px;">Contributing ${risk.contribution.toFixed(1)} points to ABI</div>
                    </div>
                    <div style="color: #800000; font-size: 24px; font-weight: bold;">${risk.value.toFixed(0)}</div>
                  </div>
                </div>
              `).join('')}
            </td>
          </tr>

          <!-- All 10 Metrics -->
          <tr>
            <td style="padding: 0 0 30px 0;">
              <h2 style="margin: 0 0 20px 0; color: #E8E8E8; font-size: 20px; font-weight: bold;">All 10 Metrics</h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1f2e; border: 1px solid #4A5A6A; border-radius: 8px; overflow: hidden;">
                ${Object.entries(abiData.breakdown).map(([key, data], index) => {
                  const { formatMetricName } = require('./abiCalculator');
                  const name = formatMetricName(key);
                  const bgColor = index % 2 === 0 ? '#1a1f2e' : '#151a23';
                  return `
                    <tr style="background-color: ${bgColor};">
                      <td style="padding: 12px 15px; border-bottom: 1px solid #2a2f3e;">
                        <div style="color: #E8E8E8; font-size: 13px; font-weight: 500;">${name}</div>
                        <div style="color: #A0A0A0; font-size: 11px; margin-top: 2px;">Weight: ${data.weight}%</div>
                      </td>
                      <td style="padding: 12px 15px; text-align: right; border-bottom: 1px solid #2a2f3e;">
                        <div style="color: #800000; font-size: 16px; font-weight: bold;">${data.value.toFixed(1)}</div>
                        <div style="color: #A0A0A0; font-size: 11px; margin-top: 2px;">${data.raw !== null ? data.raw : 'N/A'}</div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 0 30px 0; text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'https://aibubbleanalytics.com'}" style="display: inline-block; background-color: #800000; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                View Full Dashboard →
              </a>
            </td>
          </tr>

          <!-- Educational Disclaimer -->
          <tr>
            <td style="padding: 20px; background-color: #2a1515; border: 1px solid rgba(128, 0, 0, 0.4); border-radius: 8px; margin-bottom: 30px;">
              <p style="margin: 0; color: #C0C0C0; font-size: 11px; text-align: center; line-height: 1.5;">
                ⚠️ <strong style="color: #E8E8E8;">EDUCATIONAL PURPOSES ONLY.</strong> This analysis is not financial, investment, or tax advice.
                Always conduct your own research and consult with licensed professionals before making investment decisions.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 0 0 0; border-top: 1px solid #4A5A6A; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #A0A0A0; font-size: 12px;">
                Data sources: S&P Global, RBC Capital Markets, Richmond Fed, BEA, SEC EDGAR
              </p>
              <p style="margin: 10px 0; color: #A0A0A0; font-size: 12px;">
                <a href="${process.env.FRONTEND_URL || 'https://aibubbleanalytics.com'}/about" style="color: #800000; text-decoration: none;">About</a> ·
                <a href="${process.env.FRONTEND_URL || 'https://aibubbleanalytics.com'}/disclaimer" style="color: #800000; text-decoration: none;">Disclaimer</a> ·
                <a href="${process.env.API_BASE_URL || 'https://api.aibubbleanalytics.com'}/api/newsletter/unsubscribe?email=${subscriber.email}" style="color: #800000; text-decoration: none;">Unsubscribe</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #666; font-size: 11px;">
                © ${new Date().getFullYear()} AI Bubble Analytics. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Generate plain text version (for email clients that don't support HTML)
 */
function generateDailyNewsletterText(abiData, metrics, subscriber) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const { getTopRiskFactors, formatMetricName } = require('./abiCalculator');
  const topRisks = getTopRiskFactors(abiData.breakdown, 3);

  return `
AI BUBBLE ANALYTICS - DAILY UPDATE
${date}

═══════════════════════════════════════

AI BUBBLE INDEX: ${abiData.abi}/100
RISK LEVEL: ${abiData.riskLevel}

${abiData.riskDescription}

───────────────────────────────────────
TOP RISK FACTORS
───────────────────────────────────────

${topRisks.map((risk, i) => `${i + 1}. ${risk.metric}: ${risk.value.toFixed(0)}/100`).join('\n')}

───────────────────────────────────────
ALL 10 METRICS
───────────────────────────────────────

${Object.entries(abiData.breakdown).map(([key, data]) => {
  return `${formatMetricName(key)}: ${data.value.toFixed(1)}/100 (Weight: ${data.weight}%)`;
}).join('\n')}

───────────────────────────────────────

View full dashboard: ${process.env.FRONTEND_URL || 'https://aibubbleanalytics.com'}

⚠️ EDUCATIONAL PURPOSES ONLY. Not financial advice.

Data sources: S&P Global, RBC Capital Markets, Richmond Fed, BEA, SEC EDGAR

Unsubscribe: ${process.env.API_BASE_URL}/api/newsletter/unsubscribe?email=${subscriber.email}

© ${new Date().getFullYear()} AI Bubble Analytics
  `.trim();
}

module.exports = {
  generateDailyNewsletterHTML,
  generateDailyNewsletterText
};
