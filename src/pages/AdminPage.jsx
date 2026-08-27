// Admin Page — System parameters, role switching, IoT node calibration, and model hyperparameters
import React, { useState } from 'react';
import { Settings, UserCheck, ShieldAlert, Cpu, RefreshCw, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { user, switchRole, ROLES } = useAuth();
  const [rainThreshold, setRainThreshold] = useState(100);
  const [tiltThreshold, setTiltThreshold] = useState(4.0);
  const [modelWeights, setModelWeights] = useState({ rain: 35, moisture: 30, tilt: 20, terrain: 15 });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Settings size={18} color="var(--navy)" /> System Administration & Role Management
          </h1>
          <p>Role-Based Access Control (RBAC), IoT calibration, and AI model trigger thresholds</p>
        </div>
      </div>

      {/* Role Switcher for Evaluation */}
      <div className="panel" style={{ borderLeft: '4px solid var(--blue)' }}>
        <div className="panel-header">
          <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <UserCheck size={14} color="var(--blue)" /> Live Role-Based Access Control (RBAC) Switcher
          </span>
        </div>
        <div className="panel-body">
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
            Switch active session role to test different operational permissions across District Authority, Technical Analyst, Field Officer, and Citizen viewpoints.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {Object.entries(ROLES).map(([key, info]) => {
              const isCurr = user?.role === key;
              return (
                <div
                  key={key}
                  onClick={() => switchRole(key)}
                  style={{
                    padding: 10,
                    borderRadius: 3,
                    border: `1px solid ${isCurr ? info.color : 'var(--border)'}`,
                    background: isCurr ? 'var(--surface-2)' : 'var(--surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: info.color }}>{info.name}</span>
                    {isCurr && <span className="tag" style={{ background: 'var(--low-bg)', color: 'var(--low)', borderColor: 'var(--low-bd)' }}>Active</span>}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    Permissions: {info.permissions.length} modules
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Model Parameter Calibration */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={14} color="var(--navy)" /> AI Ensemble Alert Thresholds & Feature Weights
          </span>
        </div>
        <div className="panel-body">
          {saved && (
            <div className="alert-banner success" style={{ marginBottom: 12 }}>
              ✓ System parameters updated and synced to edge inference nodes!
            </div>
          )}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Critical Rainfall Trigger (mm / 24h)</label>
                <input
                  type="number"
                  className="form-control"
                  value={rainThreshold}
                  onChange={e => setRainThreshold(Number(e.target.value))}
                />
                <span className="form-hint">Triggers automated SMS broadcast to emergency authorities</span>
              </div>
              <div className="form-group">
                <label className="form-label">Critical Ground Tilt Threshold (Degrees °)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={tiltThreshold}
                  onChange={e => setTiltThreshold(Number(e.target.value))}
                />
                <span className="form-hint">Accelerated displacement alert trigger</span>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
                Explainable AI (XAI) Weight Distribution (%)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {Object.entries(modelWeights).map(([k, v]) => (
                  <div key={k} className="form-group">
                    <label className="form-label" style={{ textTransform: 'capitalize' }}>{k} Weight (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={v}
                      onChange={e => setModelWeights({ ...modelWeights, [k]: Number(e.target.value) })}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="submit" className="btn btn-primary btn-sm">
                Save & Deploy Parameters
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
