// Sensors and IoT Network Service
import { apiRequest } from './api';

const MOCK_SENSORS = [
  { id: 'NER-001', location: 'Eastern Slope', soilMoisture: '82%', tilt: '4.2°', rain: 'High', battery: '91%', signal: 'Strong', status: 'CRITICAL' },
  { id: 'NER-002', location: 'Northern Hill', soilMoisture: '64%', tilt: '1.2°', rain: 'Moderate', battery: '84%', signal: 'Strong', status: 'NORMAL' },
  { id: 'NER-003', location: 'Southern Highway Gorge', soilMoisture: '91%', tilt: '6.8°', rain: 'Critical', battery: '88%', signal: 'Moderate', status: 'CRITICAL' },
  { id: 'NER-004', location: 'Cherrapunji Bypass', soilMoisture: '87%', tilt: '3.5°', rain: 'Critical', battery: '24%', signal: 'Weak', status: 'WARNING' },
  { id: 'NER-005', location: 'Sohra West Sector', soilMoisture: '72%', tilt: '1.8°', rain: 'High', battery: '12%', signal: 'Strong', status: 'WARNING' },
  { id: 'NER-006', location: 'Laitryngew Hill', soilMoisture: '55%', tilt: '0.5°', rain: 'Low', battery: '98%', signal: 'Strong', status: 'NORMAL' },
  { id: 'NER-007', location: 'Mawsynram East Outpost', soilMoisture: '--', tilt: '--', rain: '--', battery: '0%', signal: 'Offline', status: 'OFFLINE' },
  { id: 'NER-008', location: 'Nongstoin Road Slope', soilMoisture: '--', tilt: '--', rain: '--', battery: '0%', signal: 'Offline', status: 'OFFLINE' },
  { id: 'NER-009', location: 'Jowai Road Pass', soilMoisture: '84%', tilt: '4.8°', rain: 'High', battery: '95%', signal: 'Strong', status: 'WARNING' },
  { id: 'NER-010', location: 'Bridge Approach Slope', soilMoisture: '--', tilt: '--', rain: '--', battery: '0%', signal: 'Offline', status: 'OFFLINE' },
  { id: 'NER-011', location: 'Seng Khasi Slope', soilMoisture: '51%', tilt: '0.4°', rain: 'Moderate', battery: '92%', signal: 'Strong', status: 'NORMAL' },
  { id: 'NER-012', location: 'Jowai Bypass West', soilMoisture: '69%', tilt: '1.9°', rain: 'High', battery: '76%', signal: 'Strong', status: 'NORMAL' },
  { id: 'NER-013', location: 'Shillong Ridge Ridge', soilMoisture: '45%', tilt: '0.2°', rain: 'Low', battery: '89%', signal: 'Strong', status: 'NORMAL' },
  { id: 'NER-014', location: 'Umtyngar Peak', soilMoisture: '79%', tilt: '2.5°', rain: 'High', battery: '81%', signal: 'Strong', status: 'NORMAL' }
];

export async function getSensors() {
  const data = await apiRequest('/sensors');
  return data || MOCK_SENSORS;
}

export async function getSensorDetails(id) {
  const data = await apiRequest(`/sensors/${id}`);
  if (data) return data;
  return MOCK_SENSORS.find(s => s.id === id) || MOCK_SENSORS[0];
}

export async function getSensorHistory(id) {
  const data = await apiRequest(`/sensors/${id}/history`);
  if (data) return data;

  // Generate some realistic historical readings for chart
  return [
    { timestamp: '10:00', moisture: 70, tilt: 2.1, battery: 92 },
    { timestamp: '11:00', moisture: 72, tilt: 2.1, battery: 91 },
    { timestamp: '12:00', moisture: 75, tilt: 2.2, battery: 91 },
    { timestamp: '13:00', moisture: 80, tilt: 2.8, battery: 91 },
    { timestamp: '14:00', moisture: 82, tilt: 4.2, battery: 91 }
  ];
}
