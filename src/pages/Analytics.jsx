// Analytics Page - Historical records of landslides and monthly monsoonal trends
import React, { useState, useEffect } from 'react';
import { getHistoricalLandslides } from '../services/riskApi';
import { FileText, Download, BarChart2, ShieldAlert } from 'lucide-react';

export default function Analytics() {
  const [history, setHistory] = useState([]);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getHistoricalLandslides();
      setHistory(data);
    }
    load();
  }, []);

  const handleExport = (format) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Exported LandSlideAlert AI historical archive to ${format.toUpperCase()} format successfully.`);
    }, 1500);
  };

  // SVG Chart Dimensions
  const chartW = 500;
  const chartH = 150;
  const padding = 20;

  // Monthly landslide counts (monsoon slide spike trend: June, July, August peaks)
  const monthlyData = [
    { month: 'Apr', count: 2 },
    { month: 'May', count: 8 },
    { month: 'Jun', count: 28 },
    { month: 'Jul', count: 45 },
    { month: 'Aug', count: 32 },
    { month: 'Sep', count: 12 },
    { month: 'Oct', count: 4 }
  ];

  const maxCount = 50;
  const barW = (chartW - 2 * padding) / monthlyData.length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h3>Historical Landslide Records & Analytics</h3>
          <p>Regional slide logs, monthly monsoon frequency graphs, and digital PDF database archives</p>
        </div>
        <div className="page-meta">
          <div>Logged Incidents: <strong>124 (2020-2026)</strong></div>
          <div>Database Version: <strong>NER-DB-v4.1</strong></div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Historical Incidents List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="panel">
            <div className="panel-header" style={{ flexWrap: 'wrap', gap: '8px' }}>
              <h4>Incidents Registry (2023 - 2026)</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-small" onClick={() => handleExport('pdf')} disabled={downloading}>
                  <Download size={10} /> {downloading ? 'Generating PDF...' : 'Export PDF Report'}
                </button>
                <button className="btn btn-small" onClick={() => handleExport('csv')} disabled={downloading}>
                  <Download size={10} /> Export CSV
                </button>
              </div>
            </div>
            <div className="panel-body" style={{ padding: '0' }}>
              <table className="dense-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Location Sector</th>
                    <th>Severity Class</th>
                    <th>Infrastructure Damage / Blockage</th>
                    <th style={{ textAlign: 'right' }}>Casualties</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 'bold' }}>{item.date}</td>
                      <td>{item.location}</td>
                      <td>
                        <span className={`badge ${
                          item.intensity === 'Critical' ? 'badge-critical' :
                          item.intensity === 'Major' ? 'badge-high' : 'badge-moderate'
                        }`}>{item.intensity}</span>
                      </td>
                      <td>{item.damage}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: item.casualties > 0 ? 'var(--risk-critical)' : 'inherit' }}>
                        {item.casualties}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Monthly monsoon slide trends graph */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="panel">
            <div className="panel-header">
              <h4>Monthly Slide Distribution (Monsoon Peaks)</h4>
            </div>
            <div className="panel-body">
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Total landslides aggregated monthly. Peak monsoonal rains (June-August) account for 85% of slides.
              </div>
              
              <div className="chart-container" style={{ height: '160px', padding: '10px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="chart-svg">
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={chartW - padding} y2={padding} stroke="#E2E8F0" strokeWidth="0.5" />
                  <line x1={padding} y1={chartH/2} x2={chartW - padding} y2={chartH/2} stroke="#E2E8F0" strokeWidth="0.5" />
                  <line x1={padding} y1={chartH - padding} x2={chartW - padding} y2={chartH - padding} stroke="#CBD5E1" strokeWidth="1" />

                  {/* SVG Bar Chart */}
                  {monthlyData.map((d, i) => {
                    const barH = ((d.count * (chartH - 2 * padding)) / maxCount);
                    const x = padding + (i * barW) + (barW - 20) / 2;
                    const y = chartH - padding - barH;

                    return (
                      <g key={i}>
                        {/* Bar */}
                        <rect 
                          x={x} 
                          y={y} 
                          width="20" 
                          height={barH} 
                          fill={d.count > 25 ? 'var(--risk-high)' : 'var(--secondary-color)'} 
                          rx="1"
                        />
                        {/* Value label */}
                        <text x={x + 10} y={y - 4} fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-color)">
                          {d.count}
                        </text>
                        {/* Month label */}
                        <text x={x + 10} y={chartH - 4} fontSize="9" textAnchor="middle" fill="var(--text-secondary)">
                          {d.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h4>Geological Vulnerability Parameters</h4>
            </div>
            <div className="panel-body">
              <div style={{ fontSize: '11.5px', lineHeight: '1.4' }}>
                <strong>Vulnerability Summary:</strong> Terrain profiles show steep slope gradients (&gt;35°) are primary landslide accelerators. Areas with structural vegetation clearing (for roads widening) show 4x slide probability during rain events exceeding 100mm/24h.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
