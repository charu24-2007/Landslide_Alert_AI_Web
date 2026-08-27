// Risk Zones and AI Analytics Service
import { apiRequest } from './api';

const MOCK_RISK_ZONES = [
  {
    id: 'NER-023',
    name: 'Eastern Slope Sector',
    riskScore: 78,
    level: 'HIGH', // 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
    confidence: 86,
    soilMoisture: '82%',
    tilt: '4.2°',
    rain: 'High',
    signal: 'Strong',
    affectedRoads: ['NH Corridor', 'Mawsynram Link'],
    affectedVillages: ['Mawsynram East'],
    criticalAssets: ['Bridge B-02 Water Intake'],
    whyExplain: {
      rainfall: 72,
      soilMoisture: 88,
      groundTilt: 60,
      terrainSusceptibility: 78,
      historicalActivity: 52
    },
    assessment: 'Risk is elevated primarily due to sustained rainfall, high soil moisture, increasing ground movement, and high baseline terrain susceptibility.'
  },
  {
    id: 'NER-018',
    name: 'Northern Corridor Border',
    riskScore: 68,
    level: 'HIGH',
    confidence: 81,
    soilMoisture: '78%',
    tilt: '2.1°',
    rain: 'Very High',
    signal: 'Strong',
    affectedRoads: ['NH-44 Bypass'],
    affectedVillages: ['Nongstoin Valley', 'Hilltop Hamlet'],
    criticalAssets: ['Power Substation-C'],
    whyExplain: {
      rainfall: 85,
      soilMoisture: 80,
      groundTilt: 40,
      terrainSusceptibility: 65,
      historicalActivity: 45
    },
    assessment: 'High rainfall accumulation combined with steep slope profile drives the risk. Tilt is currently within caution boundaries.'
  },
  {
    id: 'NER-011',
    name: 'Southern Highway Gorge',
    riskScore: 92,
    level: 'CRITICAL',
    confidence: 94,
    soilMoisture: '91%',
    tilt: '6.8°',
    rain: 'Critical',
    signal: 'Moderate',
    affectedRoads: ['NH-44 Main Arterial', 'Umtyngar Bridge Approach'],
    affectedVillages: ['Sohra West', 'Cherrapunji Outer'],
    criticalAssets: ['Umtyngar Bridge B-04', 'Cell Tower NER-99'],
    whyExplain: {
      rainfall: 90,
      soilMoisture: 95,
      groundTilt: 88,
      terrainSusceptibility: 85,
      historicalActivity: 80
    },
    assessment: 'CRITICAL threat level. Active accelerated ground displacement (6.8° tilt) detected alongside complete soil moisture saturation. Immediate action required.'
  },
  {
    id: 'NER-002',
    name: 'Northern Hill Slope',
    riskScore: 32,
    level: 'LOW',
    confidence: 79,
    soilMoisture: '58%',
    tilt: '0.8°',
    rain: 'Moderate',
    signal: 'Strong',
    affectedRoads: ['State Route 6'],
    affectedVillages: [],
    criticalAssets: [],
    whyExplain: {
      rainfall: 40,
      soilMoisture: 52,
      groundTilt: 12,
      terrainSusceptibility: 30,
      historicalActivity: 20
    },
    assessment: 'Stability parameters are normal. Low cumulative rain and minimal slope deformation.'
  },
  {
    id: 'NER-009',
    name: 'Seng Khasi Valley Border',
    riskScore: 48,
    level: 'MODERATE',
    confidence: 83,
    soilMoisture: '65%',
    tilt: '1.2°',
    rain: 'Moderate',
    signal: 'Strong',
    affectedRoads: ['Cherra-Jowai Link'],
    affectedVillages: ['Laitryngew Settlement'],
    criticalAssets: ['Water Filtration Plant'],
    whyExplain: {
      rainfall: 55,
      soilMoisture: 68,
      groundTilt: 25,
      terrainSusceptibility: 50,
      historicalActivity: 35
    },
    assessment: 'Moderate risk. Continuous rain monitoring advised. Moisture is elevated but ground displacement remains negligible.'
  },
  {
    id: 'NER-012',
    name: 'Jowai Bypass Pass',
    riskScore: 54,
    level: 'MODERATE',
    confidence: 75,
    soilMoisture: '70%',
    tilt: '1.9°',
    rain: 'High',
    signal: 'Strong',
    affectedRoads: ['Jowai-Shillong Highway'],
    affectedVillages: ['Thadlaskein Area'],
    criticalAssets: [],
    whyExplain: {
      rainfall: 70,
      soilMoisture: 72,
      groundTilt: 38,
      terrainSusceptibility: 45,
      historicalActivity: 40
    },
    assessment: 'Soil saturation has reached 70%. Ground tilt is showing a minor upward trend. Situation monitored.'
  }
];

export async function getRiskZones() {
  const data = await apiRequest('/risk/zones');
  return data || MOCK_RISK_ZONES;
}

export async function getRiskZoneDetails(id) {
  const data = await apiRequest(`/risk/${id}`);
  if (data) return data;
  return MOCK_RISK_ZONES.find(z => z.id === id) || MOCK_RISK_ZONES[0];
}

export async function getAIExplanation(id) {
  const data = await apiRequest(`/ai/risk/${id}`);
  if (data) return data;
  const zone = MOCK_RISK_ZONES.find(z => z.id === id) || MOCK_RISK_ZONES[0];
  return {
    id: zone.id,
    level: zone.level,
    score: zone.riskScore,
    confidence: zone.confidence,
    explain: zone.whyExplain,
    assessment: zone.assessment
  };
}

export async function getRiskTrend24h() {
  const data = await apiRequest('/risk/trend');
  if (data) return data;

  // Mock trend data
  return [
    { time: '15:00', risk: 42, rain: 2.1 },
    { time: '17:00', risk: 45, rain: 4.5 },
    { time: '19:00', risk: 50, rain: 8.2 },
    { time: '21:00', risk: 55, rain: 12.0 },
    { time: '23:00', risk: 62, rain: 15.4 },
    { time: '01:00', risk: 68, rain: 18.1 },
    { time: '03:00', risk: 70, rain: 14.2 },
    { time: '05:00', risk: 72, rain: 10.5 },
    { time: '07:00', risk: 74, rain: 8.4 },
    { time: '09:00', risk: 75, rain: 6.2 },
    { time: '11:00', risk: 76, rain: 5.1 },
    { time: '13:00', risk: 78, rain: 11.2 },
    { time: '14:32', risk: 78, rain: 15.0 }
  ];
}

export async function getHistoricalLandslides() {
  const data = await apiRequest('/historical');
  if (data) return data;

  return [
    { id: 1, year: 2025, location: 'Mawsynram Slopes', intensity: 'Major', damage: 'Road Blocked (48 hrs), 2 Houses Damaged', casualties: 0, date: '14 Jul 2025' },
    { id: 2, year: 2025, location: 'Cherrapunji Gorge', intensity: 'Critical', damage: 'Bridge Collapse, Bypass Blocked', casualties: 2, date: '03 Aug 2025' },
    { id: 3, year: 2024, location: 'Umtyngar Junction', intensity: 'Moderate', damage: 'Minor slide, cleared in 6 hrs', casualties: 0, date: '18 Jun 2024' },
    { id: 4, year: 2024, location: 'Nongstoin Road', intensity: 'Major', damage: 'BRO road cut, offline sensors', casualties: 0, date: '29 Sep 2024' },
    { id: 5, year: 2023, location: 'Jowai Escarpment', intensity: 'Critical', damage: 'Debris flow, 12 casualties, high impact', casualties: 12, date: '02 Jul 2023' }
  ];
}

export async function getModelPerformance() {
  const data = await apiRequest('/model/performance');
  if (data) return data;

  return {
    accuracy: '89.4%',
    precision: '87.1%',
    recall: '91.2%',
    f1Score: '89.1%',
    lastTraining: '20 Aug 2026',
    epochs: 150,
    loss: 0.12,
    dataSourceCounts: {
      sensors: 284300,
      satellite: 450,
      weather: 12400,
      historical: 124
    }
  };
}
