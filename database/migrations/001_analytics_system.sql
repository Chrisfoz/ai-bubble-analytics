-- AI Bubble Analytics - Comprehensive Analytics System
-- Captures login events, user activity, and portfolio simulations

-- User login analytics
CREATE TABLE IF NOT EXISTS public.login_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    login_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    session_duration_seconds INTEGER,
    device_type TEXT,
    location_country TEXT,
    location_city TEXT
);

-- User activity tracking
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    activity_data JSONB,
    page_path TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio simulations history
CREATE TABLE IF NOT EXISTS public.portfolio_simulations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    investment_amount DECIMAL(15, 2) NOT NULL,
    investment_vehicle TEXT NOT NULL,
    timeline_years INTEGER NOT NULL,
    risk_tolerance TEXT NOT NULL,
    scenario_type TEXT NOT NULL CHECK (scenario_type IN ('boom', 'soft_landing', 'bubble_pop', 'stagflation')),
    expected_return DECIMAL(15, 2),
    risk_adjusted_return DECIMAL(15, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bubble metrics table
CREATE TABLE IF NOT EXISTS public.bubble_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    metric_date DATE NOT NULL UNIQUE,
    bubble_size_trillion DECIMAL(10, 2),
    debt_to_gdp_ratio DECIMAL(5, 4),
    market_cap_trillion DECIMAL(10, 2),
    stress_index INTEGER CHECK (stress_index BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expert warnings table
CREATE TABLE IF NOT EXISTS public.expert_warnings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    expert_name TEXT NOT NULL,
    warning_text TEXT NOT NULL,
    warning_date DATE NOT NULL,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_login_events_user_id ON public.login_events(user_id);
CREATE INDEX IF NOT EXISTS idx_login_events_timestamp ON public.login_events(login_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_timestamp ON public.user_activity(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_simulations_user_id ON public.portfolio_simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_bubble_metrics_date ON public.bubble_metrics(metric_date DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_simulations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own login events" ON public.login_events
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activity" ON public.user_activity
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own simulations" ON public.portfolio_simulations
    FOR SELECT USING (auth.uid() = user_id);

-- Everyone can read bubble metrics and warnings
CREATE POLICY "Public can view bubble metrics" ON public.bubble_metrics
    FOR SELECT USING (true);

CREATE POLICY "Public can view expert warnings" ON public.expert_warnings
    FOR SELECT USING (true);

-- Analytics Functions
CREATE OR REPLACE FUNCTION public.get_user_login_stats(user_uuid UUID)
RETURNS TABLE (
    total_logins BIGINT,
    avg_session_duration NUMERIC,
    last_login TIMESTAMP WITH TIME ZONE,
    most_common_device TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) as total_logins,
        AVG(session_duration_seconds) as avg_session_duration,
        MAX(login_timestamp) as last_login,
        MODE() WITHIN GROUP (ORDER BY device_type) as most_common_device
    FROM public.login_events
    WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_daily_active_users(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    date DATE,
    active_users BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        DATE(login_timestamp) as date,
        COUNT(DISTINCT user_id) as active_users
    FROM public.login_events
    WHERE login_timestamp >= NOW() - (days_back || ' days')::INTERVAL
    GROUP BY DATE(login_timestamp)
    ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_simulation_trends(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    scenario_type TEXT,
    simulation_count BIGINT,
    avg_investment NUMERIC,
    avg_timeline NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ps.scenario_type,
        COUNT(*) as simulation_count,
        AVG(investment_amount) as avg_investment,
        AVG(timeline_years) as avg_timeline
    FROM public.portfolio_simulations ps
    WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
    GROUP BY ps.scenario_type
    ORDER BY simulation_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
