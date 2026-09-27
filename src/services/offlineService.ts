import { IncidentReport } from '../types';

const OFFLINE_STORAGE_KEY = 'floodguard_offline_incident_queue';

export function getOfflineQueuedReports(): IncidentReport[] {
  try {
    const raw = localStorage.getItem(OFFLINE_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read offline incident queue:', e);
    return [];
  }
}

export function saveOfflineReport(report: IncidentReport): void {
  try {
    const current = getOfflineQueuedReports();
    current.unshift(report);
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save incident to offline queue:', e);
  }
}

export function clearOfflineQueue(): void {
  try {
    localStorage.removeItem(OFFLINE_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear offline queue:', e);
  }
}
