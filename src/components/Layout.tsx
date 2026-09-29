import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Search, Network, Settings, CheckCircle, Rocket, LineChart, MessageSquareText, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { Copilot } from './Copilot';
import { SupabaseStatusModal } from './SupabaseStatusModal';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

export function Layout() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard Overview', path: '/', icon: LayoutDashboard },
    { name: 'Government Challenges', path: '/challenges', icon: FileText },
    { name: 'Local-First Matching', path: '/discovery', icon: Search },
    { name: 'Pilot Management', path: '/pilot', icon: Settings },
    { name: 'Procurement', path: '/procurement', icon: CheckCircle },
    { name: 'Scale-Up Engine', path: '/scale-up', icon: Rocket },
    { name: 'Opportunity Radar', path: '/market', icon: LineChart },
    { name: 'Startup Network', path: '/network', icon: Network },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#F1F5F9] text-slate-800 font-sans overflow-hidden" style={{ backgroundColor: '#F1F5F9' }}>
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#1E293B] text-white border-b border-slate-700 shadow-lg shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none tracking-tight uppercase">BHARATPROCURE AI</h1>
            <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">GOVERNMENT PROCUREMENT & INNOVATION INTELLIGENCE</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Supabase Connection Pill */}
          <button
            onClick={() => setDbModalOpen(true)}
            className="flex items-center space-x-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
            title="Manage Supabase Database Connection & Schema"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Supabase DB</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <div className="hidden lg:flex items-center bg-slate-700/50 px-3 py-1.5 rounded-full border border-slate-600">
            <span className="text-xs text-slate-300 px-2">Search Problem ID...</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-xs font-bold">ID</div>
            <div className="text-right">
              <p className="text-xs font-semibold">Pune Municipal Corp.</p>
              <p className="text-[10px] text-orange-400">Authorized Officer</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col p-4 space-y-1 shrink-0">
          <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest px-3 mb-2">Intelligence Hub</div>
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" 
                    : "text-slate-400 hover:bg-slate-800"
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 text-[10px] uppercase text-slate-500 font-bold tracking-widest px-3 mb-2">Macro Analytics</div>
          {navItems.slice(5).map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" 
                    : "text-slate-400 hover:bg-slate-800"
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}

          <div className="mt-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-[10px] text-slate-400 mb-2 italic">Vision Statement</p>
            <p className="text-[11px] leading-relaxed text-slate-300">"Connecting government problems with the right Indian startup — starting locally."</p>
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto custom-scrollbar flex flex-col">
            <Outlet />
          </div>

          {/* Footer Status Bar */}
          <div className="bg-[#1E293B] mx-6 mb-6 mt-4 px-4 py-2 flex items-center justify-between rounded-lg shrink-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-slate-400 font-mono">AI SYSTEM: ONLINE</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">|</span>
              <button 
                onClick={() => setDbModalOpen(true)}
                className="flex items-center space-x-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-tighter"
              >
                <Database className="w-3 h-3 inline mr-1 text-emerald-400" />
                <span>DB: SUPABASE ({SUPABASE_PROJECT_ID.substring(0, 8)}...)</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">|</span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">BharatProcure AI v1.0.4 - SIH Prototype</span>
            </div>
            <div className="text-[9px] text-slate-500 italic">AI recommendation is advisory. All data shown is for demonstration purposes only.</div>
          </div>
        </main>
      </div>

      {/* Floating Copilot Button */}
      <button 
        onClick={() => setCopilotOpen(!copilotOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-orange-600 hover:scale-105 transition-all z-50 ring-4 ring-orange-500/20"
      >
        <MessageSquareText className="w-6 h-6" />
      </button>

      {/* Copilot Sidebar */}
      <Copilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />

      {/* Supabase Connection & Schema Management Modal */}
      <SupabaseStatusModal 
        isOpen={dbModalOpen} 
        onClose={() => setDbModalOpen(false)} 
      />
    </div>
  );
}

