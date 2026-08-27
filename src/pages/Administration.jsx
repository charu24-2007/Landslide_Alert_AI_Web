// Administration.jsx — RBAC Role Management, AI Model Calibration & System Parameters
import React, { useState } from 'react';
import { Settings, UserCheck, Shield, Cpu, RefreshCw, Radio, CheckCircle, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Administration() {
  const { user, switchRole, ROLES } = useAuth();
  const { t } = useLanguage();
  const [rainThreshold, setRainThreshold] = useState(100);
  const [tiltThreshold, setTiltThreshold] = useState(4.0);
  const [weights, setWeights] = useState({
    rainfall: 35,
    soilMoisture: 30,
    groundTilt: 20,
    terrain: 15
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('adminTitle')}</h1>
          <p>{t('adminDesc')}</p>
        </div>
      </div>

      {/* 1. Live RBAC Role Switcher */}
      <div className="clean-card" style={{ borderLeft: '5px solid var(--brand-primary)' }}>
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserCheck size={18} color="var(--brand-primary)" />
              <h3>Role-Based Access Control (RBAC) Switcher</h3>
            </div>
            <p>Switch active session persona to evaluate custom UI permissions and role filters</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {Object.entries(ROLES).map(([key, role]) => {
            const isSelected = user?.role === key;
            return (
              <div
                key={key}
                onClick={() => switchRole(key)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--brand-light)' : 'var(--surface)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isSelected ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                    {role.name}
                  </span>
                  {isSelected && (
                    <span className="status-badge badge-normal" style={{ fontSize: 10 }}>Active</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  {key === 'citizen' ? 'Mobile / Alert Access' : role.subtitle}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  Access: <b>{role.permissions.length} modules</b>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. AI Model Thresholds & Factor Calibration */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={18} color="var(--brand-navy)" />
              <h3>Early Warning Trigger Thresholds & AI Weights</h3>
            </div>
            <p>Adjust sensitivity thresholds for automatic multi-tier alert broadcast recommendations</p>
          </div>
        </div>

        {saveSuccess && (
          <div style={{
            background: 'var(--risk-low-bg)', border: '1px solid var(--risk-low-border)',
            color: 'var(--risk-low)', padding: '10px 14px', borderRadius: 'var(--radius-md)',
            marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600
          }}>
            <CheckCircle size={16} /> Parameters successfully saved and synced with edge inference gateway!
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div className="form-group-clean">
              <label className="form-label-clean">Critical 24h Rainfall Trigger (mm)</label>
              <input
                type="number"
                className="form-input-clean"
                value={rainThreshold}
                onChange={(e) => setRainThreshold(Number(e.target.value))}
              />
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Default: 100mm (Triggers immediate high alert)</span>
            </div>

            <div className="form-group-clean">
              <label className="form-label-clean">Critical Ground Tilt Threshold (Degrees °)</label>
              <input
                type="number"
                step="0.1"
                className="form-input-clean"
                value={tiltThreshold}
                onChange={(e) => setTiltThreshold(Number(e.target.value))}
              />
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Default: 4.0° (Triggers accelerated slope creep alert)</span>
            </div>
          </div>

          <div style={{ marginTop: 16, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-navy)', marginBottom: 10 }}>
              Explainable AI (XAI) Factor Contribution Weights (%)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {Object.entries(weights).map(([key, val]) => (
                <div key={key} className="form-group-clean">
                  <label className="form-label-clean" style={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1')} Weight (%)
                  </label>
                  <input
                    type="number"
                    className="form-input-clean"
                    value={val}
                    onChange={(e) => setWeights({ ...weights, [key]: Number(e.target.value) })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <button type="submit" className="btn-primary">
              Save Configuration & Deploy
            </button>
          </div>
        </form>
      </div>

      {/* 3. System Ingest & Infrastructure Telemetry */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Database size={18} color="var(--brand-primary)" />
              <h3>Data Source Ingest & Server Status</h3>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, fontSize: 13 }}>
          <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6 }}>
            <b>LoRa Repeater Gateway:</b>
            <div style={{ color: 'var(--risk-low)', fontWeight: 600, marginTop: 2 }}>● Connected (East Khasi Repeater 3)</div>
          </div>
          <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6 }}>
            <b>IMD Weather Radar Pipeline:</b>
            <div style={{ color: 'var(--risk-low)', fontWeight: 600, marginTop: 2 }}>● Active (Cherrapunji Doppler Feed)</div>
          </div>
          <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6 }}>
            <b>ISRO GSAT-17 Satellite Stream:</b>
            <div style={{ color: 'var(--risk-low)', fontWeight: 600, marginTop: 2 }}>● Synced (14:15 IST Observation)</div>
          </div>
          <div style={{ background: 'var(--bg)', padding: '10px 12px', borderRadius: 6 }}>
            <b>AI Inference Engine:</b>
            <div style={{ color: 'var(--risk-low)', fontWeight: 600, marginTop: 2 }}>● Online (Version 2.4 Edge Ingest)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
