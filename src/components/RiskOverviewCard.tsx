import React from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  GitCompare,
  FileText,
  Clock,
  CheckCircle,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export const RiskOverviewCard: React.FC = () => {
  const {
    activeRegion,
    setShowAiExplanationModal,
    setShowWhatChangedModal,
    setShowSituationReportModal,
    setShowAlertGeneratorModal,
    currentUser
  } = useApp();

  const { risk, river } = activeRegion;

  const riskColorConfig = {
    LOW: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-600/50',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'shadow-emerald-950/50',
      icon: ShieldCheck,
      desc: 'Hydrological metrics nominal. River stages within safe banks.'
    },
    MODERATE: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-600/50',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: 'shadow-amber-950/50',
      icon: AlertTriangle,
      desc: 'Elevated precipitation or rising river inflows. Low areas vulnerable.'
    },
    HIGH: {
      bg: 'bg-orange-950/40',
      border: 'border-orange-600/50',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      glow: 'shadow-orange-950/50',
      icon: AlertTriangle,
      desc: 'Critical runoff thresholds breached. River approaching or past warning mark.'
    },
    CRITICAL: {
      bg: 'bg-red-950/50',
      border: 'border-red-600/60',
      badge: 'bg-red-500/10 text-red-400 border-red-500/30',
      glow: 'shadow-red-950/70',
      icon: ShieldAlert,
      desc: 'Imminent violent flash surge. Extreme pore pressure and rapid overflow.'
    }
  }[risk.level];

  const TrendIcon = risk.trend.includes('Rising')
    ? TrendingUp
    : risk.trend.includes('Receding')
    ? TrendingDown
    : Minus;

  const isAuthority = currentUser?.role === 'AUTHORITY' || currentUser?.role === 'COLLECTOR' || currentUser?.role === 'EVALUATOR';

  return (
    <div className={`rounded-2xl border ${riskColorConfig.border} ${riskColorConfig.bg} p-5 sm:p-6 shadow-xl ${riskColorConfig.glow} backdrop-blur-sm relative overflow-hidden transition-all`}>
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Catchment Flash Flood Status
            </span>
            <span className="text-[10px] text-slate-500">·</span>
            <span className="text-xs text-slate-300 font-medium">{activeRegion.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
            {activeRegion.basin}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Action: Why This Risk? */}
          <button
            onClick={() => setShowAiExplanationModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            title="Inspect AI physical rationale and sensor factor breakdown"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Why this risk?</span>
          </button>

          {/* Action: What Changed? */}
          <button
            onClick={() => setShowWhatChangedModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            title="Compare latest sensor cycle against previous baseline"
          >
            <GitCompare className="w-3.5 h-3.5 text-amber-400" />
            <span>What Changed?</span>
          </button>
        </div>
      </div>

      {/* Main Risk Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-5">
        {/* Left: Large Visual Risk Badge */}
        <div className="md:col-span-6 flex items-center gap-4">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border ${riskColorConfig.badge} shadow-lg shrink-0`}>
            <riskColorConfig.icon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${risk.level === 'CRITICAL' ? 'text-red-400' : risk.level === 'HIGH' ? 'text-orange-400' : risk.level === 'MODERATE' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {risk.level} RISK
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${riskColorConfig.badge}`}>
                <TrendIcon className="w-3.5 h-3.5" />
                {risk.trend}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
              {riskColorConfig.desc}
            </p>
          </div>
        </div>

        {/* Right: Quantitative Multi-Source Metrics */}
        <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Consensus Confidence</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300 flex items-center gap-1.5 mt-0.5">
              {risk.confidencePercent}%
              <span className="text-[10px] text-slate-400 font-sans font-normal">sensor agreement</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Multi-sensor consensus (not absolute certainty)</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase font-mono">River Distance to Warning</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-200 mt-0.5">
              {river.currentLevel >= river.warningThreshold ? (
                <span className="text-red-400">
                  +{(river.currentLevel - river.warningThreshold).toFixed(2)}m
                </span>
              ) : (
                <span className="text-emerald-400">
                  -{(river.warningThreshold - river.currentLevel).toFixed(2)}m
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Warning: {river.warningThreshold}m | Danger: {river.dangerThreshold}m
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Hydrograph Crest Surge</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-300 mt-0.5 flex items-center gap-1">
              +{river.rateOfRise} cm/h
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Est. peak arrival: ~35–50 mins
            </div>
          </div>
        </div>
      </div>

      {/* Primary Cause Bar & Executive Action Row */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span><strong>Primary Factor:</strong> {risk.primaryCause}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Situation Report Button */}
          <button
            onClick={() => setShowSituationReportModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-200 font-medium text-xs transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Generate Situation Report</span>
          </button>

          {/* Quick Alert Broadcast Trigger for Authorities */}
          {isAuthority && (
            <button
              onClick={() => setShowAlertGeneratorModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-950/80 hover:bg-orange-900 border border-orange-700/60 text-orange-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              <span>Broadcast Warning</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
