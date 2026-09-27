import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { UserRole } from '../types';
import {
  ShieldAlert,
  ArrowRight,
  LifeBuoy,
  Play,
  Info,
  CheckCircle2,
  Mountain,
  Radio,
  Eye,
  Sliders,
  AlertTriangle,
  Compass,
  FileCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { enterDemoMode, enterEmergencyCitizenMode, loginAsRole } = useApp();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('AUTHORITY');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambience with Hero Valley Image */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="/src/assets/images/himalayan_river_valley_1790516109200.jpg"
          alt="Himalayan Mountain Valley River"
          className="w-full h-full object-cover object-center filter saturate-75 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/40 ring-1 ring-cyan-400/40">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              FLOOD GUARD AI
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-700/50">
                SIH26192
              </span>
            </div>
            <div className="text-xs text-slate-400">
              National Disaster Management Architecture · Smart India Hackathon 2026
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowLearnMore(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Learn More
          </button>
          <button
            onClick={enterEmergencyCitizenMode}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-200 bg-red-950/80 hover:bg-red-900/80 border border-red-700/80 rounded-lg transition-colors shadow-lg shadow-red-950/40 cursor-pointer"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Emergency Access
          </button>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Mission & Core Workflow */}
        <div className="lg:col-span-7 space-y-6">
          {/* SIH Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1 rounded-full">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Problem Statement SIH26192: Flash Flood Prediction for Hilly Regions
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            AI-Powered Flash Flood Prediction & Early Warning for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Hilly Regions
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Multi-source hydrological telemetry combining Automated Weather Stations, CWC river radar gauges, ISRO Bhuvan regolith soil moisture, and high-resolution Cartosat slope elevation to predict violent mountain flash surges before they strike.
          </p>

          {/* Workflow Chain: PREDICT → WARN → RESPOND → PROTECT */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Operational Emergency Doctrine</span>
              <span className="text-cyan-400 font-bold">Closed-Loop Workflow</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { step: 'PREDICT', desc: 'Physics-informed AI multi-sensor fusion', icon: Mountain, color: 'text-cyan-400' },
                { step: 'WARN', desc: 'Cell broadcast & Common Alerting Protocol', icon: Radio, color: 'text-amber-400' },
                { step: 'RESPOND', desc: 'NDRF tactical priority queue & dispatch', icon: Sliders, color: 'text-orange-400' },
                { step: 'PROTECT', desc: 'High-ground shelter routing & civil safety', icon: ShieldAlert, color: 'text-emerald-400' }
              ].map((item, idx) => (
                <div key={item.step} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-xs font-bold text-white tracking-wide">{item.step}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={enterDemoMode}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-900/40 hover:scale-[1.01] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Enter Instant Demo Mode (Evaluator)
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowLearnMore(true)}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium rounded-xl text-sm transition-colors cursor-pointer"
            >
              Technical Specification
            </button>
          </div>
        </div>

        {/* Right Column: Role-Specific Authentication Panel */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/95 border border-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <div className="text-sm font-bold text-white">Disaster Command Access</div>
                <div className="text-xs text-slate-400">Select authenticated operational role</div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                SIMULATED RBAC
              </span>
            </div>

            {/* Role Switcher Tabs */}
            <div className="space-y-2 mb-5">
              {DEMO_USERS.map((user) => {
                const isSelected = selectedRole === user.role;
                return (
                  <button
                    key={user.id}
                    onClick={() => setSelectedRole(user.role)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500/80 ring-1 ring-cyan-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                          {user.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {user.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{user.roleTitle}</div>
                      <div className="text-[10px] text-slate-500">{user.organization}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Login Action Button */}
            <button
              onClick={() => loginAsRole(selectedRole)}
              className="w-full py-2.5 px-4 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 cursor-pointer"
            >
              Sign In to Role Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Demo Notice */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed text-center">
              Evaluator Note: No real password needed. Selecting a role provisions verified credentials and contextual tools instantly.
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/90 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            Smart India Hackathon 2026 · Problem Statement SIH26192 · Ministry of Jal Shakti / NDMA Alignment
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Alaknanda</span>
            <span>·</span>
            <span>Beas</span>
            <span>·</span>
            <span>Chaliyar</span>
            <span>·</span>
            <span>Teesta</span>
          </div>
        </div>
      </footer>

      {/* Learn More & Technical Architecture Modal */}
      {showLearnMore && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <Mountain className="w-5 h-5 text-cyan-400" />
                SIH26192: Flash Flood Prediction System for Hilly Regions
              </div>
              <button
                onClick={() => setShowLearnMore(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-cyan-950/40 border border-cyan-800/40 p-3 rounded-xl">
                <div className="font-bold text-cyan-300 mb-1">Why Conventional Flood Forecasting Fails in Hilly Regions</div>
                <p>
                  Plains river forecasting relies on slow crest movement measured over 24 to 72 hours. In mountainous terrain (Himalayas and Western Ghats), steep slopes (30°–50°), thin regolith, and orographic cloudbursts convert precipitation into violent overland torrents in <strong>under 45 minutes</strong>, washing out sensors and bridges before conventional models trigger.
                </p>
              </div>

              <div>
                <div className="font-bold text-white text-sm mb-1">Multi-Source Data Fusion Architecture</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-bold text-cyan-400 mb-0.5">1. Orographic Precipitation</div>
                    <p className="text-[11px] text-slate-400">High-altitude IMD Automatic Weather Stations (AWS) + Doppler radar reflectivity tracking cloudburst cells.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-bold text-cyan-400 mb-0.5">2. River Hydro-Stage & Rise Velocity</div>
                    <p className="text-[11px] text-slate-400">Central Water Commission (CWC) ultrasonic acoustic radar measuring river level and rate of rise in cm/hr.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-bold text-cyan-400 mb-0.5">3. Topsoil Saturation & Pore Pressure</div>
                    <p className="text-[11px] text-slate-400">ISRO Bhuvan satellite microwave radiometry + in-situ TDR soil moisture probes identifying zero-infiltration saturation points.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-bold text-cyan-400 mb-0.5">4. Cartosat DEM & Slope Hydro-Kinematics</div>
                    <p className="text-[11px] text-slate-400">High-resolution Digital Elevation Models calculating kinematic wave velocity, gorge choke points, and debris entrainment risk.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-bold text-white text-sm mb-1">Key Prototype Innovations for Hackathon Demo</div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                  <li><strong>Deterministic Physics-Informed ML:</strong> Soil Conservation Service Curve Number (SCS-CN) integrated with orographic rainfall nowcasting.</li>
                  <li><strong>Unique "Flood Digital Twin" Simulator:</strong> Evaluators can interactively vary rainfall intensity, river stage, and slope to observe real-time hydrograph response.</li>
                  <li><strong>AI Multimodal Flood Reporter:</strong> Crowd-sourced photo verification with debris and velocity inspection.</li>
                  <li><strong>Zero-Latency Offline Emergency Mode:</strong> Uninterrupted operations during mountain telecom towers failure.</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setShowLearnMore(false);
                    enterDemoMode();
                  }}
                  className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  Launch Demonstration Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
