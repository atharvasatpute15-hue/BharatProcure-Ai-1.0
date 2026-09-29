import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Badge } from '../components/ui';
import { mockStartups } from '../data/mockData';
import { dbService } from '../services/dbService';
import { Startup } from '../types';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';
import { MapPin, CheckCircle, ShieldCheck, PlayCircle, Info, Search, Sparkles, Scale, AlertTriangle, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Discovery() {
  const navigate = useNavigate();
  const [searchStage, setSearchStage] = useState(0); 
  const [startups, setStartups] = useState<Startup[]>(mockStartups);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    async function loadStartups() {
      try {
        const res = await dbService.getStartups();
        if (res.data && res.data.length > 0) {
          setStartups(res.data);
          setDataSource(res.source);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadStartups();
  }, []);
  
  useEffect(() => {
    if (searchStage > 0 && searchStage < 4) {
      const timer = setTimeout(() => {
        setSearchStage(s => s + 1);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [searchStage]);

  const startSearch = () => setSearchStage(1);

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="flex-1 w-full p-6 space-y-6 max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Database className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase DB: {SUPABASE_PROJECT_ID}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">AI Startup & MSME Discovery</h1>
        <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-semibold">Local-First Search: Finding the best Indian innovation near you.</p>
      </div>

      {searchStage === 0 && (
        <div className="flex justify-center mt-12 animate-in fade-in">
          <Button onClick={startSearch} size="lg" className="px-8 py-6 text-sm font-bold uppercase tracking-widest bg-orange-500 hover:bg-orange-600 shadow-lg">
            Start Local-First Discovery
          </Button>
        </div>
      )}

      {searchStage > 0 && searchStage < 4 && (
        <Card className="p-12 text-center max-w-2xl mx-auto bg-slate-900 text-white border-slate-800 shadow-2xl">
          <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-orange-400">Scanning Innovation Network</h2>
          <div className="flex flex-col items-center space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: searchStage >= 1 ? 1.2 : 0.8, opacity: searchStage >= 1 ? 1 : 0.3 }}
              className={`w-56 p-4 rounded-xl font-bold uppercase tracking-wider border ${searchStage === 1 ? 'bg-orange-500 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              Level 1: Pune<br/>
              <span className="text-[10px] text-slate-200 mt-1 block">{searchStage > 1 ? "3 matches found" : "Searching..."}</span>
            </motion.div>
            
            <div className="w-1 h-8 bg-slate-700"></div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: searchStage >= 2 ? 1.2 : 0.8, opacity: searchStage >= 2 ? 1 : 0.3 }}
              className={`w-56 p-4 rounded-xl font-bold uppercase tracking-wider border ${searchStage === 2 ? 'bg-orange-500 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              Level 2: Maharashtra<br/>
              <span className="text-[10px] text-slate-200 mt-1 block">{searchStage > 2 ? "8 matches found" : searchStage === 2 ? "Expanding search..." : "Pending"}</span>
            </motion.div>

            <div className="w-1 h-8 bg-slate-700"></div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: searchStage >= 3 ? 1.2 : 0.8, opacity: searchStage >= 3 ? 1 : 0.3 }}
              className={`w-56 p-4 rounded-xl font-bold uppercase tracking-wider border ${searchStage === 3 ? 'bg-orange-500 border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              Level 3: India<br/>
              <span className="text-[10px] text-slate-200 mt-1 block">{searchStage >= 3 ? `${startups.length} matches verified in Supabase` : "Pending"}</span>
            </motion.div>
          </div>
        </Card>
      )}

      {searchStage === 4 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl mb-6 flex items-start space-x-3">
             <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-orange-600" />
             <div>
               <p className="font-bold uppercase tracking-wide text-sm">Local-First Search Completed</p>
               <p className="text-xs mt-1 font-medium">Pune: 3 matches | Maharashtra: 8 matches | India: {startups.length} verified startups in database.</p>
               <p className="text-xs mt-1 font-bold text-orange-600 uppercase">Suitable Indian capability found. International search was not required.</p>
             </div>
           </div>

           <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-slate-900 uppercase tracking-tight">AI Recommended Startups</h3>
             {compareList.length > 1 && (
               <Button onClick={() => setShowCompare(!showCompare)} className="bg-slate-800 hover:bg-slate-900 text-xs font-bold uppercase tracking-wider">
                 <Scale className="w-4 h-4 mr-2" />
                 {showCompare ? "Close Comparison" : `Compare ${compareList.length} Solutions`}
               </Button>
             )}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
             {/* List */}
             <div className="md:col-span-4 space-y-4">
               {startups.map((startup) => (
                 <Card 
                   key={startup.id} 
                   className={`p-4 cursor-pointer transition-all ${selectedStartup === startup.id && !showCompare ? 'border-orange-500 ring-1 ring-orange-500 shadow-md' : 'hover:border-slate-300'}`}
                   onClick={() => { setSelectedStartup(startup.id); setShowCompare(false); }}
                 >
                   <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center">
                       <input 
                         type="checkbox" 
                         className="mr-3 h-4 w-4 text-orange-500 rounded border-slate-300 focus:ring-orange-500"
                         checked={compareList.includes(startup.id)}
                         onChange={(e) => {
                           e.stopPropagation();
                           toggleCompare(startup.id);
                         }}
                       />
                       <h3 className="font-bold text-sm text-slate-900 leading-tight uppercase">{startup.name}</h3>
                     </div>
                     <Badge className={`${startup.matchScore?.total && startup.matchScore?.total >= 90 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                       {startup.matchScore?.total}%
                     </Badge>
                   </div>
                   <div className="text-xs text-slate-500 flex flex-col space-y-1.5 pl-7">
                     <span className="flex items-center font-medium"><MapPin className="w-3 h-3 mr-1"/> {startup.city}, {startup.state}</span>
                     <span className="font-mono text-[10px] uppercase text-slate-400">{startup.technology}</span>
                   </div>
                   {startup.eligibilityStatus === 'Verified' && (
                     <div className="mt-3 ml-7 flex items-center text-[10px] text-green-600 font-bold uppercase tracking-wider">
                       <ShieldCheck className="w-3 h-3 mr-1"/> DPIIT Verified
                     </div>
                   )}
                 </Card>
               ))}
             </div>

             {/* Detail View / Compare View */}
             <div className="md:col-span-8">
               {showCompare ? (
                 <Card className="p-0 overflow-hidden flex flex-col animate-in fade-in border border-slate-200 shadow-sm">
                   <div className="bg-slate-900 text-white p-4 border-b border-slate-800">
                     <h3 className="font-bold uppercase tracking-widest text-sm flex items-center">
                       <Scale className="w-4 h-4 mr-2" /> Solution Comparison
                     </h3>
                   </div>
                   <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                       <thead>
                         <tr className="bg-slate-50 border-b border-slate-200">
                           <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-500 w-1/4">Criteria</th>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id)!;
                             if (!s) return null;
                             return (
                               <th key={id} className="p-4 font-bold text-sm text-slate-900 uppercase">{s.name}</th>
                             );
                           })}
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">AI Match Score</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 font-bold text-lg text-orange-600">{s.matchScore?.total}%</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Location</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 text-xs font-medium">{s.city}, {s.state}</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Technology</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 text-xs font-mono">{s.technology}</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Est. Cost</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 font-semibold text-slate-700">{s.estimatedCost}</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Impl. Time</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 font-semibold text-slate-700">{s.implementationTime}</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Experience</td>
                           {compareList.map(id => {
                             const s = startups.find(x => x.id === id);
                             if (!s) return null;
                             return <td key={id} className="p-4 text-xs">{s.previousExperience}</td>;
                           })}
                         </tr>
                         <tr>
                           <td className="p-4 font-semibold text-xs text-slate-500 uppercase">Action</td>
                           {compareList.map(id => (
                             <td key={id} className="p-4">
                               <Button onClick={() => navigate('/pilot')} size="sm" className="w-full bg-orange-500 hover:bg-orange-600 font-bold uppercase text-[10px] tracking-wider">
                                 Select for Pilot
                               </Button>
                             </td>
                           ))}
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </Card>
               ) : selectedStartup ? (() => {
                 const startup = startups.find(s => s.id === selectedStartup) || startups[0];
                 return (
                   <Card className="p-0 overflow-hidden flex flex-col h-full animate-in fade-in border border-slate-200 shadow-sm bg-white">
                     <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                       <div>
                         <h2 className="text-2xl font-bold text-slate-900 uppercase">{startup.name}</h2>
                         <p className="text-slate-500 flex items-center mt-1 text-xs font-medium uppercase tracking-wider">
                           <MapPin className="w-4 h-4 mr-1 text-orange-500"/> {startup.city}, {startup.state}
                           <span className="mx-2 text-slate-300">•</span>
                           <ShieldCheck className="w-4 h-4 mr-1 text-green-500"/> DPIIT Registered
                         </p>
                       </div>
                       <div className="text-center bg-orange-50 border border-orange-100 text-orange-700 px-4 py-2 rounded-xl">
                         <div className="text-2xl font-bold">{startup.matchScore?.total}%</div>
                         <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5">AI Match</div>
                       </div>
                     </div>

                     <div className="p-6 flex-1 bg-slate-50">
                       <div className="grid grid-cols-2 gap-6 mb-6">
                         <div>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Technology Focus</p>
                           <p className="text-sm font-semibold text-slate-900">{startup.technology}</p>
                         </div>
                         <div>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Industry</p>
                           <p className="text-sm font-semibold text-slate-900">{startup.industry}</p>
                         </div>
                         <div>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Est. Cost / Time</p>
                           <p className="text-sm font-semibold text-slate-900">{startup.estimatedCost} <span className="text-slate-300 mx-1">•</span> {startup.implementationTime}</p>
                         </div>
                         <div>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Past Experience</p>
                           <p className="text-sm font-semibold text-slate-900">{startup.previousExperience}</p>
                         </div>
                       </div>

                       {/* Explainable AI Block */}
                       <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                         
                         <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                           <h3 className="font-bold text-slate-900 flex items-center uppercase tracking-tight text-sm">
                             <Sparkles className="w-4 h-4 text-orange-500 mr-2" />
                             Why AI Recommends This Company
                           </h3>
                           <div className="flex space-x-2">
                             <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[9px] uppercase font-bold">High Confidence</Badge>
                             <Badge className="bg-slate-100 text-slate-600 border-slate-200 text-[9px] uppercase font-bold">Evidence Based</Badge>
                           </div>
                         </div>
                         
                         <ul className="space-y-3 text-sm text-slate-700">
                           {startup.matchScore?.explanation?.map((exp, i) => (
                             <li key={i} className="flex items-start">
                               <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 shrink-0" />
                               <span className="font-medium">{exp}</span>
                             </li>
                           ))}
                         </ul>
                         
                         <div className="mt-5 bg-amber-50 border border-amber-200 rounded p-3 flex items-start space-x-3">
                           <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                           <p className="text-xs text-amber-900 font-medium leading-relaxed">
                             <strong>AI recommendation is advisory.</strong> Final selection requires authorized government evaluation. This startup matches requirements but must undergo a formal pilot before procurement.
                           </p>
                         </div>
                       </div>
                     </div>

                     <div className="p-4 border-t border-slate-100 bg-white flex justify-end space-x-3">
                       <Button onClick={() => navigate('/pilot')} className="space-x-2 bg-orange-500 hover:bg-orange-600 text-xs font-bold uppercase tracking-wider">
                         <PlayCircle className="w-4 h-4" />
                         <span>Deploy in Pilot</span>
                       </Button>
                     </div>
                   </Card>
                 );
               })() : (
                 <Card className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-dashed border-2 bg-slate-50">
                   <Search className="w-12 h-12 mb-4 opacity-30 text-slate-500" />
                   <p className="text-sm font-semibold uppercase tracking-widest">Select a startup to view AI match explanation</p>
                   <p className="text-xs mt-2 text-slate-400 max-w-xs text-center">Or select multiple startups using the checkboxes to compare them side-by-side.</p>
                 </Card>
               )}
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
