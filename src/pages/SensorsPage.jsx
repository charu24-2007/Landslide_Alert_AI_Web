// Sensors Page — IoT Network monitoring table with real-time data
import React, { useState } from 'react';
import { sensors } from '../data/sensors';
import { Radio, Search } from 'lucide-react';

const STATUS_COLOR = { CRITICAL: 'var(--critical)', WARNING: 'var(--high)', NORMAL: 'var(--low)', OFFLINE: 'var(--text-muted)' };

export default function SensorsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = sensors.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.nodeId.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = { CRITICAL: sensors.filter(s=>s.status==='CRITICAL').length, WARNING: sensors.filter(s=>s.status==='WARNING').length, OFFLINE: sensors.filter(s=>s.status==='OFFLINE').length, NORMAL: sensors.filter(s=>s.status==='NORMAL').length };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Radio size={18} color="var(--blue)" /> Sensor Network
          </h1>
          <p>42 IoT nodes · Soil moisture · Ground tilt · Rainfall · Battery</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['ALL','CRITICAL','WARNING','NORMAL','OFFLINE'].map(s => (
            <button key={s} className={`btn btn-sm${statusFilter===s?' btn-primary':''}`} onClick={() => setStatusFilter(s)}>
              {s}{s!=='ALL' && ` (${counts[s]||0})`}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {[
          { label: 'Online', value: sensors.filter(s=>s.status!=='OFFLINE').length, color: 'var(--low)' },
          { label: 'Offline', value: counts.OFFLINE, color: 'var(--critical)' },
          { label: 'Warning', value: counts.WARNING, color: 'var(--high)' },
          { label: 'Critical', value: counts.CRITICAL, color: 'var(--critical)' },
        ].map((item, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-label">{item.label}</div>
            <div className="kpi-value" style={{ color: item.color }}>{item.value}</div>
            <div className="kpi-sub">of {sensors.length} total nodes</div>
          </div>
        ))}
      </div>

      {/* Filter row */}
      <div className="filter-bar" style={{ position: 'static', height: 'auto', padding: '8px 12px', borderRadius: 3 }}>
        <div className="filter-search">
          <Search size={12} color="var(--text-muted)" />
          <input placeholder="Search node ID or location..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4 }}>{filtered.length} nodes shown</span>
      </div>

      {/* Sensor Table */}
      <div className="panel">
        <div className="panel-body no-pad" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Node ID</th><th>Location</th><th>Status</th>
                <th>Soil Moisture</th><th>Tilt (°)</th><th>Rainfall</th>
                <th>Temp</th><th>Battery</th><th>Signal</th><th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.nodeId}>
                  <td className="id-col">{s.nodeId}</td>
                  <td>{s.location}</td>
                  <td>
                    <span className={`sev-badge badge-${s.status}`}>● {s.status}</span>
                  </td>
                  <td>{s.soilMoisture != null ? <span style={{ color: s.soilMoisture > 80 ? 'var(--critical)' : 'inherit' }}>{s.soilMoisture}%</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{s.tilt != null ? <span style={{ color: s.tilt > 4 ? 'var(--critical)' : s.tilt > 2 ? 'var(--high)' : 'inherit' }}>{s.tilt}°</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{s.rainfall || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                  <td>{s.temperature != null ? `${s.temperature}°C` : '—'}</td>
                  <td>{s.battery != null ? <span style={{ color: s.battery < 20 ? 'var(--critical)' : s.battery < 40 ? 'var(--high)' : 'inherit' }}>{s.battery}%</span> : '—'}</td>
                  <td><span style={{ color: s.signal==='Offline' ? 'var(--text-muted)' : s.signal==='Weak' ? 'var(--high)' : 'inherit' }}>{s.signal}</span></td>
                  <td style={{ color: 'var(--text-muted)' }}>{s.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
