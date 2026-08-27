// RiskAnalysis Page - Explainable AI and machine learning model metrics
import React, { useState, useEffect } from 'react';
import { getRiskZones, getModelPerformance } from '../services/riskApi';
import { BrainCircuit, Cpu, ShieldAlert, BarChart3, Database } from 'lucide-react';

export default function RiskAnalysis() {
  const [zones, setZones] = useState([]);
  const [modelPerf, setModelPerf] = useState(null);
  const [activeZoneId, setActiveZoneId] = useState('NER-023');

  useEffect(() => {
    async function load() {
      const zData = await getRiskZones();
      const pData = await getModelPerformance();
      setZones(zData);
      setModelPerf(pData);
    }
    load();
  }, []);

  const activeZone = zones.find(z => z.id === activeZoneId) || zones[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h3>AI Risk Analysis & Explainability</h3>
          <p>Explainable AI feature weights, susceptibility thresholds and neural network metrics</p>
        </div>
        <div className="page-meta">
          <div>Model Version: <strong>NER-LSA-v2.4</strong></div>
          <div>Last Training Run: <strong>{modelPerf?.lastTraining || '20 Aug 2026'}</strong></div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column: Risk Zone List & Selection details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* List of Zones */}
          <div className="panel">
            <div className="panel-header">
              <h4>NER Risk Sector Index</h4>
            </div>
            <div className="panel-body" style={{ padding: '0' }}>
              <table className="dense-table">
                <thead>
                  <tr>
                    <th>Zone ID</th>
                    <th>Name</th>
                    <th>Risk Score</th>
                    <th>Confidence</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map(z => (
                    <tr 
                      key={z.id} 
                      onClick={() => setActiveZoneId(z.id)}
                      className={z.id === activeZoneId ? 'active' : ''}
                      style={{ cursor: 'pointer', backgroundColor: z.id === activeZoneId ? 'var(--light-blue)' : undefined }}
                    >
                      <td style={{ fontWeight: 'bold' }}>{z.id}</td>
                      <td>{z.name}</td>
                      <td style={{ fontWeight: 'bold' }}>{z.riskScore} / 100</td>
                      <td>{z.confidence}%</td>
                      <td>
                        <span className={`badge ${
                          z.level === 'CRITICAL' ? 'badge-critical' :
                          z.level === 'HIGH' ? 'badge-high' :
                          z.level === 'MODERATE' ? 'badge-moderate' : 'badge-low'
                        }`}>{z.level}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Explainability for the Selected Zone */}
          {activeZone && (
            <div className="panel">
              <div className="panel-header">
                <h4>Explainable AI (XAI) - {activeZone.id} ({activeZone.name})</h4>
              </div>
              <div className="panel-body">
                <div style={{ marginBottom: '12px', fontSize: '12px', lineHeight: '1.4' }}>
                  <strong>Model Assessment Summary:</strong> {activeZone.assessment}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Contribution bars */}
                  <div>
                    <div className="xai-bar-label">
                      <span>Accumulated Rainfall (IMD telemetry match)</span>
                      <strong>{activeZone.whyExplain.rainfall}% weight</strong>
                    </div>
                    <div className="xai-bar-bg">
                      <div className="xai-bar-fill" style={{ width: `${activeZone.whyExplain.rainfall}%`, backgroundColor: 'var(--risk-critical)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="xai-bar-label">
                      <span>Soil Moisture Profile (Saturation levels)</span>
                      <strong>{activeZone.whyExplain.soilMoisture}% weight</strong>
                    </div>
                    <div className="xai-bar-bg">
                      <div className="xai-bar-fill" style={{ width: `${activeZone.whyExplain.soilMoisture}%`, backgroundColor: 'var(--risk-high)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="xai-bar-label">
                      <span>Slope Tilt Displacement (Ground tilt tilt)</span>
                      <strong>{activeZone.whyExplain.groundTilt}% weight</strong>
                    </div>
                    <div className="xai-bar-bg">
                      <div className="xai-bar-fill" style={{ width: `${activeZone.whyExplain.groundTilt}%`, backgroundColor: 'var(--secondary-color)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="xai-bar-label">
                      <span>Geotechnical Slope Susceptibility Index</span>
                      <strong>{activeZone.whyExplain.terrainSusceptibility}% weight</strong>
                    </div>
                    <div className="xai-bar-bg">
                      <div className="xai-bar-fill" style={{ width: `${activeZone.whyExplain.terrainSusceptibility}%`, backgroundColor: 'var(--text-secondary)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="xai-bar-label">
                      <span>Historical Landslide Incidents Frequency</span>
                      <strong>{activeZone.whyExplain.historicalActivity}% weight</strong>
                    </div>
                    <div className="xai-bar-bg">
                      <div className="xai-bar-fill" style={{ width: `${activeZone.whyExplain.historicalActivity}%` }}></div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', padding: '8px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <strong>XAI Feature Weights Explanation:</strong> The model computes risk probabilities via an ensemble neural network trained on historic geological slide databases in Meghalaya/NER. Localized rain and tilt displacement are dynamically prioritized in real-time.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Model Performance stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="panel">
            <div className="panel-header">
              <h4>Model Validation Metrics</h4>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ padding: '6px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Accuracy</div>
                  <strong style={{ fontSize: '16px', color: 'var(--risk-low)' }}>{modelPerf?.accuracy || '89.4%'}</strong>
                </div>
                <div style={{ padding: '6px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>F1-Score</div>
                  <strong style={{ fontSize: '16px', color: 'var(--primary-color)' }}>{modelPerf?.f1Score || '89.1%'}</strong>
                </div>
                <div style={{ padding: '6px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Precision</div>
                  <strong style={{ fontSize: '16px', color: 'var(--secondary-color)' }}>{modelPerf?.precision || '87.1%'}</strong>
                </div>
                <div style={{ padding: '6px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Recall</div>
                  <strong style={{ fontSize: '16px', color: 'var(--risk-high)' }}>{modelPerf?.recall || '91.2%'}</strong>
                </div>
              </div>

              <div style={{ marginTop: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Training Parameters
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                  <span>Epochs trained:</span>
                  <strong>{modelPerf?.epochs || 150}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
                  <span>Cross-entropy Loss:</span>
                  <strong>{modelPerf?.loss || 0.12}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h4>Dataset Size & Feeds</h4>
            </div>
            <div className="panel-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '3px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Database size={12} /> IoT Sensor Telemetries</span>
                  <strong>{modelPerf?.dataSourceCounts?.sensors?.toLocaleString() || '284,300'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '3px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BarChart3 size={12} /> IMD Weather Feeds</span>
                  <strong>{modelPerf?.dataSourceCounts?.weather?.toLocaleString() || '12,400'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '3px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cpu size={12} /> Satellite Radar Imagery</span>
                  <strong>{modelPerf?.dataSourceCounts?.satellite?.toLocaleString() || '450'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldAlert size={12} /> Historical Landslides</span>
                  <strong>{modelPerf?.dataSourceCounts?.historical?.toLocaleString() || '124'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
