// StatusBar — fixed bottom bar with real-time system status
import React from 'react';

export default function StatusBar({ sensorData, alertCount, lastUpdated }) {
  const { total = 42, online = 39, offline = 3, warning = 4 } = sensorData || {};

  return (
    <div className="status-bar">
      <div className="status-bar-item">
        <div className="status-dot" />
        <span>System Online</span>
      </div>
      <div className="status-bar-sep" />
      <div className="status-bar-item">
        <span>Sensors: {online}/{total} active</span>
      </div>
      {offline > 0 && <>
        <div className="status-bar-sep" />
        <div className="status-bar-item" style={{ color: 'var(--critical)' }}>
          <span>{offline} offline</span>
        </div>
      </>}
      {warning > 0 && <>
        <div className="status-bar-sep" />
        <div className="status-bar-item" style={{ color: 'var(--high)' }}>
          <span>{warning} warning</span>
        </div>
      </>}
      <div className="status-bar-sep" />
      <div className="status-bar-item" style={{ color: alertCount > 0 ? 'var(--critical)' : 'inherit' }}>
        <span>{alertCount} active alerts</span>
      </div>
      <div style={{ flex: 1 }} />
      <div className="status-bar-item">
        <span>SIH26001</span>
      </div>
      <div className="status-bar-sep" />
      <div className="status-bar-item">
        <span>IMD · ISRO · MDoNER</span>
      </div>
      <div className="status-bar-sep" />
      <div className="status-bar-item">
        <span>Updated: {lastUpdated || '--:-- IST'}</span>
      </div>
    </div>
  );
}
