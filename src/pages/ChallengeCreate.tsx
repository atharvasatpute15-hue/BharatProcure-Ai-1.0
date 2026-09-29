import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { Sparkles, ArrowRight, Loader2, FileText, CheckCircle, Edit3, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockChallenges } from '../data/mockData';
import { dbService } from '../services/dbService';
import { Challenge } from '../types';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

export default function ChallengeCreate() {
  const navigate = useNavigate();
  const demoChallenge = mockChallenges[0];
  const [formData, setFormData] = useState({
    department: demoChallenge.department,
    location: demoChallenge.location,
    title: demoChallenge.title,
    description: demoChallenge.description,
    currentSituation: demoChallenge.currentSituation || '',
    expectedSolution: demoChallenge.requiredOutcome || '',
    budget: demoChallenge.budget,
    timeline: demoChallenge.timeline,
    technology: demoChallenge.technology,
    targetPopulation: demoChallenge.targetPopulation || '',
    expectedImpact: demoChallenge.expectedImpact || '',
    pilotDuration: demoChallenge.pilotDuration || ''
  });

  const [aiStructuring, setAiStructuring] = useState(false);
  const [structured, setStructured] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleAiStructure = () => {
    setAiStructuring(true);
    setTimeout(() => {
      setAiStructuring(false);
      setStructured(true);
      setReviewMode(true);
    }, 1500);
  };

  const handleSaveChallenge = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      const newId = `CH-${Math.floor(100 + Math.random() * 900)}`;
      const newChallenge: Challenge = {
        id: newId,
        department: formData.department,
        location: formData.location,
        title: formData.title,
        description: formData.description,
        currentSituation: formData.currentSituation,
        targetPopulation: formData.targetPopulation,
        expectedImpact: formData.expectedImpact,
        pilotDuration: formData.pilotDuration,
        budget: formData.budget,
        timeline: formData.timeline,
        technology: formData.technology,
        requiredOutcome: formData.expectedSolution,
        status: 'Open',
        structuredData: {
          problemSummary: formData.description,
          functionalReqs: [
            "Real-time sensor monitoring",
            "Automated alert notification",
            "GIS mapping dashboard"
          ],
          technicalReqs: [
            formData.technology,
            "Edge Analytics",
            "Secure Cloud Ingestion",
            "RESTful API Integration"
          ],
          requiredSkills: [
            "Hardware/IoT Systems",
            "Data Engineering",
            "Deployment Infrastructure"
          ],
          eligibilityCriteria: [
            "DPIIT Registered Startup / MSME",
            "Proven prototype or pilot validation",
            "Turnover compliant with national guidelines"
          ],
          expectedOutcomes: [
            formData.expectedSolution || "Verified measurable impact during pilot phase",
            "Transparent dashboard reporting",
            "Deployment within specified municipal zone"
          ],
          evaluationMetrics: [
            "Deployment timeliness",
            "Technical reliability & uptime > 95%",
            "Direct cost savings / loss reduction"
          ],
          pilotRequirements: [
            `Deploy in ${formData.location}`,
            "Field integration testing"
          ],
          riskFactors: [
            "Infrastructure compatibility",
            "Local connectivity reliability"
          ],
          scalabilityPotential: "High - Solution eligible for multi-district replication across India."
        }
      };

      const res = await dbService.createChallenge(newChallenge);
      setSaveStatus(res.message);
      
      setTimeout(() => {
        navigate(`/challenges/${newId}`);
      }, 1200);
    } catch (err: any) {
      setSaveStatus(`Failed to save: ${err?.message}`);
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 w-full p-6 space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Create Government Challenge</h1>
          <p className="text-slate-500 mt-1 uppercase tracking-widest text-xs font-semibold">Turn public problems into innovation opportunities — stored in Supabase.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Target DB: {SUPABASE_PROJECT_ID}</span>
        </div>
      </div>

      {saveStatus && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-sm font-medium flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="flex-1 w-full space-y-6 flex flex-col">
          <Card className="p-6 space-y-4 flex-1 overflow-auto custom-scrollbar bg-white border border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Government Department</label>
                <input 
                  type="text" 
                  value={formData.department} 
                  onChange={(e) => setFormData({...formData, department: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department Location</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Challenge Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                disabled={reviewMode} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Problem Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 h-16 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                disabled={reviewMode} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Situation</label>
              <textarea 
                value={formData.currentSituation} 
                onChange={(e) => setFormData({...formData, currentSituation: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 h-12 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                disabled={reviewMode} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Solution</label>
                <input 
                  type="text" 
                  value={formData.expectedSolution} 
                  onChange={(e) => setFormData({...formData, expectedSolution: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Technology Category</label>
                <input 
                  type="text" 
                  value={formData.technology} 
                  onChange={(e) => setFormData({...formData, technology: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Budget Range</label>
                <input 
                  type="text" 
                  value={formData.budget} 
                  onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Timeline</label>
                <input 
                  type="text" 
                  value={formData.timeline} 
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pilot Duration</label>
                <input 
                  type="text" 
                  value={formData.pilotDuration} 
                  onChange={(e) => setFormData({...formData, pilotDuration: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Population</label>
                <input 
                  type="text" 
                  value={formData.targetPopulation} 
                  onChange={(e) => setFormData({...formData, targetPopulation: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Impact</label>
                <input 
                  type="text" 
                  value={formData.expectedImpact} 
                  onChange={(e) => setFormData({...formData, expectedImpact: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20" 
                  disabled={reviewMode} 
                />
              </div>
            </div>
          </Card>
        </div>

        {/* AI Output Panel */}
        <div className="h-full flex flex-col">
          <Card className="p-0 flex-1 flex flex-col overflow-hidden bg-slate-900 border-slate-800 text-slate-300">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <h3 className="font-semibold text-white uppercase tracking-tight">AI Challenge Analysis</h3>
              </div>
              {structured && reviewMode && (
                <Badge className="bg-orange-500 text-white border-0 uppercase">Review & Publish</Badge>
              )}
            </div>
            
            <div className="p-6 flex-1 overflow-auto custom-scrollbar">
              {!structured && !aiStructuring && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50 py-12">
                  <FileText className="w-12 h-12 text-slate-400" />
                  <p className="text-sm max-w-sm text-slate-400">Click "Analyze with AI" to automatically structure the problem, technical prerequisites, evaluation metrics, and prepare it for Supabase persistence.</p>
                </div>
              )}

              {aiStructuring && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                  <p className="text-orange-300 animate-pulse text-sm uppercase tracking-widest font-bold">Analyzing problem statement...</p>
                </div>
              )}

              {structured && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-orange-900/30 border border-orange-500/50 text-orange-400 text-[10px] px-3 py-1.5 rounded inline-flex items-center font-bold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3 h-3 mr-2" />
                    AI-generated draft — ready to persist in Supabase
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Problem Summary</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{formData.description || demoChallenge.structuredData?.problemSummary}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Scalability Potential</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{demoChallenge.structuredData?.scalabilityPotential}</p>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Technical Requirements</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                        {demoChallenge.structuredData?.technicalReqs.map(r => <li key={r}>{r}</li>)}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Functional Requirements</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                        {demoChallenge.structuredData?.functionalReqs?.map(r => <li key={r}>{r}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Eligibility Criteria</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                        {demoChallenge.structuredData?.eligibilityCriteria?.map(r => <li key={r}>{r}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2 text-orange-400">Success Metrics</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-300">
                        {demoChallenge.structuredData?.evaluationMetrics.map(r => <li key={r}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              {!structured ? (
                <Button onClick={handleAiStructure} className="w-full bg-orange-500 hover:bg-orange-600 font-bold uppercase tracking-wider text-xs h-12" disabled={aiStructuring}>
                  {aiStructuring ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  {aiStructuring ? 'ANALYZING...' : 'ANALYZE WITH AI'}
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setReviewMode(false)} 
                    disabled={saving}
                    className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider h-12"
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Draft
                  </Button>
                  <Button 
                    onClick={handleSaveChallenge} 
                    disabled={saving}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-wider h-12 border-0"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    {saving ? 'SAVING TO SUPABASE...' : 'APPROVE & SAVE TO SUPABASE'}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
