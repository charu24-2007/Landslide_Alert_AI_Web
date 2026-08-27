// KPISection — 5-column stat cards at the top of Dashboard
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Radio, CloudRain, Layers, TrendingUp } from 'lucide-react';

export default function KPISection({ data }) {
  const navigate = useNavigate();
  const d = data || {};

  const kpis = [
    {
      label: 'Overall Risk Level',
      value: d.overallRisk?.level || '--',
      sub: `Score: ${d.overallRisk?.score || '--'}/100 · ${d.overallRisk?.trend || '--'}`,
      icon: TrendingUp,
      color: d.overallRisk?.level === 'CRITICAL' ? 'var(--critical)' : d.overallRisk?.level === 'HIGH' ? 'var(--high)' : 'var(--blue)',
      path: '/ai'
    },
    {
      label: 'Active Alerts',
      value: d.alertsSummary?.total || '0',
      sub: `Crit ${d.alertsSummary?.critical || 0} · High ${d.alertsSummary?.high || 0}`,
      icon: AlertTriangle,
      color: d.alertsSummary?.critical > 0 ? 'var(--critical)' : d.alertsSummary?.high > 0 ? 'var(--high)' : 'var(--low)',
      path: '/alerts'
    },
    {
      label: 'Risk Zones',
      value: d.zonesSummary?.total || '--',
      sub: `Crit ${d.zonesSummary?.critical || 0} · High ${d.zonesSummary?.high || 0} · Mod ${d.zonesSummary?.moderate || 0}`,
      icon: Layers,
      color: 'var(--blue)',
      path: '/map'
    },
    {
      label: 'Sensor Network',
      value: `${d.sensorNetwork?.online || '--'}/${d.sensorNetwork?.total || '--'}`,
      sub: `${d.sensorNetwork?.offline || 0} offline · ${d.sensorNetwork?.warning || 0} warn`,
      icon: Radio,
      color: d.sensorNetwork?.offline > 0 ? 'var(--high)' : 'var(--low)',
      path: '/sensors'
    },
    {
      label: '24h Rainfall (Max)',
      value: `${d.rainfall || '145'} mm`,
      sub: `Threshold: 100mm · Status: Exceeded`,
      icon: CloudRain,
      color: 'var(--critical)',
      path: '/weather'
    },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div key={i} className="kpi-card" onClick={() => navigate(kpi.path)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div className="kpi-label">{kpi.label}</div>
              <Icon size={14} color={kpi.color} />
            </div>
            <div className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="kpi-sub" style={{ color: 'var(--text-secondary)' }}>{kpi.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
