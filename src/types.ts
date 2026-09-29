export type MatchScore = {
  technical: number;
  experience: number;
  location: number;
  cost: number;
  time: number;
  eligibility: number;
  scalability: number;
  total: number;
  explanation: string[];
};

export type Startup = {
  id: string;
  name: string;
  city: string;
  state: string;
  technology: string;
  industry: string;
  previousExperience: string;
  estimatedCost: string;
  implementationTime: string;
  eligibilityStatus: "Verified" | "Pending" | "Self-Declared";
  teamSize: number;
  founded: number;
  capabilities: string[];
  matchScore?: MatchScore;
};

export type Challenge = {
  id: string;
  department: string;
  location: string;
  title: string;
  description: string;
  currentSituation?: string;
  targetPopulation?: string;
  expectedImpact?: string;
  pilotDuration?: string;
  budget: string;
  timeline: string;
  technology: string;
  requiredOutcome: string;
  status: "Draft" | "Analysis" | "Review" | "Open" | "Active" | "Pilot" | "Procured";
  structuredData?: {
    problemSummary?: string;
    functionalReqs?: string[];
    technicalReqs: string[];
    requiredSkills?: string[];
    eligibilityCriteria?: string[];
    expectedOutcomes: string[];
    evaluationMetrics: string[];
    pilotRequirements?: string[];
    riskFactors?: string[];
    scalabilityPotential?: string;
  };
};

export type Pilot = {
  id: string;
  challengeId: string;
  startupId: string;
  startupName: string;
  location?: string;
  startDate?: string;
  duration: string;
  budget: string;
  status: "Planned" | "Active" | "Completed";
  metrics: {
    detectionAccuracy: { value: number; target: number };
    falsePositiveRate: { value: number; target: number };
    waterLossReduction: { value: number; target: number };
    systemUptime: { value: number; target: number };
    overallScore: number;
  };
  milestones: {
    title: string;
    status: "Pending" | "Active" | "In Progress" | "Completed";
  }[];
};
