// Mock Weather, Roads, Villages, FieldReports and Historical data

export const weatherData = {
  current: {
    rainfall24h: 145, rainfall1h: 16.5, rainfall6h: 68, rainfall72h: 312,
    forecast: 'Heavy rainfall expected (next 48h)',
    humidity: 88, temperature: 24, pressure: 1004, wind: '14 km/h ENE',
    source: 'IMD Data', lastUpdated: '14:30 IST'
  },
  forecast5Day: [
    { day: 'Wed', rain: 145, temp: 24, condition: 'Heavy Rain', riskImplication: 'CRITICAL' },
    { day: 'Thu', rain: 160, temp: 23, condition: 'Very Heavy Rain', riskImplication: 'CRITICAL' },
    { day: 'Fri', rain: 120, temp: 24, condition: 'Heavy Rain', riskImplication: 'HIGH' },
    { day: 'Sat', rain: 85, temp: 25, condition: 'Moderate Rain', riskImplication: 'MODERATE' },
    { day: 'Sun', rain: 45, temp: 26, condition: 'Light Rain', riskImplication: 'LOW' },
  ],
  hourlyTrend: [
    { time: '04:00', rain: 8.2, cumulative: 88 },
    { time: '06:00', rain: 10.5, cumulative: 108 },
    { time: '08:00', rain: 12.4, cumulative: 121 },
    { time: '10:00', rain: 14.1, cumulative: 134 },
    { time: '12:00', rain: 15.8, cumulative: 143 },
    { time: '14:00', rain: 16.5, cumulative: 145 },
  ],
  satellite: { lastObservation: '13:45 IST', satellite: 'GSAT-17', status: 'Clear', coverage: '94%' }
};

export const roadsData = [
  { id:'RD-001', name:'NH Corridor (Mawsynram Road)', type:'National Highway', risk:'HIGH', status:'At Risk', priority:'P1', agency:'BRO', blocked: false },
  { id:'RD-002', name:'Umtyngar Bridge B-04', type:'Bridge', risk:'CRITICAL', status:'Monitoring', priority:'P1', agency:'PWD', blocked: false },
  { id:'RD-003', name:'Cherrapunji Bypass Route', type:'State Highway', risk:'HIGH', status:'At Risk', priority:'P2', agency:'BRO', blocked: false },
  { id:'RD-004', name:'Shillong-Jowai Highway Seg-6', type:'National Highway', risk:'MODERATE', status:'Blocked', priority:'P1', agency:'PWD', blocked: true },
  { id:'RD-005', name:'NH-44 Main Arterial', type:'National Highway', risk:'CRITICAL', status:'At Risk', priority:'P1', agency:'NHIDCL', blocked: false },
  { id:'RD-006', name:'Nongstoin Road Segment', type:'State Road', risk:'MODERATE', status:'Normal', priority:'P3', agency:'PWD', blocked: false },
  { id:'RD-007', name:'Mawsynram Link Road', type:'District Road', risk:'HIGH', status:'At Risk', priority:'P2', agency:'BRO', blocked: false },
];

export const villagesData = [
  { id:'V-001', name:'Mawsynram East Settlement', population:840, risk:'HIGH', district:'East Khasi Hills', zone:'NER-023', connectivity:'Good', evacuationPriority:'P2', status:'Standby', shelter:'Mawsynram Secondary School' },
  { id:'V-002', name:'Sohra West Settlement', population:1250, risk:'CRITICAL', district:'East Khasi Hills', zone:'NER-011', connectivity:'Poor', evacuationPriority:'P1', status:'Active Evacuation', shelter:'Sohra Town Hall' },
  { id:'V-003', name:'Cherrapunji Outer Hamlet', population:420, risk:'CRITICAL', district:'East Khasi Hills', zone:'NER-011', connectivity:'Cut Off', evacuationPriority:'P1', status:'Completed', shelter:'Sohra Town Hall' },
  { id:'V-004', name:'Nongstoin Valley Hamlet', population:980, risk:'HIGH', district:'West Khasi Hills', zone:'NER-018', connectivity:'Moderate', evacuationPriority:'P2', status:'Standby', shelter:'Nongstoin Govt College' },
  { id:'V-005', name:'Laitryngew Settlement', population:610, risk:'MODERATE', district:'East Khasi Hills', zone:'NER-009', connectivity:'Good', evacuationPriority:'P3', status:'Normal', shelter:'Laitryngew Health Centre' },
  { id:'V-006', name:'Thadlaskein Area', population:1450, risk:'MODERATE', district:'Jaintia Hills', zone:'NER-012', connectivity:'Good', evacuationPriority:'P3', status:'Normal', shelter:'Jowai Stadium' },
  { id:'V-007', name:'Tura Outer Settlement', population:2100, risk:'HIGH', district:'West Garo Hills', zone:'NER-031', connectivity:'Moderate', evacuationPriority:'P2', status:'Standby', shelter:'Tura Community Hall' },
];

let _fieldReports = [
  { id:'REP-001', type:'Crack detected', zone:'NER-023', location:'Eastern Slope Segment 2', reporter:'Officer Sangma (PWD)', time:'14:12', date:'26 Aug 2026', description:'Horizontal ground crack along road shoulder (~5 metres, 3cm wide).', status:'Pending', lat:25.310, lng:91.520 },
  { id:'REP-002', type:'Road blockage', zone:'NER-011', location:'NH-44 Bypass Km 12', reporter:'Officer Khongwir', time:'13:48', date:'26 Aug 2026', description:'Minor mudslide and boulder fall blocking one lane of NH-44.', status:'Pending', lat:25.275, lng:91.578 },
  { id:'REP-003', type:'Slope movement', zone:'NER-018', location:'Northern Hilltop Slope', reporter:'Inspector Mawrie', time:'13:20', date:'26 Aug 2026', description:'Creep visible in retaining wall. Minor tilt confirmed visually.', status:'Verified', lat:25.432, lng:91.382 },
  { id:'REP-004', type:'Drainage clogging', zone:'NER-023', location:'Mawsynram Drainage', reporter:'Officer Sangma (PWD)', time:'11:15', date:'26 Aug 2026', description:'Debris blocking main contour drain. Runoff spilling onto slope.', status:'Verified', lat:25.308, lng:91.518 },
  { id:'REP-005', type:'Soil shifting', zone:'NER-009', location:'Laitryngew Boundary', reporter:'Community Report', time:'09:30', date:'26 Aug 2026', description:'Loose soil shifting on pasture slope. No immediate infrastructure risk.', status:'Rejected', lat:25.342, lng:91.722 },
];

export const getFieldReports = () => [..._fieldReports];
export const submitReport = (report) => {
  const r = { id:`REP-${String(_fieldReports.length+1).padStart(3,'0')}`, ...report, time: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false}), date:'26 Aug 2026', status:'Pending' };
  _fieldReports = [r, ..._fieldReports];
  window.dispatchEvent(new Event('reportsUpdated'));
  return r;
};
export const verifyReport = (id, status) => {
  _fieldReports = _fieldReports.map(r => r.id===id ? {...r, status} : r);
  window.dispatchEvent(new Event('reportsUpdated'));
};

export const historicalEvents = [
  { id:1, date:'14 Jul 2025', location:'Mawsynram Slopes', intensity:'Major', damage:'Road blocked 48h, 2 houses damaged', casualties:0, cause:'Extreme rainfall >200mm/day' },
  { id:2, date:'03 Aug 2025', location:'Cherrapunji Gorge', intensity:'Critical', damage:'Bridge collapse, bypass blocked', casualties:2, cause:'Sustained rainfall + slope saturation' },
  { id:3, date:'18 Jun 2024', location:'Umtyngar Junction', intensity:'Moderate', damage:'Minor slide, cleared in 6 hrs', casualties:0, cause:'Rainfall accumulation' },
  { id:4, date:'29 Sep 2024', location:'Nongstoin Road', intensity:'Major', damage:'BRO road cut, offline sensors', casualties:0, cause:'Slope failure post-monsoon' },
  { id:5, date:'02 Jul 2023', location:'Jowai Escarpment', intensity:'Critical', damage:'Debris flow, high impact', casualties:12, cause:'Flash flooding + unstable geology' },
  { id:6, date:'19 Aug 2023', location:'Garo Hills N', intensity:'Moderate', damage:'Road partially blocked', casualties:0, cause:'Heavy rainfall' },
];

export const dashboardData = {
  overallRisk: { level:'HIGH', score:78, trend:'Increasing' },
  alertsSummary: { total:4, critical:1, high:3, moderate:0 },
  zonesSummary: { total:12, critical:3, high:9, moderate:18, low:24 },
  sensorNetwork: { total:42, online:39, offline:3, warning:4, critical:2 },
  infrastructure: { total:7, roads:4, bridges:1, other:2, blocked:2 },
  riskTrend: [
    { time:'15:00', risk:42, rain:2.1 }, { time:'17:00', risk:45, rain:4.5 },
    { time:'19:00', risk:50, rain:8.2 }, { time:'21:00', risk:55, rain:12.0 },
    { time:'23:00', risk:62, rain:15.4 }, { time:'01:00', risk:68, rain:18.1 },
    { time:'03:00', risk:70, rain:14.2 }, { time:'05:00', risk:72, rain:10.5 },
    { time:'07:00', risk:74, rain:8.4 },  { time:'09:00', risk:75, rain:6.2 },
    { time:'11:00', risk:76, rain:5.1 },  { time:'13:00', risk:78, rain:11.2 },
    { time:'14:32', risk:78, rain:15.0 },
  ]
};
