// LandSlideAlert AI - Unified API Service Layer
// Cleanly abstracts backend integration and mock data for seamless switching

import { riskZones } from '../data/riskZones';
import { sensors } from '../data/sensors';
import { getAlerts, createAlert as addAlert, acknowledgeAlert as ackAlert } from '../data/alerts';
import { weather } from '../data/weather';
import { getFieldReports, submitReport as addReport, verifyReport as doVerifyReport } from '../data/fieldReports';
import { roads } from '../data/roads';
import { villages } from '../data/villages';
import { historicalLandslides, recurrenceAnalytics } from '../data/historicalLandslides';

export const api = {
  // Risk Zones
  getRiskZones: async (district = 'all') => {
    await new Promise(r => setTimeout(r, 80));
    if (!district || district === 'all') return riskZones;
    return riskZones.filter(z => z.district.toLowerCase() === district.toLowerCase());
  },

  getRiskZoneById: async (id) => {
    await new Promise(r => setTimeout(r, 60));
    return riskZones.find(z => z.id === id) || null;
  },

  // Sensors
  getSensors: async (statusFilter = 'ALL') => {
    await new Promise(r => setTimeout(r, 80));
    if (statusFilter === 'ALL') return sensors;
    return sensors.filter(s => s.status === statusFilter);
  },

  getSensorHistory: async (nodeId) => {
    await new Promise(r => setTimeout(r, 60));
    return [
      { time: '10:00', moisture: 74, tilt: 3.2, rain: 8.5 },
      { time: '11:00', moisture: 78, tilt: 3.8, rain: 12.0 },
      { time: '12:00', moisture: 84, tilt: 4.1, rain: 15.2 },
      { time: '13:00', moisture: 89, tilt: 4.6, rain: 18.0 },
      { time: '14:00', moisture: 92, tilt: 5.2, rain: 22.4 },
      { time: '14:30', moisture: 92, tilt: 6.8, rain: 28.0 }
    ];
  },

  // Alerts & Early Warning
  getAlerts: async () => {
    await new Promise(r => setTimeout(r, 80));
    return getAlerts();
  },

  createAlert: async (alertData) => {
    await new Promise(r => setTimeout(r, 120));
    return addAlert(alertData);
  },

  acknowledgeAlert: async (id, userName) => {
    await new Promise(r => setTimeout(r, 100));
    return ackAlert(id, userName);
  },

  // Weather & Satellite
  getWeather: async () => {
    await new Promise(r => setTimeout(r, 60));
    return weather;
  },

  // Field Reports
  getFieldReports: async () => {
    await new Promise(r => setTimeout(r, 80));
    return getFieldReports();
  },

  submitFieldReport: async (reportData) => {
    await new Promise(r => setTimeout(r, 140));
    return addReport(reportData);
  },

  verifyFieldReport: async (id, status, verifierName) => {
    await new Promise(r => setTimeout(r, 100));
    return doVerifyReport(id, status, verifierName);
  },

  // Roads & Infrastructure
  getRoads: async () => {
    await new Promise(r => setTimeout(r, 60));
    return roads;
  },

  // Villages & Habitations
  getVillages: async () => {
    await new Promise(r => setTimeout(r, 60));
    return villages;
  },

  // Historical Disaster Inventory
  getHistoricalLandslides: async () => {
    await new Promise(r => setTimeout(r, 80));
    return { events: historicalLandslides, analytics: recurrenceAnalytics };
  },

  // Explainable AI Risk Analysis
  getAIAnalysis: async (zoneId = 'NER-023') => {
    await new Promise(r => setTimeout(r, 80));
    const zone = riskZones.find(z => z.id === zoneId) || riskZones[0];
    return {
      zone,
      leadTime: '6–12 Hours Estimated Lead Window',
      features: [
        { name: 'Soil Moisture Saturation', value: zone.aiExplanation?.soilMoisture || 92, weight: '35%', trigger: 'Exceeded 80% Field Capacity' },
        { name: 'Rainfall Intensity & Cumulative', value: zone.aiExplanation?.rainfall || 85, weight: '30%', trigger: '145mm/24h Exceeded 100mm Threshold' },
        { name: 'Ground Tilt / Displacement', value: zone.aiExplanation?.groundTilt || 68, weight: '20%', trigger: 'Continuous 4.2° - 6.8° Progressive Creep' },
        { name: 'Terrain Susceptibility Index', value: zone.aiExplanation?.terrainSusceptibility || 78, weight: '10%', trigger: 'Steep Slope > 38° Gradient Profile' },
        { name: 'Historical Landslide Activity', value: zone.aiExplanation?.historicalActivity || 55, weight: '5%', trigger: 'Known Recurrent Slide Corridor (GSI High Risk)' }
      ]
    };
  },

  // System Health
  getSystemHealth: async () => {
    await new Promise(r => setTimeout(r, 40));
    return {
      status: 'OPERATIONAL',
      nodesOnline: 39,
      nodesTotal: 42,
      nodesOffline: 3,
      nodesWarning: 4,
      lastSync: '14:32:14 IST',
      loraGateway: 'CONNECTED (East Khasi Hills Repeater Tower 3)',
      aiInferenceEngine: 'ONLINE (v2.4 Ensemble Edge Ingest)'
    };
  }
};

export default api;
