// Field Reports Management Service
import { apiRequest } from './api';

let localReports = [
  { id: 'REP-001', type: 'Crack detected', zone: 'Zone NER-023', location: 'Eastern Slope Segment 2', reporter: 'Officer Sangma', time: '14:12', date: '26 Aug 2026', description: 'Horizontal ground crack observed along road shoulder (~5 meters long, 3cm wide). Needs inspection.', status: 'Pending' },
  { id: 'REP-002', type: 'Road blockage', zone: 'Zone NER-011', location: 'NH-44 Bypass Km 12', reporter: 'Officer Khongwir', time: '13:48', date: '26 Aug 2026', description: 'Minor mudslide and boulder fall blocking one lane of NH-44. PWD notified.', status: 'Pending' },
  { id: 'REP-003', type: 'Slope movement', zone: 'Zone NER-018', location: 'Northern Hilltop Slope', reporter: 'Inspector Mawrie', time: '13:20', date: '26 Aug 2026', description: 'Creep visible in retaining wall. Minor tilt confirmed visually.', status: 'Verified' },
  { id: 'REP-004', type: 'Drainage clogging', zone: 'Zone NER-023', location: 'Mawsynram Water Drainage', reporter: 'Officer Sangma', time: '11:15', date: '26 Aug 2026', description: 'Debris blocking main contour drain. Runoff water spilling onto the slope face.', status: 'Verified' },
  { id: 'REP-005', type: 'Soil shifting', zone: 'Zone NER-009', location: 'Laitryngew Boundary', reporter: 'Local Citizen report', time: '09:30', date: '26 Aug 2026', description: 'Loose soil shifting on pasture slopes near village border. No infrastructure risk yet.', status: 'Rejected' }
];

export async function getFieldReports() {
  const data = await apiRequest('/field-reports');
  if (data) return data;
  return [...localReports];
}

export async function submitFieldReport(report) {
  const data = await apiRequest('/field-reports', {
    method: 'POST',
    body: JSON.stringify(report)
  });
  if (data) return data;

  const newReport = {
    id: `REP-0${localReports.length + 1}`,
    type: report.type || 'General Report',
    zone: report.zone || 'Zone NER-023',
    location: report.location || 'Reported Location',
    reporter: report.reporter || 'Field Inspector',
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    description: report.description || '',
    status: 'Pending'
  };

  localReports = [newReport, ...localReports];
  window.dispatchEvent(new Event('reportsUpdated'));
  return newReport;
}

export async function verifyFieldReport(id, status = 'Verified') {
  const data = await apiRequest(`/field-reports/${id}/verify`, {
    method: 'POST',
    body: JSON.stringify({ status })
  });
  if (data) return data;

  localReports = localReports.map(rep => {
    if (rep.id === id) {
      return { ...rep, status };
    }
    return rep;
  });
  window.dispatchEvent(new Event('reportsUpdated'));
  return true;
}

export async function getReportStats() {
  // Simulates counting stats
  return {
    pending: localReports.filter(r => r.status === 'Pending').length,
    verified: localReports.filter(r => r.status === 'Verified').length,
    rejected: localReports.filter(r => r.status === 'Rejected').length
  };
}
