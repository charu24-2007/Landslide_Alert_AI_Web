// Users and Roles Data for LandSlideAlert AI
export const ROLES = {
  authority: {
    key: 'authority',
    name: 'District Authority',
    subtitle: 'Decision & Early Warning',
    color: '#1496D4',
    permissions: [
      'dashboard', 'map', 'ai', 'weather_sensors', 'iot_sensors', 'alerts',
      'field_reports', 'roads_villages', 'emergency_response',
      'reports_history', 'admin'
    ]
  },
  analyst: {
    key: 'analyst',
    name: 'GIS / Technical Analyst',
    subtitle: 'Data & Model Validation',
    color: '#2E9B57',
    permissions: [
      'dashboard', 'map', 'ai', 'weather_sensors', 'iot_sensors',
      'field_reports', 'reports_history'
    ]
  },
  field: {
    key: 'field',
    name: 'Field Officer',
    subtitle: 'Mobile Inspection & Truth',
    color: '#E85D04',
    permissions: [
      'dashboard', 'map', 'alerts', 'field_reports', 'roads_villages'
    ]
  },
  citizen: {
    key: 'citizen',
    name: 'Citizen Access',
    subtitle: 'Mobile Warning & Shelter',
    color: '#536273',
    permissions: [
      'dashboard', 'roads_villages', 'field_reports'
    ]
  }
};

export const DEMO_USERS = {
  'authority@ner.gov.in': {
    email: 'authority@ner.gov.in',
    password: 'landslide123',
    role: 'authority',
    name: 'Charumithra C.',
    designation: 'District Emergency Officer',
    district: 'East Khasi Hills',
    state: 'Meghalaya'
  },
  'analyst@ner.gov.in': {
    email: 'analyst@ner.gov.in',
    password: 'landslide123',
    role: 'analyst',
    name: 'Ryngksai P.',
    designation: 'Senior GIS Specialist',
    district: 'East Khasi Hills',
    state: 'Meghalaya'
  },
  'field@ner.gov.in': {
    email: 'field@ner.gov.in',
    password: 'landslide123',
    role: 'field',
    name: 'Officer Sangma',
    designation: 'Field Inspection Lead (PWD)',
    district: 'East Khasi Hills',
    state: 'Meghalaya'
  },
  'citizen@ner.gov.in': {
    email: 'citizen@ner.gov.in',
    password: 'landslide123',
    role: 'citizen',
    name: 'T. Marak',
    designation: 'Community Resident',
    district: 'East Khasi Hills',
    state: 'Meghalaya'
  }
};
