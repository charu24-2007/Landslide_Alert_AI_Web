// Mock Risk Zones Data - 15+ realistic NER zones
export const riskZones = [
  {
    id: 'NER-023', name: 'Eastern Slope Sector', district: 'East Khasi Hills',
    latitude: 25.3100, longitude: 91.5200, riskScore: 78, riskLevel: 'HIGH', confidence: 86,
    rainfall: 145, soilMoisture: 82, tilt: 4.2, terrainSusceptibility: 78, historicalActivity: 55,
    affectedRoads: ['NH Corridor (Mawsynram)', 'Mawsynram Link Road'],
    affectedVillages: ['Mawsynram East Settlement'],
    affectedInfrastructure: ['Bridge B-02 Water Intake'],
    lastUpdated: '2026-08-26T14:32:00+05:30',
    polygon: [[25.3200,91.5100],[25.3200,91.5300],[25.3000,91.5300],[25.3000,91.5100]],
    aiExplanation: { rainfall: 85, soilMoisture: 92, groundTilt: 68, terrainSusceptibility: 78, historicalActivity: 55 },
    assessment: 'Risk is elevated primarily due to sustained rainfall, high soil moisture, increasing ground movement and high baseline terrain susceptibility.'
  },
  {
    id: 'NER-011', name: 'Southern Highway Gorge', district: 'East Khasi Hills',
    latitude: 25.2750, longitude: 91.5750, riskScore: 92, riskLevel: 'CRITICAL', confidence: 94,
    rainfall: 168, soilMoisture: 91, tilt: 6.8, terrainSusceptibility: 85, historicalActivity: 80,
    affectedRoads: ['NH-44 Main Arterial', 'Umtyngar Bridge Approach'],
    affectedVillages: ['Sohra West Settlement', 'Cherrapunji Outer Hamlet'],
    affectedInfrastructure: ['Umtyngar Bridge B-04', 'Cell Tower NER-99'],
    lastUpdated: '2026-08-26T14:30:00+05:30',
    polygon: [[25.2850,91.5650],[25.2850,91.5850],[25.2650,91.5850],[25.2650,91.5650]],
    aiExplanation: { rainfall: 90, soilMoisture: 95, groundTilt: 88, terrainSusceptibility: 85, historicalActivity: 80 },
    assessment: 'CRITICAL threat. Active accelerated ground displacement (6.8° tilt) detected alongside complete soil moisture saturation. Immediate action required.'
  },
  {
    id: 'NER-018', name: 'Northern Corridor Border', district: 'West Khasi Hills',
    latitude: 25.4300, longitude: 91.3800, riskScore: 68, riskLevel: 'HIGH', confidence: 81,
    rainfall: 132, soilMoisture: 78, tilt: 2.1, terrainSusceptibility: 65, historicalActivity: 45,
    affectedRoads: ['NH-44 Bypass', 'Nongstoin Road'],
    affectedVillages: ['Nongstoin Valley', 'Hilltop Hamlet'],
    affectedInfrastructure: ['Power Substation-C'],
    lastUpdated: '2026-08-26T14:28:00+05:30',
    polygon: [[25.4400,91.3600],[25.4400,91.4000],[25.4200,91.4000],[25.4200,91.3600]],
    aiExplanation: { rainfall: 75, soilMoisture: 80, groundTilt: 40, terrainSusceptibility: 65, historicalActivity: 45 },
    assessment: 'High rainfall accumulation combined with steep slope profile drives the risk. Tilt within caution boundary.'
  },
  {
    id: 'NER-009', name: 'Seng Khasi Valley', district: 'East Khasi Hills',
    latitude: 25.3400, longitude: 91.7200, riskScore: 48, riskLevel: 'MODERATE', confidence: 83,
    rainfall: 98, soilMoisture: 65, tilt: 1.2, terrainSusceptibility: 50, historicalActivity: 35,
    affectedRoads: ['Cherra-Jowai Link'],
    affectedVillages: ['Laitryngew Settlement'],
    affectedInfrastructure: ['Water Filtration Plant'],
    lastUpdated: '2026-08-26T14:25:00+05:30',
    polygon: [[25.3500,91.7100],[25.3500,91.7300],[25.3300,91.7300],[25.3300,91.7100]],
    aiExplanation: { rainfall: 55, soilMoisture: 68, groundTilt: 25, terrainSusceptibility: 50, historicalActivity: 35 },
    assessment: 'Moderate risk. Continuous rain monitoring advised. Moisture elevated but ground displacement negligible.'
  },
  {
    id: 'NER-002', name: 'Northern Hill Slope', district: 'Ri-Bhoi',
    latitude: 25.5600, longitude: 91.8500, riskScore: 32, riskLevel: 'LOW', confidence: 79,
    rainfall: 64, soilMoisture: 58, tilt: 0.8, terrainSusceptibility: 30, historicalActivity: 20,
    affectedRoads: [], affectedVillages: [], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:20:00+05:30',
    polygon: [[25.5700,91.8300],[25.5700,91.8700],[25.5500,91.8700],[25.5500,91.8300]],
    aiExplanation: { rainfall: 40, soilMoisture: 52, groundTilt: 12, terrainSusceptibility: 30, historicalActivity: 20 },
    assessment: 'Low risk. Stability parameters normal. Low cumulative rain and minimal slope deformation.'
  },
  {
    id: 'NER-012', name: 'Jowai Bypass Pass', district: 'Jaintia Hills',
    latitude: 25.4600, longitude: 91.9500, riskScore: 54, riskLevel: 'MODERATE', confidence: 75,
    rainfall: 110, soilMoisture: 70, tilt: 1.9, terrainSusceptibility: 45, historicalActivity: 40,
    affectedRoads: ['Jowai-Shillong Highway'],
    affectedVillages: ['Thadlaskein Area'],
    affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:22:00+05:30',
    polygon: [[25.4700,91.9300],[25.4700,91.9700],[25.4500,91.9700],[25.4500,91.9300]],
    aiExplanation: { rainfall: 70, soilMoisture: 72, groundTilt: 38, terrainSusceptibility: 45, historicalActivity: 40 },
    assessment: 'Soil saturation at 70%. Ground tilt showing minor upward trend. Situation being monitored.'
  },
  {
    id: 'NER-031', name: 'Garo Hills Western', district: 'West Garo Hills',
    latitude: 25.5800, longitude: 90.2200, riskScore: 61, riskLevel: 'HIGH', confidence: 77,
    rainfall: 120, soilMoisture: 74, tilt: 2.8, terrainSusceptibility: 70, historicalActivity: 58,
    affectedRoads: ['NH-6 Approach'], affectedVillages: ['Tura Outer'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:15:00+05:30',
    polygon: [[25.5900,90.2100],[25.5900,90.2300],[25.5700,90.2300],[25.5700,90.2100]],
    aiExplanation: { rainfall: 68, soilMoisture: 74, groundTilt: 55, terrainSusceptibility: 70, historicalActivity: 58 },
    assessment: 'High susceptibility terrain with elevated soil moisture. Rainfall accumulation trend is concerning.'
  },
  {
    id: 'NER-045', name: 'Barak Valley Slopes', district: 'North Cachar Hills',
    latitude: 25.0500, longitude: 93.1000, riskScore: 44, riskLevel: 'MODERATE', confidence: 71,
    rainfall: 89, soilMoisture: 62, tilt: 1.4, terrainSusceptibility: 55, historicalActivity: 42,
    affectedRoads: [], affectedVillages: ['Lower Barak'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:10:00+05:30',
    polygon: [[25.0600,93.0900],[25.0600,93.1100],[25.0400,93.1100],[25.0400,93.0900]],
    aiExplanation: { rainfall: 50, soilMoisture: 62, groundTilt: 28, terrainSusceptibility: 55, historicalActivity: 42 },
    assessment: 'Moderate terrain susceptibility. Soil conditions currently manageable but rainfall trend monitored.'
  },
  {
    id: 'NER-007', name: 'Shillong Peak Sector', district: 'East Khasi Hills',
    latitude: 25.5660, longitude: 91.8810, riskScore: 38, riskLevel: 'LOW', confidence: 88,
    rainfall: 72, soilMoisture: 52, tilt: 0.5, terrainSusceptibility: 35, historicalActivity: 28,
    affectedRoads: [], affectedVillages: [], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:18:00+05:30',
    polygon: [[25.5760,91.8710],[25.5760,91.8910],[25.5560,91.8910],[25.5560,91.8710]],
    aiExplanation: { rainfall: 38, soilMoisture: 48, groundTilt: 10, terrainSusceptibility: 35, historicalActivity: 28 },
    assessment: 'Currently stable. Monitoring continues as part of standard protocol.'
  },
  {
    id: 'NER-055', name: 'Tripura North Ridge', district: 'North Tripura',
    latitude: 24.1200, longitude: 92.0500, riskScore: 73, riskLevel: 'HIGH', confidence: 82,
    rainfall: 138, soilMoisture: 79, tilt: 3.2, terrainSusceptibility: 72, historicalActivity: 65,
    affectedRoads: ['NH-208 Sector'], affectedVillages: ['Dharmanagar Outer'], affectedInfrastructure: ['Bridge T-12'],
    lastUpdated: '2026-08-26T14:05:00+05:30',
    polygon: [[24.1300,92.0400],[24.1300,92.0600],[24.1100,92.0600],[24.1100,92.0400]],
    aiExplanation: { rainfall: 78, soilMoisture: 82, groundTilt: 62, terrainSusceptibility: 72, historicalActivity: 65 },
    assessment: 'High risk driven by accumulated precipitation and moderate slope displacement. Close monitoring recommended.'
  }
  ,
  {
    id: 'NER-060', name: 'Arunachal Foothills Corridor', district: 'East Siang',
    latitude: 28.2170, longitude: 94.7200, riskScore: 65, riskLevel: 'HIGH', confidence: 80,
    rainfall: 128, soilMoisture: 76, tilt: 2.4, terrainSusceptibility: 68, historicalActivity: 50,
    affectedRoads: ['Pasighat-Dibrugarh Approach'], affectedVillages: ['Siku Settlement'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:00:00+05:30',
    polygon: [[28.2270,94.7100],[28.2270,94.7300],[28.2070,94.7300],[28.2070,94.7100]],
    aiExplanation: { rainfall: 72, soilMoisture: 76, groundTilt: 48, terrainSusceptibility: 68, historicalActivity: 50 },
    assessment: 'Steep valley terrain with high rainfall. Foothills at elevated risk during monsoon peak.'
  },
  {
    id: 'NER-061', name: 'Manipur Valley Western Scarp', district: 'Senapati',
    latitude: 25.0140, longitude: 93.7730, riskScore: 55, riskLevel: 'MODERATE', confidence: 76,
    rainfall: 102, soilMoisture: 67, tilt: 1.5, terrainSusceptibility: 58, historicalActivity: 45,
    affectedRoads: ['NH-2 Imphal Highway'], affectedVillages: ['Mao Gate'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T14:02:00+05:30',
    polygon: [[25.0240,93.7630],[25.0240,93.7830],[25.0040,93.7830],[25.0040,93.7630]],
    aiExplanation: { rainfall: 60, soilMoisture: 67, groundTilt: 30, terrainSusceptibility: 58, historicalActivity: 45 },
    assessment: 'Moderate risk. Rainfall accumulation near threshold. Slope gradient manageable.'
  },
  {
    id: 'NER-062', name: 'Nagaland Highland Ridge', district: 'Phek',
    latitude: 25.6740, longitude: 94.4760, riskScore: 49, riskLevel: 'MODERATE', confidence: 78,
    rainfall: 95, soilMoisture: 64, tilt: 1.1, terrainSusceptibility: 52, historicalActivity: 38,
    affectedRoads: ['NH-29 Kohima-Imphal Segment'], affectedVillages: ['Chizami Village'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T13:55:00+05:30',
    polygon: [[25.6840,94.4660],[25.6840,94.4860],[25.6640,94.4860],[25.6640,94.4660]],
    aiExplanation: { rainfall: 55, soilMoisture: 64, groundTilt: 22, terrainSusceptibility: 52, historicalActivity: 38 },
    assessment: 'Below threshold. Standard monsoon vigilance maintained for highland ridgeline.'
  },
  {
    id: 'NER-063', name: 'Mizoram Southern Slope', district: 'Lunglei',
    latitude: 22.8840, longitude: 92.7340, riskScore: 58, riskLevel: 'MODERATE', confidence: 79,
    rainfall: 118, soilMoisture: 71, tilt: 1.8, terrainSusceptibility: 62, historicalActivity: 48,
    affectedRoads: ['Aizawl-Lunglei Road'], affectedVillages: ['Hrangchalkawn Outer'], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T13:50:00+05:30',
    polygon: [[22.8940,92.7240],[22.8940,92.7440],[22.8740,92.7440],[22.8740,92.7240]],
    aiExplanation: { rainfall: 65, soilMoisture: 71, groundTilt: 36, terrainSusceptibility: 62, historicalActivity: 48 },
    assessment: 'Southern hilly terrain with moderate accumulation. Monitoring advised through end of monsoon.'
  },
  {
    id: 'NER-064', name: 'Sikkim Eastern Valley', district: 'East Sikkim',
    latitude: 27.3290, longitude: 88.6140, riskScore: 36, riskLevel: 'LOW', confidence: 85,
    rainfall: 68, soilMoisture: 50, tilt: 0.5, terrainSusceptibility: 40, historicalActivity: 30,
    affectedRoads: [], affectedVillages: [], affectedInfrastructure: [],
    lastUpdated: '2026-08-26T13:45:00+05:30',
    polygon: [[27.3390,88.6040],[27.3390,88.6240],[27.3190,88.6240],[27.3190,88.6040]],
    aiExplanation: { rainfall: 42, soilMoisture: 50, groundTilt: 10, terrainSusceptibility: 40, historicalActivity: 30 },
    assessment: 'Stable. Sub-threshold conditions. Routine monitoring continues.'
  }
];

export const getRiskColor = (level) => {
  // Use exact design system palette from design-tokens.css
  switch (level) {
    case 'CRITICAL': return '#D62828';
    case 'HIGH': return '#E85D04';
    case 'MODERATE': return '#F2B705';
    case 'LOW': return '#2E9B57';
    default: return '#1976B9';
  }
};

export const getRiskBg = (level) => {
  switch (level) {
    case 'CRITICAL': return '#FDF2F2';
    case 'HIGH': return '#FDF6EE';
    case 'MODERATE': return '#FEFAEE';
    case 'LOW': return '#F0F9F3';
    default: return '#EFF6FB';
  }
};
