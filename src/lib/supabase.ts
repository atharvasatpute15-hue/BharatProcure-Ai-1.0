import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yiapuzkuhhgryvgdhqzw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mxwgbDgKwk3MziyqtGW_tA_LiYZXIWR';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const SUPABASE_PROJECT_ID = 'yiapuzkuhhgryvgdhqzw';
export const SUPABASE_API_KEY = SUPABASE_ANON_KEY;

// SQL Schema definition for the user's Supabase project
export const SUPABASE_SCHEMA_SQL = `-- BharatProcure AI Database Schema for Supabase
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/yiapuzkuhhgryvgdhqzw/sql)

-- 1. Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    current_situation TEXT,
    target_population TEXT,
    expected_impact TEXT,
    pilot_duration TEXT,
    budget TEXT,
    timeline TEXT,
    technology TEXT,
    required_outcome TEXT,
    status TEXT NOT NULL DEFAULT 'Open',
    structured_data JSONB
);

-- 2. Startups Table
CREATE TABLE IF NOT EXISTS public.startups (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    technology TEXT NOT NULL,
    industry TEXT NOT NULL,
    previous_experience TEXT,
    estimated_cost TEXT,
    implementation_time TEXT,
    eligibility_status TEXT DEFAULT 'Verified',
    team_size INTEGER DEFAULT 1,
    founded INTEGER,
    capabilities TEXT[] DEFAULT '{}',
    match_score JSONB
);

-- 3. Pilots Table
CREATE TABLE IF NOT EXISTS public.pilots (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    challenge_id TEXT NOT NULL,
    startup_id TEXT NOT NULL,
    startup_name TEXT NOT NULL,
    duration TEXT,
    budget TEXT,
    status TEXT NOT NULL DEFAULT 'Planned',
    metrics JSONB,
    milestones JSONB
);

-- 4. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB
);

-- Enable Row Level Security (RLS) and grant open access for development/prototyping
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Allow anon read & write policies
CREATE POLICY "Allow public read challenges" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Allow public insert challenges" ON public.challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update challenges" ON public.challenges FOR UPDATE USING (true);
CREATE POLICY "Allow public delete challenges" ON public.challenges FOR DELETE USING (true);

CREATE POLICY "Allow public read startups" ON public.startups FOR SELECT USING (true);
CREATE POLICY "Allow public insert startups" ON public.startups FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update startups" ON public.startups FOR UPDATE USING (true);
CREATE POLICY "Allow public delete startups" ON public.startups FOR DELETE USING (true);

CREATE POLICY "Allow public read pilots" ON public.pilots FOR SELECT USING (true);
CREATE POLICY "Allow public insert pilots" ON public.pilots FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update pilots" ON public.pilots FOR UPDATE USING (true);
CREATE POLICY "Allow public delete pilots" ON public.pilots FOR DELETE USING (true);

CREATE POLICY "Allow public read activity_logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (true);
`;
