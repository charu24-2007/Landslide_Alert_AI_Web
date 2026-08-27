// AlertsPanel — real-time active alerts feed for dashboard right column
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, Check, ArrowRight } from 'lucide-react';
import { getAlerts, acknowledgeAlert } from '../data/alerts';
import { useAuth } from '../context/AuthContext';

const SEV_COLOR = { CRITICAL: 'var(--critical)', HIGH: 'var(--high)', MODERATE: 'var(--moderate)', LOW: 'var(--low)' };

export default function AlertsPanel({ limit = 8 }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);

  const reload = () => setAlerts(getAlerts().filter(a => a.status === 'Active' || a.status === 'Acknowledged').slice(0, limit));

  useEffect(() => {
    reload();
    window.addEventListener('alertsUpdated', reload);
    return () => window.removeEventListener('alertsUpdated', reload);
  }, []);

  const doAck = (e, id) => {
    e.stopPropagation();
    acknowledgeAlert(id, user?.name || 'Officer');
    reload();
  };

  return (
    <div className="panel" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Bell size={13} color="var(--text-secondary)" />
          <span className="panel-title">Active Alerts</span>
          {alerts.filter(a => a.status === 'Active').length > 0 && (
            <span className="tab-badge">{alerts.filter(a => a.status === 'Active').length}</span>
          )}
        </div>
        <button className="btn btn-sm" onClick={() => navigate('/alerts')}>
          All <ArrowRight size={10} />
        </button>
      </div>

      <div className="alert-list" style={{ flex: 1, overflowY: 'auto' }}>
        {alerts.length === 0 && (
          <div className="empty-state"><Bell size={22} /><span>No active alerts</span></div>
        )}
        {alerts.map(alert => (
          <div key={alert.id} className="alert-row" onClick={() => navigate(`/alerts?id=${alert.id}`)}>
            <div className="alert-dot" style={{ background: SEV_COLOR[alert.severity] || 'var(--blue)' }} />
            <div className="alert-content">
              <div className="alert-title">{alert.location}</div>
              <div className="alert-desc">{alert.message}</div>
              <div className="alert-meta">
                <span className="alert-time">{alert.timeAgo}</span>
                {alert.status === 'Active' ? (
                  <button className="btn btn-xs" onClick={(e) => doAck(e, alert.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Check size={9} /> Ack
                  </button>
                ) : (
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>✓ {alert.acknowledgedBy}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
