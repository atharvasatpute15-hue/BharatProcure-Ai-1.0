import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { Target, TrendingUp, AlertCircle, BarChart2, Lightbulb } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function MarketIntelligence() {
  const chartData = [
    { name: 'Water Mgmt', demand: 85, supply: 40 },
    { name: 'Traffic Edge AI', demand: 90, supply: 65 },
    { name: 'Waste Mgmt', demand: 75, supply: 55 },
    { name: 'Smart Grids', demand: 60, supply: 80 },
    { name: 'Civic Security', demand: 80, supply: 85 },
  ];

  return (
    <div className="flex-1 w-full p-6 space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Opportunity Radar</h1>
          <p className="text-slate-500 font-medium tracking-wide text-sm mt-1 uppercase">Market Intelligence: Government Demand vs. Indian Startup Capability.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card className="p-0 border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm flex items-center">
                  <BarChart2 className="w-4 h-4 mr-2 text-orange-500" /> Sector Demand vs. Startup Supply
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Identifies missing domestic innovation capacity.</p>
              </div>
              <Badge className="bg-slate-200 text-slate-600 border-none font-bold text-[9px] uppercase tracking-widest">DEMO DATA</Badge>
            </div>
            
            <div className="flex-1 p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    itemStyle={{fontSize: '12px', fontWeight: 600}}
                    labelStyle={{fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8', marginBottom: '8px'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '10px', fontWeight: 700, textTransform: 'uppercase'}} />
                  <Bar dataKey="demand" name="Govt Demand Score" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="supply" name="Indian Startup Supply" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-0 border border-orange-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
            <div className="p-6 bg-orange-50/50">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <Badge className="bg-red-100 text-red-700 border-none font-bold text-[9px] uppercase tracking-widest">CRITICAL GAP</Badge>
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-2 uppercase tracking-tight">Smart Water Mgmt</h3>
              
              <div className="space-y-3 text-sm text-orange-900 mb-6 bg-white p-4 rounded-xl border border-orange-100">
                <div className="flex justify-between border-b border-orange-50 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Demand</span> 
                  <span className="font-bold text-red-600">Very High</span>
                </div>
                <div className="flex justify-between border-b border-orange-50 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Indian Capability</span> 
                  <span className="font-bold text-orange-600">Moderate</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hotspot Location</span> 
                  <span className="font-bold text-slate-700 uppercase">Maharashtra</span>
                </div>
              </div>
              
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm text-slate-300">
                <p className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-orange-400 mr-2 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-white uppercase tracking-wider text-xs block mb-1">Opportunity:</strong> 
                    Significant market opening for Indian hardware MSMEs to develop lower-cost IoT acoustic sensors for pipe leakage detection.
                  </span>
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-0 border border-slate-200 shadow-sm">
             <div className="p-4 border-b border-slate-100 bg-slate-50">
               <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">AI Strategic Recommendations</h3>
             </div>
             <div className="p-5">
               <ul className="space-y-4">
                 <li className="flex items-start text-sm text-slate-700">
                   <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 mr-3 shrink-0 text-[10px] font-bold border border-slate-200">1</div>
                   <span className="font-medium leading-relaxed">Publish a targeted grand challenge for IoT sensor manufacturing via Startup India.</span>
                 </li>
                 <li className="flex items-start text-sm text-slate-700">
                   <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 mr-3 shrink-0 text-[10px] font-bold border border-slate-200">2</div>
                   <span className="font-medium leading-relaxed">Allocate catalytic funding for university-led Water Tech incubators.</span>
                 </li>
               </ul>
               <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider h-10">Generate Intel Report</Button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
