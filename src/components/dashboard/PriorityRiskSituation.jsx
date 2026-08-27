// PriorityRiskSituation.jsx — Signature RISK → IMPACT → ACTION component with Full Multilingual Support
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, ArrowRight, Brain, Bell, ShieldAlert, CheckCircle } from 'lucide-react';
import { riskZones, getRiskColor, getRiskBg } from '../../data/riskZones';
import { useLanguage } from '../../context/LanguageContext';

export default function PriorityRiskSituation({ zone = null, onSelectZone }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Pick top critical/high risk zone if not provided
  const currentZone = zone || riskZones.find(z => z.riskLevel === 'CRITICAL') || riskZones[0];
  const color = getRiskColor(currentZone.riskLevel);

  const xaiFactors = [
    { label: `${t('soilMoisture')} Saturation`, val: currentZone.aiExplanation?.soilMoisture || 92 },
    { label: `${t('rainfall')} (24h Accumulation)`, val: currentZone.aiExplanation?.rainfall || 85 },
    { label: `${t('tiltAngle')} / Ground Displacement`, val: currentZone.aiExplanation?.groundTilt || 68 },
    { label: `${t('slopeAngle')} Susceptibility`, val: currentZone.aiExplanation?.terrainSusceptibility || 78 },
    { label: `${t('historicalEvents')} Recurrence`, val: currentZone.aiExplanation?.historicalActivity || 55 }
  ];

  return (
    <div className="clean-card" style={{ borderLeft: `5px solid ${color}`, gap: 16 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              {t('priorityRiskSituation')}
            </span>
            <span className={`status-badge badge-${currentZone.riskLevel.toLowerCase()}`}>
              ● {t(currentZone.riskLevel.toLowerCase()) || currentZone.riskLevel} {t('overallRiskLevel') || 'RISK'}
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
            {t(currentZone.name)} ({currentZone.id})
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            <MapPin size={13} color="var(--text-muted)" />
            <span>{t(currentZone.district)}, Meghalaya • {t('predictionConfidence')}: <b>{currentZone.confidence}%</b></span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: color, lineHeight: 1 }}>
            {currentZone.riskScore} <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>/ 100</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            {t('riskScore')}: <b>{t('increasing')}</b>
          </div>
        </div>
      </div>

      {/* 3-Column RISK → IMPACT → ACTION Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16, background: 'var(--bg)', padding: '16px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)'
      }}>
        {/* Column 1: WHY IS IT RISKY? */}
        <div>
          <h4 style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 8 }}>
            1. {t('whyIsRisky')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {xaiFactors.map((f, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-secondary)', marginBottom: 2 }}>
                  <span>{f.label}</span>
                  <b style={{ color: f.val > 75 ? 'var(--risk-critical)' : 'var(--text-primary)' }}>{f.val}%</b>
                </div>
                <div style={{ width: '100%', height: 5, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${f.val}%`, height: '100%',
                    background: f.val > 80 ? 'var(--risk-critical)' : f.val > 65 ? 'var(--risk-high)' : 'var(--brand-primary)',
                    borderRadius: 3
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: WHAT IS AFFECTED? */}
        <div>
          <h4 style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 8 }}>
            2. {t('whatIsAffected')}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
            <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--risk-critical)' }}>{t('criticalRoads')}:</div>
              <div>{currentZone.affectedRoads?.map(r => t(r)).join(', ') || 'NH Corridor (Mawsynram Road)'}</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t('atRiskVillages')}:</div>
              <div>{currentZone.affectedVillages?.map(v => t(v)).join(', ') || 'Mawsynram East (840 residents)'}</div>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{t('infrastructure')}:</div>
              <div>{currentZone.affectedInfrastructure?.map(i => t(i)).join(', ') || '2 Low Voltage Power Lines, 1 Bridge'}</div>
            </div>
          </div>
        </div>

        {/* Column 3: RECOMMENDED ACTION */}
        <div>
          <h4 style={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 8 }}>
            3. {t('whatAction')}
          </h4>
          <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: 6, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12.5, color: 'var(--risk-critical)', fontWeight: 600 }}>
              <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{t('recAction1') || 'Immediate field verification required. Issue road barrier alert on NH Corridor.'}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              • {t('recAction2') || 'Coordinate with BRO (Project Swastik) for earthmover readiness.'}<br/>
              • {t('recAction3') || 'Place Mawsynram Higher Secondary School shelter on standby.'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn-secondary btn-sm" onClick={() => navigate(`/map?zone=${currentZone.id}`)}>
          <MapPin size={14} /> {t('viewOnMap')}
        </button>
        <button className="btn-secondary btn-sm" onClick={() => navigate(`/ai?zone=${currentZone.id}`)}>
          <Brain size={14} /> {t('aiAnalysis')}
        </button>
        <button className="btn-primary btn-sm" onClick={() => navigate(`/alerts?zone=${currentZone.id}`)}>
          <Bell size={14} /> {t('createAlert')}
        </button>
      </div>
    </div>
  );
}
