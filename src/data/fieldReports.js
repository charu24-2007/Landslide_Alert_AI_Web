// Ground Truth & Field Incident Reports
let _fieldReports = [
  {
    id: 'REP-001',
    type: 'Crack',
    typeName: 'Tension Crack Detected',
    zone: 'NER-023',
    zoneName: 'Eastern Slope Sector',
    district: 'East Khasi Hills',
    location: 'Mawsynram Road Km 4.2 Shoulder',
    latitude: 25.3112,
    longitude: 91.5208,
    reporter: 'Officer Sangma (PWD)',
    reporterRole: 'Field Officer',
    timestamp: '26 Aug 2026, 14:12 IST',
    description: 'Fresh horizontal tension crack along road shoulder. Length ~6.5m, width ~4cm with visible water seepage from upper slope cut.',
    status: 'Verified',
    verifiedBy: 'Charumithra C. (District Authority)',
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    actionTaken: 'BRO barricades placed on road edge; drainage clearance initiated.'
  },
  {
    id: 'REP-002',
    type: 'Road Blockage',
    typeName: 'Mudslide & Road Blockage',
    zone: 'NER-011',
    zoneName: 'Southern Highway Gorge',
    district: 'East Khasi Hills',
    location: 'NH-44 Bypass Km 12.4',
    latitude: 25.2754,
    longitude: 91.5762,
    reporter: 'Officer Khongwir (NHIDCL)',
    reporterRole: 'Field Officer',
    timestamp: '26 Aug 2026, 13:48 IST',
    description: 'Active debris flow and boulders (~15 cubic meters) blocking the eastbound lane of NH-44. Continued slurry runoff noted.',
    status: 'Pending',
    verifiedBy: null,
    photoUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=600&auto=format&fit=crop&q=80',
    actionTaken: 'JCB excavator dispatched from Sohra depot.'
  },
  {
    id: 'REP-003',
    type: 'Slope Movement',
    typeName: 'Retaining Wall Creep',
    zone: 'NER-018',
    zoneName: 'Northern Corridor',
    district: 'West Khasi Hills',
    location: 'Nongstoin Hill Slope Cut',
    latitude: 25.4318,
    longitude: 91.3814,
    reporter: 'Inspector Mawrie',
    reporterRole: 'Field Officer',
    timestamp: '26 Aug 2026, 13:20 IST',
    description: 'Retaining masonry wall tilting forward ~3 degrees. Masonry joints showing separation cracks of 15mm.',
    status: 'Verified',
    verifiedBy: 'Charumithra C. (District Authority)',
    photoUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=600&auto=format&fit=crop&q=80',
    actionTaken: 'Structural warning logged; traffic restricted to light vehicles.'
  },
  {
    id: 'REP-004',
    type: 'Landslide',
    typeName: 'Active Mudslide Occurrence',
    zone: 'NER-011',
    zoneName: 'Southern Highway Gorge',
    district: 'East Khasi Hills',
    location: 'Umtyngar Bridge Approach Road',
    latitude: 25.2780,
    longitude: 91.5790,
    reporter: 'Local Resident via Mobile App',
    reporterRole: 'Citizen',
    timestamp: '26 Aug 2026, 12:45 IST',
    description: 'Upper bank collapsed across path leading to village pump station. Power lines downed.',
    status: 'Pending',
    verifiedBy: null,
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
    actionTaken: 'Alert dispatched to MeECL electricity dept.'
  },
  {
    id: 'REP-005',
    type: 'Other',
    typeName: 'Drainage Channel Failure',
    zone: 'NER-023',
    zoneName: 'Eastern Slope Sector',
    district: 'East Khasi Hills',
    location: 'Mawsynram East Drainage Chute',
    latitude: 25.3085,
    longitude: 91.5190,
    reporter: 'Officer Sangma (PWD)',
    reporterRole: 'Field Officer',
    timestamp: '26 Aug 2026, 11:15 IST',
    description: 'Catchment runoff overwhelming boulder channel, causing erosion gouging on slope toe.',
    status: 'Verified',
    verifiedBy: 'Charumithra C. (District Authority)',
    photoUrl: null,
    actionTaken: 'Sandbags and temporary gabions installed.'
  }
];

export const getFieldReports = () => [..._fieldReports];

export const submitReport = (report) => {
  const newReport = {
    id: `REP-${String(_fieldReports.length + 1).padStart(3, '0')}`,
    ...report,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
    status: 'Pending',
    verifiedBy: null
  };
  _fieldReports = [newReport, ..._fieldReports];
  window.dispatchEvent(new Event('reportsUpdated'));
  return newReport;
};

export const verifyReport = (id, status, verifierName = 'District Authority') => {
  _fieldReports = _fieldReports.map(r =>
    r.id === id ? { ...r, status, verifiedBy: status === 'Verified' ? verifierName : null } : r
  );
  window.dispatchEvent(new Event('reportsUpdated'));
};
