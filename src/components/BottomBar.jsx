// BottomBar Component - Operational bottom status indicators
import React from 'react';

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="bottom-bar-left">
        <div className="bottom-indicator">
          <span>System Status:</span>
          <span style={{ color: 'var(--risk-low)', fontWeight: 'bold' }}>OPERATIONAL</span>
        </div>
        <div style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-color)' }}></div>
        <div>Sensor Sync: <span style={{ fontWeight: '500' }}>14:31:05 IST</span></div>
        <div style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-color)' }}></div>
        <div>IMD Weather Sync: <span style={{ fontWeight: '500' }}>14:30:00 IST</span></div>
        <div style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-color)' }}></div>
        <div>GSAT-Satellite Sync: <span style={{ fontWeight: '500' }}>13:45:00 IST</span></div>
      </div>
      
      <div className="bottom-bar-right">
        <div className="bottom-indicator">
          <span className="bottom-dot online"></span>
          <span>Backend: <span style={{ color: 'var(--risk-low)', fontWeight: 'bold' }}>CONNECTED</span></span>
        </div>
        <div style={{ width: '1px', height: '12px', backgroundColor: 'var(--border-color)' }}></div>
        <div className="bottom-indicator">
          <span className="bottom-dot online"></span>
          <span>Database: <span style={{ color: 'var(--risk-low)', fontWeight: 'bold' }}>HEALTHY</span></span>
        </div>
      </div>
    </div>
  );
}
