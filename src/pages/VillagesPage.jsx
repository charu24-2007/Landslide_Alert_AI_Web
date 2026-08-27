// Villages Page — Habitations, exposed population, evacuation status & shelters
import React, { useState } from 'react';
import { Home, Users, AlertTriangle, ShieldCheck, MapPin, Building } from 'lucide-react';
import { villagesData } from '../data/mockData';

export default function VillagesPage({ district }) {
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filtered = villagesData.filter(v => {
    const dMatch = !district || district === 'all' || v.district === district;
    const rMatch = filterRisk === 'ALL' || v.risk === filterRisk;
    return dMatch && rMatch;
  });

  const totalExposedPop = villagesData.reduce((acc, cur) => acc + (cur.risk === 'CRITICAL' || cur.risk === 'HIGH' ? cur.population : 0), 0);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Home size={18} color="var(--navy)" /> Habitations & Exposed Settlements
          </h1>
          <p>Community risk assessment, vulnerable populations, and designated disaster relief shelters</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(lvl => (
            <button
              key={lvl}
              className={`btn btn-sm ${filterRisk === lvl ? 'btn-primary' : ''}`}
              onClick={() => setFilterRisk(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { label: 'Settlements Monitored', value: villagesData.length, color: 'var(--blue)' },
          { label: 'High/Critical Risk Pop.', value: totalExposedPop.toLocaleString(), color: 'var(--critical)' },
          { label: 'Active Evacuations', value: villagesData.filter(v => v.status === 'Active Evacuation').length, color: 'var(--critical)' },
          { label: 'Designated Shelters', value: '7 Active', color: 'var(--low)' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Villages Table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Habitation Vulnerability Index ({filtered.length})</span>
        </div>
        <div className="panel-body no-pad">
          <table className="data-table">
            <thead>
              <tr>
                <th>Village / Settlement</th>
                <th>District</th>
                <th>Associated Zone</th>
                <th>Population</th>
                <th>Vulnerability</th>
                <th>Road Connectivity</th>
                <th>Evacuation State</th>
                <th>Designated Relief Center</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id}>
                  <td style={{ fontWeight: 600 }}>{v.name}</td>
                  <td>{v.district}</td>
                  <td className="id-col">{v.zone}</td>
                  <td><b>{v.population.toLocaleString()}</b></td>
                  <td><span className={`sev-badge badge-${v.risk}`}>● {v.risk}</span></td>
                  <td>
                    <span style={{ color: v.connectivity === 'Cut Off' ? 'var(--critical)' : v.connectivity === 'Poor' ? 'var(--high)' : 'inherit', fontWeight: v.connectivity === 'Cut Off' ? 700 : 'normal' }}>
                      {v.connectivity}
                    </span>
                  </td>
                  <td>
                    <span className="tag" style={{
                      background: v.status === 'Active Evacuation' ? 'var(--critical-bg)' : v.status === 'Completed' ? 'var(--low-bg)' : 'var(--surface-2)',
                      color: v.status === 'Active Evacuation' ? 'var(--critical)' : v.status === 'Completed' ? 'var(--low)' : 'var(--text-secondary)'
                    }}>
                      {v.status}
                    </span>
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                    <Building size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {v.shelter}
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
