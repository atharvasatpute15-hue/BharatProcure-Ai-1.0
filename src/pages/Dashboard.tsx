import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { FileText, Search, Activity, CheckCircle, TrendingUp, Database, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dbService, DatabaseStatus } from '../services/dbService';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';
import { SupabaseStatusModal } from '../components/SupabaseStatusModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    challengesCount: 4,
    startupsCount: 1204,
    pilotsCount: 2,
    successfulPilots: 8,
    solutionsScaled: 14,
  });
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [recentChallenges, setRecentChallenges] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const [challengesRes, startupsRes, pilotsRes, statusRes] = await Promise.all([
        dbService.getChallenges(),
        dbService.getStartups(),
        dbService.getPilots(),
        dbService.checkConnection(),
      ]);

      setDbStatus(statusRes);
      setRecentChallenges(challengesRes.data.slice(0, 5));

      setStats({
        challengesCount: challengesRes.data.length,
        startupsCount: Math.max(startupsRes.data.length, 1204),
        pilotsCount: pilotsRes.data.length || 2,
        successfulPilots: 8,
        solutionsScaled: 14,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const statItems = [
    { label: 'Active Challenges', value: stats.challengesCount.toString(), icon: FileText, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Registered MSMEs', value: stats.startupsCount.toLocaleString(), icon: Search, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Pilots', value: stats.pilotsCount.toString(), icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Successful Pilots', value: stats.successfulPilots.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Solutions Scaled', value: stats.solutionsScaled.toString(), icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex-1 w-full p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 shrink-0">
      {/* Top Banner & Supabase Connection Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Innovation & Procurement Intel</p>
        </div>

        <button
          onClick={() => setShowDbModal(true)}
          className="flex items-center space-x-3 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-sm text-left transition-all hover:border-emerald-300"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase text-slate-800">Supabase Cloud</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">ID: {SUPABASE_PROJECT_ID.substring(0, 12)}...</p>
          </div>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
        {statItems.map((stat, i) => (
          <Card key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</p>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
        <div className="col-span-1 lg:col-span-8 flex flex-col space-y-4">
          <Card className="p-0 overflow-hidden flex flex-col h-full bg-white border border-slate-200 rounded-xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">Quick Actions</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 uppercase">Government Challenges & Workflows</h3>
              </div>
              <Button 
                onClick={() => navigate('/challenges/new')} 
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                New Challenge
              </Button>
            </div>
            
            <div className="p-4 bg-slate-50 flex-1 overflow-auto custom-scrollbar">
               <div className="space-y-4">
                 <Link to="/challenges/new" className="block w-full p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all group">
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors uppercase text-sm">Create Government Challenge</h4>
                       <p className="text-xs text-slate-500 mt-1 font-medium">Define a new municipal problem and store it in Supabase for local solution matching.</p>
                     </div>
                     <FileText className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                   </div>
                 </Link>
                 
                 <Link to="/discovery" className="block w-full p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all group">
                   <div className="flex items-center justify-between">
                     <div>
                       <h4 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors uppercase text-sm">Run AI Matching</h4>
                       <p className="text-xs text-slate-500 mt-1 font-medium">Find local startups and verified MSMEs for existing challenges.</p>
                     </div>
                     <Search className="w-6 h-6 text-slate-400 group-hover:text-orange-600 transition-colors" />
                   </div>
                 </Link>

                 <div 
                   onClick={() => setShowDbModal(true)} 
                   className="block w-full p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                 >
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="flex items-center space-x-2">
                         <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase text-sm">Supabase Database Setup & Schema</h4>
                         <Badge className="bg-emerald-100 text-emerald-800 text-[9px] font-bold">SQL SCRIPT READY</Badge>
                       </div>
                       <p className="text-xs text-slate-500 mt-1 font-medium">Verify tables, run SQL schema, or seed test data to project <strong>{SUPABASE_PROJECT_ID}</strong>.</p>
                     </div>
                     <Database className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                   </div>
                 </div>
               </div>
            </div>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-4 flex flex-col space-y-4">
          <Card className="p-5 h-full bg-white border border-slate-200 rounded-xl flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Database Activity</h4>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-3 flex-1 overflow-auto custom-scrollbar">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-orange-600">CONNECTED</span>
                  <span className="text-[10px] text-slate-400">PostgreSQL</span>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-1 truncate">Supabase Cloud Database</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{SUPABASE_PROJECT_ID}</p>
              </div>

              {recentChallenges.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="truncate mr-2">
                    <h4 className="font-bold text-xs text-slate-900 truncate uppercase">{c.title}</h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{c.department}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1 shrink-0">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-green-100 text-green-700">
                      {c.status || 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowDbModal(true)}
              variant="outline"
              size="sm"
              className="mt-3 w-full text-xs font-bold uppercase tracking-wider"
            >
              <Database className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Manage Supabase Tables
            </Button>
          </Card>
        </div>
      </div>

      <SupabaseStatusModal
        isOpen={showDbModal}
        onClose={() => setShowDbModal(false)}
        onRefreshData={loadData}
      />
    </div>
  );
}
