import React, { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { mockPilots } from '../data/mockData';
import { Activity, Target, ShieldCheck, Download, Sparkles, Building, AlertTriangle, MapPin, Calendar, Settings, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pilot() {
  const navigate = useNavigate();
  const [selectedPilotId, setSelectedPilotId] = useState(mockPilots[0].id);
  const pilot = mockPilots.find(p => p.id === selectedPilotId) || mockPilots[0];
  const [evaluating, setEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const handleEvaluate = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
    }, 2000);
  };

  return (
    <div className="flex-1 w-full p-6 space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">{pilot.id}</span>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Pilot Dashboard</h1>
            <Badge className={pilot.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
              {pilot.status === 'Completed' ? 'COMPLETED' : 'FIELD TESTING'}
            </Badge>
          </div>
          <p className="text-slate-500 font-medium tracking-wide text-sm">Monitoring implementation for Challenge {pilot.challengeId} ({pilot.startupName})</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400">Select Pilot:</span>
            <select
              value={selectedPilotId}
              onChange={(e) => {
                setSelectedPilotId(e.target.value);
                setEvaluated(false);
              }}
              className="text-xs font-semibold text-slate-800 bg-transparent outline-none cursor-pointer"
            >
              {mockPilots.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id}: {p.startupName} ({p.challengeId})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Context & Milestones */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-0 overflow-hidden border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Implementation Details</h3>
            </div>
            <div className="p-5">
              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Startup</p>
                <div className="flex items-center mt-1">
                  <Building className="w-4 h-4 mr-2 text-orange-500" />
                  <p className="font-bold text-slate-900 text-sm uppercase">{pilot.startupName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Location</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                    <p className="font-semibold text-slate-900 text-xs truncate">{pilot.location || 'Pune Municipal Zone'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Start Date</p>
                  <p className="font-semibold text-slate-900 mt-1 text-xs">{pilot.startDate || 'Current Quarter'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Duration</p>
                  <p className="font-semibold text-slate-900 mt-1 text-xs">{pilot.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Budget</p>
                  <p className="font-semibold text-slate-900 mt-1 text-xs">{pilot.budget}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-0 border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Milestones</h3>
            </div>
            <div className="p-5 space-y-4">
              {pilot.milestones.map((m, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.status === 'Completed' ? 'bg-green-100 text-green-600' : m.status === 'In Progress' ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-200' : 'bg-slate-100 text-slate-400'}`}>
                    {m.status === 'Completed' ? <ShieldCheck className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-tight ${m.status === 'Completed' ? 'text-slate-900' : m.status === 'In Progress' ? 'text-orange-700' : 'text-slate-400'}`}>{m.title}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{m.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Metrics & Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-slate-900 text-white shadow-xl border border-slate-800">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <h3 className="font-bold text-sm uppercase tracking-widest flex items-center text-orange-400">
                <Activity className="w-5 h-5 mr-2" />
                Performance Metrics (Live Data)
              </h3>
              <div className="text-right">
                <div className="text-4xl font-bold text-white leading-none">{pilot.metrics.overallScore}</div>
                <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-1">Overall Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Detection Accuracy</p>
                  <p className="text-2xl font-bold text-white leading-none">{pilot.metrics.detectionAccuracy.value}%</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-green-500 h-full" style={{ width: `${pilot.metrics.detectionAccuracy.value}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center">
                  <Target className="w-3 h-3 mr-1" /> Target: &gt;{pilot.metrics.detectionAccuracy.target}%
                </p>
              </div>
              
              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Water Loss Reduction</p>
                  <p className="text-2xl font-bold text-white leading-none">{pilot.metrics.waterLossReduction.value}%</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-orange-500 h-full" style={{ width: `${pilot.metrics.waterLossReduction.value}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center">
                  <Target className="w-3 h-3 mr-1" /> Target: &gt;{pilot.metrics.waterLossReduction.target}%
                </p>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">False Positive Rate</p>
                  <p className="text-2xl font-bold text-white leading-none">{pilot.metrics.falsePositiveRate.value}%</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex justify-end mb-2">
                  <div className="bg-green-500 h-full" style={{ width: `${(10 - pilot.metrics.falsePositiveRate.value)*10}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center">
                  <Target className="w-3 h-3 mr-1" /> Target: &lt;{pilot.metrics.falsePositiveRate.target}%
                </p>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Uptime</p>
                  <p className="text-2xl font-bold text-white leading-none">{pilot.metrics.systemUptime.value}%</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-purple-500 h-full" style={{ width: `${pilot.metrics.systemUptime.value}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider flex items-center">
                  <Target className="w-3 h-3 mr-1" /> Target: {pilot.metrics.systemUptime.target}%
                </p>
              </div>
            </div>
          </Card>

          {!evaluated ? (
            <Card className="p-8 text-center border-dashed border-2 bg-slate-50 flex flex-col items-center justify-center">
              <Sparkles className="w-12 h-12 text-slate-300 mb-4" />
              <Button onClick={handleEvaluate} size="lg" className="bg-orange-500 hover:bg-orange-600 font-bold uppercase tracking-widest text-xs h-12 px-8" disabled={evaluating}>
                {evaluating ? "Analyzing Pilot Results..." : "Run AI Pilot Evaluation"}
              </Button>
              <p className="text-xs text-slate-500 mt-4 max-w-sm">AI will analyze live metrics against original challenge targets to generate a procurement recommendation.</p>
            </Card>
          ) : (
            <Card className="p-0 overflow-hidden border border-slate-200 shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-orange-500 p-4 flex items-center justify-between">
                <div className="flex items-center text-white">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <h3 className="font-bold uppercase tracking-widest text-sm">AI Procurement Recommendation</h3>
                </div>
                <Badge className="bg-white text-orange-900 border-none font-bold">READY</Badge>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Technical</span>
                    <p className="font-bold text-green-600 text-lg uppercase tracking-tight">Excellent</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Targets</span>
                    <p className="font-bold text-green-600 text-lg uppercase tracking-tight">Exceeded</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cost</span>
                    <p className="font-bold text-slate-700 text-lg uppercase tracking-tight">Acceptable</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Scalability</span>
                    <p className="font-bold text-orange-600 text-lg uppercase tracking-tight">High</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-2">Executive Summary</h4>
                  <p className="text-slate-800 text-sm font-medium leading-relaxed">
                    "Suitable for consideration for procurement and scale-up. The solution exceeded baseline detection metrics and demonstrated reliable uptime in field conditions. Implementation cost aligns with proposed budget."
                  </p>
                </div>

                <div className="flex items-start space-x-3 text-xs text-amber-800 bg-amber-50 p-4 rounded border border-amber-200">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                  <p className="font-medium leading-relaxed">
                    <strong className="uppercase tracking-wider">Advisory Notice:</strong> AI recommendation is advisory only. Final procurement decision requires authorization from the department head and must comply with GFR guidelines.
                  </p>
                </div>

                <div className="pt-2 flex space-x-3 justify-end">
                  <Button variant="outline" className="text-xs font-bold uppercase tracking-wider">Request Re-evaluation</Button>
                  <Button onClick={() => navigate('/scale-up')} className="bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider h-10 px-6">
                    <Scale className="w-4 h-4 mr-2" /> Recommend Procurement
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
