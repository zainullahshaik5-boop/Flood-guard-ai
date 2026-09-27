import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentReport, IncidentStatus } from '../types';
import {
  FileSpreadsheet,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
  Truck,
  Plus,
  Search,
  Filter,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const IncidentManagementPage: React.FC = () => {
  const { incidents, updateIncidentStatus, setActiveTab } = useApp();

  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = incidents.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase()) ||
                          i.location.toLowerCase().includes(search.toLowerCase()) ||
                          i.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Incident Management & Verification Board
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {incidents.length} RECORDS
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking verified field incidents, search & rescue task forces, and road clearance operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('reporter')}
            className="px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            New Field Incident
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by ID, location or obstacle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Status:</span>
          {(['ALL', 'NEW', 'UNDER REVIEW', 'VERIFIED', 'RESPONDING', 'RESOLVED'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Table / List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-3">Incident ID</th>
              <th className="p-3">Title & Location</th>
              <th className="p-3">Severity</th>
              <th className="p-3">AI Verification</th>
              <th className="p-3">Assigned Unit</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filtered.map(inc => (
              <tr key={inc.id} className="hover:bg-slate-950/60 transition-colors">
                <td className="p-3 font-mono font-bold text-cyan-400 whitespace-nowrap">
                  {inc.id}
                </td>
                <td className="p-3 max-w-xs">
                  <div className="font-bold text-white leading-snug">{inc.title}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{inc.location}</span>
                    <span>·</span>
                    <span>{inc.timestamp}</span>
                  </div>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    inc.severity === 'CRITICAL' ? 'bg-red-950 text-red-300 border-red-800' :
                    inc.severity === 'HIGH' ? 'bg-orange-950 text-orange-300 border-orange-800' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {inc.severity}
                  </span>
                </td>
                <td className="p-3 max-w-[200px]">
                  {inc.aiAnalysis ? (
                    <div className="text-[11px] text-slate-300">
                      <div>Velocity: <strong className="text-amber-300">{inc.aiAnalysis.waterVelocityIndicator}</strong></div>
                      <div className="text-[10px] text-slate-400 truncate">{inc.aiAnalysis.structuralThreat}</div>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-500">Manual sensor log</span>
                  )}
                </td>
                <td className="p-3 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                  {inc.assignedTeam ? (
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Truck className="w-3 h-3" />
                      {inc.assignedTeam}
                    </span>
                  ) : (
                    <span className="text-slate-500">Unassigned</span>
                  )}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    inc.status === 'RESPONDING' ? 'bg-blue-950 text-blue-300 border-blue-700' :
                    inc.status === 'VERIFIED' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                    inc.status === 'RESOLVED' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                    'bg-amber-950 text-amber-300 border-amber-700'
                  }`}>
                    {inc.status}
                  </span>
                </td>
                <td className="p-3 text-right whitespace-nowrap space-x-1">
                  {inc.status !== 'VERIFIED' && inc.status !== 'RESOLVED' && (
                    <button
                      onClick={() => updateIncidentStatus(inc.id, 'VERIFIED')}
                      className="px-2 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] rounded hover:bg-emerald-900 cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                  {inc.status !== 'RESOLVED' && (
                    <button
                      onClick={() => updateIncidentStatus(inc.id, 'RESOLVED')}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded cursor-pointer"
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
