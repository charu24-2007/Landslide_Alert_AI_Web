// RiskTrendChart — Recharts area chart of risk score + rainfall over 24h
import React from 'react';
import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 3, padding: '6px 10px', fontSize: 11 }}>
      <div style={{ fontWeight: 600, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <b>{p.value}{p.name === 'Risk Score' ? '' : 'mm'}</b>
        </div>
      ))}
    </div>
  );
};

export default function RiskTrendChart({ data = [] }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Risk Score & Rainfall Trend (24h)</span>
        <span className="demo-label">Live feed</span>
      </div>
      <div className="panel-body" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis yAxisId="risk" domain={[0, 100]} tick={{ fontSize: 10 }} />
            <YAxis yAxisId="rain" orientation="right" tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="rain" dataKey="rain" name="Rainfall" fill="#C5DDEF" opacity={0.8} />
            <Area yAxisId="risk" type="monotone" dataKey="risk" name="Risk Score"
              stroke="#D33F3F" fill="rgba(211,63,63,0.12)" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
