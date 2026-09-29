import React from 'react';
import { Card, Button, Badge } from '../components/ui';
import { MapPin, Target, Share2, Rocket, Network, LineChart, Globe, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ScaleUp() {
  const navigate = useNavigate();
  
  return (
    <div className="flex-1 w-full p-6 bg-slate-900 text-white animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase">Scale-Up Engine</h1>
            <p className="text-slate-400 font-medium tracking-wide text-sm mt-1">Cross-departmental solution scaling and national deployment radar.</p>
          </div>
          <Button onClick={() => navigate('/market')} className="bg-white text-slate-900 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider h-10 px-6">
            <LineChart className="w-4 h-4 mr-2" /> View Opportunity Radar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* The Success Case */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-0 border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full bg-slate-800/50 text-white">
              <div className="p-6 relative border-b border-slate-700 bg-slate-800/80">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                
                <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold text-[9px] uppercase tracking-widest mb-4">SUCCESSFUL PILOT</Badge>
                
                <h2 className="text-2xl font-bold uppercase tracking-tight">AquaDetect Sensors</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Water Leakage Detection</p>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 text-sm flex-1">
                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Origin Node</span>
                    <span className="font-bold text-slate-200 uppercase">Pune (PMC)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Match Accuracy</span>
                    <span className="font-bold text-green-400">94%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Procurement Status</span>
                    <span className="font-bold text-slate-200 uppercase">Approved</span>
                  </div>
                </div>

                <div className="mt-8 text-center bg-slate-800 p-4 rounded-xl border border-slate-700 border-dashed">
                  <Rocket className="w-8 h-8 text-orange-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ready for National Scale-Up</p>
                </div>
              </div>
            </Card>
          </div>

          {/* The Map / Scale Analysis */}
          <div className="lg:col-span-8">
            <Card className="p-0 h-full flex flex-col border border-slate-800 shadow-xl bg-slate-800/50 text-white">
              <div className="p-4 border-b border-slate-700 bg-slate-800/80 flex items-center justify-between">
                <h3 className="font-bold text-sm uppercase tracking-widest flex items-center text-slate-200">
                  <Network className="w-4 h-4 mr-2 text-orange-400" /> India Innovation Network (City-to-City)
                </h3>
                <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 font-bold uppercase tracking-widest text-[9px]">12 MATCHES FOUND</Badge>
              </div>
              
              <div className="p-6">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-orange-200 text-sm mb-6 font-medium flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 shrink-0 text-orange-400" />
                  <p className="leading-relaxed">
                    <strong className="uppercase tracking-wider text-orange-300">AI Insight:</strong> Similar water-management challenges detected in 12 additional departments across India. Recommending this validated solution to bypass redundant pilot phases.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Node 1 */}
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-4 border border-red-500/20">
                        <MapPin className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 uppercase">Mumbai BMC</h4>
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-0.5">High Severity Match</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Similarity Score</p>
                        <p className="font-bold text-slate-200">92%</p>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-[10px] tracking-wider px-4">
                        Push Recommendation
                      </Button>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mr-4 border border-orange-500/20">
                        <MapPin className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 uppercase">Nashik Municipal</h4>
                        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mt-0.5">Active Challenge Published</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Similarity Score</p>
                        <p className="font-bold text-slate-200">88%</p>
                      </div>
                      <Button size="sm" className="bg-slate-700 hover:bg-slate-600 text-white font-bold uppercase text-[10px] tracking-wider px-4">
                        Push Recommendation
                      </Button>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 uppercase">Nagpur Water Dept</h4>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Planning Phase</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Similarity Score</p>
                        <p className="font-bold text-slate-200">76%</p>
                      </div>
                      <Button size="sm" className="bg-slate-700 hover:bg-slate-600 text-white font-bold uppercase text-[10px] tracking-wider px-4">
                        Push Recommendation
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 mt-4 border-t border-slate-800">
                  <Button variant="ghost" onClick={() => navigate('/market')} className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                    <Globe className="w-4 h-4 mr-2" /> View 9 More National Opportunities
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
