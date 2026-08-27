// IoT Sensor Network — 42 ESP32-based field nodes across NER
// Hardware: ESP32 DevKit V1, Soil Moisture V2.0, NEO-6M GPS, BME280, MPU6050, LoRa-02, FC-37 Rain, DS3231 RTC

function makeNode(nodeId, location, lat, lng, soilMoisture, tilt, temperature, humidity, pressure, battery, signal, status, lastSeen) {
  return { nodeId, location, latitude: lat, longitude: lng, soilMoisture, tilt, temperature, humidity, pressure, battery, signal, status, lastSeen };
}

export const sensors = [
  // CRITICAL: Active high-risk zones
  makeNode('NER-001', 'Eastern Slope (NER-023)', 25.3120, 91.5210, 92, 4.2, 21, 91, 1003, 91, 'Strong (LoRa)', 'CRITICAL', '14:31'),
  makeNode('NER-003', 'Southern Gorge (NER-011)', 25.2760, 91.5760, 91, 6.8, 20, 96, 1002, 88, 'Moderate (LoRa)', 'CRITICAL', '14:30'),

  // WARNING: Elevated but not critical
  makeNode('NER-004', 'Cherrapunji Bypass Km 8', 25.2840, 91.5920, 87, 3.5, 22, 93, 1001, 24, 'Weak (LoRa)', 'WARNING', '14:28'),
  makeNode('NER-005', 'Sohra West Settlement', 25.2710, 91.5610, 72, 1.8, 22, 85, 1004, 12, 'Strong (LoRa)', 'WARNING', '14:29'),
  makeNode('NER-009', 'Jowai Road Pass', 25.4610, 91.9510, 84, 4.8, 21, 88, 1003, 95, 'Strong (LoRa)', 'WARNING', '14:31'),
  makeNode('NER-017', 'NH-44 Km 10.4 Slope Cut', 25.2780, 91.5810, 88, 5.1, 20, 94, 1001, 74, 'Moderate (LoRa)', 'WARNING', '14:29'),
  makeNode('NER-022', 'Mawsynram North Slope', 25.3180, 91.5300, 80, 3.8, 22, 89, 1003, 63, 'Strong (LoRa)', 'WARNING', '14:30'),
  makeNode('NER-027', 'Umtyngar Bridge Abutment', 25.2890, 91.5870, 76, 2.9, 21, 87, 1003, 57, 'Moderate (LoRa)', 'WARNING', '14:27'),

  // OFFLINE
  makeNode('NER-007', 'Mawsynram East (NODE DOWN)', 25.3050, 91.5250, null, null, null, null, null, 0, 'Offline', 'OFFLINE', '08:14'),
  makeNode('NER-008', 'Nongstoin Road (OFFLINE)', 25.4280, 91.3780, null, null, null, null, null, 0, 'Offline', 'OFFLINE', '06:22'),
  makeNode('NER-010', 'Bridge Approach (OFFLINE)', 25.2880, 91.5870, null, null, null, null, null, 0, 'Offline', 'OFFLINE', '11:45'),

  // NORMAL: Standard monitoring zones
  makeNode('NER-002', 'Northern Hill (Ri-Bhoi)', 25.4310, 91.3810, 64, 1.2, 23, 74, 1006, 84, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-006', 'Laitryngew Hill', 25.3510, 91.7150, 55, 0.5, 24, 68, 1007, 98, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-011', 'Seng Khasi Valley Node', 25.3480, 91.7180, 51, 0.4, 24, 66, 1008, 92, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-012', 'Jowai Bypass West', 25.4580, 91.9480, 69, 1.9, 22, 81, 1005, 76, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-013', 'Shillong Ridge Node', 25.5650, 91.8820, 45, 0.2, 25, 60, 1009, 89, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-014', 'Umtyngar Peak', 25.2900, 91.5900, 79, 2.5, 21, 87, 1003, 81, 'Strong (LoRa)', 'NORMAL', '14:29'),
  makeNode('NER-015', 'Ri-Bhoi North', 25.6100, 91.9200, 42, 0.3, 26, 58, 1010, 96, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-016', 'Garo Hills West', 25.5830, 90.2230, 74, 2.8, 23, 79, 1005, 83, 'Strong (LoRa)', 'NORMAL', '14:28'),
  makeNode('NER-018', 'Thadlaskein East', 25.4700, 91.9900, 58, 0.7, 23, 71, 1007, 90, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-019', 'Jaintia Hills Main', 25.4480, 92.0120, 61, 1.0, 23, 73, 1006, 88, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-020', 'Tura Valley Node', 25.5150, 90.1980, 66, 1.4, 24, 76, 1005, 77, 'Moderate (LoRa)', 'NORMAL', '14:29'),
  makeNode('NER-021', 'West Garo Node A', 25.5290, 90.2080, 70, 1.7, 24, 78, 1004, 71, 'Moderate (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-023', 'Balat Sector Node', 25.4050, 91.3200, 56, 0.8, 24, 70, 1007, 94, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-024', 'Myriaw Valley', 25.3780, 91.4500, 62, 1.1, 23, 74, 1006, 85, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-025', 'Mawphlang Node', 25.4340, 91.6150, 48, 0.4, 25, 62, 1008, 93, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-026', 'Mawkyrwat East', 25.4900, 91.2150, 53, 0.6, 25, 67, 1008, 88, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-028', 'Nongpoh Node A', 25.8850, 92.0800, 60, 1.0, 24, 72, 1006, 82, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-029', 'Nongpoh Node B', 25.8900, 92.0850, 54, 0.7, 24, 69, 1007, 86, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-030', 'Mizoram Gate Node', 23.7220, 92.7170, 63, 1.3, 25, 75, 1006, 79, 'Moderate (LoRa)', 'NORMAL', '14:29'),
  makeNode('NER-031', 'Aizawl Outer Ring', 23.7290, 92.7190, 57, 0.9, 25, 71, 1007, 84, 'Moderate (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-032', 'Kohima Ridge A', 25.6670, 94.1100, 50, 0.5, 24, 65, 1008, 91, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-033', 'Kohima Ridge B', 25.6710, 94.1150, 46, 0.4, 24, 63, 1009, 89, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-034', 'Imphal Valley East', 24.8170, 93.9540, 59, 0.8, 26, 70, 1006, 87, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-035', 'Manipur Border Node', 24.8220, 93.9590, 65, 1.2, 26, 73, 1005, 80, 'Moderate (LoRa)', 'NORMAL', '14:29'),
  makeNode('NER-036', 'Agartala Outer', 23.8310, 91.2760, 72, 1.5, 27, 77, 1005, 75, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-037', 'North Tripura Node', 23.8380, 91.2800, 68, 1.3, 27, 76, 1005, 78, 'Strong (LoRa)', 'NORMAL', '14:30'),
  makeNode('NER-038', 'Gangtok East Ridge', 27.3290, 88.6140, 44, 0.3, 19, 61, 1010, 95, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-039', 'Sikkim Valley Node', 27.3350, 88.6200, 48, 0.5, 20, 64, 1009, 93, 'Strong (LoRa)', 'NORMAL', '14:31'),
  makeNode('NER-040', 'Itanagar Slope A', 27.0840, 93.6050, 67, 1.4, 26, 77, 1005, 76, 'Moderate (LoRa)', 'NORMAL', '14:28'),
  makeNode('NER-041', 'Itanagar Slope B', 27.0900, 93.6110, 71, 1.6, 26, 79, 1004, 72, 'Moderate (LoRa)', 'NORMAL', '14:29'),
  makeNode('NER-042', 'Dibrugarh Outer Ring', 27.4780, 94.9120, 55, 0.8, 27, 70, 1006, 88, 'Strong (LoRa)', 'NORMAL', '14:30'),
];
