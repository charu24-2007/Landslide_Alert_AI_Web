// Alerts.jsx — Multi-Tier Early Warning, Decision Approval & Channel Dispatch
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bell, Plus, Check, ShieldAlert, Send, Radio, PhoneCall, Smartphone, CheckCircle, Clock } from 'lucide-react';
import { getAlerts, acknowledgeAlert, createAlert } from '../data/alerts';
import { riskZones } from '../data/riskZones';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Alerts() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedZoneId = searchParams.get('zone');

  const [alerts, setAlerts] = useState([]);
  const [showModal, setShowModal] = useState(Boolean(preselectedZoneId));
  const [selectedSeverity, setSelectedSeverity] = useState('HIGH');
  const [targetZoneId, setTargetZoneId] = useState(preselectedZoneId || riskZones[0].id);
  const [alertMessage, setAlertMessage] = useState('');
  const [channels, setChannels] = useState({ sms: true, app: true, ivr: false });

  const reloadAlerts = () => setAlerts(getAlerts());

  useEffect(() => {
    reloadAlerts();
    window.addEventListener('alertsUpdated', reloadAlerts);
    return () => window.removeEventListener('alertsUpdated', reloadAlerts);
  }, []);

  const handleAck = (id) => {
    acknowledgeAlert(id, user?.name || 'District Authority');
    reloadAlerts();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!alertMessage.trim()) return;

    const z = riskZones.find(item => item.id === targetZoneId);
    createAlert({
      severity: selectedSeverity,
      zoneId: targetZoneId,
      zoneName: z ? z.name : `Zone ${targetZoneId}`,
      location: z ? z.name : 'NER Sector',
      message: alertMessage,
      channels: Object.keys(channels).filter(k => channels[k]).map(k => k.toUpperCase())
    });

    setAlertMessage('');
    setShowModal(false);
    reloadAlerts();
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('alertsTitle')}</h1>
          <p>{t('alertsDesc')}</p>
        </div>

        {user?.role === 'authority' && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> {t('issueAlert')}
          </button>
        )}
      </div>

      {/* Early Warning Protocol Flow Bar */}
      <div className="clean-card" style={{ padding: '16px 20px', background: 'var(--brand-light)', borderColor: 'var(--border-subtle)' }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-navy)', marginBottom: 8 }}>
          Standard Early Warning Broadcast Pipeline
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--brand-primary)' }}>
            <span>1. AI Risk Engine</span>
            <span>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--risk-critical)' }}>
            <span>2. Threshold Crossed</span>
            <span>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--risk-high)' }}>
            <span>3. Alert Recommendation</span>
            <span>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--brand-navy)' }}>
            <span>4. Authority Approval</span>
            <span>→</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: 'var(--risk-low)' }}>
            <span>5. SMS & App Dispatch</span>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <h3>Disaster Warning Log ({alerts.length})</h3>
            <p>Operational broadcast registry with real-time delivery status and officer acknowledgment</p>
          </div>
        </div>

        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>{t('alertId') || 'Alert ID'}</th>
                <th>{t('severity')}</th>
                <th>{t('location')}</th>
                <th>{t('reportDescription') || 'Advisory Directive'}</th>
                <th>{t('time')}</th>
                <th>{t('channels') || 'Broadcast Channels'}</th>
                <th>{t('status')}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => {
                const badgeClass = a.severity.toLowerCase();
                return (
                  <tr key={a.id}>
                    <td className="code-cell">{a.id}</td>
                    <td>
                      <span className={`status-badge badge-${badgeClass}`}>
                        ● {t(badgeClass) || a.severity}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{t(a.location)}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.zoneId}</div>
                    </td>
                    <td style={{ maxWidth: 320, lineHeight: 1.4 }}>
                      {t(a.message)}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {t(a.timeAgo)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <span className="status-badge badge-info" style={{ fontSize: 10 }}>SMS (1,420)</span>
                        <span className="status-badge badge-normal" style={{ fontSize: 10 }}>App Push</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${a.status === 'Active' ? 'badge-critical' : 'badge-low'}`}>
                        {a.status === 'Active' ? t('active') : t('resolved')}
                      </span>
                    </td>
                    <td>
                      {a.status === 'Active' ? (
                        <button
                          className="btn-secondary btn-xs"
                          onClick={() => handleAck(a.id)}
                        >
                          <Check size={12} /> {t('acknowledge')}
                        </button>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--risk-low)', fontWeight: 600 }}>
                          ✓ {t('acknowledged')}: {a.acknowledgedBy || 'Officer'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(18, 59, 99, 0.4)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div className="clean-card" style={{ width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-dropdown)' }}>
            <div className="card-header-row">
              <div className="card-title-group">
                <h3>Broadcast Early Warning Advisory</h3>
                <p>Authorized disaster bulletin transmission for North Eastern Region</p>
              </div>
              <button onClick={() => setShowModal(false)} className="btn-secondary btn-xs">✕</button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group-clean">
                <label className="form-label-clean">Target Landslide Zone</label>
                <select
                  className="form-input-clean"
                  value={targetZoneId}
                  onChange={(e) => setTargetZoneId(e.target.value)}
                >
                  {riskZones.map(z => (
                    <option key={z.id} value={z.id}>{z.id} — {z.name} ({z.district})</option>
                  ))}
                </select>
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Warning Severity</label>
                <select
                  className="form-input-clean"
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                >
                  <option value="CRITICAL">CRITICAL (Immediate Evacuation Order)</option>
                  <option value="HIGH">HIGH (Response Standby & Road Caution)</option>
                  <option value="MODERATE">MODERATE (Heightened Surveillance)</option>
                </select>
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Disaster Advisory Directive</label>
                <textarea
                  className="form-input-clean"
                  rows={3}
                  placeholder="e.g. Critical slope creep detected at Km 12. Evacuate Sohra West settlement immediately to designated town hall shelter."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Broadcast Channels</label>
                <div style={{ display: 'flex', gap: 14 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={e => setChannels({ ...channels, sms: e.target.checked })}
                    />
                    <span>Cell-Broadcast SMS</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={channels.app}
                      onChange={e => setChannels({ ...channels, app: e.target.checked })}
                    />
                    <span>Citizen Mobile App</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={channels.ivr}
                      onChange={e => setChannels({ ...channels, ivr: e.target.checked })}
                    />
                    <span>Voice IVR Broadcast</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={14} /> Authorize & Broadcast Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
