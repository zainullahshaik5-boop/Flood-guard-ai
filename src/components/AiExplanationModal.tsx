import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  X,
  Activity,
  Layers,
  Waves,
  CloudRain,
  Mountain,
  ShieldCheck,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const AiExplanationModal: React.FC = () => {
  const { activeRegion, showAiExplanationModal, setShowAiExplanationModal } = useApp();

  if (!showAiExplanationModal) return null;

  const { risk, rainfall, river, soil, terrain } = activeRegion;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                AI Flood Risk Engine — Physical Factor Attribution
              </h3>
              <div className="text-xs text-slate-400">
                Deterministic Multi-Source Synthesis for {activeRegion.name}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAiExplanationModal(false)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="text-slate-400 font-mono text-[10px]">CURRENT CLASSIFICATION:</div>
            <div className={`text-xl font-black mt-0.5 tracking-tight ${
              risk.level === 'CRITICAL' ? 'text-red-400' :
              risk.level === 'HIGH' ? 'text-orange-400' :
              risk.level === 'MODERATE' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {risk.level} RISK · {risk.trend}
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-slate-400 font-mono text-[10px]">MULTI-SENSOR CONSENSUS:</div>
            <div className="text-xl font-bold font-mono text-cyan-300 mt-0.5">
              {risk.confidencePercent}% agreement
            </div>
            <div className="text-[10px] text-slate-500">Telemetry consensus, not absolute certainty</div>
          </div>
        </div>

        {/* Natural Language Physical Explanation */}
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed">
          <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            Physical Runoff Explanation:
          </div>
          {risk.aiExplanation}
        </div>

        {/* Weighted Contributing Factors Breakdown */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Contributing Sensor Weights & Thresholds:</span>
            <span className="text-[10px] font-mono text-slate-500">SCS-CN MODEL WEIGHTS</span>
          </div>

          <div className="space-y-2">
            {risk.factors.map((factor, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{factor.name}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                    factor.status === 'CRITICAL' ? 'bg-red-950 text-red-300 border-red-800' :
                    factor.status === 'HIGH' ? 'bg-orange-950 text-orange-300 border-orange-800' :
                    factor.status === 'ELEVATED' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {factor.status}
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full ${
                      factor.weight > 80 ? 'bg-red-500' :
                      factor.weight > 60 ? 'bg-orange-500' :
                      factor.weight > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${factor.weight}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">
                  {factor.contributionText}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Physics Formula Note */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono leading-relaxed">
          <strong>Hydrological Invariant:</strong> {risk.physicalRationale}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowAiExplanationModal(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
