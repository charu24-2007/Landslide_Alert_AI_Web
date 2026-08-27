// Mock Alerts Data
let _alerts = [
  { id:'ALT-001', severity:'CRITICAL', zoneId:'NER-011', zoneName:'Zone NER-011', location:'Southern Highway Gorge', message:'Critical landslide risk — accelerated ground displacement detected (tilt 6.8°)', timeAgo:'12 min ago', timestamp:'2026-08-26T14:20:00+05:30', status:'Active', acknowledgedBy:null, lifecycle:'Active' },
  { id:'ALT-002', severity:'HIGH', zoneId:'NER-023', zoneName:'Zone NER-023', location:'Eastern Slope Sector', message:'High rainfall + critical soil saturation thresholds breached', timeAgo:'26 min ago', timestamp:'2026-08-26T14:06:00+05:30', status:'Active', acknowledgedBy:null, lifecycle:'Active' },
  { id:'ALT-003', severity:'HIGH', zoneId:'NER-018', zoneName:'Zone NER-018', location:'Northern Corridor', message:'Ground movement tilt sensor anomaly — progressive creep observed', timeAgo:'42 min ago', timestamp:'2026-08-26T13:50:00+05:30', status:'Active', acknowledgedBy:null, lifecycle:'Approved' },
  { id:'ALT-004', severity:'MODERATE', zoneId:'NER-009', zoneName:'Zone NER-009', location:'Seng Khasi Valley', message:'Elevated moisture detected; rainfall intensity increasing', timeAgo:'58 min ago', timestamp:'2026-08-26T13:34:00+05:30', status:'Active', acknowledgedBy:null, lifecycle:'Active' },
  { id:'ALT-005', severity:'HIGH', zoneId:'NER-031', zoneName:'Zone NER-031', location:'Garo Hills Western', message:'Sensor NER-009 tilt exceeded 4.5° threshold — critical check needed', timeAgo:'1 hr ago', timestamp:'2026-08-26T13:30:00+05:30', status:'Active', acknowledgedBy:null, lifecycle:'Recommended' },
];

export const getAlerts = () => [..._alerts];

export const acknowledgeAlert = (id, userName) => {
  _alerts = _alerts.map(a => a.id === id ? { ...a, status: 'Acknowledged', acknowledgedBy: userName } : a);
  window.dispatchEvent(new Event('alertsUpdated'));
};

export const createAlert = (alert) => {
  const newAlert = {
    id: `ALT-${String(_alerts.length + 1).padStart(3,'0')}`,
    ...alert,
    timeAgo: 'Just now',
    timestamp: new Date().toISOString(),
    status: 'Active',
    acknowledgedBy: null,
    lifecycle: 'Recommended'
  };
  _alerts = [newAlert, ..._alerts];
  window.dispatchEvent(new Event('alertsUpdated'));
  return newAlert;
};
