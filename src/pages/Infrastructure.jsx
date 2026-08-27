// Infrastructure Page - Monitor road segments and critical assets
import React, { useState } from 'react';
import { Landmark, Milestone, ShieldAlert, Truck, AlertTriangle } from 'lucide-react';

export default function Infrastructure() {
  const [infraList, setInfraList] = useState([
    { id: 1, asset: 'NH Corridor (Mawsynram Road)', type: 'Road segment', risk: 'HIGH', status: 'At Risk', priority: 'P1', agency: 'BRO', length: '4.2 km' },
    { id: 2, asset: 'Umtyngar Bridge B-04', type: 'Bridge link', risk: 'CRITICAL', status: 'Monitoring', priority: 'P1', agency: 'PWD', length: '120m' },
    { id: 3, asset: 'Cherrapunji Bypass Route', type: 'Road segment', risk: 'HIGH', status: 'At Risk', priority: 'P2', agency: 'BRO', length: '2.8 km' },
    { id: 4, asset: 'Shillong-Jowai Highway Segment 6', type: 'Road segment', risk: 'MODERATE', status: 'Blocked', priority: 'P1', agency: 'PWD', length: '800m' },
    { id: 5, asset: 'Power Substation Nongstoin', type: 'Substation', risk: 'MODERATE', status: 'Stable', priority: 'P3', agency: 'MeECL', length: 'Grid node' },
    { id: 6, asset: 'Laitryngew Water Intake Plant', type: 'Water Facility', risk: 'LOW', status: 'Stable', priority: 'P3', agency: 'PHED', length: 'Supply node' }
  ]);

  const [notifiedId, setNotifiedId] = useState(null);

  const handleNotifyResponders = (id) => {
    setNotifiedId(id);
    setTimeout(() => setNotifiedId(null), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">
          <h3>Roads & Critical Infrastructure</h3>
          <p>Bridges, highways, power substations, and water systems exposed to landslide zones</p>
        </div>
        <div className="page-meta">
          <div>Blocked Routes: <strong>01</strong></div>
          <div>High/Critical Exposure: <strong>03</strong></div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Summary counts */}
        <div className="kpi-grid">
          <div className="kpi-card" style={{ borderLeft: '3px solid var(--risk-critical)' }}>
            <div className="kpi-title">Critical Bridges</div>
            <div className="kpi-value" style={{ color: 'var(--risk-critical)' }}>01</div>
            <div className="kpi-footer">Umtyngar Bridge B-04</div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '3px solid var(--risk-high)' }}>
            <div className="kpi-title">Roads At Risk</div>
            <div className="kpi-value" style={{ color: 'var(--risk-high)' }}>03</div>
            <div className="kpi-footer">NH Corridor, Sohra Bypass</div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '3px solid var(--risk-moderate)' }}>
            <div className="kpi-title">Active Blockages</div>
            <div className="kpi-value" style={{ color: 'var(--risk-moderate)' }}>01</div>
            <div className="kpi-footer">Shillong-Jowai Highway</div>
          </div>
          <div className="kpi-card" style={{ borderLeft: '3px solid var(--risk-low)' }}>
            <div className="kpi-title">Utility Lifelines</div>
            <div className="kpi-value">02</div>
            <div className="kpi-footer">Power Substations, Water Intakes</div>
          </div>
        </div>

        {/* Detailed asset list */}
        <div className="panel">
          <div className="panel-header">
            <h4>Regional Infrastructure Risk Index</h4>
          </div>
          <div className="panel-body" style={{ padding: '0' }}>
            <table className="dense-table">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Infrastructure Type</th>
                  <th>Risk Tier</th>
                  <th>Current Condition</th>
                  <th>Disaster Priority</th>
                  <th>Custodian Agency</th>
                  <th style={{ textAlign: 'center' }}>Emergency Action</th>
                </tr>
              </thead>
              <tbody>
                {infraList.map(inf => {
                  const isCrit = inf.risk === 'CRITICAL';
                  const isHigh = inf.risk === 'HIGH';
                  const isMod = inf.risk === 'MODERATE';
                  const isBlocked = inf.status === 'Blocked';

                  return (
                    <tr key={inf.id}>
                      <td style={{ fontWeight: 'bold' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Landmark size={13} style={{ color: 'var(--primary-color)' }} />
                          {inf.asset}
                        </span>
                      </td>
                      <td>{inf.type} ({inf.length})</td>
                      <td>
                        <span className={`badge ${
                          isCrit ? 'badge-critical' : isHigh ? 'badge-high' : isMod ? 'badge-moderate' : 'badge-low'
                        }`}>{inf.risk}</span>
                      </td>
                      <td style={{ fontWeight: 'bold', color: isCrit || isBlocked ? 'var(--risk-critical)' : isHigh ? 'var(--risk-high)' : 'var(--text-color)' }}>
                        {inf.status}
                      </td>
                      <td style={{ fontWeight: 'bold' }}>{inf.priority}</td>
                      <td style={{ fontWeight: '500' }}>{inf.agency}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className={`btn btn-small ${isCrit || isBlocked ? 'btn-danger' : ''}`}
                          onClick={() => handleNotifyResponders(inf.id)}
                        >
                          <Truck size={10} /> 
                          {notifiedId === inf.id ? ' Dispatched! ' : ` Alert ${inf.agency} `}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Retaining wall & Geological protection section */}
        <div className="panel">
          <div className="panel-header">
            <h4>Geotechnical Remediation Status</h4>
          </div>
          <div className="panel-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: 'var(--border-radius)' }}>
              <strong style={{ fontSize: '13px', color: 'var(--primary-color)' }}>Zone NER-023 Structural Reinforcements</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-secondary)' }}>
                Soil nailing project: <strong>Completed (May 2026)</strong><br/>
                Retaining breast wall: <strong>Micro-fissures detected by Node NER-001 inclinometers</strong>.<br/>
                Action recommendation: Structural engineers requested to audit concrete degradation.
              </p>
            </div>
            <div style={{ border: '1px solid var(--border-color)', padding: '10px', borderRadius: 'var(--border-radius)' }}>
              <strong style={{ fontSize: '13px', color: 'var(--primary-color)' }}>Zone NER-011 Heavy Slit Catchment Drain</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-secondary)' }}>
                Drainage clearance: <strong>Delayed due to debris blockage</strong><br/>
                Current drainage rate: <strong>Critical - overflow causing slope soil erosion</strong>.<br/>
                Action recommendation: BRO requested to deploy excavators for channel clearing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
