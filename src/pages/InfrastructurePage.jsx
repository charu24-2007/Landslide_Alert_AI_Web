// Infrastructure Page — Critical roads, bridges, and lifeline networks
import React, { useState } from 'react';
import { Construction, AlertTriangle, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import { roadsData } from '../data/mockData';

export default function InfrastructurePage({ district }) {
  const [filterType, setFilterType] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filtered = roadsData.filter(item => {
    const matchType = filterType === 'ALL' || item.type.toLowerCase().includes(filterType.toLowerCase());
    const matchRisk = filterRisk === 'ALL' || item.risk === filterRisk;
    return matchType && matchRisk;
  });

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Construction size={18} color="var(--navy)" /> Infrastructure & Critical Lifelines
          </h1>
          <p>National Highways (NHIDCL / BRO), State Corridors, Bridges, and Culverts</p>
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

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { label: 'Total Monitored Assets', value: roadsData.length, color: 'var(--blue)' },
          { label: 'Critical Assets', value: roadsData.filter(r => r.risk === 'CRITICAL').length, color: 'var(--critical)' },
          { label: 'Active Road Blockages', value: roadsData.filter(r => r.blocked).length, color: 'var(--critical)' },
          { label: 'Operational Routes', value: roadsData.filter(r => !r.blocked).length, color: 'var(--low)' },
        ].map((k, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Infrastructure Table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Monitored Transportation & Lifeline Assets ({filtered.length})</span>
        </div>
        <div className="panel-body no-pad">
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Asset Name & Corridor</th>
                <th>Type</th>
                <th>Managing Agency</th>
                <th>Risk Classification</th>
                <th>Operational Status</th>
                <th>Evacuation Priority</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td className="id-col">{item.id}</td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td>{item.type}</td>
                  <td><span className="tag">{item.agency}</span></td>
                  <td><span className={`sev-badge badge-${item.risk}`}>● {item.risk}</span></td>
                  <td>
                    {item.blocked ? (
                      <span className="tag" style={{ background: 'var(--critical-bg)', color: 'var(--critical)', borderColor: 'var(--critical-bd)' }}>
                        ⚠ BLOCKED / DAMAGED
                      </span>
                    ) : item.status === 'At Risk' ? (
                      <span className="tag" style={{ background: 'var(--high-bg)', color: 'var(--high)', borderColor: 'var(--high-bd)' }}>
                        At Risk
                      </span>
                    ) : (
                      <span className="tag" style={{ background: 'var(--low-bg)', color: 'var(--low)', borderColor: 'var(--low-bd)' }}>
                        Normal / Passable
                      </span>
                    )}
                  </td>
                  <td><b style={{ color: item.priority === 'P1' ? 'var(--critical)' : 'inherit' }}>{item.priority}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
