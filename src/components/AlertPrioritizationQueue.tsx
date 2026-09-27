import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentReport, IncidentStatus } from '../types';
import {
  ListFilter,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  Eye,
  Sliders,
  Users,
  ShieldCheck,
  ShieldAlert,
  Info
} from 'lucide-react';

export const AlertPrioritizationQueue: React.FC = () => {
  const { incidents, updateIncidentStatus, currentUser } = useApp();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  // Sort incidents by AI Priority Score descending
  const sortedIncidents = [...incidents].sort((a, b) => b.priorityScore - a.priorityScore);

  const filteredIncidents = sortedIncidents.filter(inc => {
    const matchesSev = severityFilter === 'ALL' || inc.severity === severityFilter;
    const matchesStat = statusFilter === 'ALL' || inc.status === statusFilter;
    return matchesSev && matchesStat;
  });

  const isAuthority = currentUser?.role === 'AUTHORITY' || currentUser?.role === 'RESPONDER' || currentUser?.role === 'COLLECTOR' || currentUser?.role === 'EVALUATOR';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              AI Incident Urgency Prioritization Queue
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
              TACTICAL TRIAGE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Incoming citizen reports and automated sensor alerts ranked by multi-variable flash hazard urgency.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="VERIFIED">Verified</option>
            <option value="RESPONDING">Responding</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Main Queue List */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
            No incidents found matching filter criteria.
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isSelected = selectedIncident?.id === incident.id;

            return (
              <div
                key={incident.id}
                className={`p-4 rounded-xl border transition-all ${
                  incident.severity === 'CRITICAL'
                    ? 'bg-red-950/20 border-red-800/40 hover:border-red-600/70'
                    : incident.severity === 'HIGH'
                    ? 'bg-orange-950/20 border-orange-800/40 hover:border-orange-600/70'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        incident.severity === 'CRITICAL'
                          ? 'bg-red-900/50 text-red-300 border-red-700'
                          : incident.severity === 'HIGH'
                          ? 'bg-orange-900/50 text-orange-300 border-orange-700'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {incident.severity} PRIORITY
                      </span>

                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        SCORE: {incident.priorityScore}/100
                      </span>

                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {incident.timestamp}
                      </span>

                      <span className="text-[10px] text-slate-400">·</span>

                      <span className="text-[10px] text-slate-400 font-medium">
                        ID: {incident.id}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {incident.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{incident.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                      {incident.description}
                    </p>

                    {/* AI Feature Inspection Badge */}
                    {incident.aiAnalysis && (
                      <div className="mt-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center gap-3">
                        <span className="text-cyan-300 font-semibold flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          AI Inspection:
                        </span>
                        <span>Velocity: <strong className="text-amber-300">{incident.aiAnalysis.waterVelocityIndicator}</strong></span>
                        <span>Threat: <strong className="text-red-300">{incident.aiAnalysis.structuralThreat}</strong></span>
                        <span>Confidence: <strong className="text-slate-200">{incident.aiAnalysis.confidence}%</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Right Status Actions & Team Dispatch */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${
                      incident.status === 'RESPONDING'
                        ? 'bg-blue-950 text-blue-300 border-blue-700 animate-pulse'
                        : incident.status === 'VERIFIED'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : incident.status === 'RESOLVED'
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-amber-950 text-amber-300 border-amber-700'
                    }`}>
                      {incident.status}
                    </span>

                    {incident.assignedTeam && (
                      <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>{incident.assignedTeam}</span>
                      </div>
                    )}

                    {isAuthority && (
                      <div className="flex items-center gap-1.5 mt-2">
                        {incident.status !== 'VERIFIED' && incident.status !== 'RESOLVED' && (
                          <button
                            onClick={() => updateIncidentStatus(incident.id, 'VERIFIED')}
                            className="px-2 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 text-[11px] font-semibold rounded cursor-pointer"
                          >
                            Mark Verified
                          </button>
                        )}

                        {incident.status !== 'RESPONDING' && incident.status !== 'RESOLVED' && (
                          <button
                            onClick={() => updateIncidentStatus(incident.id, 'RESPONDING', 'NDRF Unit 8 Bravo')}
                            className="px-2 py-1 bg-blue-900/60 hover:bg-blue-800 border border-blue-700 text-blue-200 text-[11px] font-semibold rounded cursor-pointer"
                          >
                            Dispatch Team
                          </button>
                        )}

                        {incident.status === 'RESPONDING' && (
                          <button
                            onClick={() => updateIncidentStatus(incident.id, 'RESOLVED')}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded cursor-pointer"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          <strong>Operational Command Notice:</strong> Priority scoring ranks incidents by multi-sensor vulnerability modeling (hazard velocity, bridge choke threat, reported civilian proximity). Prioritization serves as an analytical assistance queue and does not constitute statutory military or civil command unless signed off by authorized incident commanders.
        </span>
      </div>
    </div>
  );
};
