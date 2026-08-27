// WeatherSensors.jsx — Combined Weather, Satellite & 42 IoT Sensor Network Monitoring with Full i18n
import React, { useState } from 'react';
import { CloudRain, Radio, Thermometer, Droplets, Wind, Search, AlertTriangle, CheckCircle, RefreshCw, Satellite, Cpu, Wifi } from 'lucide-react';
import { weather } from '../data/weather';
import { sensors } from '../data/sensors';
import { useLanguage } from '../context/LanguageContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeatherSensors() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSensors = sensors.filter(s => {
    const matchStatus = statusFilter === 'ALL' || s.status === statusFilter;
    const matchQuery = !searchQuery ||
      s.nodeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const sensorStats = {
    total: sensors.length,
    online: sensors.filter(s => s.status !== 'OFFLINE').length,
    offline: sensors.filter(s => s.status === 'OFFLINE').length,
    critical: sensors.filter(s => s.status === 'CRITICAL').length,
    warning: sensors.filter(s => s.status === 'WARNING').length
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('weatherSensorsTitle')}</h1>
          <p>IMD Doppler Radar integration, INSAT-3D observations, and 42 Edge IoT Telemetry Stations</p>
        </div>
      </div>

      {/* Weather & Satellite Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">24h {t('rainfall')}</span>
            <CloudRain size={16} color="var(--risk-critical)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-critical)' }}>
            {weather.current.rainfall24h} mm
          </div>
          <div className="kpi-footer-sub">
            Threshold: 100 mm • <b>{t('warning')}</b>
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">1h Rate / 72h Total</span>
            <CloudRain size={16} color="var(--risk-high)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--risk-high)' }}>
            {weather.current.rainfall1h} mm/h
          </div>
          <div className="kpi-footer-sub">
            72h Cumulative: <b>{weather.current.rainfall72h} mm</b>
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">{t('humidity')} &amp; {t('temperature')}</span>
            <Droplets size={16} color="var(--primary)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--primary)' }}>
            {weather.current.humidity}%
          </div>
          <div className="kpi-footer-sub">
            {t('temperature')}: <b>{weather.current.temperature}°C</b> • {t('windSpeed')}: {weather.current.wind}
          </div>
        </div>

        <div className="clean-card">
          <div className="kpi-top-meta">
            <span className="kpi-meta-label">Satellite Ingest</span>
            <Satellite size={16} color="var(--brand-navy)" />
          </div>
          <div className="kpi-metric-number" style={{ color: 'var(--brand-navy)', fontSize: 24, marginTop: 4 }}>
            GSAT-17
          </div>
          <div className="kpi-footer-sub">
            Cloud Cover: <b>94% Convective</b> • Synced
          </div>
        </div>
      </div>

      {/* Hourly Rainfall Chart + 5-Day Outlook */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Hourly Precipitation Chart */}
        <div className="clean-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <h3>24-Hour Precipitation &amp; Soil Loading Trend</h3>
              <p>Doppler radar rainfall rate vs. cumulative slope water infiltration</p>
            </div>
            <span className="kpi-meta-label">Source: IMD AWS</span>
          </div>

          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weather.hourlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip />
                <Area type="monotone" dataKey="cumulative" name="Cumulative Rain (mm)" stroke="var(--primary)" fill="var(--primary-light)" strokeWidth={2} />
                <Area type="monotone" dataKey="rain" name="Hourly Rate (mm/h)" stroke="var(--risk-critical)" fill="rgba(214,40,40,0.12)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5-Day Outlook Table */}
        <div className="clean-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <h3>5-Day Precipitation Forecast</h3>
              <p>IMD medium-range synoptic prediction</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {weather.forecast5Day.map((f, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', borderRadius: 'var(--radius-md)',
                  background: 'var(--bg)', border: '1px solid var(--border)'
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{f.day}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.condition} • {f.temp}°C</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`status-badge badge-${f.alertLevel.toLowerCase()}`}>
                    {t(f.alertLevel.toLowerCase()) || f.alertLevel}
                  </span>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
                    {f.rain} mm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 42 IoT Sensor Network Telemetry Section */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Radio size={18} color="var(--primary)" />
              <h3>42-Node IoT Telemetry Network (LoRa / Satellite Uplink)</h3>
            </div>
            <p>ESP32 DevKit, Soil Moisture V2.0, BME280 &amp; MPU6050 Ground Tilt Measurements</p>
          </div>

          {/* Search and Filters */}
          <div className="page-actions-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 'var(--radius-md)' }}>
              <Search size={13} color="var(--text-muted)" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', fontSize: 13, outline: 'none', width: 180 }}
              />
            </div>

            {['ALL', 'CRITICAL', 'WARNING', 'NORMAL', 'OFFLINE'].map((status) => (
              <button
                key={status}
                className={`btn-xs ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatusFilter(status)}
              >
                {status === 'ALL' ? t('all') : t(status.toLowerCase()) || status} {status !== 'ALL' && `(${sensors.filter(s => s.status === status).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Table */}
        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Node ID</th>
                <th>{t('location')} / {t('district')}</th>
                <th>{t('status')}</th>
                <th>{t('soilMoisture')}</th>
                <th>{t('tiltAngle')} (°)</th>
                <th>{t('temperature')} / {t('humidity')}</th>
                <th>Pressure</th>
                <th>Battery</th>
                <th>LoRa Signal</th>
                <th>{t('lastSync')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredSensors.map((s) => {
                const badgeClass = s.status.toLowerCase();
                return (
                  <tr key={s.nodeId}>
                    <td className="code-cell">{s.nodeId}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{s.location}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Lat: {s.latitude.toFixed(3)}, Lng: {s.longitude.toFixed(3)}</div>
                    </td>
                    <td>
                      <span className={`status-badge badge-${badgeClass}`}>
                        ● {t(badgeClass) || s.status}
                      </span>
                    </td>
                    <td>
                      {s.soilMoisture !== null ? (
                        <b style={{ color: s.soilMoisture > 80 ? 'var(--risk-critical)' : 'inherit' }}>
                          {s.soilMoisture}%
                        </b>
                      ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {s.tilt !== null ? (
                        <b style={{ color: s.tilt > 4.5 ? 'var(--risk-critical)' : s.tilt > 2.5 ? 'var(--risk-high)' : 'inherit' }}>
                          {s.tilt}°
                        </b>
                      ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {s.temperature !== null ? `${s.temperature}°C • ${s.humidity}%` : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {s.pressure !== null ? `${s.pressure} hPa` : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td>
                      {s.battery !== null ? (
                        <span style={{ color: s.battery < 20 ? 'var(--risk-critical)' : 'inherit', fontWeight: 600 }}>
                          {s.battery}%
                        </span>
                      ) : '—'}
                    </td>
                    <td>
                      <span style={{ fontSize: 12, color: s.signal === 'Offline' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
                        {s.signal === 'Offline' ? t('offline') : s.signal}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {s.lastSeen} IST
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
