import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from './ui';
import { Database, CheckCircle2, AlertCircle, Copy, ExternalLink, RefreshCw, Sparkles, Terminal, ShieldCheck, X } from 'lucide-react';
import { dbService, DatabaseStatus } from '../services/dbService';
import { SUPABASE_PROJECT_ID, SUPABASE_API_KEY, SUPABASE_SCHEMA_SQL } from '../lib/supabase';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData?: () => void;
}

export function SupabaseStatusModal({ isOpen, onClose, onRefreshData }: SupabaseStatusModalProps) {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [showSql, setShowSql] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    setSeedResult(null);
    try {
      const res = await dbService.checkConnection();
      setStatus(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await dbService.seedInitialDataToSupabase();
      if (res.success) {
        setSeedResult(`Successfully seeded Supabase! (${res.challengesCount} challenges, ${res.startupsCount} startups, ${res.pilotsCount} pilots synced).`);
        await checkStatus();
        if (onRefreshData) onRefreshData();
      } else {
        setSeedResult(`Seeding notice: ${res.error || 'Tables not found yet. Please run the SQL schema in Supabase first.'}`);
      }
    } catch (err: any) {
      setSeedResult(`Error: ${err?.message || 'Failed to seed'}`);
    } finally {
      setSeeding(false);
    }
  };

  if (!isOpen) return null;

  const allTablesReady = status?.tables.challenges && status?.tables.startups && status?.tables.pilots;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold tracking-tight uppercase">Supabase Cloud Database</h2>
                <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  PROJECT ACTIVE
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">ID: {SUPABASE_PROJECT_ID}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1 bg-slate-50">
          {/* Connection Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project ID</div>
              <div className="text-sm font-bold text-slate-800 font-mono break-all">{SUPABASE_PROJECT_ID}</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 animate-pulse"></span>
                Connected
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">API Key Mode</div>
              <div className="text-sm font-bold text-slate-800 font-mono truncate">sb_publishable_...</div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">Publishable / Anon Client</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Database Engine</div>
              <div className="text-sm font-bold text-slate-800">PostgreSQL 15+</div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">Supabase Managed Cloud</div>
            </div>
          </div>

          {/* Tables Status */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Database Tables Verification</h3>
                <p className="text-xs text-slate-500">Live schema verification against project {SUPABASE_PROJECT_ID}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={checkStatus}
                disabled={loading}
                className="text-xs h-8"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Checking...' : 'Re-check Tables'}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3 rounded-lg border flex items-center justify-between ${status?.tables.challenges ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <div>
                  <div className="text-xs font-bold font-mono">public.challenges</div>
                  <div className="text-[10px] mt-0.5">{status?.tables.challenges ? 'Table Active' : 'Not yet created'}</div>
                </div>
                {status?.tables.challenges ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
              </div>

              <div className={`p-3 rounded-lg border flex items-center justify-between ${status?.tables.startups ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <div>
                  <div className="text-xs font-bold font-mono">public.startups</div>
                  <div className="text-[10px] mt-0.5">{status?.tables.startups ? 'Table Active' : 'Not yet created'}</div>
                </div>
                {status?.tables.startups ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
              </div>

              <div className={`p-3 rounded-lg border flex items-center justify-between ${status?.tables.pilots ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <div>
                  <div className="text-xs font-bold font-mono">public.pilots</div>
                  <div className="text-[10px] mt-0.5">{status?.tables.pilots ? 'Table Active' : 'Not yet created'}</div>
                </div>
                {status?.tables.pilots ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
              </div>
            </div>

            {seedResult && (
              <div className={`mt-4 p-3 rounded-lg text-xs font-medium ${seedResult.startsWith('Success') ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}`}>
                {seedResult}
              </div>
            )}
          </div>

          {/* Quick Setup Instructions if tables aren't created */}
          {!allTablesReady && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900">1-Step Supabase Database Setup</h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    BharatProcure AI is authenticated with your Supabase project (<strong>{SUPABASE_PROJECT_ID}</strong>). To store challenges, startups, and pilots in Supabase PostgreSQL tables:
                  </p>
                  <ol className="list-decimal list-inside text-xs text-amber-800 mt-2 space-y-1 font-medium">
                    <li>Copy the pre-configured SQL schema script below.</li>
                    <li>Open your Supabase SQL Editor and click <strong>"New query"</strong>.</li>
                    <li>Paste the script and click <strong>"Run"</strong>.</li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={handleCopySql}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  {copied ? 'Copied SQL Script!' : 'Copy SQL Schema Script'}
                </Button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-950 bg-white border border-amber-300 px-3 py-1.5 rounded-lg shadow-sm hover:bg-amber-100 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Open Supabase SQL Editor
                </a>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSql(!showSql)}
                  className="text-xs text-amber-800 hover:bg-amber-100"
                >
                  <Terminal className="w-3.5 h-3.5 mr-1.5" />
                  {showSql ? 'Hide SQL Code' : 'Preview SQL Script'}
                </Button>
              </div>

              {showSql && (
                <div className="mt-3 bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto max-h-60 border border-slate-800">
                  <pre>{SUPABASE_SCHEMA_SQL}</pre>
                </div>
              )}
            </div>
          )}

          {/* If tables are ready, show sync actions */}
          {allTablesReady && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider">All Supabase Tables Active</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">All new challenges, pilots, and startup records will be persisted to PostgreSQL in real time.</p>
                </div>
              </div>
              <Button
                onClick={handleSeed}
                disabled={seeding}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {seeding ? 'Syncing...' : 'Sync Mock Data to Supabase'}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Project: <strong className="text-slate-800 font-mono">{SUPABASE_PROJECT_ID}</strong>
          </span>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleSeed}
              disabled={seeding}
              variant="outline"
              size="sm"
              className="text-xs font-bold uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
              {seeding ? 'Syncing...' : 'Seed Data into Supabase'}
            </Button>
            <Button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
