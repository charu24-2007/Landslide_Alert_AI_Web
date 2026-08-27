// RiskSituation — Priority risk zone display panel (signature component)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertTriangle, MapPin, Navigation2 } from 'lucide-react';
import { riskZones, getRiskColor, getRiskBg } from '../data/riskZones';

function XAIBar({ label, value, max = 100 }) {
  const pct = Math.round(value);
  const color = pct >= 85 ? 'var(--critical)' : pct >= 65 ? 'var(--high)' : 'var(--blue-dim)';
  return (
    <div className="xai-group">
      <div className="xai-row">
        <span className="factor">{label}</span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="xai-track">
        <div className="xai-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function RiskSituation({ district, limit = 3 }) {
  const navigate = useNavigate();

  const sorted = [...riskZones]
    .filter(z => !district || district === 'all' || z.district === district)
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, limit);

  if (!sorted.length) return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Priority Risk Zones</span></div>
      <div className="empty-state">No risk zones for selected district</div>
    </div>
  );

  const top = sorted[0];
  const color = getRiskColor(top.riskLevel);
  const bg = getRiskBg(top.riskLevel);

  return (
    <div className="panel risk-situation" style={{ borderLeftColor: color }}>
      <div className="panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <AlertTriangle size={13} color={color} />
          <span className="panel-title">Priority Risk Zones</span>
        </div>
        <button className="btn btn-sm" onClick={() => navigate('/map')}>
          View Map <ArrowRight size={10} />
        </button>
      </div>

      {/* Top zone — expanded */}
      <div style={{ padding: '10px 12px', background: bg, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <div style={{ display: 'flex', align: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>{top.name}</span>
              <span className={`sev-badge badge-${top.riskLevel}`} style={{ marginLeft: 6 }}>
                ● {top.riskLevel}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-secondary)' }}>
              <MapPin size={10} />
              <span>{top.district} · {top.id}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color }}>
              {top.riskScore}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/ 100 · {top.confidence}% conf.</div>
          </div>
        </div>

        {/* RISK → IMPACT → ACTION flow */}
        <div className="risk-flow" style={{ marginBottom: 8 }}>
          <div className="risk-flow-section">
            <div className="risk-flow-label">Risk Drivers</div>
            <div className="risk-flow-content">
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <div>Rain 24h: <b>{top.rainfall}mm</b></div>
                <div>Moisture: <b>{top.soilMoisture}%</b></div>
                <div>Tilt: <b>{top.tilt}°</b></div>
              </div>
            </div>
          </div>
          <div className="risk-flow-section">
            <div className="risk-flow-label">Affected Impact</div>
            <div className="risk-flow-content">
              {[...top.affectedRoads.slice(0,1), ...top.affectedVillages.slice(0,1), ...top.affectedInfrastructure.slice(0,1)].map((item, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item}</div>
              ))}
              {top.affectedRoads.length + top.affectedVillages.length + top.affectedInfrastructure.length === 0 && (
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>No direct impact</div>
              )}
            </div>
          </div>
          <div className="risk-flow-section">
            <div className="risk-flow-label">Recommended Action</div>
            <div className="risk-flow-content">
              {top.riskLevel === 'CRITICAL' && <div style={{ fontSize: 11, color: 'var(--critical)', fontWeight: 600 }}>IMMEDIATE EVACUATION</div>}
              {top.riskLevel === 'HIGH' && <div style={{ fontSize: 11, color: 'var(--high)', fontWeight: 600 }}>Activate response teams</div>}
              {top.riskLevel === 'MODERATE' && <div style={{ fontSize: 11, color: 'var(--moderate)', fontWeight: 600 }}>Heightened monitoring</div>}
              {top.riskLevel === 'LOW' && <div style={{ fontSize: 11, color: 'var(--low)', fontWeight: 600 }}>Routine surveillance</div>}
            </div>
          </div>
        </div>

        {/* AI Explanation Bars */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
            AI Factor Contribution (XAI)
          </div>
          <XAIBar label="Soil Moisture" value={top.aiExplanation.soilMoisture} />
          <XAIBar label="Rainfall Intensity" value={top.aiExplanation.rainfall} />
          <XAIBar label="Ground Displacement" value={top.aiExplanation.groundTilt} />
          <XAIBar label="Terrain Susceptibility" value={top.aiExplanation.terrainSusceptibility} />
        </div>
      </div>

      {/* Additional zones — compact rows */}
      {sorted.slice(1).map(zone => {
        const zColor = getRiskColor(zone.riskLevel);
        return (
          <div key={zone.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
            onClick={() => navigate(`/map?zone=${zone.id}`)}>
            <div style={{ width: 3, height: 28, borderRadius: 2, background: zColor, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{zone.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{zone.district} · Score {zone.riskScore}</div>
            </div>
            <span className={`sev-badge badge-${zone.riskLevel}`}>● {zone.riskLevel}</span>
            <ArrowRight size={12} color="var(--text-muted)" />
          </div>
        );
      })}
    </div>
  );
}
