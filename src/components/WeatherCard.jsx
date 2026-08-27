// WeatherCard Component - Displays IMD weather status and rainfall forecast SVG graphs
import React from 'react';
import { CloudRain, Thermometer, Wind, Compass } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather || !weather.current) return null;

  const cur = weather.current;
  const hourly = weather.hourlyRain || [];

  // SVG Chart Dimensions
  const width = 300;
  const height = 80;
  const padding = 15;

  // Calculate coordinates for SVG path
  const maxRain = Math.max(...hourly.map(d => d.amount), 20);
  const points = hourly.map((d, index) => {
    const x = padding + (index * (width - 2 * padding)) / (hourly.length - 1);
    const y = height - padding - (d.amount * (height - 2 * padding)) / maxRain;
    return { x, y, ...d };
  });

  const pathD = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : '';

  return (
    <div className="panel" style={{ height: '340px', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <h4>METEOROLOGICAL SUMMARY</h4>
        <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
          Source: {cur.source || 'IMD Data'}
        </span>
      </div>

      <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        {/* Core parameters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div style={{ backgroundColor: 'var(--bg-color)', padding: '6px', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CloudRain size={16} style={{ color: 'var(--secondary-color)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Precip (24h)</div>
              <strong style={{ fontSize: '13px' }}>{cur.rainfall24h}</strong>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '6px', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Thermometer size={16} style={{ color: 'var(--risk-high)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Temp / Humidity</div>
              <strong style={{ fontSize: '13px' }}>{cur.temperature} / {cur.humidity}</strong>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '6px', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wind size={16} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Wind Speed</div>
              <strong style={{ fontSize: '13px' }}>{cur.wind || '12 km/h'}</strong>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-color)', padding: '6px', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={16} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Atm. Pressure</div>
              <strong style={{ fontSize: '13px' }}>{cur.pressure}</strong>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div style={{ borderLeft: '3px solid var(--secondary-color)', backgroundColor: 'var(--light-blue)', padding: '6px 8px', borderRadius: 'var(--border-radius)', fontSize: '12px' }}>
          <strong>Forecast:</strong> {cur.forecast}
        </div>

        {/* SVG Hourly Precipitation Chart */}
        <div style={{ marginTop: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            Precipitation Trend (Last 5 Hours)
          </div>
          <div className="chart-container" style={{ height: '100px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', padding: '4px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#E2E8F0" strokeWidth="0.5" />
              <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="#E2E8F0" strokeWidth="0.5" />
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#CBD5E1" strokeWidth="1" />

              {/* Area Under Curve */}
              {areaD && <path d={areaD} fill="rgba(30, 90, 145, 0.15)" />}
              {/* Path Line */}
              {pathD && <path d={pathD} fill="none" stroke="var(--secondary-color)" strokeWidth="2" />}

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="3.5" fill="var(--primary-color)" />
                  <text x={p.x} y={p.y - 6} fontSize="8" textAnchor="middle" fontWeight="bold" fill="var(--text-color)">
                    {p.amount}mm
                  </text>
                  <text x={p.x} y={height - 3} fontSize="8" textAnchor="middle" fill="var(--text-secondary)">
                    {p.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
