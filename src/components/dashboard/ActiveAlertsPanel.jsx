// ActiveAlertsPanel.jsx — Real-time Active Alerts Feed with Acknowledgment & Full Multilingual Support
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { getAlerts, acknowledgeAlert } from '../../data/alerts';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ActiveAlertsPanel({ limit = 4, onRefresh }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const alerts = getAlerts().filter(a => a.status === 'Active' || a.status === 'Acknowledged').slice(0, limit);

  const handleAck = (e, id) => {
    e.stopPropagation();
    acknowledgeAlert(id, user?.name || 'Authorized Officer');
    if (onRefresh) onRefresh();
  };

  return (
    <div className="clean-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header-row">
        <div className="card-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={16} color="var(--risk-critical)" />
            <h3>{t('activeEarlyWarnings')}</h3>
          </div>
          <p>{t('realtimeThresholdBreaches')}</p>
        </div>
        <button className="btn-secondary btn-sm" onClick={() => navigate('/alerts')}>
          {t('viewAll')} <ArrowRight size={12} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>
        {alerts.map((alert) => {
          const isCrit = alert.severity === 'CRITICAL';
          const badgeClass = alert.severity.toLowerCase();

          return (
            <div
              key={alert.id}
              onClick={() => navigate('/alerts')}
              style={{
                border: '1px solid var(--border)',
                borderLeft: `4px solid ${isCrit ? 'var(--risk-critical)' : 'var(--risk-high)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                background: 'var(--surface)',
                cursor: 'pointer',
                transition: 'background 0.12s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={`status-badge badge-${badgeClass}`}>
                    ● {t(badgeClass) || alert.severity}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t(alert.location)}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t(alert.timeAgo)}</span>
              </div>

              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.4 }}>
                {t(alert.message)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {alert.id} • {alert.zoneId}
                </span>
                {alert.status === 'Active' ? (
                  <button
                    className="btn-secondary btn-xs"
                    onClick={(e) => handleAck(e, alert.id)}
                    style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Check size={11} /> {t('acknowledge')}
                  </button>
                ) : (
                  <span style={{ fontSize: 11, color: 'var(--risk-low)', fontWeight: 600 }}>
                    ✓ {t('acknowledged')}: {alert.acknowledgedBy || 'Officer'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
