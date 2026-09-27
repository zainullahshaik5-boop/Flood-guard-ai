import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Clock,
  Radio,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const AlertHistoryPage: React.FC = () => {
  const { alerts, activeRegion, setActiveTab } = useApp();
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filtered = alerts.filter(a => {
    const matchesLevel = levelFilter === 'ALL' || a.level === levelFilter;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                          a.affectedBasin.toLowerCase().includes(search.toLowerCase()) ||
                          a.headlineEn.toLowerCase().includes(search.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-950 border border-orange-800 flex items-center justify-center">
              <Radio className="w-4 h-4 text-orange-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Official Alert Bulletins & Warnings History
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {alerts.length} BULLETINS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audit record of Cell Broadcast alerts, Siren triggers, and Common Alerting Protocol transmissions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
        >
          ← Back to Live Dashboard
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search bulletins by basin, keyword or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Severity:</span>
          {(['ALL', 'CRITICAL', 'WARNING', 'WATCH', 'INFORMATION'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Bulletins List */}
      <div className="space-y-4">
        {filtered.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border space-y-3 ${
              alert.level === 'CRITICAL'
                ? 'bg-red-950/20 border-red-800/50'
                : alert.level === 'WARNING'
                ? 'bg-orange-950/20 border-orange-800/50'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  alert.level === 'CRITICAL' ? 'bg-red-900 text-red-200 border-red-700' :
                  alert.level === 'WARNING' ? 'bg-orange-900 text-orange-200 border-orange-700' :
                  'bg-amber-900 text-amber-200 border-amber-700'
                }`}>
                  {alert.level}
                </span>
                <span className="text-sm font-bold text-white">{alert.title}</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span>ID: {alert.id}</span>
                <span>·</span>
                <span className="text-emerald-400">Status: {alert.status}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="text-slate-200 leading-relaxed font-medium">
                {alert.headlineEn}
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed italic">
                {alert.headlineHi}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div>
                Catchment: <strong className="text-slate-200">{alert.affectedBasin}</strong>
                <span className="mx-2">·</span>
                Issued by: <strong className="text-slate-200">{alert.issuedBy}</strong>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span>CHANNELS:</span>
                {alert.channels.map((chan, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                    {chan}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
