// Alerts Page — Active & Historical Alerts with Acknowledgment & Creation
import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Check, Plus, ShieldAlert, Filter } from 'lucide-react';
import { getAlerts, acknowledgeAlert, createAlert } from '../data/alerts';
import { useAuth } from '../context/AuthContext';
import { riskZones } from '../data/riskZones';

const SEV_COLOR = {
  CRITICAL: 'var(--critical)',
  HIGH: 'var(--high)',
  MODERATE: 'var(--moderate)',
  LOW: 'var(--low)'
};

export default function AlertsPage() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New alert form state
  const [newZoneId, setNewZoneId] = useState(riskZones[0]?.id || 'NER-011');
  const [newSeverity, setNewSeverity] = useState('HIGH');
  const [newMessage, setNewMessage] = useState('');

  const reload = () => {
    setAlerts(getAlerts());
  };

  useEffect(() => {
    reload();
    window.addEventListener('alertsUpdated', reload);
    return () => window.removeEventListener('alertsUpdated', reload);
  }, []);

  const handleAck = (id) => {
    acknowledgeAlert(id, user?.name || 'Authorized Officer');
    reload();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const selectedZone = riskZones.find(z => z.id === newZoneId);
    createAlert({
      severity: newSeverity,
      zoneId: newZoneId,
      zoneName: selectedZone ? selectedZone.name : `Zone ${newZoneId}`,
      location: selectedZone ? selectedZone.name : 'NER Sector',
      message: newMessage,
    });
    setNewMessage('');
    setShowCreateModal(false);
    reload();
  };

  const filteredAlerts = alerts.filter(a => {
    const matchSev = filterSeverity === 'ALL' || a.severity === filterSeverity;
    const matchStat = filterStatus === 'ALL' || (filterStatus === 'Active' ? a.status === 'Active' : a.status === 'Acknowledged');
    return matchSev && matchStat;
  });

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={18} color="var(--critical)" /> Alert & Warning Management
          </h1>
          <p>Multi-tier landslide early warning broadcasts, operational logs, and acknowledgment</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(user?.role === 'authority' || user?.role === 'analyst') && (
            <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
              <Plus size={13} /> Issue Early Warning
            </button>
          )}
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-bar" style={{ position: 'static', borderRadius: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Filter size={13} color="var(--text-muted)" />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Severity:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map(sev => (
            <button
              key={sev}
              className={`btn btn-xs ${filterSeverity === sev ? 'btn-primary' : ''}`}
              onClick={() => setFilterSeverity(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
        <div className="header-sep" style={{ margin: '0 8px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
          {['ALL', 'Active', 'Acknowledged'].map(st => (
            <button
              key={st}
              className={`btn btn-xs ${filterStatus === st ? 'btn-primary' : ''}`}
              onClick={() => setFilterStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Table / Feed */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Operational Early Warning Broadcasts ({filteredAlerts.length})</span>
        </div>
        <div className="panel-body no-pad">
          <table className="data-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Alert ID</th>
                <th>Target Zone / Location</th>
                <th>Warning Message / AI Rationale</th>
                <th>Issued At</th>
                <th>Lifecycle Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map(alert => (
                <tr key={alert.id}>
                  <td>
                    <span className={`sev-badge badge-${alert.severity}`}>
                      ● {alert.severity}
                    </span>
                  </td>
                  <td className="id-col">{alert.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{alert.location}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{alert.zoneId}</div>
                  </td>
                  <td style={{ maxWidth: 360 }}>{alert.message}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>{alert.timeAgo}</td>
                  <td>
                    {alert.status === 'Active' ? (
                      <span className="tag" style={{ background: 'var(--critical-bg)', color: 'var(--critical)', borderColor: 'var(--critical-bd)' }}>
                        Active Dispatch
                      </span>
                    ) : (
                      <span className="tag" style={{ background: 'var(--low-bg)', color: 'var(--low)', borderColor: 'var(--low-bd)' }}>
                        ✓ Ack: {alert.acknowledgedBy}
                      </span>
                    )}
                  </td>
                  <td>
                    {alert.status === 'Active' ? (
                      <button className="btn btn-sm btn-primary" onClick={() => handleAck(alert.id)}>
                        <Check size={11} /> Acknowledge
                      </button>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Logged</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating Alert */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="panel" style={{ width: 450, background: 'var(--surface)' }}>
            <div className="panel-header" style={{ background: 'var(--navy)', color: '#fff' }}>
              <span className="panel-title" style={{ color: '#fff' }}>Issue Emergency Warning / Alert</span>
              <button className="btn btn-xs" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: 14 }}>
              <div className="form-group">
                <label className="form-label">Target Zone</label>
                <select className="form-control" value={newZoneId} onChange={e => setNewZoneId(e.target.value)}>
                  {riskZones.map(z => (
                    <option key={z.id} value={z.id}>{z.id} - {z.name} ({z.district})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Warning Severity</label>
                <select className="form-control" value={newSeverity} onChange={e => setNewSeverity(e.target.value)}>
                  <option value="CRITICAL">CRITICAL (Immediate Evacuation Required)</option>
                  <option value="HIGH">HIGH (Response Teams On Standby)</option>
                  <option value="MODERATE">MODERATE (Heightened Surveillance)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Warning Advisory Message</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Describe situation, road blocks, or advisory details..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button type="button" className="btn btn-sm" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary">Broadcast Alert</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
