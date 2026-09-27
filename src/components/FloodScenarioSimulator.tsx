import React, { useState } from 'react';
import { runFloodSimulation } from '../services/scenarioSimulator';
import { SimulationParameters } from '../types';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Clock,
  Waves,
  CloudRain,
  Layers,
  Mountain,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const FloodScenarioSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParameters>({
    rainfallRateMmH: 52.0,
    rainfallDurationHours: 3,
    initialRiverStageM: 5.2,
    soilMoisturePct: 86,
    slopeAngleDeg: 38,
    deforestationFactor: 'Moderate Grazing'
  });

  const result = runFloodSimulation(params);

  // Preset Scenario Handlers
  const applyPreset = (preset: string) => {
    if (preset === 'cloudburst') {
      setParams({
        rainfallRateMmH: 85.0,
        rainfallDurationHours: 2,
        initialRiverStageM: 5.6,
        soilMoisturePct: 94,
        slopeAngleDeg: 42,
        deforestationFactor: 'High Deforestation'
      });
    } else if (preset === 'monsoon_steady') {
      setParams({
        rainfallRateMmH: 34.0,
        rainfallDurationHours: 5,
        initialRiverStageM: 4.4,
        soilMoisturePct: 76,
        slopeAngleDeg: 32,
        deforestationFactor: 'Moderate Grazing'
      });
    } else if (preset === 'normal_rainfall') {
      setParams({
        rainfallRateMmH: 12.0,
        rainfallDurationHours: 2,
        initialRiverStageM: 3.1,
        soilMoisturePct: 48,
        slopeAngleDeg: 28,
        deforestationFactor: 'Pristine Forest'
      });
    }
  };

  // SVG Hydrograph Chart calculation
  const hydroWidth = 560;
  const hydroHeight = 160;
  const padX = 40;
  const padY = 25;
  const uWidth = hydroWidth - padX * 2;
  const uHeight = hydroHeight - padY * 2;

  const maxQ = Math.max(...result.hydrographCurve.map(h => h.discharge), 4000);
  const maxMinute = 360;

  const hydroPoints = result.hydrographCurve.map(h => {
    const x = padX + (h.minute / maxMinute) * uWidth;
    const y = hydroHeight - padY - (h.discharge / maxQ) * uHeight;
    return { ...h, x, y };
  });

  const hydroPath = hydroPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const hydroArea = `${hydroPath} L ${hydroPoints[hydroPoints.length - 1].x} ${hydroHeight - padY} L ${hydroPoints[0].x} ${hydroHeight - padY} Z`;

  const peakPoint = hydroPoints.reduce((prev, curr) => curr.discharge > prev.discharge ? curr : prev, hydroPoints[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Simulation Banner */}
      <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="font-extrabold text-amber-200 tracking-wide flex items-center gap-2">
              FLOOD SCENARIO SIMULATOR (DIGITAL TWIN)
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/50 text-amber-300">
                SANDBOX
              </span>
            </div>
            <div className="text-[11px] text-amber-300/80">
              Interactive physical runoff modeling based on SCS-CN curve hydrology.
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-700/60 uppercase">
          SIMULATION — NOT AN OFFICIAL FORECAST
        </div>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-slate-400 font-mono">QUICK TEST PRESETS:</span>
        <button
          onClick={() => applyPreset('cloudburst')}
          className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-700/80 text-red-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          Cloudburst Surge (85mm/h)
        </button>
        <button
          onClick={() => applyPreset('monsoon_steady')}
          className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/80 text-amber-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <CloudRain className="w-3.5 h-3.5 text-amber-400" />
          Heavy Monsoon Steady (34mm/h)
        </button>
        <button
          onClick={() => applyPreset('normal_rainfall')}
          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/80 text-emerald-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Controlled Runoff (12mm/h)
        </button>
      </div>

      {/* Main Simulation Layout: Controls on Left, Hydrograph and Dynamic Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold pb-2 border-b border-slate-800 flex items-center justify-between">
            <span>Scenario Parameters</span>
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Slider 1: Rainfall Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                Rainfall Intensity:
              </span>
              <span className="font-mono font-bold text-cyan-300">{params.rainfallRateMmH} mm/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              step="1"
              value={params.rainfallRateMmH}
              onChange={(e) => setParams({ ...params, rainfallRateMmH: parseFloat(e.target.value) })}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 (Dry)</span>
              <span>40 (Heavy)</span>
              <span>120 (Cloudburst)</span>
            </div>
          </div>

          {/* Slider 2: Rainfall Duration */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Storm Duration:
              </span>
              <span className="font-mono font-bold text-blue-300">{params.rainfallDurationHours} hours</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={params.rainfallDurationHours}
              onChange={(e) => setParams({ ...params, rainfallDurationHours: parseInt(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1h (Flash Pulse)</span>
              <span>4h (Sustained)</span>
              <span>8h (Prolonged)</span>
            </div>
          </div>

          {/* Slider 3: River Level */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-blue-400" />
                Initial River Stage:
              </span>
              <span className="font-mono font-bold text-white">{params.initialRiverStageM} meters</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="7.0"
              step="0.1"
              value={params.initialRiverStageM}
              onChange={(e) => setParams({ ...params, initialRiverStageM: parseFloat(e.target.value) })}
              className="w-full accent-blue-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1.0m (Baseflow)</span>
              <span>5.5m (Warning)</span>
              <span>7.0m (Breach)</span>
            </div>
          </div>

          {/* Slider 4: Soil Saturation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Soil Saturation:
              </span>
              <span className="font-mono font-bold text-amber-300">{params.soilMoisturePct}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={params.soilMoisturePct}
              onChange={(e) => setParams({ ...params, soilMoisturePct: parseInt(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% (Porous)</span>
              <span>60% (Moist)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* Slider 5: Slope Angle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                Mountain Slope Gradient:
              </span>
              <span className="font-mono font-bold text-emerald-300">{params.slopeAngleDeg}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="1"
              value={params.slopeAngleDeg}
              onChange={(e) => setParams({ ...params, slopeAngleDeg: parseInt(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15° (Rolling Foothills)</span>
              <span>35° (Steep Ridge)</span>
              <span>50° (Vertical Gorge)</span>
            </div>
          </div>

          {/* Land Cover Dropdown */}
          <div className="space-y-1 pt-1">
            <label className="text-xs text-slate-300 block">Catchment Vegetative Cover:</label>
            <select
              value={params.deforestationFactor}
              onChange={(e) => setParams({ ...params, deforestationFactor: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
            >
              <option value="Pristine Forest">Dense Alpine Forest (High Retardance)</option>
              <option value="Moderate Grazing">Mixed Terraced Farming (Medium Retardance)</option>
              <option value="High Deforestation">Deforested / Bare Regolith (Instant Runoff)</option>
            </select>
          </div>
        </div>

        {/* Right Column: Hydrograph & Real-Time Output */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dynamic Risk Gauge Box */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            result.simulatedRisk === 'CRITICAL'
              ? 'bg-red-950/60 border-red-700/80 text-red-200'
              : result.simulatedRisk === 'HIGH'
              ? 'bg-orange-950/60 border-orange-700/80 text-orange-200'
              : result.simulatedRisk === 'MODERATE'
              ? 'bg-amber-950/60 border-amber-700/80 text-amber-200'
              : 'bg-emerald-950/60 border-emerald-700/80 text-emerald-200'
          }`}>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                Simulated Output Response
              </div>
              <div className="text-2xl sm:text-3xl font-black mt-0.5 tracking-tight flex items-center gap-2">
                {result.simulatedRisk} RISK
              </div>
              <p className="text-xs mt-1 leading-snug max-w-md">
                {result.summaryNote}
              </p>
            </div>

            <div className="bg-black/40 p-3 rounded-lg border border-white/10 shrink-0 space-y-1 font-mono text-xs">
              <div>Lag Time to Peak: <span className="font-bold text-cyan-300">{result.lagTimeToPeakMinutes} mins</span></div>
              <div>Peak Discharge: <span className="font-bold text-white">{result.peakDischargeCusecs.toLocaleString()} cusecs</span></div>
              <div>Projected River Stage: <span className="font-bold text-amber-300">{result.projectedRiverStageM}m</span></div>
            </div>
          </div>

          {/* Simulated Synthetic Unit Hydrograph */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-xs font-mono text-slate-300 font-bold">
                SIMULATED FLOOD HYDROGRAPH (6-HOUR DISCHARGE CURVE)
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                Peak: Minute {result.lagTimeToPeakMinutes}
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${hydroWidth} ${hydroHeight}`} className="w-full h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="hydroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y Axis Guide */}
                <line x1={padX} y1={padY} x2={padX} y2={hydroHeight - padY} stroke="#334155" strokeWidth="1" />
                {/* X Axis Guide */}
                <line x1={padX} y1={hydroHeight - padY} x2={hydroWidth - padX} y2={hydroHeight - padY} stroke="#334155" strokeWidth="1" />

                {/* Area and Line */}
                <path d={hydroArea} fill="url(#hydroGrad)" />
                <path d={hydroPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

                {/* Peak point indicator */}
                <circle cx={peakPoint.x} cy={peakPoint.y} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x={peakPoint.x} y={peakPoint.y - 8} textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                  {result.peakDischargeCusecs} cfs
                </text>

                {/* Axis Labels */}
                <text x={padX} y={hydroHeight - 5} fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
                  0m
                </text>
                <text x={padX + uWidth / 2} y={hydroHeight - 5} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
                  180m (3h)
                </text>
                <text x={hydroWidth - padX} y={hydroHeight - 5} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
                  360m (6h)
                </text>
              </svg>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div>
                <span>Infiltration Ceased:</span>
                <div className="font-mono text-white font-bold">{result.soilSaturationReachedPct}%</div>
              </div>
              <div>
                <span>Estimated Inundation:</span>
                <div className="font-mono text-white font-bold">{result.floodInundationAreaSqKm} sq km</div>
              </div>
              <div>
                <span>Slope Kinetic Wave:</span>
                <div className="font-mono text-cyan-300 font-bold">~4.8 m/s</div>
              </div>
              <div>
                <span>Culvert Overtopping:</span>
                <div className={`font-mono font-bold ${result.projectedRiverStageM > 5.5 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {result.projectedRiverStageM > 5.5 ? 'YES (Breached)' : 'NO (Safe)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
