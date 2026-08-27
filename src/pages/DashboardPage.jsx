// Dashboard Page — Main command overview
import React from 'react';
import KPISection from '../components/KPISection';
import RiskSituation from '../components/RiskSituation';
import AlertsPanel from '../components/AlertsPanel';
import RiskTrendChart from '../components/RiskTrendChart';
import { dashboardData, weatherData } from '../data/mockData';
import { getAlerts } from '../data/alerts';
import { RefreshCw, CloudRain, Radio, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ district }) {
  const navigate = useNavigate();
  const alerts = getAlerts().filter(a => a.status === 'Active');
  const d = { ...dashboardData, rainfall: weatherData.current.rainfall24h };

  return (
    <div className="page-content">
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>Command Dashboard</h1>
          <p>Real-time AI risk overview · District: {district === 'all' ? 'All Districts' : district}</p>
        </div>
        <div className="page-meta">
          <div className="source-pill"><RefreshCw size={9} /> Auto-refresh: 30s</div>
          <div style={{ marginTop: 3 }}>26 Aug 2026 · 14:32 IST</div>
        </div>
      </div>

      {/* KPI Row */}
      <KPISection data={d} />

      {/* Critical banner if needed */}
      {alerts.some(a => a.severity === 'CRITICAL') && (
        <div className="alert-banner danger" style={{ cursor: 'pointer' }} onClick={() => navigate('/alerts')}>
          <span style={{ fontWeight: 700 }}>⚠ CRITICAL ALERT ACTIVE:</span>
          <span style={{ marginLeft: 6 }}>{alerts.find(a => a.severity === 'CRITICAL')?.message}</span>
          <span style={{ marginLeft: 'auto', fontSize: 11 }}>View Alerts →</span>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-col">
          <RiskSituation district={district} limit={4} />
          <RiskTrendChart data={dashboardData.riskTrend} />
        </div>

        {/* Right Column */}
        <div className="right-col" style={{ maxHeight: 620, minHeight: 0 }}>
          <AlertsPanel limit={10} />

          {/* Quick Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {/* Weather mini */}
            <div className="panel" style={{ cursor: 'pointer' }} onClick={() => navigate('/weather')}>
              <div className="panel-header">
                <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CloudRain size={12} /> Weather
                </span>
              </div>
              <div className="panel-body" style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--critical)' }}>
                  {weatherData.current.rainfall24h}mm
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>24h rainfall</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  Humidity: {weatherData.current.humidity}% · {weatherData.current.temperature}°C
                </div>
                <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: 'var(--high)' }}>
                  {weatherData.current.forecast}
                </div>
              </div>
            </div>

            {/* Sensor mini */}
            <div className="panel" style={{ cursor: 'pointer' }} onClick={() => navigate('/sensors')}>
              <div className="panel-header">
                <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Radio size={12} /> Sensors
                </span>
              </div>
              <div className="panel-body" style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--low)' }}>
                  {d.sensorNetwork.online}/{d.sensorNetwork.total}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Nodes online</div>
                <div style={{ fontSize: 11, color: d.sensorNetwork.offline > 0 ? 'var(--critical)' : 'var(--text-muted)', marginTop: 2 }}>
                  {d.sensorNetwork.offline} offline · {d.sensorNetwork.warning} warn
                </div>
                <div style={{ fontSize: 11, color: d.sensorNetwork.critical > 0 ? 'var(--critical)' : 'var(--text-muted)', marginTop: 2 }}>
                  {d.sensorNetwork.critical} critical sensors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
