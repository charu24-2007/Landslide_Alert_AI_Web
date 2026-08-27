// Weather Page — IMD data integration and rainfall visualizations
import React from 'react';
import { CloudRain, Thermometer, Wind, Droplets, Gauge } from 'lucide-react';
import { weatherData } from '../data/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RISK_COLOR = { CRITICAL: 'var(--critical)', HIGH: 'var(--high)', MODERATE: 'var(--moderate)', LOW: 'var(--low)' };

export default function WeatherPage() {
  const { current, forecast5Day, hourlyTrend, satellite } = weatherData;

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700 }}>Weather Monitoring</h1>
          <p>IMD · ISRO Satellite Integration · Real-time precipitation data</p>
        </div>
        <div className="page-meta">
          <div>Source: {current.source}</div>
          <div>Updated: {current.lastUpdated}</div>
        </div>
      </div>

      {/* Current Conditions Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
        {[
          { label: '24h Rainfall', value: `${current.rainfall24h}mm`, sub: `Threshold: 100mm · EXCEEDED`, icon: CloudRain, color: 'var(--critical)' },
          { label: '1h Rainfall', value: `${current.rainfall1h}mm`, sub: `1h accumulation`, icon: CloudRain, color: 'var(--high)' },
          { label: '72h Cumulative', value: `${current.rainfall72h}mm`, sub: `3-day total`, icon: CloudRain, color: 'var(--high)' },
          { label: 'Humidity', value: `${current.humidity}%`, sub: `Very High`, icon: Droplets, color: 'var(--blue)' },
          { label: 'Temperature', value: `${current.temperature}°C`, sub: `${current.wind}`, icon: Thermometer, color: 'var(--blue-dim)' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="kpi-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div className="kpi-label">{item.label}</div>
                <Icon size={13} color={item.color} />
              </div>
              <div className="kpi-value" style={{ color: item.color }}>{item.value}</div>
              <div className="kpi-sub">{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Alert forecast */}
      <div className="alert-banner warning">
        <CloudRain size={14} />
        <span><b>IMD Forecast:</b> {current.forecast}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
        {/* Hourly Trend Chart */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Hourly Rainfall Trend</span>
            <span className="demo-label">24h window</span>
          </div>
          <div className="panel-body" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="cumulative" name="Cumulative (mm)" stroke="var(--blue)" fill="var(--blue-light)" strokeWidth={2} />
                <Area type="monotone" dataKey="rain" name="1h Rain (mm)" stroke="var(--critical)" fill="rgba(211,63,63,0.1)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satellite info */}
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Satellite Data</span></div>
          <div className="panel-body">
            {[['Satellite', satellite.satellite], ['Coverage', satellite.coverage], ['Last Obs.', satellite.lastObservation], ['Cloud Status', satellite.status]].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Table */}
      <div className="panel">
        <div className="panel-header"><span className="panel-title">5-Day Forecast</span></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Condition</th>
              <th>Expected Rainfall</th>
              <th>Temperature</th>
              <th>Risk Implication</th>
            </tr>
          </thead>
          <tbody>
            {forecast5Day.map((day, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{day.day}</td>
                <td>{day.condition}</td>
                <td><b style={{ color: day.rain > 100 ? 'var(--critical)' : 'var(--text-primary)' }}>{day.rain}mm</b></td>
                <td>{day.temp}°C</td>
                <td><span className={`sev-badge badge-${day.riskImplication}`}>● {day.riskImplication}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
