// RoadsVillages.jsx — Combined Impact Analysis on Lifeline Roads & Habitations
import React, { useState } from 'react';
import { Construction, Home, AlertTriangle, Building, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { roads } from '../data/roads';
import { villages } from '../data/villages';
import { useLanguage } from '../context/LanguageContext';

export default function RoadsVillages({ district = 'all' }) {
  const { t } = useLanguage();
  const [roadRiskFilter, setRoadRiskFilter] = useState('ALL');
  const [villageRiskFilter, setVillageRiskFilter] = useState('ALL');

  const filteredRoads = roads.filter(r => {
    const dMatch = district === 'all' || r.district.toLowerCase() === district.toLowerCase();
    const rMatch = roadRiskFilter === 'ALL' || r.risk === roadRiskFilter;
    return dMatch && rMatch;
  });

  const filteredVillages = villages.filter(v => {
    const dMatch = district === 'all' || v.district.toLowerCase() === district.toLowerCase();
    const rMatch = villageRiskFilter === 'ALL' || v.risk === villageRiskFilter;
    return dMatch && rMatch;
  });

  const totalExposedPop = villages.reduce((acc, v) => acc + (v.risk === 'CRITICAL' || v.risk === 'HIGH' ? v.population : 0), 0);
  const totalBlockedRoads = roads.filter(r => r.blocked).length;

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('roadsVillagesTitle')}</h1>
          <p>{t('roadsVillagesDesc')}</p>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('monitoredRoads')}</span>
            <Construction size={16} color="var(--brand-primary)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--text-primary)' }}>
            {roads.length} {t('corridors')}
          </div>
          <div className="kpi-footer-sub">
            BRO: 2 • NHIDCL: 2 • PWD: 3
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('activeBlockages')}</span>
            <AlertTriangle size={16} color="var(--risk-critical)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-critical)' }}>
            {totalBlockedRoads} {t('blocked')}
          </div>
          <div className="kpi-footer-sub">
            NH-44 Km 12 & Shillong-Jowai Seg-6
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('exposedPopulation')}</span>
            <Home size={16} color="var(--risk-high)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-high)' }}>
            {totalExposedPop.toLocaleString()}
          </div>
          <div className="kpi-footer-sub">
            5 {t('atRiskVillages')}
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('activeReliefShelters')}</span>
            <Building size={16} color="var(--risk-low)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-low)' }}>
            7 {t('activeAlerts')}
          </div>
          <div className="kpi-footer-sub">
            {t('totalSafeCapacity')}: <b>3,550 {t('residents')}</b>
          </div>
        </div>
      </div>

      {/* Section 1: Transportation & Highway Corridors */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Construction size={18} color="var(--brand-primary)" />
              <h3>{t('criticalHighwayCorridors')} ({filteredRoads.length})</h3>
            </div>
            <p>{t('nationalHighwaysSubtitle')}</p>
          </div>

          <div className="page-actions-group">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(lvl => (
              <button
                key={lvl}
                className={`btn-xs ${roadRiskFilter === lvl ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setRoadRiskFilter(lvl)}
              >
                {lvl === 'ALL' ? t('all') : (t(lvl.toLowerCase()) || lvl)}
              </button>
            ))}
          </div>
        </div>

        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>{t('assetId')}</th>
                <th>{t('corridorNameSection')}</th>
                <th>{t('district')}</th>
                <th>{t('category')}</th>
                <th>{t('agency')}</th>
                <th>{t('riskLevel')}</th>
                <th>{t('operationalStatus')}</th>
                <th>{t('alternativeRoute')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoads.map((r) => {
                const badgeClass = r.risk.toLowerCase();
                const typeLabel = r.type === 'National Highway' ? t('nationalHighway') : r.type === 'State Highway' ? t('stateHighway') : r.type === 'RCC Bridge' ? t('rccBridge') : r.type;
                const statusLabel = r.blocked ? `⚠ ${t('blocked')}` : r.status === 'Restricted' ? t('restricted') : r.status === 'Under Inspection' ? t('underInspection') : r.status === 'Open' ? t('open') : r.status;
                return (
                  <tr key={r.id}>
                    <td className="code-cell">{r.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{t(r.name) || r.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t(r.corridor) || r.corridor}</div>
                    </td>
                    <td>{t(r.district)}</td>
                    <td>{typeLabel}</td>
                    <td>
                      <span className="status-badge badge-info" style={{ fontSize: 11 }}>{r.agency}</span>
                    </td>
                    <td>
                      <span className={`status-badge badge-${badgeClass}`}>
                        ● {t(badgeClass) || r.risk}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${r.blocked ? 'badge-critical' : r.status === 'Restricted' ? 'badge-high' : 'badge-low'}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {t(r.alternateRoute) || r.alternateRoute}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Habitations & Exposed Settlements */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Home size={18} color="var(--brand-navy)" />
              <h3>{t('exposedHabitationsTitle')} ({filteredVillages.length})</h3>
            </div>
            <p>{t('exposedHabitationsSubtitle')}</p>
          </div>

          <div className="page-actions-group">
            {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(lvl => (
              <button
                key={lvl}
                className={`btn-xs ${villageRiskFilter === lvl ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setVillageRiskFilter(lvl)}
              >
                {lvl === 'ALL' ? t('all') : (t(lvl.toLowerCase()) || lvl)}
              </button>
            ))}
          </div>
        </div>

        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>{t('settlementName')}</th>
                <th>{t('district')}</th>
                <th>{t('riskZone')}</th>
                <th>{t('populationExposure')}</th>
                <th>{t('vulnerability')}</th>
                <th>{t('roadConnectivity')}</th>
                <th>{t('evacuationState')}</th>
                <th>{t('designatedReliefCenter')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVillages.map((v) => {
                const badgeClass = v.risk.toLowerCase();
                return (
                  <tr key={v.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{t(v.name) || v.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v.id}</div>
                    </td>
                    <td>{t(v.district)}</td>
                    <td className="code-cell">{v.zone}</td>
                    <td>
                      <b>{v.population.toLocaleString()}</b>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t('vulnerable')}: {v.vulnerablePop}</div>
                    </td>
                    <td>
                      <span className={`status-badge badge-${badgeClass}`}>
                        ● {t(badgeClass) || v.risk}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontWeight: v.connectivity.includes('Cut Off') ? 700 : 'normal',
                        color: v.connectivity.includes('Cut Off') ? 'var(--risk-critical)' : v.connectivity.includes('Poor') ? 'var(--risk-high)' : 'var(--text-primary)'
                      }}>
                        {v.connectivity.includes('Cut Off') ? t('cutOff') : v.connectivity}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${v.status.includes('Active') ? 'badge-critical' : v.status.includes('Progress') ? 'badge-high' : 'badge-normal'}`}>
                        {t(v.status) || v.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 12.5 }}>
                        <Building size={12} style={{ display: 'inline', marginRight: 4, color: 'var(--brand-primary)' }} />
                        {t(v.shelter) || v.shelter}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {t('capacity')}: {v.shelterCapacity} {t('residents')} • {t('distance')}: {v.shelterDistance}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
