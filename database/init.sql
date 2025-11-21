-- ============================================================================
-- AI BUBBLE ANALYTICS - Database Initialization Script
-- ============================================================================
-- Run this script in your Supabase SQL Editor to set up all required tables
-- Last Updated: November 15, 2025

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SUBSCRIBERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending_confirmation' CHECK (status IN ('pending_confirmation', 'active', 'unsubscribed')),
  confirmation_token TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  preferences JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for subscribers
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_frequency ON subscribers(frequency);

-- Row Level Security for subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can manage subscribers
DROP POLICY IF EXISTS "Service role can manage subscribers" ON subscribers;
CREATE POLICY "Service role can manage subscribers"
  ON subscribers
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================================
-- EMAIL LOGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscriber_id UUID REFERENCES subscribers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subject TEXT,
  status TEXT CHECK (status IN ('queued', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  sendgrid_message_id TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  bounce_reason TEXT,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for email_logs
CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber_id ON email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_email_logs_email ON email_logs(email);

-- Row Level Security for email_logs
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can manage email logs
DROP POLICY IF EXISTS "Service role can manage email logs" ON email_logs;
CREATE POLICY "Service role can manage email logs"
  ON email_logs
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================================
-- DAILY METRICS SNAPSHOTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS daily_metrics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  bubble_index NUMERIC,
  risk_level TEXT CHECK (risk_level IN ('LOW', 'MODERATE', 'HIGH', 'EXTREME')),
  magnificent7_divergence NUMERIC,
  revenue_gap NUMERIC,
  circular_financing NUMERIC,
  valuation_premium NUMERIC,
  debt_ratio NUMERIC,
  search_volume INTEGER,
  adoption_rate NUMERIC,
  index_concentration NUMERIC,
  pe_ratio NUMERIC,
  energy_footprint NUMERIC,
  top_news JSONB DEFAULT '[]',
  expert_quotes JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for daily_metrics_snapshots
CREATE INDEX IF NOT EXISTS idx_metrics_snapshot_date ON daily_metrics_snapshots(snapshot_date);

-- Row Level Security for daily_metrics_snapshots
ALTER TABLE daily_metrics_snapshots ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access, service role can write
DROP POLICY IF EXISTS "Public can read metrics snapshots" ON daily_metrics_snapshots;
CREATE POLICY "Public can read metrics snapshots"
  ON daily_metrics_snapshots
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can manage metrics snapshots" ON daily_metrics_snapshots;
CREATE POLICY "Service role can manage metrics snapshots"
  ON daily_metrics_snapshots
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for subscribers table
DROP TRIGGER IF EXISTS update_subscribers_updated_at ON subscribers;
CREATE TRIGGER update_subscribers_updated_at
    BEFORE UPDATE ON subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA (Optional)
-- ============================================================================

-- Insert a test subscriber (development only - remove in production)
-- INSERT INTO subscribers (email, status, confirmed_at)
-- VALUES ('test@example.com', 'active', NOW())
-- ON CONFLICT (email) DO NOTHING;

-- Insert initial metrics snapshot (optional)
INSERT INTO daily_metrics_snapshots (
  snapshot_date,
  bubble_index,
  risk_level,
  magnificent7_divergence,
  revenue_gap,
  circular_financing,
  valuation_premium,
  debt_ratio,
  search_volume,
  adoption_rate,
  index_concentration,
  pe_ratio,
  energy_footprint
)
VALUES (
  CURRENT_DATE,
  70,
  'HIGH',
  10.4,
  600,
  180,
  270,
  0.75,
  1567,
  9.8,
  30,
  40.2,
  2.5
)
ON CONFLICT (snapshot_date) DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Uncomment these to verify setup:

-- Check all tables exist
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- ORDER BY table_name;

-- Check Row Level Security is enabled
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';

-- Check policies exist
-- SELECT schemaname, tablename, policyname
-- FROM pg_policies
-- WHERE schemaname = 'public';

-- ============================================================================
-- CLEANUP (Use with caution)
-- ============================================================================

-- Uncomment to drop all tables (WARNING: Deletes all data!)
-- DROP TABLE IF EXISTS email_logs CASCADE;
-- DROP TABLE IF EXISTS subscribers CASCADE;
-- DROP TABLE IF EXISTS daily_metrics_snapshots CASCADE;

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database initialization complete!';
  RAISE NOTICE '📊 Tables created: subscribers, email_logs, daily_metrics_snapshots';
  RAISE NOTICE '🔒 Row Level Security enabled on all tables';
  RAISE NOTICE '📝 Policies configured for service role access';
END $$;
