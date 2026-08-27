// PriorityRisk Component - RISK -> IMPACT -> ACTION Decision Support Widget
import React from 'react';
import { Eye, BrainCircuit, ClipboardList, AlertTriangle } from 'lucide-react';

export default function PriorityRisk({ zone, onViewOnMap, onViewAIAnalysis, onViewFieldReport, onCreateAlert }) {
  if (!zone) return null;

  const isCritical = zone.level === 'CRITICAL';

  return (
    <div className={`panel priority-panel ${isCritical ? 'critical' : ''}`}>
      <div className="panel-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h4>Priority Risk Situation</h4>
        <span className={`badge ${isCritical ? 'badge-critical' : 'badge-high'}`}>
          {zone.id}: {zone.level} ({zone.riskScore}/100)
        </span>
      </div>
      
      <div className="panel-body priority-layout">
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          Sector: {zone.name}
        </div>

        {/* 1. RISK & WHY */}
        <div className="priority-section">
          <span className="priority-section-title">1. RISK ANALYSIS (Why is it risky?)</span>
          <div className="priority-section-content">
            <p style={{ fontWeight: '500', marginBottom: '4px', color: 'var(--text-color)' }}>
              AI Confidence: {zone.confidence}% | Soil Saturation: {zone.soilMoisture} | Ground Tilt: {zone.tilt}
            </p>
            <ul>
              <li>High accumulated precipitation (IMD rain check)</li>
              <li>Saturated upper soil layer (moisture sensor)</li>
              {parseFloat(zone.tilt) > 1.5 && <li>Accelerating slope displacement ({zone.tilt} tilt tilt)</li>}
              <li>High baseline terrain susceptibility category</li>
            </ul>
          </div>
        </div>

        {/* 2. IMPACT */}
        <div className="priority-section">
          <span className="priority-section-title">2. EXPOSURE & IMPACT (What is affected?)</span>
          <div className="priority-section-content">
            <ul>
              {zone.affectedRoads.length > 0 ? (
                <li><strong>Roads:</strong> {zone.affectedRoads.join(', ')}</li>
              ) : (
                <li>No highway blockages predicted</li>
              )}
              {zone.affectedVillages.length > 0 ? (
                <li><strong>Villages:</strong> {zone.affectedVillages.join(', ')}</li>
              ) : (
                <li>No populated areas within exposure cone</li>
              )}
              {zone.criticalAssets.length > 0 ? (
                <li><strong>Infrastructure:</strong> {zone.criticalAssets.join(', ')}</li>
              ) : (
                <li>No critical lifelines in risk boundary</li>
              )}
            </ul>
          </div>
        </div>

        {/* 3. ACTION */}
        <div className="priority-section">
          <span className="priority-section-title">3. RECOMMENDED ACTION (What to do?)</span>
          <div className="priority-section-content" style={{ backgroundColor: isCritical ? '#FFF5F5' : '#FFF9F2', borderLeft: '3px solid ' + (isCritical ? 'var(--risk-critical)' : 'var(--risk-high)') }}>
            <ul>
              {isCritical ? (
                <>
                  <li>Initiate immediate ground inspections & visual checks</li>
                  <li>Activate PWD and Border Roads Organisation (BRO) emergency crews</li>
                  <li>Deploy police barricades to secure Umtyngar Bridge</li>
                  <li>Notify Local Community heads for evacuation checks</li>
                </>
              ) : (
                <>
                  <li>Verify sensor telemetry anomalies against rainfall rate</li>
                  <li>Advise BRO / NHIDCL road maintenance crews to stand by</li>
                  <li>Review warning indicators in next 2-hour update cycle</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="priority-actions">
          <button className="btn" onClick={onViewOnMap}>
            <Eye size={12} /> View on Map
          </button>
          <button className="btn btn-primary" onClick={onViewAIAnalysis}>
            <BrainCircuit size={12} /> AI Analysis
          </button>
          <button className="btn" onClick={onViewFieldReport}>
            <ClipboardList size={12} /> View Field Reports
          </button>
          <button className="btn btn-danger" onClick={onCreateAlert}>
            <AlertTriangle size={12} /> Create Alert
          </button>
        </div>
      </div>
    </div>
  );
}
