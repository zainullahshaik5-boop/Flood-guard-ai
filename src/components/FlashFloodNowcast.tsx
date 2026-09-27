import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  TrendingUp,
  AlertTriangle,
  Info,
  Calendar,
  CloudRain,
  Waves,
  Layers,
  ChevronRight
} from 'lucide-react';

export const FlashFloodNowcast: React.FC = () => {
  const { activeRegion } = useApp();
  const { nowcast, river } = activeRegion;
  const [selectedHourIdx, setSelectedHourIdx] = useState<number>(0);

  const selectedPoint = nowcast[selectedHourIdx] || nowcast[0];

  // SVG Chart Geometry
  const chartWidth = 620;
  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 25;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  // Max score is 100, min is 0
  const points = nowcast.map((pt, idx) => {
    const x = paddingX + (idx / (nowcast.length - 1)) * usableWidth;
    const y = chartHeight - paddingY - (pt.riskScore / 100) * usableHeight;
    return { ...pt, x, y, idx };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  // Warning and Danger line thresholds (scaled to 65 and 85 risk score)
  const warnY = chartHeight - paddingY - (65 / 100) * usableHeight;
  const dangerY = chartHeight - paddingY - (85 / 100) * usableHeight;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              AI Flash Flood Nowcast (0 – 6 Hours)
            </h3>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              SIMULATED FORECAST
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive trajectory based on upstream orographic radar and catchment lag time.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          <Calendar className="w-3 h-3 text-cyan-400" />
          <span>Model Update: +15m Auto-Cycle</span>
        </div>
      </div>

      {/* Main Grid: Chart on Left, Selected Hour Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Interactive Trajectory Chart */}
        <div className="lg:col-span-8 overflow-x-auto">
          <div className="min-w-[550px] relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Background Reference Lines */}
              <line
                x1={paddingX}
                y1={dangerY}
                x2={chartWidth - paddingX}
                y2={dangerY}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth="1"
                opacity="0.6"
              />
              <text x={chartWidth - paddingX + 5} y={dangerY + 3} fill="#ef4444" fontSize="9" fontFamily="JetBrains Mono">
                DANGER
              </text>

              <line
                x1={paddingX}
                y1={warnY}
                x2={chartWidth - paddingX}
                y2={warnY}
                stroke="#f97316"
                strokeDasharray="4 4"
                strokeWidth="1"
                opacity="0.6"
              />
              <text x={chartWidth - paddingX + 5} y={warnY + 3} fill="#f97316" fontSize="9" fontFamily="JetBrains Mono">
                WARNING
              </text>

              {/* Area Gradient Fill */}
              <defs>
                <linearGradient id="nowcastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#nowcastGradient)" />

              {/* Path Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt) => {
                const isSelected = selectedHourIdx === pt.idx;
                return (
                  <g
                    key={pt.idx}
                    onClick={() => setSelectedHourIdx(pt.idx)}
                    className="cursor-pointer group"
                  >
                    {/* Invisible Hit Target */}
                    <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                    {/* Point Circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '6' : '4'}
                      className={`transition-all ${
                        pt.predictedRisk === 'CRITICAL'
                          ? 'fill-red-500 stroke-red-200'
                          : pt.predictedRisk === 'HIGH'
                          ? 'fill-orange-500 stroke-orange-200'
                          : pt.predictedRisk === 'MODERATE'
                          ? 'fill-amber-500 stroke-amber-200'
                          : 'fill-emerald-500 stroke-emerald-200'
                      }`}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />

                    {/* Vertical guideline on hover/select */}
                    {isSelected && (
                      <line
                        x1={pt.x}
                        y1={paddingY}
                        x2={pt.x}
                        y2={chartHeight - paddingY}
                        stroke="#06b6d4"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Hour Label */}
                    <text
                      x={pt.x}
                      y={chartHeight - paddingY + 16}
                      textAnchor="middle"
                      fill={isSelected ? '#22d3ee' : '#94a3b8'}
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {pt.hourLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-2">
            <span>Click any hour interval to inspect projected hydrological parameters.</span>
            <span className="font-mono text-cyan-300">Selected: {selectedPoint.hourLabel}</span>
          </div>
        </div>

        {/* Selected Hour Telemetry Inspection Card */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
            <span className="text-xs font-mono text-cyan-400 font-bold">
              TIMEFRAME: {selectedPoint.hourLabel}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${
              selectedPoint.predictedRisk === 'CRITICAL'
                ? 'bg-red-950 text-red-300 border-red-800'
                : selectedPoint.predictedRisk === 'HIGH'
                ? 'bg-orange-950 text-orange-300 border-orange-800'
                : selectedPoint.predictedRisk === 'MODERATE'
                ? 'bg-amber-950 text-amber-300 border-amber-800'
                : 'bg-emerald-950 text-emerald-300 border-emerald-800'
            }`}>
              {selectedPoint.predictedRisk} ({selectedPoint.riskScore}/100)
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                Projected Rainfall:
              </span>
              <span className="font-mono font-bold text-white">{selectedPoint.rainfallMmH} mm/h</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-blue-400" />
                Projected River Stage:
              </span>
              <span className="font-mono font-bold text-white">
                {selectedPoint.riverLevelM.toFixed(2)}m
                <span className="text-[10px] font-normal text-slate-500 ml-1">
                  (Warning: {river.warningThreshold}m)
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Soil Saturation:
              </span>
              <span className="font-mono font-bold text-white">{selectedPoint.soilMoisturePct}%</span>
            </div>

            {selectedPoint.transitionEvent && (
              <div className="mt-3 p-2 rounded bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-300 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Transition Event:</strong> {selectedPoint.transitionEvent}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <button
              onClick={() => setSelectedHourIdx(Math.max(0, selectedHourIdx - 1))}
              disabled={selectedHourIdx === 0}
              className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Prev Hour
            </button>
            <span className="text-[10px] text-slate-500 font-mono">
              Step {selectedHourIdx + 1} of {nowcast.length}
            </span>
            <button
              onClick={() => setSelectedHourIdx(Math.min(nowcast.length - 1, selectedHourIdx + 1))}
              disabled={selectedHourIdx === nowcast.length - 1}
              className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Next Hour →
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          <strong>Operational Notice:</strong> Flash flood nowcasts are generated from simulated radar precipitation vectors and calibrated hydrological routing models. They do not constitute official statutory evacuation mandates unless confirmed by local Disaster Management Authorities.
        </span>
      </div>
    </div>
  );
};
