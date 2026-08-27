// Reports Page — Automated Situation Reports (SITREP) & PDF/CSV Export
import React, { useState } from 'react';
import { BarChart2, Download, FileText, Printer, CheckCircle } from 'lucide-react';
import { dashboardData, weatherData, roadsData, villagesData } from '../data/mockData';
import { riskZones } from '../data/riskZones';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('daily_sitrep');
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 600);
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <BarChart2 size={18} color="var(--navy)" /> Situation Reports (SITREP) & Analytics
          </h1>
          <p>Official daily disaster management bulletin generator for Ministry of DoNER & NDMA</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={handleExport} disabled={downloading}>
            <Printer size={13} /> {downloading ? 'Preparing...' : 'Print / Export SITREP'}
          </button>
        </div>
      </div>

      {/* Generated SITREP Document Preview */}
      <div className="panel" style={{ padding: 20, background: '#fff', border: '1px solid var(--border)' }}>
        <div style={{ borderBottom: '2px solid var(--navy)', paddingBottom: 12, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Government of India · Ministry of Development of North Eastern Region</div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--navy)', marginTop: 2 }}>DAILY LANDSLIDE SITUATION REPORT (SITREP #2026/08/26)</h2>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Generated: 26 August 2026, 14:35 IST · Integrated AI Early Warning Model SIH26001</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="tag" style={{ background: 'var(--critical-bg)', color: 'var(--critical)', borderColor: 'var(--critical-bd)', fontSize: 11, fontWeight: 700 }}>
              STATUS: HIGH ALERT
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'var(--surface-2)', padding: 12, borderRadius: 3, border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 6 }}>1. Meteorological Summary</h4>
            <div style={{ fontSize: 12, lineHeight: 1.6 }}>
              <div>• 24h Peak Rainfall: <b>{weatherData.current.rainfall24h} mm</b> (Threshold: 100mm)</div>
              <div>• Soil Moisture Index: <b>{weatherData.current.humidity}%</b> (Near complete saturation)</div>
              <div>• IMD 48h Outlook: <b>Heavy to Very Heavy Rain Forecasted</b></div>
            </div>
          </div>
          <div style={{ background: 'var(--surface-2)', padding: 12, borderRadius: 3, border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 6 }}>2. AI Vulnerability Assessment</h4>
            <div style={{ fontSize: 12, lineHeight: 1.6 }}>
              <div>• Critical Risk Zones: <b>3 Zones (NER-011, NER-023, NER-055)</b></div>
              <div>• Maximum Slope Tilt: <b>6.8° (Southern Highway Gorge)</b></div>
              <div>• Model Confidence: <b>94.2%</b></div>
            </div>
          </div>
        </div>

        <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 8 }}>3. Critical Lifelines & Habitation Impact</h4>
        <table className="data-table" style={{ marginBottom: 16 }}>
          <thead>
            <tr>
              <th>Corridor / Habitation</th>
              <th>Risk Level</th>
              <th>Threatened Population</th>
              <th>Recommended Evacuation Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Southern Highway Gorge (NH-44 Approach)</b></td>
              <td><span className="sev-badge badge-CRITICAL">● CRITICAL</span></td>
              <td>1,670 residents (Sohra West)</td>
              <td>Immediate evacuation to Sohra Town Hall relief shelter. Road block 2km prior.</td>
            </tr>
            <tr>
              <td><b>Eastern Slope Sector (Mawsynram)</b></td>
              <td><span className="sev-badge badge-HIGH">● HIGH</span></td>
              <td>840 residents</td>
              <td>Standby evacuation alert. PWD deployed with heavy clearing equipment.</td>
            </tr>
          </tbody>
        </table>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
          <span>Officer-in-Charge: District Emergency Officer (East Khasi Hills)</span>
          <span>Authentication Code: LSA-GOV-2026-X99</span>
        </div>
      </div>
    </div>
  );
}
