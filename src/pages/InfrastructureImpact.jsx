// InfrastructureImpact.jsx — Standalone Infrastructure Impact Page for District Authority
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, MapPin, AlertTriangle, ShieldAlert, Users } from 'lucide-react';
import { roads } from '../data/roads';
import { useLanguage } from '../context/LanguageContext';

export default function InfrastructureImpact() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="content-area">
      {/* Page Header */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Construction size={22} color="var(--primary)" />
            {t('infrastructureImpact')}
          </h1>
          <p>{t('liveStatusBlockages')}</p>
        </div>
        <div className="page-actions-group">
          <button className="btn-primary btn-sm" onClick={() => navigate('/roads-villages')}>
            {t('fullInfraPage')} →
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="clean-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{t('monitoredHighways')}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)' }}>7 Lifeline Routes</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 4 }}>BRO: 2 • NHIDCL: 2 • PWD: 3</div>
        </div>

        <div className="clean-card" style={{ borderLeft: '4px solid var(--risk-critical)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="#DC2626" />
            </div>
            <div style={{ fontSize: 12, color: 'var(--risk-critical)', fontWeight: 600 }}>{t('activeRoadBlockages')}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--risk-critical)' }}>2 Blocked Routes</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>NH-44 Km 12 &amp; Shillong-Jowai Seg-6</div>
        </div>

        <div className="clean-card" style={{ borderLeft: '4px solid var(--risk-high)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: 12, color: 'var(--risk-high)', fontWeight: 600 }}>{t('slopeBridgeVuln')}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--risk-high)' }}>3 Bridges At Risk</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>Umngot Gorge Bridge B-04 Strain Alert</div>
        </div>

        <div className="clean-card" style={{ borderLeft: '4px solid #7C3AED' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#7C3AED" />
            </div>
            <div style={{ fontSize: 12, color: '#7C3AED', fontWeight: 600 }}>{t('isolatedHabitations')}</div>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#7C3AED' }}>18,400 Residents</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>5 Mountain Villages Exposed</div>
        </div>
      </div>

      {/* Infrastructure Road Blockages & Clearance Tracking Table */}
      <div className="clean-card">
        <div className="card-header-row" style={{ marginBottom: 14 }}>
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Construction size={18} color="var(--risk-critical)" />
              <h3>{t('lifelineHighways')}</h3>
            </div>
            <p>{t('liveStatusBlockages')}</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface-hover)', textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px' }}>Highway / Corridor</th>
                <th style={{ padding: '10px 14px' }}>Managing Agency</th>
                <th style={{ padding: '10px 14px' }}>Impact Status</th>
                <th style={{ padding: '10px 14px' }}>Landslide Debris Est.</th>
                <th style={{ padding: '10px 14px' }}>Clearing Machinery</th>
                <th style={{ padding: '10px 14px' }}>Detour / Action</th>
              </tr>
            </thead>
            <tbody>
              {roads.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 14px' }}>
                    <b>{r.name}</b>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.corridor} • Slope {r.slopeAngle}°</div>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{r.agency}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className={`status-badge ${r.blocked ? 'badge-critical' : r.risk === 'HIGH' ? 'badge-high' : 'badge-low'}`}>
                      {r.blocked ? '🚫 BLOCKED' : r.risk === 'HIGH' ? '⚠️ 1 LANE PASSABLE' : '✅ OPERATIONAL'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: r.blocked ? 'var(--risk-critical)' : 'var(--text-primary)' }}>
                    {r.blocked ? '950 m³ Rocks & Soil' : r.risk === 'HIGH' ? '200 m³ Slump' : 'Clear'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    {r.blocked ? '2 JCB Excavators Active (ETA 4h 30m)' : r.risk === 'HIGH' ? '1 Dozer On Standby' : 'Routine Patrol'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => navigate('/roads-villages')}
                      style={{ fontSize: 11.5 }}
                    >
                      {r.blocked ? 'Divert via Link Road' : 'View Corridor'}
                    </button>
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
