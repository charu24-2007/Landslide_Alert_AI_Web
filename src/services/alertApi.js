// Active Alerts and Emergency Warning Service
import { apiRequest } from './api';

let localAlerts = [
  { id: 'ALT-001', severity: 'CRITICAL', zone: 'Zone NER-023', message: 'Landslide risk increased - high moisture + accelerated displacement', time: '12 minutes ago', timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), status: 'Active', acknowledgedBy: null },
  { id: 'ALT-002', severity: 'HIGH', zone: 'Zone NER-018', message: 'High rainfall accumulation + critical soil saturation thresholds breached', time: '26 minutes ago', timestamp: new Date(Date.now() - 26 * 60 * 1000).toISOString(), status: 'Active', acknowledgedBy: null },
  { id: 'ALT-003', severity: 'HIGH', zone: 'Zone NER-011', message: 'Ground displacement tilt sensor anomaly (>6° movement)', time: '42 minutes ago', timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(), status: 'Active', acknowledgedBy: null },
  { id: 'ALT-004', severity: 'MODERATE', zone: 'Zone NER-009', message: 'Elevated moisture detected; rainfall intensity increasing', time: '58 minutes ago', timestamp: new Date(Date.now() - 58 * 60 * 1000).toISOString(), status: 'Active', acknowledgedBy: null }
];

export async function getAlerts() {
  const data = await apiRequest('/alerts');
  if (data) return data;
  return [...localAlerts];
}

export async function createAlert(alert) {
  const data = await apiRequest('/alerts', {
    method: 'POST',
    body: JSON.stringify(alert)
  });
  if (data) return data;

  // Mock response
  const newAlert = {
    id: `ALT-0${localAlerts.length + 1}`,
    severity: alert.severity || 'HIGH',
    zone: alert.zone || 'General Region',
    message: alert.message || 'Custom Alert Triggered',
    time: 'Just now',
    timestamp: new Date().toISOString(),
    status: 'Active',
    acknowledgedBy: null
  };
  localAlerts = [newAlert, ...localAlerts];
  
  // Custom event to update state in React
  window.dispatchEvent(new Event('alertsUpdated'));
  return newAlert;
}

export async function acknowledgeAlert(id, userName = 'Charumithra C.') {
  const data = await apiRequest(`/alerts/${id}/acknowledge`, {
    method: 'POST',
    body: JSON.stringify({ acknowledgedBy: userName })
  });
  if (data) return data;

  // Mock update
  localAlerts = localAlerts.map(alt => {
    if (alt.id === id) {
      return { ...alt, status: 'Acknowledged', acknowledgedBy: userName };
    }
    return alt;
  });
  window.dispatchEvent(new Event('alertsUpdated'));
  return true;
}
