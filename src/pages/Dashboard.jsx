// Dashboard.jsx — Main Command, Monitoring and Decision-Support Centre with Full i18n & Dual IoT/Dataset ML Pipeline
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RefreshCw, MapPin, AlertTriangle, CloudRain, Radio, Construction,
  Zap, Clipboard, ArrowRight, ShieldCheck, Heart, Send, CheckCircle, Map,
  Brain, Cpu, Database, Activity, Sliders, Layers, Phone, Bell
} from 'lucide-react';
import KPIRow from '../components/dashboard/KPIRow';
import PriorityRiskSituation from '../components/dashboard/PriorityRiskSituation';
import ActiveAlertsPanel from '../components/dashboard/ActiveAlertsPanel';
import GISMap from '../components/map/GISMap';
import { weather } from '../data/weather';
import { roads } from '../data/roads';
import { villages } from '../data/villages';
import { getFieldReports, submitReport } from '../data/fieldReports';
import { riskZones } from '../data/riskZones';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard({ district = 'all' }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState(null);
  const [timeWindow, setTimeWindow] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);


  // Field Officer Report Form State
  const [reportType, setReportType] = useState('landslide');
  const [reportLoc, setReportLoc] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const criticalRoads = roads.filter(r => r.risk === 'CRITICAL' || r.blocked);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleFieldReportSubmit = (e) => {
    e.preventDefault();
    if (!reportLoc || !reportDesc) return;
    
    submitReport({
      type: reportType === 'landslide' ? 'LANDSLIDE' : reportType === 'crack' ? 'CRACK' : 'BLOCKAGE',
      typeName: reportType === 'landslide' ? t('landslideIncident') : reportType === 'crack' ? t('slopeCrack') : t('roadBlockage'),
      location: reportLoc,
      description: reportDesc,
      reporter: user?.name || t('fieldOfficer'),
      gps: '25.3120, 91.5210'
    });

    setFormSuccess(true);
    setReportLoc('');
    setReportDesc('');
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const role = user?.role || 'authority';

  return (
    <div className="content-area">
      {/* Page Title & Common Controls */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>
            {role === 'analyst'
              ? t('analysisDashboard')
              : role === 'field'
              ? t('fieldDashboard')
              : t('districtRiskOverview')}
          </h1>
          <p>
            {role === 'analyst'
              ? 'Data source status, model confidence overview & active sensor coverage'
              : role === 'field'
              ? 'Your assigned high-risk locations and field report submission history'
              : t('realTimeMonitoring')}
          </p>
        </div>

        <div className="page-actions-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('time')}:</span>
            <select
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              style={{ background: 'transparent', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="1h">1 {t('hrAgo')}</option>
              <option value="6h">6 {t('hrAgo')}</option>
              <option value="24h">{t('last24Hours')}</option>
              <option value="48h">{t('last48Hours')}</option>
              <option value="7d">{t('last7Days')}</option>
            </select>
          </div>

          <button className="btn-secondary" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>{refreshing ? t('loading') : t('refreshData')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      {role !== 'citizen' && <KPIRow alertCount={5} />}

      {/* ── DATASET-TRAINED ML MODEL LANDSLIDE SUSCEPTIBILITY ENGINE ── */}
      {role !== 'citizen' && (
        <div className="clean-card" style={{ padding: '18px 22px', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', border: '1.5px solid #BFDBFE' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}>
                <Brain size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#1E3A8A' }}>
                    {t('aiRiskAnalysis')} — {t('datasetBased')}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: '#DBEAFE', color: '#1D4ED8' }}>
                    ★ {t('modelAccuracy')}: 94.8%
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: '#475569', margin: '2px 0 0' }}>
                  {t('datasetMLDesc')} (78,200 GSI records • 52 IMD AWS Stations • CartoSAT DEM)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'right', marginRight: 4 }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{t('overallRiskLevel')}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--risk-critical)' }}>87.4 / 100 ({t('critical')})</div>
              </div>
              <button
                className="btn-primary btn-sm"
                onClick={() => navigate('/ai')}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Activity size={14} />
                <span>{t('viewDetails')}</span>
              </button>
            </div>
          </div>

          {/* ML Model Performance & Factor Weights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, paddingTop: 14, borderTop: '1px solid #DBEAFE' }}>
            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Cumulative 72h Rain</span>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--risk-critical)' }}>312 mm</div>
              <span style={{ fontSize: 10.5, color: '#2563EB', fontWeight: 700 }}>Weight: 38% ({t('high')})</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Slope Gradient Index</span>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#D97706' }}>38.5° Steep</div>
              <span style={{ fontSize: 10.5, color: '#2563EB', fontWeight: 700 }}>Weight: 26% (Critical)</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Soil Saturation Index</span>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--risk-critical)' }}>94.2% VWC</div>
              <span style={{ fontSize: 10.5, color: '#2563EB', fontWeight: 700 }}>Weight: 19% (Breached)</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Geology &amp; Fragility</span>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#7C3AED' }}>Weathered Shale</div>
              <span style={{ fontSize: 10.5, color: '#7C3AED', fontWeight: 700 }}>Weight: 17% (High Risk)</span>
            </div>
          </div>
        </div>
      )}

      {/* ── DISTRICT AUTHORITY DASHBOARD OVERVIEW ── */}
      {role === 'authority' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 20 }}>
            {/* GIS Map */}
            <div className="clean-card" style={{ padding: 20 }}>
              <div className="card-header-row" style={{ marginBottom: 12 }}>
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Map size={16} color="var(--primary)" />
                    <h3>{t('realtimeGISMap')}</h3>
                  </div>
                  <p>{t('geoSpatialDesc')}</p>
                </div>
                <button className="btn-secondary btn-sm" onClick={() => navigate('/map')}>
                  {t('fullMap')} <ArrowRight size={12} />
                </button>
              </div>

              <GISMap
                district={district}
                selectedZone={selectedZone}
                onZoneSelect={(zone) => setSelectedZone(zone)}
                height={400}
              />
            </div>

            {/* Active Alerts */}
            <ActiveAlertsPanel limit={4} onRefresh={handleRefresh} />
          </div>

          {/* Priority Risk Situation (RISK → IMPACT → ACTION) */}
          <PriorityRiskSituation
            zone={selectedZone}
            onSelectZone={(z) => setSelectedZone(z)}
          />

          {/* Supporting Info Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* IoT Real-time Telemetry Station card */}
            <div className="clean-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/iot-sensors')}>
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Radio size={16} color="var(--primary)" />
                    <h3>{t('iotSensorsPage')}</h3>
                  </div>
                  <p>19 Deployed Sensor Components</p>
                </div>
                <span className="status-badge badge-critical" style={{ fontSize: 11 }}>{t('critical')}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Soil Moisture Sensor V2.0:</span>
                  <b style={{ fontSize: 22, color: 'var(--risk-critical)' }}>87% Saturation</b>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  MPU6050 Tilt: 3.8° • Rain FC-37: 187 mm/24h • LoRa-02: -58 dBm
                </div>
                <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6, fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>
                  ➔ {t('viewDetails')} in {t('iotSensorsNav')}
                </div>
              </div>
            </div>

            {/* Infrastructure connectivity card */}
            <div className="clean-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/infrastructure-impact')}>
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Construction size={16} color="var(--risk-critical)" />
                    <h3>{t('roadsVillagesTitle')}</h3>
                  </div>
                  <p>{criticalRoads.length} {t('criticalRoads')}</p>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: 13.5 }}>
                {criticalRoads.slice(0, 2).map((r) => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <b>{r.name}</b>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.agency} • {r.corridor}</div>
                    </div>
                    <span className={`status-badge ${r.blocked ? 'badge-critical' : 'badge-high'}`}>
                      {r.blocked ? t('blocked') : r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Queue card */}
            <div className="clean-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/emergency-response')}>
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Zap size={16} color="var(--primary)" />
                    <h3>{t('emergencyResponseTitle')}</h3>
                  </div>
                  <p>{t('emergencyResponseDesc')}</p>
                </div>
                <span className="status-badge badge-critical" style={{ fontSize: 11 }}>P1 {t('critical')}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, fontSize: 13 }}>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: 6 }}>
                  <b>#1 Zone NER-011:</b> Southern Highway Gorge
                  <div style={{ fontSize: 11, color: 'var(--risk-critical)', marginTop: 2 }}>
                    • {t('evacuationOrder')} for Sohra West
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', padding: '8px 10px', borderRadius: 6 }}>
                  <b>#2 Zone NER-023:</b> Eastern Slope Sector
                  <div style={{ fontSize: 11, color: 'var(--risk-high)', marginTop: 2 }}>
                    • {t('resourceDeployment')} on link road
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── GIS ANALYST DASHBOARD (DATA → GIS → AI ANALYSIS) ── */}
      {role === 'analyst' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: 20 }}>
            {/* GIS Map */}
            <div className="clean-card" style={{ padding: 20 }}>
              <div className="card-header-row" style={{ marginBottom: 12 }}>
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Map size={16} color="var(--primary)" />
                    <h3>{t('gisRiskMap')}</h3>
                  </div>
                  <p>{t('digitalTwinDesc')}</p>
                </div>
              </div>
              <GISMap
                district={district}
                selectedZone={selectedZone}
                onZoneSelect={(zone) => setSelectedZone(zone)}
                height={460}
              />
            </div>

            {/* AI Risk Analysis Factors */}
            <div className="clean-card">
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Brain size={16} color="var(--primary)" />
                    <h3>{t('riskFactors')}</h3>
                  </div>
                  <p>{t('modelAccuracy')}: 94.8% • Random Forest + LSTM</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{t('rainfall')} (Accumulated 3-day)</span>
                    <b>38% Weight</b>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#EAF5FB', borderRadius: 3 }}>
                    <div style={{ width: '38%', height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{t('soilMoisture')} Saturation Profile</span>
                    <b>28% Weight</b>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#EAF5FB', borderRadius: 3 }}>
                    <div style={{ width: '28%', height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{t('tiltAngle')} / Displacement Velocity</span>
                    <b>20% Weight</b>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#EAF5FB', borderRadius: 3 }}>
                    <div style={{ width: '20%', height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{t('slopeAngle')} &amp; Topographic Index</span>
                    <b>14% Weight</b>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#EAF5FB', borderRadius: 3 }}>
                    <div style={{ width: '14%', height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                  <h4>{t('sensorStatus')}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                    <div style={{ background: 'var(--bg)', padding: '10px', borderRadius: 6, textAlign: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Satellite Sync</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)', marginTop: 2 }}>ACTIVE (GSAT)</div>
                    </div>
                    <div style={{ background: 'var(--bg)', padding: '10px', borderRadius: 6, textAlign: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>LoRa Gateway</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)', marginTop: 2 }}>92% OPERATIONAL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PriorityRiskSituation
            zone={selectedZone}
            onSelectZone={(z) => setSelectedZone(z)}
          />
        </>
      )}

      {/* ── FIELD OFFICER DASHBOARD ── */}
      {role === 'field' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            {/* Assigned Alerts to verify */}
            <div className="clean-card">
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Bell size={16} color="var(--primary)" />
                    <h3>{t('assignedAlerts')}</h3>
                  </div>
                  <p>{t('fieldReportsDesc')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 8, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="status-badge badge-critical">{t('critical')}</span>
                    <h4 style={{ marginTop: 6, fontSize: 15 }}>NER-011: Southern Highway Gorge</h4>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>GPS: 25.2750, 91.5750</p>
                  </div>
                  <button className="btn-primary btn-sm" onClick={() => navigate('/map')}>{t('viewOnMap')}</button>
                </div>
                <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 8, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="status-badge badge-high">{t('high')}</span>
                    <h4 style={{ marginTop: 6, fontSize: 15 }}>NER-023: Eastern Slope Sector</h4>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>GPS: 25.3100, 91.5200</p>
                  </div>
                  <button className="btn-secondary btn-sm" onClick={() => navigate('/map')}>{t('viewOnMap')}</button>
                </div>
              </div>
            </div>

            {/* Submit Verification Report Form */}
            <div className="clean-card">
              <div className="card-header-row">
                <div className="card-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clipboard size={16} color="var(--primary)" />
                    <h3>{t('submitReport')}</h3>
                  </div>
                  <p>{t('fieldReportsDesc')}</p>
                </div>
                <button 
                  className={`btn-xs ${isOffline ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={() => setIsOffline(!isOffline)}
                  style={{ borderRadius: 12, fontWeight: 700 }}
                  type="button"
                >
                  {isOffline ? t('offline') : t('online')}
                </button>
              </div>

              {formSuccess && (
                <div style={{ background: 'var(--risk-low-bg)', border: '1px solid var(--risk-low-border)', color: 'var(--risk-low)', padding: 10, borderRadius: 6, fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} />
                  <span>{t('reportSubmitted')}</span>
                </div>
              )}

              <form onSubmit={handleFieldReportSubmit} style={{ marginTop: 12 }}>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportType')}</label>
                  <select 
                    className="form-input-clean" 
                    value={reportType} 
                    onChange={(e) => setReportType(e.target.value)}
                    style={{ height: 38 }}
                  >
                    <option value="landslide">{t('landslideIncident')}</option>
                    <option value="crack">{t('slopeCrack')}</option>
                    <option value="blockage">{t('roadBlockage')}</option>
                  </select>
                </div>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportLocation')}</label>
                  <input 
                    type="text" 
                    className="form-input-clean" 
                    value={reportLoc}
                    onChange={(e) => setReportLoc(e.target.value)}
                    placeholder="e.g. NH-44 Km 12.5" 
                    required 
                    style={{ height: 38 }}
                  />
                </div>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportDescription')}</label>
                  <textarea 
                    className="form-input-clean" 
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="Observation details..." 
                    required
                    style={{ minHeight: 70 }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', height: 38, fontSize: 14, borderRadius: 6 }}>
                  <Send size={13} />
                  <span>{isOffline ? t('offlineMode') : t('submitForReview')}</span>
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* ── CITIZEN DASHBOARD ── */}
      {role === 'citizen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Critical Red Alert Banner */}
          <div style={{ background: '#FEF2F2', border: '2px solid #FECACA', padding: '20px 24px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={28} />
              </div>
              <div>
                <h2 style={{ color: '#991B1B', fontSize: 19, fontWeight: 800 }}>
                  {t('overallRiskLevel')}: {t('critical')} • {t('citizenAlertBannerTitle')}
                </h2>
                <p style={{ color: '#B91C1C', marginTop: 3, fontSize: 13.5, maxWidth: 680, lineHeight: 1.4 }}>
                  {t('citizenAlertBannerDesc')}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="tel:112" className="btn-danger btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                <Phone size={14} /> {t('call112')}
              </a>
              <a href="tel:1078" className="btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                <ShieldCheck size={14} /> {t('call1078')}
              </a>
            </div>
          </div>

          {/* Quick Helplines & Safe Shelter Directory */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div className="clean-card" style={{ padding: '16px 18px', borderLeft: '4px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <ShieldCheck size={18} color="#10B981" />
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('safeShelters')}</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <b>Sohra Community Hall</b>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Capacity: 450 • Distance: 1.8 km</div>
                  </div>
                  <span className="status-badge badge-low">{t('safeZone')}</span>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <b>Mawsynram Higher Secondary</b>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Capacity: 600 • Distance: 3.2 km</div>
                  </div>
                  <span className="status-badge badge-low">{t('safeZone')}</span>
                </div>
              </div>
            </div>

            <div className="clean-card" style={{ padding: '16px 18px', borderLeft: '4px solid #0284C7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Phone size={18} color="#0284C7" />
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{t('emergencyHelplines')}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12.5 }}>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>National Emergency</span>
                  <div style={{ fontWeight: 800, color: '#DC2626', fontSize: 15 }}>112</div>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>NDRF Helpline</span>
                  <div style={{ fontWeight: 800, color: '#0284C7', fontSize: 15 }}>1078</div>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>State Disaster (SDMA)</span>
                  <div style={{ fontWeight: 800, color: '#10B981', fontSize: 15 }}>1070</div>
                </div>
                <div style={{ padding: '8px 10px', background: 'var(--bg)', borderRadius: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Ambulance</span>
                  <div style={{ fontWeight: 800, color: '#7C3AED', fontSize: 15 }}>108</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
            {/* GIS Map */}
            <div className="clean-card" style={{ padding: 20 }}>
              <div className="card-header-row" style={{ marginBottom: 12 }}>
                <div className="card-title-group">
                  <h3>{t('realtimeGISMap')}</h3>
                  <p>{t('geoSpatialDesc')}</p>
                </div>
              </div>
              <GISMap district={district} height={380} />
            </div>

            {/* Citizen Hazard Report Form */}
            <div className="clean-card">
              <div className="card-header-row">
                <div className="card-title-group">
                  <h3>{t('reportHazard')}</h3>
                  <p>{t('fieldReportsDesc')}</p>
                </div>
              </div>

              {formSuccess && (
                <div style={{ background: 'var(--risk-low-bg)', border: '1px solid var(--risk-low-border)', color: 'var(--risk-low)', padding: 10, borderRadius: 6, fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} />
                  <span>{t('reportSubmitted')}</span>
                </div>
              )}

              <form onSubmit={handleFieldReportSubmit} style={{ marginTop: 12 }}>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportType')}</label>
                  <select 
                    className="form-input-clean" 
                    value={reportType} 
                    onChange={(e) => setReportType(e.target.value)}
                    style={{ height: 38 }}
                  >
                    <option value="landslide">{t('landslideIncident')}</option>
                    <option value="crack">{t('slopeCrack')}</option>
                    <option value="blockage">{t('roadBlockage')}</option>
                  </select>
                </div>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportLocation')}</label>
                  <input type="text" className="form-input-clean" value={reportLoc} onChange={e => setReportLoc(e.target.value)} placeholder="e.g. Near Sohra Market" required style={{ height: 38 }} />
                </div>
                <div className="form-group-clean">
                  <label className="form-label-clean">{t('reportDescription')}</label>
                  <textarea className="form-input-clean" value={reportDesc} onChange={e => setReportDesc(e.target.value)} placeholder={t('reportDescription')} required style={{ minHeight: 70 }} />
                </div>
                <button type="submit" className="btn-danger" style={{ width: '100%', height: 40, fontSize: 14, fontWeight: 700 }}>
                  <Send size={13} /> {t('reportHazard')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
