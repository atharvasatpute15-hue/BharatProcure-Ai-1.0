import { supabase, SUPABASE_PROJECT_ID } from '../lib/supabase';
import { Challenge, Startup, Pilot } from '../types';
import { mockChallenges, mockStartups, mockPilots } from '../data/mockData';

const LOCAL_STORAGE_CHALLENGES_KEY = 'bharatprocure_challenges_local';
const LOCAL_STORAGE_STARTUPS_KEY = 'bharatprocure_startups_local';
const LOCAL_STORAGE_PILOTS_KEY = 'bharatprocure_pilots_local';

export interface DatabaseStatus {
  connected: boolean;
  projectId: string;
  tables: {
    challenges: boolean;
    startups: boolean;
    pilots: boolean;
  };
  lastChecked: Date;
  error?: string;
}

// Helpers for localStorage fallback
function getLocalChallenges(): Challenge[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CHALLENGES_KEY) || localStorage.getItem('bharatsource_challenges_local');
    if (!raw) {
      saveLocalChallenges(mockChallenges);
      return [...mockChallenges];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveLocalChallenges(mockChallenges);
      return [...mockChallenges];
    }
    // Merge any newly introduced mock challenges so users never have a stale single-item list
    const existingIds = new Set(parsed.map((c: any) => c.id));
    let hasNew = false;
    const merged = [...parsed];
    for (const mc of mockChallenges) {
      if (!existingIds.has(mc.id)) {
        merged.push(mc);
        hasNew = true;
      }
    }
    if (hasNew) {
      saveLocalChallenges(merged);
    }
    return merged;
  } catch {
    return [...mockChallenges];
  }
}

function saveLocalChallenges(challenges: Challenge[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CHALLENGES_KEY, JSON.stringify(challenges));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function getLocalStartups(): Startup[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_STARTUPS_KEY) || localStorage.getItem('bharatsource_startups_local');
    if (!raw) {
      saveLocalStartups(mockStartups);
      return [...mockStartups];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveLocalStartups(mockStartups);
      return [...mockStartups];
    }
    const existingIds = new Set(parsed.map((s: any) => s.id));
    let hasNew = false;
    const merged = [...parsed];
    for (const ms of mockStartups) {
      if (!existingIds.has(ms.id)) {
        merged.push(ms);
        hasNew = true;
      }
    }
    if (hasNew) {
      saveLocalStartups(merged);
    }
    return merged;
  } catch {
    return [...mockStartups];
  }
}

function saveLocalStartups(startups: Startup[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_STARTUPS_KEY, JSON.stringify(startups));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function getLocalPilots(): Pilot[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PILOTS_KEY) || localStorage.getItem('bharatsource_pilots_local');
    if (!raw) {
      saveLocalPilots(mockPilots);
      return [...mockPilots];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveLocalPilots(mockPilots);
      return [...mockPilots];
    }
    const existingIds = new Set(parsed.map((p: any) => p.id));
    let hasNew = false;
    const merged = [...parsed];
    for (const mp of mockPilots) {
      if (!existingIds.has(mp.id)) {
        merged.push(mp);
        hasNew = true;
      }
    }
    if (hasNew) {
      saveLocalPilots(merged);
    }
    return merged;
  } catch {
    return [...mockPilots];
  }
}

function saveLocalPilots(pilots: Pilot[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PILOTS_KEY, JSON.stringify(pilots));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

// Mappers between frontend types and Supabase snake_case columns
function mapChallengeToDb(c: Challenge) {
  return {
    id: c.id,
    department: c.department,
    location: c.location,
    title: c.title,
    description: c.description,
    current_situation: c.currentSituation || null,
    target_population: c.targetPopulation || null,
    expected_impact: c.expectedImpact || null,
    pilot_duration: c.pilotDuration || null,
    budget: c.budget,
    timeline: c.timeline,
    technology: c.technology,
    required_outcome: c.requiredOutcome,
    status: c.status,
    structured_data: c.structuredData || null
  };
}

function mapDbToChallenge(row: any): Challenge {
  return {
    id: row.id,
    department: row.department,
    location: row.location,
    title: row.title,
    description: row.description,
    currentSituation: row.current_situation || undefined,
    targetPopulation: row.target_population || undefined,
    expectedImpact: row.expected_impact || undefined,
    pilotDuration: row.pilot_duration || undefined,
    budget: row.budget,
    timeline: row.timeline,
    technology: row.technology,
    requiredOutcome: row.required_outcome,
    status: row.status || 'Open',
    structuredData: row.structured_data || undefined
  };
}

function mapStartupToDb(s: Startup) {
  return {
    id: s.id,
    name: s.name,
    city: s.city,
    state: s.state,
    technology: s.technology,
    industry: s.industry,
    previous_experience: s.previousExperience,
    estimated_cost: s.estimatedCost,
    implementation_time: s.implementationTime,
    eligibility_status: s.eligibilityStatus,
    team_size: s.teamSize,
    founded: s.founded,
    capabilities: s.capabilities,
    match_score: s.matchScore || null
  };
}

function mapDbToStartup(row: any): Startup {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    state: row.state,
    technology: row.technology,
    industry: row.industry,
    previousExperience: row.previous_experience || '',
    estimatedCost: row.estimated_cost || '',
    implementationTime: row.implementation_time || '',
    eligibilityStatus: row.eligibility_status || 'Verified',
    teamSize: row.team_size || 1,
    founded: row.founded || 2024,
    capabilities: row.capabilities || [],
    matchScore: row.match_score || undefined
  };
}

function mapPilotToDb(p: Pilot) {
  return {
    id: p.id,
    challenge_id: p.challengeId,
    startup_id: p.startupId,
    startup_name: p.startupName,
    duration: p.duration,
    budget: p.budget,
    status: p.status,
    metrics: p.metrics,
    milestones: p.milestones
  };
}

function mapDbToPilot(row: any): Pilot {
  return {
    id: row.id,
    challengeId: row.challenge_id,
    startupId: row.startup_id,
    startupName: row.startup_name,
    duration: row.duration,
    budget: row.budget,
    status: row.status,
    metrics: row.metrics || {
      detectionAccuracy: { value: 0, target: 100 },
      falsePositiveRate: { value: 0, target: 0 },
      waterLossReduction: { value: 0, target: 0 },
      systemUptime: { value: 0, target: 100 },
      overallScore: 0
    },
    milestones: row.milestones || []
  };
}

export const dbService = {
  /**
   * Check connection status to Supabase and verify which tables exist
   */
  async checkConnection(): Promise<DatabaseStatus> {
    const status: DatabaseStatus = {
      connected: true,
      projectId: SUPABASE_PROJECT_ID,
      tables: {
        challenges: false,
        startups: false,
        pilots: false
      },
      lastChecked: new Date()
    };

    try {
      const [chRes, stRes, piRes] = await Promise.all([
        supabase.from('challenges').select('id').limit(1),
        supabase.from('startups').select('id').limit(1),
        supabase.from('pilots').select('id').limit(1)
      ]);

      status.tables.challenges = !chRes.error;
      status.tables.startups = !stRes.error;
      status.tables.pilots = !piRes.error;

      if (chRes.error && chRes.error.code !== 'PGRST205' && chRes.error.code !== '42P01') {
        status.error = chRes.error.message;
      }
    } catch (err: any) {
      status.connected = false;
      status.error = err?.message || 'Connection failed';
    }

    return status;
  },

  /**
   * Fetch all challenges from Supabase with fallback to local storage
   */
  async getChallenges(): Promise<{ data: Challenge[]; source: 'supabase' | 'local'; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase getChallenges error, falling back to local data:', error.message);
        return { data: getLocalChallenges(), source: 'local', error: error.message };
      }

      if (data && data.length > 0) {
        const mapped = data.map(mapDbToChallenge);
        // Cache to localStorage for offline readiness
        saveLocalChallenges(mapped);
        return { data: mapped, source: 'supabase' };
      }

      // If table exists but is empty, return local challenges
      const local = getLocalChallenges();
      return { data: local, source: 'local' };
    } catch (err: any) {
      console.warn('Unexpected error in getChallenges:', err);
      return { data: getLocalChallenges(), source: 'local', error: err?.message };
    }
  },

  /**
   * Get challenge by ID
   */
  async getChallengeById(id: string): Promise<{ data: Challenge | null; source: 'supabase' | 'local' }> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return { data: mapDbToChallenge(data), source: 'supabase' };
      }

      // Fallback to local
      const localChallenges = getLocalChallenges();
      const found = localChallenges.find(c => c.id === id) || null;
      return { data: found, source: 'local' };
    } catch {
      const localChallenges = getLocalChallenges();
      const found = localChallenges.find(c => c.id === id) || null;
      return { data: found, source: 'local' };
    }
  },

  /**
   * Insert new challenge into Supabase and update local cache
   */
  async createChallenge(challenge: Challenge): Promise<{ success: boolean; data: Challenge; source: 'supabase' | 'local'; message: string }> {
    // 1. Update local cache first so UI responds immediately
    const local = getLocalChallenges();
    const updatedLocal = [challenge, ...local.filter(c => c.id !== challenge.id)];
    saveLocalChallenges(updatedLocal);

    // 2. Persist in Supabase
    try {
      const dbRow = mapChallengeToDb(challenge);
      const { error } = await supabase
        .from('challenges')
        .upsert(dbRow, { onConflict: 'id' });

      if (error) {
        console.warn('Could not insert to Supabase challenges table:', error.message);
        return {
          success: true,
          data: challenge,
          source: 'local',
          message: `Saved to local memory. (Supabase table 'challenges' returned: ${error.message})`
        };
      }

      return {
        success: true,
        data: challenge,
        source: 'supabase',
        message: `Successfully stored in Supabase project ${SUPABASE_PROJECT_ID}`
      };
    } catch (err: any) {
      return {
        success: true,
        data: challenge,
        source: 'local',
        message: `Saved locally. (Supabase offline/unreachable: ${err?.message})`
      };
    }
  },

  /**
   * Update challenge status in Supabase and local cache
   */
  async updateChallengeStatus(id: string, status: Challenge['status']): Promise<{ success: boolean; source: 'supabase' | 'local' }> {
    // Update local cache
    const local = getLocalChallenges();
    const idx = local.findIndex(c => c.id === id);
    if (idx !== -1) {
      local[idx].status = status;
      saveLocalChallenges([...local]);
    }

    // Update Supabase
    try {
      const { error } = await supabase
        .from('challenges')
        .update({ status })
        .eq('id', id);

      if (error) {
        return { success: true, source: 'local' };
      }
      return { success: true, source: 'supabase' };
    } catch {
      return { success: true, source: 'local' };
    }
  },

  /**
   * Fetch all startups from Supabase with fallback
   */
  async getStartups(): Promise<{ data: Startup[]; source: 'supabase' | 'local' }> {
    try {
      const { data, error } = await supabase
        .from('startups')
        .select('*');

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapDbToStartup);
        saveLocalStartups(mapped);
        return { data: mapped, source: 'supabase' };
      }

      return { data: getLocalStartups(), source: 'local' };
    } catch {
      return { data: getLocalStartups(), source: 'local' };
    }
  },

  /**
   * Create a new startup in Supabase
   */
  async createStartup(startup: Startup): Promise<{ success: boolean; data: Startup; source: 'supabase' | 'local' }> {
    const local = getLocalStartups();
    saveLocalStartups([startup, ...local.filter(s => s.id !== startup.id)]);

    try {
      const dbRow = mapStartupToDb(startup);
      const { error } = await supabase
        .from('startups')
        .upsert(dbRow, { onConflict: 'id' });

      if (error) {
        return { success: true, data: startup, source: 'local' };
      }
      return { success: true, data: startup, source: 'supabase' };
    } catch {
      return { success: true, data: startup, source: 'local' };
    }
  },

  /**
   * Fetch all pilots
   */
  async getPilots(): Promise<{ data: Pilot[]; source: 'supabase' | 'local' }> {
    try {
      const { data, error } = await supabase
        .from('pilots')
        .select('*');

      if (!error && data && data.length > 0) {
        const mapped = data.map(mapDbToPilot);
        saveLocalPilots(mapped);
        return { data: mapped, source: 'supabase' };
      }

      return { data: getLocalPilots(), source: 'local' };
    } catch {
      return { data: getLocalPilots(), source: 'local' };
    }
  },

  /**
   * Create or update pilot
   */
  async createPilot(pilot: Pilot): Promise<{ success: boolean; data: Pilot; source: 'supabase' | 'local' }> {
    const local = getLocalPilots();
    saveLocalPilots([pilot, ...local.filter(p => p.id !== pilot.id)]);

    try {
      const dbRow = mapPilotToDb(pilot);
      const { error } = await supabase
        .from('pilots')
        .upsert(dbRow, { onConflict: 'id' });

      if (error) {
        return { success: true, data: pilot, source: 'local' };
      }
      return { success: true, data: pilot, source: 'supabase' };
    } catch {
      return { success: true, data: pilot, source: 'local' };
    }
  },

  /**
   * Update pilot milestone status
   */
  async updatePilotMilestone(pilotId: string, milestoneIndex: number, status: 'Pending' | 'Active' | 'Completed') {
    const local = getLocalPilots();
    const pilot = local.find(p => p.id === pilotId);
    if (pilot && pilot.milestones[milestoneIndex]) {
      pilot.milestones[milestoneIndex].status = status;
      saveLocalPilots([...local]);

      try {
        await supabase
          .from('pilots')
          .update({ milestones: pilot.milestones })
          .eq('id', pilotId);
      } catch (e) {
        console.warn('Could not sync milestone to Supabase:', e);
      }
    }
  },

  /**
   * Seed / Sync sample mock data into Supabase
   */
  async seedInitialDataToSupabase(): Promise<{ 
    success: boolean; 
    challengesCount: number; 
    startupsCount: number; 
    pilotsCount: number; 
    error?: string;
  }> {
    let challengesCount = 0;
    let startupsCount = 0;
    let pilotsCount = 0;
    let errMessage: string | undefined;

    try {
      // 1. Challenges
      const chRows = mockChallenges.map(mapChallengeToDb);
      const chRes = await supabase.from('challenges').upsert(chRows, { onConflict: 'id' });
      if (!chRes.error) challengesCount = chRows.length;
      else errMessage = chRes.error.message;

      // 2. Startups
      const stRows = mockStartups.map(mapStartupToDb);
      const stRes = await supabase.from('startups').upsert(stRows, { onConflict: 'id' });
      if (!stRes.error) startupsCount = stRows.length;
      else if (!errMessage) errMessage = stRes.error.message;

      // 3. Pilots
      const piRows = mockPilots.map(mapPilotToDb);
      const piRes = await supabase.from('pilots').upsert(piRows, { onConflict: 'id' });
      if (!piRes.error) pilotsCount = piRows.length;
      else if (!errMessage) errMessage = piRes.error.message;

      return {
        success: !errMessage,
        challengesCount,
        startupsCount,
        pilotsCount,
        error: errMessage
      };
    } catch (err: any) {
      return {
        success: false,
        challengesCount,
        startupsCount,
        pilotsCount,
        error: err?.message || 'Failed to seed database'
      };
    }
  }
};
