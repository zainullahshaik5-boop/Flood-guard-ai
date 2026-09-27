import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CloudRain,
  Waves,
  Layers,
  Mountain,
  TrendingUp,
  Activity,
  AlertCircle,
  Gauge
} from 'lucide-react';

export const MultiSourcePanel: React.FC = () => {
  const { activeRegion } = useApp();
  const { rainfall, river, soil, terrain } = activeRegion;

  // Simple SVG sparkline generator for 6-hour rainfall trend
  const sparklinePoints = rainfall.trend6h;
  const maxRain = Math.max(...sparklinePoints, 50);
  const minRain = Math.min(...sparklinePoints, 0);
  const svgWidth = 140;
  const svgHeight = 36;
  const pointsString = sparklinePoints
    .map((val, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * svgWidth;
      const y = svgHeight - ((val - minRain) / (maxRain - minRain || 1)) * (svgHeight - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          Multi-Source Telemetry Grid
        </h3>
        <span className="text-[11px] font-mono text-slate-400">
          Sync Rate: 1 min · AWS & Radar Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Rainfall */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Rainfall Hydrometry
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                {rainfall.intensity}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {rainfall.currentRate.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 font-mono">mm/h</span>
            </div>

            {/* Sparkline & Accumulation */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>6h Trend (AWS)</span>
                <span className="font-mono text-cyan-300">{rainfall.accumulated24h} mm / 24h</span>
              </div>
              <div className="h-9 w-full bg-slate-950/60 rounded p-1 flex items-center justify-center">
                <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsString}
                  />
                  {sparklinePoints.map((val, idx) => {
                    const x = (idx / (sparklinePoints.length - 1)) * svgWidth;
                    const y = svgHeight - ((val - minRain) / (maxRain - minRain || 1)) * (svgHeight - 6) - 3;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="2.5"
                        className="fill-cyan-400 stroke-slate-900"
                        strokeWidth="1"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="truncate max-w-[130px]" title={rainfall.stationName}>
              {rainfall.stationName}
            </span>
            <span className="font-mono text-amber-400">Doppler: {rainfall.radarEchoIntensity}</span>
          </div>
        </div>

        {/* Card 2: River Stage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-blue-400" />
                River Gauge Level
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                river.currentLevel >= river.dangerThreshold
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : river.currentLevel >= river.warningThreshold
                  ? 'bg-orange-950 text-orange-300 border border-orange-800'
                  : 'bg-slate-800 text-emerald-400'
              }`}>
                {river.trend}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {river.currentLevel.toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-mono">meters</span>
            </div>

            {/* Threshold Gauge Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Threshold Proximity</span>
                <span className="font-mono text-slate-300">
                  Danger: {river.dangerThreshold}m
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden flex relative">
                <div
                  className={`h-full transition-all duration-500 ${
                    river.currentLevel >= river.dangerThreshold
                      ? 'bg-red-500'
                      : river.currentLevel >= river.warningThreshold
                      ? 'bg-orange-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (river.currentLevel / river.dangerThreshold) * 100)}%`
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span>Warn: {river.warningThreshold}m</span>
                <span className="font-mono text-cyan-300">{river.dischargeRate} cusecs</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="truncate max-w-[130px]" title={river.gaugeStation}>
              {river.gaugeStation}
            </span>
            <span className="font-mono text-amber-400">+{river.rateOfRise} cm/h</span>
          </div>
        </div>

        {/* Card 3: Soil Moisture */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                Soil Saturation Index
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                soil.moisturePercent > 85 ? 'bg-red-950 text-red-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {soil.saturationIndex.toFixed(2)} / 1.0
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {soil.moisturePercent.toFixed(1)}%
              </span>
              <span className="text-xs text-slate-400 font-mono">volumetric</span>
            </div>

            {/* Saturation Capacity Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Infiltration Buffer</span>
                <span className="font-mono text-amber-300">{soil.absorptionCapacityMm} mm rem.</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    soil.moisturePercent > 88
                      ? 'bg-red-500'
                      : soil.moisturePercent > 75
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${soil.moisturePercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span>Field Capacity</span>
                <span className="font-mono text-orange-400">
                  Landslide Score: {soil.landslideVulnerabilityScore}/100
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="truncate max-w-[130px]">ISRO Bhuvan Matrix</span>
            <span className="font-mono text-slate-400">{soil.saturationTrend}</span>
          </div>
        </div>

        {/* Card 4: Terrain & Slope */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-emerald-400" />
                Terrain Kinematics
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                Cartosat DEM
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {terrain.averageSlopeDeg.toFixed(1)}°
              </span>
              <span className="text-xs text-slate-400 font-mono">mean slope</span>
            </div>

            {/* Runoff & Elevation */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Catchment Elevation:</span>
                <span className="font-mono text-white font-medium">{terrain.catchmentElevationM}m ASL</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Runoff Coefficient:</span>
                <span className="font-mono text-cyan-300 font-medium">{terrain.runoffCoefficient}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Gorge Narrowness:</span>
                <span className="font-mono text-amber-300 truncate max-w-[110px]" title={terrain.valleyNarrownessIndex}>
                  {terrain.valleyNarrownessIndex}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Debris Flow Risk:</span>
            <span className={`font-mono font-bold ${
              terrain.debrisFlowRisk === 'Severe'
                ? 'text-red-400'
                : terrain.debrisFlowRisk === 'High'
                ? 'text-orange-400'
                : 'text-amber-400'
            }`}>
              {terrain.debrisFlowRisk}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
