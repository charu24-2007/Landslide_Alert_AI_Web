// ReportsHistory.jsx — Historical Landslide Archive, Recurrence Trends & SITREP Generator
import React, { useState } from 'react';
import { History, BarChart2, Download, Printer, FileText, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';
import { historicalLandslides, recurrenceAnalytics } from '../data/historicalLandslides';
import { weather } from '../data/weather';
import { roads } from '../data/roads';
import { villages } from '../data/villages';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export default function ReportsHistory() {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState(false);

  const historicalTrends = [
    { year: '2020', count: 18, major: 4 },
    { year: '2021', count: 24, major: 7 },
    { year: '2022', count: 31, major: 11 },
    { year: '2023', count: 28, major: 8 },
    { year: '2024', count: 35, major: 12 },
    { year: '2025', count: 42, major: 15 },
    { year: '2026 (YTD)', count: 19, major: 6 }
  ];

  const handlePrint = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 400);
  };

  const handleCsvDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Date,Location,District,Intensity,Cause,Damage,Casualties"].join(",") + "\n"
      + historicalLandslides.map(e => `"${e.date}","${e.location}","${e.district}","${e.intensity}","${e.cause}","${e.damage}",${e.casualties}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "landslide_historical_inventory_ner.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('reportsHistoryTitle')}</h1>
          <p>{t('reportsHistoryDesc')}</p>
        </div>

        <div className="page-actions-group">
          <button className="btn-secondary btn-sm" onClick={handleCsvDownload}>
            <Download size={14} /> {t('export')} CSV
          </button>
          <button className="btn-primary btn-sm" onClick={handlePrint} disabled={downloading}>
            <Printer size={14} /> {downloading ? t('loading') : t('downloadReport')}
          </button>
        </div>
      </div>

      {/* Recurrence Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('documentedEvents')}</span>
            <History size={16} color="var(--brand-primary)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--brand-primary)' }}>
            {recurrenceAnalytics.totalDocumented}
          </div>
          <div className="kpi-footer-sub">
            GSI (2015–2026)
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('primarySlideTrigger')}</span>
            <FileText size={16} color="var(--risk-critical)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-critical)', fontSize: 24, marginTop: 4 }}>
            {t('rainfall')} &gt;120mm
          </div>
          <div className="kpi-footer-sub">
            82% {t('totalLandslides')}
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('modelEarlyAccuracy')}</span>
            <CheckCircle size={16} color="var(--risk-low)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-low)' }}>
            {recurrenceAnalytics.modelValidationAccuracy}
          </div>
          <div className="kpi-footer-sub">
            {t('modelAccuracy')}
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('averageLeadWindow')}</span>
            <Calendar size={16} color="var(--brand-navy)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--brand-navy)' }}>
            {recurrenceAnalytics.avgLeadTime}
          </div>
          <div className="kpi-footer-sub">
            {t('predictionConfidence')}
          </div>
        </div>
      </div>

      {/* Multi-Year Trend Chart */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <h3>{t('multiYearPatterns')}</h3>
            <p>{t('annualDistribution')}</p>
          </div>
        </div>

        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
              <Tooltip />
              <Bar dataKey="count" name={t('totalLandslides')} fill="#1496D4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="major" name={t('majorDebrisFlows')} fill="#D62828" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Official Daily Situation Report (SITREP Preview) */}
      <div className="clean-card" style={{ padding: 24, background: '#FFFFFF' }}>
        <div style={{ borderBottom: '2px solid var(--brand-navy)', paddingBottom: 14, marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('ministryName')}
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand-navy)', marginTop: 2 }}>
              {t('dailyLandslideSitrep')} (SITREP #2026/08/26)
            </h2>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {t('sitrepPublished')}
            </div>
          </div>
          <span className="status-badge badge-critical" style={{ fontSize: 12, padding: '4px 10px' }}>
            {t('statusHighAlert')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'var(--bg)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 6 }}>
              {t('metSummaryTitle')}
            </h4>
            <div style={{ fontSize: 12.5, lineHeight: 1.6 }}>
              • {t('peakRainfallNote')}<br />
              • {t('soilSatNote')}<br />
              • {t('synopticNote')}
            </div>
          </div>

          <div style={{ background: 'var(--bg)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 6 }}>
              {t('aiAssessmentTitle')}
            </h4>
            <div style={{ fontSize: 12.5, lineHeight: 1.6 }}>
              • {t('highRiskSectorsNote')}<br />
              • {t('maxDeformNote')}<br />
              • {t('predConfidenceNote')}
            </div>
          </div>
        </div>

        <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 8 }}>
          {t('criticalLifelinesTitle')}
        </h4>
        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>{t('corridorHabitation')}</th>
                <th>{t('riskClassification')}</th>
                <th>{t('threatenedPopulation')}</th>
                <th>{t('mandatedResponse')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>{t('Southern Highway Gorge')} (NH-44)</b></td>
                <td><span className="status-badge badge-critical">● {t('critical')}</span></td>
                <td>1,670 {t('residents')} (Sohra West)</td>
                <td>{t('Immediate evacuation initiation and BRO roadblock deployment 2km prior to slope cut.') || 'Immediate evacuation to Sohra Town Hall. BRO roadblock erected at Km 10.'}</td>
              </tr>
              <tr>
                <td><b>{t('Eastern Slope Sector')} (Mawsynram Road)</b></td>
                <td><span className="status-badge badge-high">● {t('high')}</span></td>
                <td>840 {t('residents')}</td>
                <td>{t('Pre-position earthmovers at Mawsynram link road; activate community shelter.') || 'Standby evacuation alert. PWD earthmovers staged at junction.'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
          <span>{t('authority')}: Charumithra C. ({t('district')} Emergency Officer)</span>
          <span>Authentication Hash: LSA-GOV-2026-X99 • {t('ministryName')}</span>
        </div>
      </div>

      {/* Historical Landslide Table */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <h3>Geological Survey of India (GSI) Historical Occurrence Inventory</h3>
            <p>Past landslides, triggering factors, damage logs, and model post-mortem validation</p>
          </div>
        </div>

        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Date</th>
                <th>Location / District</th>
                <th>Intensity</th>
                <th>Triggering Cause</th>
                <th>Rainfall (24h)</th>
                <th>Infrastructure & Community Damage</th>
                <th>Casualties</th>
              </tr>
            </thead>
            <tbody>
              {historicalLandslides.map((e) => (
                <tr key={e.id}>
                  <td className="code-cell">{e.id}</td>
                  <td><b>{e.date}</b></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{e.location}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.district}, {e.state}</div>
                  </td>
                  <td>
                    <span className={`status-badge badge-${e.intensity === 'Critical' ? 'critical' : e.intensity === 'Major' ? 'high' : 'moderate'}`}>
                      ● {e.intensity}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, maxWidth: 220 }}>{e.cause}</td>
                  <td><b>{e.rainfall24h}</b></td>
                  <td style={{ fontSize: 12, maxWidth: 220 }}>{e.damage}</td>
                  <td>
                    <b style={{ color: e.casualties > 0 ? 'var(--risk-critical)' : 'inherit' }}>
                      {e.casualties}
                    </b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
