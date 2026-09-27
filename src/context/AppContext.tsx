import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  RegionTelemetry,
  IncidentReport,
  AlertBulletin,
  EmergencyShelter
} from '../types';
import {
  DEMO_USERS,
  REGIONS_DATA,
  INITIAL_INCIDENTS,
  INITIAL_ALERTS,
  EMERGENCY_SHELTERS
} from '../data/mockData';
import { getOfflineQueuedReports, saveOfflineReport, clearOfflineQueue } from '../services/offlineService';

interface AppContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  activeRegion: RegionTelemetry;
  allRegions: RegionTelemetry[];
  setActiveRegionId: (id: string) => void;
  incidents: IncidentReport[];
  alerts: AlertBulletin[];
  shelters: EmergencyShelter[];
  isOffline: boolean;
  isManuallyOffline: boolean;
  offlineQueueCount: number;
  toggleSimulatedOffline: () => void;
  syncOfflineQueue: () => void;
  addIncident: (report: IncidentReport) => void;
  updateIncidentStatus: (id: string, status: IncidentReport['status'], team?: string) => void;
  addAlert: (alert: AlertBulletin) => void;
  loginAsRole: (role: UserRole) => void;
  enterDemoMode: () => void;
  enterEmergencyCitizenMode: () => void;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // Modal visibility triggers
  showSituationReportModal: boolean;
  setShowSituationReportModal: (val: boolean) => void;
  showAiExplanationModal: boolean;
  setShowAiExplanationModal: (val: boolean) => void;
  showWhatChangedModal: boolean;
  setShowWhatChangedModal: (val: boolean) => void;
  showAssistantDrawer: boolean;
  setShowAssistantDrawer: (val: boolean) => void;
  showAlertGeneratorModal: boolean;
  setShowAlertGeneratorModal: (val: boolean) => void;
  notificationCount: number;
  clearNotificationCount: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with null currentUser so Landing/Login page is shown, but allow 1-click Demo Mode or Emergency Mode
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeRegionId, setActiveRegionId] = useState<string>('chamoli-joshimath');
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [alerts, setAlerts] = useState<AlertBulletin[]>(INITIAL_ALERTS);
  const [shelters] = useState<EmergencyShelter[]>(EMERGENCY_SHELTERS);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Offline State
  const [isBrowserOffline, setIsBrowserOffline] = useState<boolean>(!navigator.onLine);
  const [isManuallyOffline, setIsManuallyOffline] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);

  // Modals & Panels
  const [showSituationReportModal, setShowSituationReportModal] = useState<boolean>(false);
  const [showAiExplanationModal, setShowAiExplanationModal] = useState<boolean>(false);
  const [showWhatChangedModal, setShowWhatChangedModal] = useState<boolean>(false);
  const [showAssistantDrawer, setShowAssistantDrawer] = useState<boolean>(false);
  const [showAlertGeneratorModal, setShowAlertGeneratorModal] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(alerts.length);

  const isOffline = isBrowserOffline || isManuallyOffline;

  // Listen for browser online / offline
  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOffline(false);
      syncOfflineQueue();
    };
    const handleOffline = () => setIsBrowserOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check of offline queue
    setOfflineQueueCount(getOfflineQueuedReports().length);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const activeRegion = REGIONS_DATA.find(r => r.id === activeRegionId) || REGIONS_DATA[0];

  const syncOfflineQueue = () => {
    const queued = getOfflineQueuedReports();
    if (queued.length > 0) {
      setIncidents(prev => [...queued, ...prev]);
      clearOfflineQueue();
      setOfflineQueueCount(0);
    }
  };

  const toggleSimulatedOffline = () => {
    setIsManuallyOffline(prev => {
      const next = !prev;
      if (!next) {
        syncOfflineQueue();
      }
      return next;
    });
  };

  const addIncident = (report: IncidentReport) => {
    if (isOffline) {
      saveOfflineReport(report);
      setOfflineQueueCount(getOfflineQueuedReports().length);
    } else {
      setIncidents(prev => [report, ...prev]);
    }
  };

  const updateIncidentStatus = (id: string, status: IncidentReport['status'], team?: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status,
          assignedTeam: team || inc.assignedTeam
        };
      }
      return inc;
    }));
  };

  const addAlert = (alert: AlertBulletin) => {
    setAlerts(prev => [alert, ...prev]);
    setNotificationCount(c => c + 1);
  };

  const loginAsRole = (role: UserRole) => {
    const found = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentUser(found);
    setIsDemoMode(true);
    setActiveTab('dashboard');
  };

  const enterDemoMode = () => {
    const evaluator = DEMO_USERS.find(u => u.role === 'EVALUATOR') || DEMO_USERS[0];
    setCurrentUser(evaluator);
    setIsDemoMode(true);
    setActiveTab('dashboard');
  };

  const enterEmergencyCitizenMode = () => {
    const citizen = DEMO_USERS.find(u => u.role === 'CITIZEN') || DEMO_USERS[3];
    setCurrentUser(citizen);
    setIsDemoMode(true);
    setActiveTab('emergency');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const clearNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isDemoMode,
        activeRegion,
        allRegions: REGIONS_DATA,
        setActiveRegionId,
        incidents,
        alerts,
        shelters,
        isOffline,
        isManuallyOffline,
        offlineQueueCount,
        toggleSimulatedOffline,
        syncOfflineQueue,
        addIncident,
        updateIncidentStatus,
        addAlert,
        loginAsRole,
        enterDemoMode,
        enterEmergencyCitizenMode,
        logout,
        activeTab,
        setActiveTab,
        showSituationReportModal,
        setShowSituationReportModal,
        showAiExplanationModal,
        setShowAiExplanationModal,
        showWhatChangedModal,
        setShowWhatChangedModal,
        showAssistantDrawer,
        setShowAssistantDrawer,
        showAlertGeneratorModal,
        setShowAlertGeneratorModal,
        notificationCount,
        clearNotificationCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
