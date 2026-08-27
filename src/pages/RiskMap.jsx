// RiskMap.jsx — Full GIS Risk Map with Zone Inspector
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GISMap from '../components/map/GISMap';
import { riskZones, getRiskColor } from '../data/riskZones';
import { MapPin, X, ArrowRight, Brain, Bell, AlertTriangle, Layers, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RiskMap({ district = 'all' }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialZoneId = searchParams.get('zone');

  const [selectedZone, setSelectedZone] = useState(() => {
    if (initialZoneId) {
      return riskZones.find(z => z.id === initialZoneId) || null;
    }
    return null;
  });
  const [riskFilter, setRiskFilter] = useState('ALL');

  const filteredZones = riskZones.filter(z => {
    const dMatch = district === 'all' || z.district.toLowerCase() === district.toLowerCase();
    const rMatch = riskFilter === 'ALL' || z.riskLevel === riskFilter;
    return dMatch && rMatch;
  });

  return (
    <div className="content-area" style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('gisRiskMap')}</h1>
          <p>{t('digitalTwinDesc')}</p>
        </div>

        {/* Filter Buttons */}
        <div className="page-actions-group">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              className={`btn-sm ${riskFilter === lvl ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRiskFilter(lvl)}
            >
              {lvl === 'ALL' ? t('all') : t(lvl.toLowerCase()) || lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Zone Inspector Container */}
      <div style={{ flex: 1, display: 'flex', gap: 16, minHeight: 0 }}>
        {/* Map Container */}
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <GISMap
            district={district}
            selectedZone={selectedZone}
            onZoneSelect={(z) => setSelectedZone(z)}
            height="100%"
          />
        </div>

        {/* Right Zone Inspector Drawer */}
        <div className="clean-card" style={{ width: 340, minWidth: 340, height: '100%', padding: 18, overflowY: 'auto' }}>
          {selectedZone ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>{t('zoneDetails')}</span>
                    <span className={`status-badge badge-${selectedZone.riskLevel.toLowerCase()}`}>
                      ● {t(selectedZone.riskLevel.toLowerCase()) || selectedZone.riskLevel}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>{t(selectedZone.name)}</h3>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t(selectedZone.district)} • {selectedZone.id}</div>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Score Box */}
              <div style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '12px 14px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{t('calculatedRiskScore')}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: getRiskColor(selectedZone.riskLevel) }}>
                    {selectedZone.riskScore} <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/ 100</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t('predictionConfidence')}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedZone.confidence}%</div>
                </div>
              </div>

              {/* Risk Drivers */}
              <div>
                <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                  {t('riskFactors')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('rainfall')} (24h):</span>
                    <b>{selectedZone.rainfall} mm</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('soilMoisture')}:</span>
                    <b>{selectedZone.soilMoisture}%</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t('tiltAngle')}:</span>
                    <b>{selectedZone.tilt}°</b>
                  </div>
                </div>
              </div>

              {/* Exposed Impact */}
              <div>
                <h5 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                  {t('exposedInfra')}
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12 }}>
                  <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
                    <b>{t('roads')}:</b> {selectedZone.affectedRoads?.map(r => t(r)).join(', ') || 'None identified'}
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
                    <b>{t('atRiskVillages')}:</b> {selectedZone.affectedVillages?.map(v => t(v)).join(', ') || 'None identified'}
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '6px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>
                    <b>{t('infrastructure')}:</b> {selectedZone.affectedInfrastructure?.map(inf => t(inf)).join(', ') || 'None'}
                  </div>
                </div>
              </div>

              {/* Recommended Action */}
              <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                <b style={{ color: 'var(--text-primary)' }}>{t('assessmentAction')}:</b><br />
                {t(selectedZone.assessment) || selectedZone.assessment}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => navigate(`/ai?zone=${selectedZone.id}`)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <Brain size={14} /> {t('fullAiExplain')}
                </button>
                <button
                  className="btn-primary btn-sm"
                  onClick={() => navigate(`/alerts?zone=${selectedZone.id}`)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <Bell size={14} /> {t('broadcastWarning')}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{t('monitoredRiskZones')}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t('clickToInspect')}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
                {filteredZones.map(zone => (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    style={{
                      padding: '10px 12px', borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{t(zone.name)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t(zone.district)} • {zone.id}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={`status-badge badge-${zone.riskLevel.toLowerCase()}`}>
                        {t(zone.riskLevel.toLowerCase()) || zone.riskLevel}
                      </span>
                      <div style={{ fontSize: 12, fontWeight: 700, color: getRiskColor(zone.riskLevel), marginTop: 2 }}>
                        {zone.riskScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
