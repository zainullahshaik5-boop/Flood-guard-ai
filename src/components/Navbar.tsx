import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  MapPin,
  Bell,
  Wifi,
  WifiOff,
  LogOut,
  User,
  AlertTriangle,
  ChevronDown,
  FileText,
  Activity,
  LifeBuoy
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeRegion,
    allRegions,
    setActiveRegionId,
    logout,
    activeTab,
    setActiveTab,
    isOffline,
    isManuallyOffline,
    toggleSimulatedOffline,
    offlineQueueCount,
    alerts,
    notificationCount,
    clearNotificationCount,
    setShowSituationReportModal,
    setShowAssistantDrawer
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      {/* Offline Alert Ribbon */}
      {isOffline && (
        <div className="bg-amber-950/90 border-b border-amber-600/40 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold">OFFLINE EMERGENCY MODE</span>
            <span>·</span>
            <span>Displaying last verified sensor snapshot. New live telemetry paused.</span>
            {offlineQueueCount > 0 && (
              <span className="bg-amber-800 text-amber-100 px-2 py-0.5 rounded text-[11px]">
                {offlineQueueCount} pending reports stored in cache
              </span>
            )}
          </div>
          <button
            onClick={toggleSimulatedOffline}
            className="text-[11px] underline text-amber-300 hover:text-white cursor-pointer"
          >
            {isManuallyOffline ? 'Resume Online Mode' : 'Check Connection'}
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Brand — Navigation — Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center shadow-lg shadow-cyan-900/30 ring-1 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                FLOOD GUARD AI
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  DEMO DATA
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Hilly Catchment Flash Flood Early Warning · SIH26192
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'map', label: 'Live GIS Map' },
            { id: 'simulator', label: 'Scenario Simulator' },
            { id: 'reporter', label: 'AI Flood Reporter' },
            { id: 'prioritization', label: 'Alert Prioritization' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'emergency', label: 'Emergency Center' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-cyan-300 ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions & Location Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Location Selector */}
          <div className="relative">
            <select
              value={activeRegion.id}
              onChange={(e) => setActiveRegionId(e.target.value)}
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer pr-7 appearance-none"
              aria-label="Select Hilly Basin Location"
            >
              {allRegions.map(reg => (
                <option key={reg.id} value={reg.id}>
                  {reg.name} ({reg.state})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Quick AI Assistant Trigger */}
          <button
            onClick={() => setShowAssistantDrawer(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            title="Open FloodGuard Emergency AI Assistant"
            aria-label="FloodGuard AI Assistant"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Assistant</span>
          </button>

          {/* Offline Simulator Switch */}
          <button
            onClick={toggleSimulatedOffline}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isOffline
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isOffline ? 'Click to simulate online reconnection' : 'Click to simulate network outage / offline mode'}
            aria-label="Toggle network simulation"
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                clearNotificationCount();
              }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors relative cursor-pointer"
              title="Active Warnings & Emergency Bulletins"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Active Emergency Bulletins ({activeAlerts.length})
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {activeAlerts.length === 0 ? (
                    <div className="text-xs text-slate-400 py-4 text-center">
                      No active emergency alerts in this catchment.
                    </div>
                  ) : (
                    activeAlerts.map(alert => (
                      <div
                        key={alert.id}
                        className={`p-2.5 rounded-lg text-xs border ${
                          alert.level === 'CRITICAL'
                            ? 'bg-red-950/40 border-red-800/60 text-red-200'
                            : alert.level === 'WARNING'
                            ? 'bg-orange-950/40 border-orange-800/60 text-orange-200'
                            : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between mb-1">
                          <span>{alert.title}</span>
                          <span className="text-[10px] uppercase font-mono px-1 py-0.5 rounded bg-black/40">
                            {alert.level}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90 line-clamp-3">
                          {alert.headlineEn}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{alert.affectedBasin}</span>
                          <button
                            onClick={() => {
                              setActiveTab('alerts');
                              setShowNotifications(false);
                            }}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs text-slate-200 transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-cyan-900/60 text-cyan-300 font-bold flex items-center justify-center text-[11px]">
                {currentUser ? currentUser.name.charAt(0) : 'U'}
              </div>
              <span className="hidden xl:inline max-w-[120px] truncate">
                {currentUser ? currentUser.name : 'Guest User'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50">
                {currentUser ? (
                  <div>
                    <div className="pb-2 border-b border-slate-800 mb-2">
                      <div className="text-xs font-bold text-white">{currentUser.name}</div>
                      <div className="text-[11px] text-cyan-400 font-medium">{currentUser.roleTitle}</div>
                      <div className="text-[10px] text-slate-400">{currentUser.organization}</div>
                      {currentUser.badgeNumber && (
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          ID: {currentUser.badgeNumber}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 mb-2">
                      <button
                        onClick={() => {
                          setShowSituationReportModal(true);
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        Generate Situation Report
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('emergency');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded flex items-center gap-2 cursor-pointer"
                      >
                        <LifeBuoy className="w-3.5 h-3.5 text-red-400" />
                        Emergency Shelters & Contacts
                      </button>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs text-red-400 hover:bg-red-950/30 rounded flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Switch User / Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-300">
                    <p className="mb-2">Signed in as Guest Evaluator.</p>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-center py-1.5 bg-cyan-700 text-white rounded text-xs cursor-pointer font-medium"
                    >
                      Login / Change Role
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="lg:hidden border-t border-slate-800/80 px-2 py-1 flex items-center gap-1 overflow-x-auto text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'map', label: 'GIS Map' },
          { id: 'simulator', label: 'Simulator' },
          { id: 'reporter', label: 'Reporter' },
          { id: 'prioritization', label: 'Queue' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'emergency', label: 'Emergency' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 py-1 text-[11px] rounded whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
