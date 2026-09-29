import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { Plus, Database, RefreshCw, Search, Building, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/dbService';
import { Challenge } from '../types';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

export default function Challenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [syncing, setSyncing] = useState(false);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const res = await dbService.getChallenges();
      setChallenges(res.data);
      setDataSource(res.source);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleSyncToSupabase = async () => {
    setSyncing(true);
    try {
      await dbService.seedInitialDataToSupabase();
      await fetchChallenges();
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  };

  const filtered = challenges.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.technology.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 w-full p-6 space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Government Challenges</h1>
            <Badge className={dataSource === 'supabase' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300'}>
              <Database className="w-3 h-3 mr-1 inline" />
              {dataSource === 'supabase' ? `Supabase Live (${SUPABASE_PROJECT_ID})` : 'Local State'}
            </Badge>
          </div>
          <p className="text-slate-500 mt-1 text-sm font-medium">Turn departmental public problems into innovation challenges with Supabase data storage.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchChallenges} 
            disabled={loading}
            className="text-xs h-10 border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button 
            onClick={() => navigate('/challenges/new')} 
            className="space-x-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider h-10 px-5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Challenge</span>
          </Button>
        </div>
      </div>

      {/* Supabase Notice Banner if on local fallback */}
      {dataSource === 'local' && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 px-4 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Connected to Supabase Project: <strong>{SUPABASE_PROJECT_ID}</strong>. You can sync sample challenges or created records anytime.
            </span>
          </div>
          <button
            onClick={handleSyncToSupabase}
            disabled={syncing}
            className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-md transition-colors"
          >
            <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
            {syncing ? 'Syncing...' : 'Sync to Supabase'}
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, department, location, or technology..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Open', 'Active', 'Pilot', 'Procured'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors whitespace-nowrap ${statusFilter === status ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-500" />
          Loading challenges from database...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center bg-white border border-slate-200">
          <p className="text-slate-500 font-medium">No challenges matched your search.</p>
          <Button 
            onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); }}
            variant="outline"
            className="mt-4 text-xs"
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((challenge) => (
            <Card 
              key={challenge.id} 
              className="p-6 bg-white hover:border-orange-300 hover:shadow-md transition-all cursor-pointer border border-slate-200" 
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-orange-100 text-orange-700 rounded uppercase tracking-wider">
                      {challenge.id}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight hover:text-orange-600 transition-colors">
                      {challenge.title}
                    </h3>
                    <Badge variant={challenge.status === 'Active' || challenge.status === 'Open' ? 'success' : 'default'} className="uppercase font-bold text-[10px]">
                      {challenge.status}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{challenge.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center">
                      <Building className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <strong>Dept:</strong>&nbsp;{challenge.department}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <strong>Location:</strong>&nbsp;{challenge.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <strong>Budget:</strong>&nbsp;{challenge.budget}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {challenge.technology}
                    </span>
                  </div>
                </div>

                <div className="flex items-center md:flex-col justify-end gap-2 shrink-0">
                  <Button variant="outline" className="text-xs font-bold uppercase tracking-wider w-full sm:w-auto">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
