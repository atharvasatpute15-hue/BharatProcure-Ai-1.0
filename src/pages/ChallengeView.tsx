import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockChallenges } from '../data/mockData';
import { Card, Button, Badge } from '../components/ui';
import { Search, MapPin, Building, Calendar, DollarSign, Target, CheckCircle2, Database, RefreshCw, ArrowRight } from 'lucide-react';
import { dbService } from '../services/dbService';
import { Challenge } from '../types';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

export default function ChallengeView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function loadChallenge() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await dbService.getChallengeById(id);
        if (res.data) {
          setChallenge(res.data);
          setDataSource(res.source);
        } else {
          setChallenge(mockChallenges[0]);
        }
      } catch (err) {
        console.error(err);
        setChallenge(mockChallenges[0]);
      } finally {
        setLoading(false);
      }
    }
    loadChallenge();
  }, [id]);

  const handleStatusAdvance = async (newStatus: Challenge['status']) => {
    if (!challenge) return;
    setUpdatingStatus(true);
    try {
      await dbService.updateChallengeStatus(challenge.id, newStatus);
      setChallenge({ ...challenge, status: newStatus });
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading || !challenge) {
    return (
      <div className="flex-1 w-full p-12 text-center flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Loading Challenge from Supabase...</p>
      </div>
    );
  }

  const currentStatus = challenge.status || 'Open';
  const lifecycleStages = [
    { name: 'DRAFT', key: 'Draft', completed: true },
    { name: 'AI ANALYSIS', key: 'Analysis', completed: true },
    { name: 'REVIEW', key: 'Review', completed: true },
    { name: 'OPEN', key: 'Open', completed: ['Open', 'Active', 'Pilot', 'Procured'].includes(currentStatus) },
    { name: 'DISCOVERY', key: 'Discovery', completed: ['Active', 'Pilot', 'Procured'].includes(currentStatus) },
    { name: 'PILOT', key: 'Pilot', completed: ['Pilot', 'Procured'].includes(currentStatus) },
    { name: 'EVALUATION', key: 'Evaluation', completed: ['Procured'].includes(currentStatus) },
    { name: 'PROCUREMENT', key: 'Procured', completed: currentStatus === 'Procured' },
    { name: 'SCALE-UP', key: 'Scale-Up', completed: false }
  ];

  return (
    <div className="flex-1 w-full p-6 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      {/* Lifecycle Tracker */}
      <Card className="p-4 bg-slate-900 border-slate-800">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase overflow-x-auto custom-scrollbar py-1">
          {lifecycleStages.map((stage, i) => {
            const isCurrent = (stage.key === currentStatus) || (stage.name === 'OPEN' && currentStatus === 'Open');
            return (
              <div key={stage.name} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 
                    ${stage.completed ? 'bg-orange-500 text-white' : 
                      isCurrent ? 'bg-white text-slate-900 ring-2 ring-orange-500' : 'bg-slate-700 text-slate-500'}`}>
                    {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : <span>{i + 1}</span>}
                  </div>
                  <span className={!stage.completed && !isCurrent ? 'text-slate-600' : isCurrent ? 'text-white font-black' : 'text-orange-400'}>
                    {stage.name}
                  </span>
                </div>
                {i < lifecycleStages.length - 1 && (
                  <div className={`h-[2px] w-6 sm:w-10 md:w-16 mx-2 -mt-4 ${stage.completed ? 'bg-orange-500' : 'bg-slate-700'}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Header & Status */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest font-mono">
              {challenge.id}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">{challenge.title}</h1>
            <Badge className="bg-green-100 text-green-700 border-green-200 uppercase font-bold">{challenge.status}</Badge>
            <Badge className={dataSource === 'supabase' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'}>
              <Database className="w-3 h-3 mr-1 inline" />
              {dataSource === 'supabase' ? `Supabase DB (${SUPABASE_PROJECT_ID})` : 'Local State'}
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-1">{challenge.description}</p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {currentStatus === 'Open' && (
            <Button 
              onClick={() => handleStatusAdvance('Pilot')} 
              disabled={updatingStatus}
              variant="outline"
              className="text-xs font-bold uppercase tracking-wider h-12"
            >
              Move to Pilot
            </Button>
          )}

          <Button 
            onClick={() => navigate(`/discovery?challenge=${challenge.id}`)} 
            className="space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 shrink-0 font-bold uppercase tracking-widest text-xs"
          >
            <Search className="w-4 h-4" />
            <span>Find Solutions</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 flex items-center space-x-3 border border-slate-200 shadow-sm bg-white">
          <Building className="w-8 h-8 text-slate-400 bg-slate-100 p-1.5 rounded-lg shrink-0" />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Department</p>
            <p className="font-semibold text-slate-900 text-xs truncate max-w-[120px]" title={challenge.department}>{challenge.department}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-3 border border-slate-200 shadow-sm bg-white">
          <MapPin className="w-8 h-8 text-slate-400 bg-slate-100 p-1.5 rounded-lg shrink-0" />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Location</p>
            <p className="font-semibold text-slate-900 text-xs">{challenge.location}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-3 border border-slate-200 shadow-sm bg-white">
          <DollarSign className="w-8 h-8 text-slate-400 bg-slate-100 p-1.5 rounded-lg shrink-0" />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Budget</p>
            <p className="font-semibold text-slate-900 text-xs">{challenge.budget}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-3 border border-slate-200 shadow-sm bg-white">
          <Calendar className="w-8 h-8 text-slate-400 bg-slate-100 p-1.5 rounded-lg shrink-0" />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Timeline</p>
            <p className="font-semibold text-slate-900 text-xs">{challenge.timeline}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-3 border border-slate-200 shadow-sm bg-white">
          <Target className="w-8 h-8 text-slate-400 bg-slate-100 p-1.5 rounded-lg shrink-0" />
          <div>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Technology</p>
            <p className="font-semibold text-slate-900 text-xs truncate max-w-[100px]" title={challenge.technology}>{challenge.technology}</p>
          </div>
        </Card>
      </div>

      {challenge.structuredData && (
        <Card className="p-0 overflow-hidden border border-slate-200 shadow-sm bg-white">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 uppercase tracking-tight text-sm">AI Structured Requirements</h3>
            <span className="text-[10px] uppercase font-bold text-slate-500">Approved by Department & Stored in Database</span>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-3 pb-4 border-b border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Problem Summary</h4>
              <p className="text-sm text-slate-800 font-medium">{challenge.structuredData.problemSummary}</p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Technical Requirements</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm">
                {challenge.structuredData.technicalReqs?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Functional Requirements</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm">
                {challenge.structuredData.functionalReqs?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Eligibility Criteria</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm">
                {challenge.structuredData.eligibilityCriteria?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Expected Outcomes</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm">
                {challenge.structuredData.expectedOutcomes?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Evaluation Metrics</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm">
                {challenge.structuredData.evaluationMetrics?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-2">Risk Factors & Scalability</h4>
              <ul className="list-disc list-inside text-slate-700 space-y-1.5 text-sm mb-4">
                {challenge.structuredData.riskFactors?.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
              <p className="text-xs text-orange-600 font-bold bg-orange-50 p-2 rounded border border-orange-100">
                SCALE POTENTIAL: {challenge.structuredData.scalabilityPotential}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
