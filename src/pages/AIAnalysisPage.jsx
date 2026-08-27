// AI Risk Analysis Page — Detailed AI/ML explanation per zone
import React, { useState } from 'react';
import { riskZones, getRiskColor } from '../data/riskZones';
import { Brain, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

function XAIBar({ label, value }) {
  const pct = Math.round(value);
  const color = pct >= 85 ? 'var(--critical)' : pct >= 65 ? 'var(--high)' : pct >= 40 ? 'var(--moderate)' : 'var(--low)';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.6s' }} />
      </div>
    </div>
  );
}

function ZoneAnalysis({ zone }) {
  const color = getRiskColor(zone.riskLevel);
  const radarData = [
    { subject: 'Rainfall', A: zone.aiExplanation.rainfall, fullMark: 100 },
    { subject: 'Moisture', A: zone.aiExplanation.soilMoisture, fullMark: 100 },
    { subject: 'Tilt', A: zone.aiExplanation.groundTilt, fullMark: 100 },
    { subject: 'Terrain', A: zone.aiExplanation.terrainSusceptibility, fullMark: 100 },
    { subject: 'Historical', A: zone.aiExplanation.historicalActivity, fullMark: 100 },
  ];
  const barData = [
    { name: 'Rain', value: zone.rainfall, fill: '#4C86C6' },
    { name: 'Moisture', value: zone.soilMoisture, fill: '#1A73C7' },
    { name: 'Tilt', value: zone.tilt * 10, fill: '#E8A33D' },
  ];

  return (
    <div className="panel" style={{ marginBottom: 10 }}>
      <div className="panel-header" style={{ background: color + '10', borderBottom: `2px solid ${color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color }}>{zone.id}</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{zone.name}</span>
          <span className={`sev-badge badge-${zone.riskLevel}`}>● {zone.riskLevel}</span>
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span>Score: <b style={{ color }}>{zone.riskScore}/100</b></span>
          <span>Confidence: <b>{zone.confidence}%</b></span>
          <span>District: {zone.district}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 180px', gap: 0 }}>
        {/* AI Factors */}
        <div style={{ padding: '12px 14px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
            AI Factor Contributions (XAI)
          </div>
          <XAIBar label="Soil Moisture Saturation" value={zone.aiExplanation.soilMoisture} />
          <XAIBar label="Rainfall Intensity" value={zone.aiExplanation.rainfall} />
          <XAIBar label="Ground Displacement (Tilt)" value={zone.aiExplanation.groundTilt} />
          <XAIBar label="Terrain Susceptibility Index" value={zone.aiExplanation.terrainSusceptibility} />
          <XAIBar label="Historical Landslide Activity" value={zone.aiExplanation.historicalActivity} />
          <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--surface-2)', borderRadius: 3, fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
            <b style={{ fontStyle: 'normal', color: 'var(--text-primary)' }}>AI Assessment:</b> {zone.assessment}
          </div>
        </div>

        {/* Radar Chart */}
        <div style={{ padding: '12px 10px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Risk Radar</div>
          <ResponsiveContainer width="100%" height={140}>
            <RadarChart data={radarData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} />
              <Radar dataKey="A" stroke={color} fill={color} fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Summary */}
        <div style={{ padding: '12px 10px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Impact Summary</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
            <div style={{ fontWeight: 600, marginBottom: 3 }}>Roads at Risk ({zone.affectedRoads.length})</div>
            {zone.affectedRoads.map((r, i) => <div key={i} style={{ color: 'var(--high)', marginBottom: 2 }}>▸ {r}</div>)}
            {zone.affectedRoads.length === 0 && <div style={{ color: 'var(--text-muted)' }}>None</div>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
            <div style={{ fontWeight: 600, marginBottom: 3 }}>Villages ({zone.affectedVillages.length})</div>
            {zone.affectedVillages.map((v, i) => <div key={i} style={{ marginBottom: 2 }}>▸ {v}</div>)}
            {zone.affectedVillages.length === 0 && <div style={{ color: 'var(--text-muted)' }}>None</div>}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            <div style={{ fontWeight: 600, marginBottom: 3 }}>Infrastructure</div>
            {zone.affectedInfrastructure.map((inf, i) => <div key={i} style={{ color: 'var(--critical)', marginBottom: 2 }}>▸ {inf}</div>)}
            {zone.affectedInfrastructure.length === 0 && <div style={{ color: 'var(--text-muted)' }}>None</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAnalysisPage({ district }) {
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [expanded, setExpanded] = useState([]);

  const filtered = [...riskZones]
    .filter(z => {
      const d = district === 'all' || z.district === district;
      const r = riskFilter === 'ALL' || z.riskLevel === riskFilter;
      return d && r;
    })
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Brain size={18} color="var(--blue)" /> AI Risk Analysis
          </h1>
          <p>Explainable AI (XAI) factor breakdown per risk zone</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['ALL','CRITICAL','HIGH','MODERATE','LOW'].map(lvl => (
            <button key={lvl} className={`btn btn-sm${riskFilter===lvl ? ' btn-primary' : ''}`} onClick={() => setRiskFilter(lvl)}>
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Strip */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { label: 'Total Zones', value: filtered.length, color: 'var(--blue)' },
          { label: 'Critical', value: filtered.filter(z => z.riskLevel === 'CRITICAL').length, color: 'var(--critical)' },
          { label: 'High', value: filtered.filter(z => z.riskLevel === 'HIGH').length, color: 'var(--high)' },
          { label: 'Avg Score', value: filtered.length ? Math.round(filtered.reduce((s,z) => s + z.riskScore, 0) / filtered.length) : '--', color: 'var(--text-primary)' },
          { label: 'Avg Confidence', value: filtered.length ? Math.round(filtered.reduce((s,z) => s + z.confidence, 0) / filtered.length) + '%' : '--', color: 'var(--text-secondary)' },
        ].map((item, i) => (
          <div key={i} className="panel" style={{ flex: 1, padding: '8px 12px' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: item.color, lineHeight: 1.2 }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Zone Analyses */}
      {filtered.map(zone => <ZoneAnalysis key={zone.id} zone={zone} />)}

      {filtered.length === 0 && (
        <div className="empty-state"><Layers size={24} /><span>No zones found for selected filter</span></div>
      )}
    </div>
  );
}
