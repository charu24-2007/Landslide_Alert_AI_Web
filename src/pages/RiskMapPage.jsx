// Risk Map Page — Full GIS map with zone detail panel
import React, { useState } from 'react';
import GISMap from '../components/GISMap';
import { riskZones, getRiskColor } from '../data/riskZones';
import { MapPin, X, ArrowRight, Navigation2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ZonePanel({ zone, onClose }) {
  if (!zone) return null;
  const color = getRiskColor(zone.riskLevel);
  return (
    <div className="map-overlay map-zone-panel" style={{ maxHeight: 400, overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{zone.id}</span>
            <span className={`sev-badge badge-${zone.riskLevel}`}>● {zone.riskLevel}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{zone.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={9} />{zone.district}</div>
        </div>
        <button className="btn btn-icon btn-sm" onClick={onClose}><X size={12} /></button>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1, marginBottom: 6 }}>
        {zone.riskScore}<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/100</span>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>Confidence: {zone.confidence}%</div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 7, marginBottom: 7, fontSize: 11 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div><span style={{ color: 'var(--text-muted)' }}>Rainfall 24h:</span> <b>{zone.rainfall}mm</b></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Soil Moisture:</span> <b>{zone.soilMoisture}%</b></div>
          <div><span style={{ color: 'var(--text-muted)' }}>Ground Tilt:</span> <b>{zone.tilt}°</b></div>
        </div>
      </div>

      {zone.affectedRoads.length > 0 && (
        <div style={{ marginBottom: 6, fontSize: 11 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 3 }}>Affected Roads</div>
          {zone.affectedRoads.map((r, i) => <div key={i} style={{ color: 'var(--high)' }}>⚠ {r}</div>)}
        </div>
      )}
      {zone.affectedVillages.length > 0 && (
        <div style={{ marginBottom: 6, fontSize: 11 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 3 }}>Affected Villages</div>
          {zone.affectedVillages.map((v, i) => <div key={i} style={{ color: 'var(--text-primary)' }}>🏘 {v}</div>)}
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 7, fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
        {zone.assessment}
      </div>
    </div>
  );
}

export default function RiskMapPage({ district }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const filtered = riskZones.filter(z => {
    const d = district === 'all' || z.district === district;
    const r = filter === 'ALL' || z.riskLevel === filter;
    return d && r;
  });

  return (
    <div className="page-content" style={{ gap: 10 }}>
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>GIS Risk Map</h1>
          <p>Interactive landslide risk zone visualization — NER</p>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['ALL','CRITICAL','HIGH','MODERATE','LOW'].map(lvl => (
            <button key={lvl} className={`btn btn-sm${filter===lvl ? ' btn-primary' : ''}`} onClick={() => setFilter(lvl)}
              style={filter!==lvl && lvl!=='ALL' ? { color: getRiskColor(lvl), borderColor: getRiskColor(lvl) } : {}}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flex: 1 }}>
        {/* Map */}
        <div style={{ flex: 1 }}>
          <GISMap district={district} selectedZone={selected} onZoneSelect={setSelected} height="calc(100vh - 220px)" />
          {selected && <ZonePanel zone={selected} onClose={() => setSelected(null)} />}
        </div>

        {/* Zone list sidebar */}
        <div className="panel" style={{ width: 230, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <span className="panel-title">Zones ({filtered.length})</span>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.sort((a,b) => b.riskScore - a.riskScore).map(zone => {
              const color = getRiskColor(zone.riskLevel);
              return (
                <div key={zone.id} onClick={() => setSelected(zone)}
                  style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 10px', borderBottom:'1px solid var(--border)', cursor:'pointer', background: selected?.id===zone.id ? 'var(--hover)' : undefined }}>
                  <div style={{ width: 3, height: 30, background: color, borderRadius: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{zone.id}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{zone.name}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color }}>{zone.riskScore}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
