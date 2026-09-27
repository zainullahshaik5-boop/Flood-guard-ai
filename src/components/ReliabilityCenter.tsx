import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Radio,
  Clock,
  Info,
  ShieldCheck,
  Server
} from 'lucide-react';

export const ReliabilityCenter: React.FC = () => {
  const { activeRegion } = useApp();
  const { reliability } = activeRegion;

  const hasLimited = reliability.some(r => r.status === 'LIMITED' || r.status === 'INSUFFICIENT');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Prediction Reliability & Sensor Health Center
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              AUDIT TRAIL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry integrity monitoring across Automatic Weather Stations, river hydro-radars, and satellite probes.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          Catchment: {activeRegion.name}
        </div>
      </div>

      {/* Degradation Warning Banner if any sensor is limited */}
      {hasLimited && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">PARTIAL TELEMETRY LATENCY DETECTED:</div>
            <p className="text-[11px] text-amber-300/90 leading-relaxed">
              One or more high-altitude mountain gauges have experienced communication latency over satellite uplinks. The AI Prediction Engine has automatically switched to orographic radar backfill and conservative hydrograph estimations. Prediction confidence is dynamically scaled.
            </p>
          </div>
        </div>
      )}

      {/* Sensor Health Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reliability.map((sensor, idx) => {
          const isReliable = sensor.status === 'RELIABLE';
          const isLimited = sensor.status === 'LIMITED';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                isReliable
                  ? 'bg-slate-950/80 border-slate-800'
                  : isLimited
                  ? 'bg-amber-950/20 border-amber-800/50'
                  : 'bg-red-950/20 border-red-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">
                    {sensor.sensorCategory}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${
                    isReliable
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : isLimited
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-red-950 text-red-300 border-red-800'
                  }`}>
                    {isReliable ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-amber-400" />}
                    {sensor.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">
                  {sensor.stationName}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sensor.impactOnConfidence}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  Last Ping: <strong className="text-slate-200">{sensor.lastPingMinutesAgo} mins ago</strong>
                </span>

                <span className="font-mono">
                  Quality Index: <strong className={isReliable ? 'text-emerald-400' : 'text-amber-400'}>{sensor.dataQualityPct}%</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensor Invariance Protocol */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
        <div className="font-bold text-white flex items-center gap-1.5">
          <Server className="w-4 h-4 text-cyan-400" />
          Fail-Safe Multi-Source Synthesis Protocol
        </div>
        <p className="leading-relaxed text-[11px] text-slate-400">
          In hilly terrain, physical gauge washouts during cloudbursts are common. When a primary river gauge fails, FLOOD GUARD AI refuses to crash or present false measurements. Instead, it flags the missing stream as <strong>LIMITED</strong>, scales total prediction certainty accordingly, and switches to upstream rainfall radar + slope kinematic time-of-travel calculations.
        </p>
      </div>
    </div>
  );
};
