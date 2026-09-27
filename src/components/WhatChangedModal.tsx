import React from 'react';
import { useApp } from '../context/AppContext';
import { analyzeWhatChanged } from '../services/floodRiskEngine';
import {
  GitCompare,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowRight,
  X,
  AlertTriangle,
  Layers,
  CloudRain,
  Waves
} from 'lucide-react';

export const WhatChangedModal: React.FC = () => {
  const { activeRegion, showWhatChangedModal, setShowWhatChangedModal } = useApp();

  if (!showWhatChangedModal) return null;

  const result = analyzeWhatChanged(activeRegion);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center">
              <GitCompare className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Telemetry Delta Engine ("What Changed?")
              </h3>
              <div className="text-xs text-slate-400">
                Comparing current sensor cycle vs snapshot ({result.timeDiffText})
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowWhatChangedModal(false)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Risk Level Shift Badge */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">ASSESSMENT SHIFT:</div>
          <div className="flex items-center gap-2 text-xs font-bold font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
              {result.previousRisk}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            <span className={`px-2.5 py-0.5 rounded border ${
              result.currentRisk === 'CRITICAL' ? 'bg-red-950 text-red-300 border-red-700' :
              result.currentRisk === 'HIGH' ? 'bg-orange-950 text-orange-300 border-orange-700' :
              result.currentRisk === 'MODERATE' ? 'bg-amber-950 text-amber-300 border-amber-700' :
              'bg-emerald-950 text-emerald-300 border-emerald-700'
            }`}>
              {result.currentRisk}
            </span>
          </div>
        </div>

        {/* Delta Metrics Cards */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <CloudRain className="w-3 h-3 text-cyan-400" />
              <span>Rain Delta</span>
            </div>
            <div className={`text-base font-extrabold font-mono mt-1 ${result.rainfallDelta > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {result.rainfallDelta > 0 ? `+${result.rainfallDelta}` : result.rainfallDelta} mm/h
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Waves className="w-3 h-3 text-blue-400" />
              <span>River Delta</span>
            </div>
            <div className={`text-base font-extrabold font-mono mt-1 ${result.riverLevelDelta > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {result.riverLevelDelta > 0 ? `+${result.riverLevelDelta}` : result.riverLevelDelta} m
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Soil Delta</span>
            </div>
            <div className={`text-base font-extrabold font-mono mt-1 ${result.soilMoistureDelta > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {result.soilMoistureDelta > 0 ? `+${result.soilMoistureDelta}` : result.soilMoistureDelta}%
            </div>
          </div>
        </div>

        {/* Key Drivers List */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300">Identified Key Drivers:</div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {result.keyDrivers.map((driver, idx) => (
              <li key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{driver}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Narrative */}
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed">
          <strong>Summary Rationale:</strong> {result.summaryNarrative}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowWhatChangedModal(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
