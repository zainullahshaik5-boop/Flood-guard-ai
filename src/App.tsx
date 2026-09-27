import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { RiskOverviewCard } from './components/RiskOverviewCard';
import { MultiSourcePanel } from './components/MultiSourcePanel';
import { FlashFloodNowcast } from './components/FlashFloodNowcast';
import { InteractiveRiskMap } from './components/InteractiveRiskMap';
import { FloodScenarioSimulator } from './components/FloodScenarioSimulator';
import { MultimodalReporterModal } from './components/MultimodalReporterModal';
import { AlertPrioritizationQueue } from './components/AlertPrioritizationQueue';
import { EmergencyAlertGenerator } from './components/EmergencyAlertGenerator';
import { FloodGuardAssistant } from './components/FloodGuardAssistant';
import { SituationReportModal } from './components/SituationReportModal';
import { WhatChangedModal } from './components/WhatChangedModal';
import { AiExplanationModal } from './components/AiExplanationModal';
import { ReliabilityCenter } from './components/ReliabilityCenter';
import { EmergencyCenterPage } from './components/EmergencyCenterPage';
import { IncidentManagementPage } from './components/IncidentManagementPage';
import { AlertHistoryPage } from './components/AlertHistoryPage';
import { AnalyticsDashboardPage } from './components/AnalyticsDashboardPage';
import {
  Sparkles,
  MessageSquare,
  LifeBuoy,
  FileText,
  Sliders,
  Camera,
  MapPin,
  TrendingUp,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function App() {
  const {
    currentUser,
    isAuthenticated,
    activeTab,
    setActiveTab,
    setShowAssistantDrawer,
    setShowSituationReportModal,
    showAlertGeneratorModal,
    setShowAlertGeneratorModal
  } = useApp();

  // If not authenticated or evaluator hasn't clicked Demo/Login yet, show Landing Page
  if (!isAuthenticated || !currentUser) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Role-Specific Command Sub-Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Authenticated Station:</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              {currentUser.name}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400 font-medium">{currentUser.roleTitle}</span>
            <span className="text-slate-500 hidden md:inline">({currentUser.organization})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sliders className="w-3 h-3" />
              <span>Digital Twin Simulator</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setActiveTab('reporter')}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Camera className="w-3 h-3" />
              <span>AI Photo Reporter</span>
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setActiveTab('reliability')}
              className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Sensor Health</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* 1. Large Flood Risk Status Card */}
            <RiskOverviewCard />

            {/* 2. Multi-Source Telemetry Grid (Rainfall, River, Soil, Terrain) */}
            <MultiSourcePanel />

            {/* 3. 6-Hour AI Flash Flood Nowcast */}
            <FlashFloodNowcast />

            {/* 4. Interactive GIS Hazard Map */}
            <InteractiveRiskMap />

            {/* 5. Quick Workflow Launcher Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('simulator')}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    Flood Scenario Simulator
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">DIGITAL TWIN →</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactively simulate cloudburst storms, river surge, and soil saturation response in real time.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('reporter')}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white group-hover:text-blue-300 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-400" />
                    AI Flood Reporter
                  </span>
                  <span className="text-[10px] font-mono text-blue-400">VISION AI →</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload crowd-sourced flood photos for automated water velocity and structural obstruction triage.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('prioritization')}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-orange-500/50 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white group-hover:text-orange-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    Alert Prioritization Queue
                  </span>
                  <span className="text-[10px] font-mono text-orange-400">TACTICAL →</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Multi-variable vulnerability ranking for search & rescue dispatch and bridge clearance.
                </p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'map' && <InteractiveRiskMap />}
        {activeTab === 'simulator' && <FloodScenarioSimulator />}
        {activeTab === 'reporter' && <MultimodalReporterModal />}
        {activeTab === 'prioritization' && <AlertPrioritizationQueue />}
        {activeTab === 'analytics' && <AnalyticsDashboardPage />}
        {activeTab === 'emergency' && <EmergencyCenterPage />}
        {activeTab === 'alerts' && <AlertHistoryPage />}
        {activeTab === 'incidents' && <IncidentManagementPage />}
        {activeTab === 'reliability' && <ReliabilityCenter />}
      </main>

      {/* Floating Action Button for Emergency Assistant */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setShowAssistantDrawer(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-2xl shadow-cyan-950/60 ring-2 ring-cyan-400/40 hover:scale-105 transition-all cursor-pointer"
          aria-label="Open FloodGuard Emergency Assistant"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask FloodGuard AI</span>
        </button>
      </div>

      {/* Global Modals & Drawers */}
      <SituationReportModal />
      <WhatChangedModal />
      <AiExplanationModal />
      <FloodGuardAssistant />
      {showAlertGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAlertGeneratorModal(false)}
                className="text-xs bg-slate-800 text-slate-300 hover:text-white px-3 py-1 rounded cursor-pointer"
              >
                ✕ Close Broadcaster
              </button>
            </div>
            <EmergencyAlertGenerator />
          </div>
        </div>
      )}

      {/* Command Center Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">FLOOD GUARD AI</span>
            <span>·</span>
            <span>Smart India Hackathon 2026 (SIH26192)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button onClick={() => setActiveTab('alerts')} className="hover:text-slate-300 cursor-pointer">
              Alerts History
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('incidents')} className="hover:text-slate-300 cursor-pointer">
              Incidents
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('reliability')} className="hover:text-slate-300 cursor-pointer">
              Telemetry Health
            </button>
            <span>·</span>
            <button onClick={() => setShowSituationReportModal(true)} className="hover:text-slate-300 cursor-pointer">
              SitRep
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
