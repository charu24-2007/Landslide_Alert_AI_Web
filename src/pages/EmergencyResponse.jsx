// EmergencyResponse.jsx — Authority Action Protocols, Priority Queue & Mobilization
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldAlert, PhoneCall, CheckSquare, Users, MapPin, AlertTriangle, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EmergencyResponse() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeQueueTab, setActiveQueueTab] = useState('P1');
  const [assignedStatus, setAssignedStatus] = useState({});

  const queueItems = [
    {
      id: 'Q-001',
      priority: 'P1',
      zoneId: 'NER-011',
      zoneName: 'Southern Highway Gorge',
      district: 'East Khasi Hills',
      score: 92,
      riskLevel: 'CRITICAL',
      roadsAffected: '2 Roads (NH-44 Main Arterial & Umtyngar Bridge)',
      villagesAffected: 'Sohra West Settlement (1,250 residents)',
      mandate: 'Immediate evacuation initiation and BRO roadblock deployment 2km prior to slope cut.',
      assignedOfficer: 'Officer Sangma (PWD Team 1)',
      status: assignedStatus['Q-001'] || 'Immediate Action Required'
    },
    {
      id: 'Q-002',
      priority: 'P1',
      zoneId: 'NER-023',
      zoneName: 'Eastern Slope Sector',
      district: 'East Khasi Hills',
      score: 78,
      riskLevel: 'HIGH',
      roadsAffected: 'NH Corridor (Mawsynram Road)',
      villagesAffected: 'Mawsynram East (840 residents)',
      mandate: 'Pre-position earthmovers at Mawsynram link road; activate community shelter.',
      assignedOfficer: 'Inspector Mawrie',
      status: assignedStatus['Q-002'] || 'Standby Alert'
    },
    {
      id: 'Q-003',
      priority: 'P2',
      zoneId: 'NER-018',
      zoneName: 'Northern Corridor Border',
      district: 'West Khasi Hills',
      score: 68,
      riskLevel: 'HIGH',
      roadsAffected: 'NH-44 Bypass Km 18',
      villagesAffected: 'Nongstoin Valley Hamlet',
      mandate: 'Inspect retaining wall creep and restrict night transit to light vehicles only.',
      assignedOfficer: 'Officer Khongwir',
      status: assignedStatus['Q-003'] || 'Inspection Queued'
    }
  ];

  const sops = {
    P1: {
      title: 'Priority 1: Immediate Critical Evacuation (Risk Score > 85)',
      color: 'var(--risk-critical)',
      steps: [
        'Issue sirens and broadcast cell-broadcast emergency alert to local cell towers.',
        'Mobilize NDRF 1st Battalion & SDRF quick reaction teams to designated staging areas.',
        'Order PWD/BRO to erect roadblock barriers 2km ahead of unstable slope corridors.',
        'Open Sohra & Mawsynram Community Relief Shelters with medical and ration stockpiles.',
        'Deploy heavy earthmovers (JCB/Excavators) on standby at high-risk highway choke points.'
      ]
    },
    P2: {
      title: 'Priority 2: High Alert Standby & Monitoring (Risk Score 65 - 85)',
      color: 'var(--risk-high)',
      steps: [
        'Notify village headmen (Rangbah Shnong) and initiate pre-evacuation briefing.',
        'Switch IoT sensor sampling frequency from 15 mins to continuous 1-min intervals.',
        'Pre-position medical emergency ambulances at block primary healthcare centers.',
        'Issue travel advisories warning tourists and heavy commercial vehicles from night transit.'
      ]
    },
    P3: {
      title: 'Priority 3: Precautionary Surveillance (Risk Score < 65)',
      color: 'var(--risk-moderate)',
      steps: [
        'Inspect drainage culverts for debris clogging.',
        'Monitor daily rainfall forecasts from IMD Cherrapunji radar.',
        'Log baseline ground deformation readings.'
      ]
    }
  };

  const emergencyContacts = [
    { agency: 'NDRF Control Room (1st Bn HQ)', phone: '0364-2520001', officer: 'Commandant R. K. Singh', role: 'Search & Rescue' },
    { agency: 'State Disaster Management Authority (SDMA)', phone: '1070 / 0364-2225500', officer: 'State Emergency Desk', role: 'State Command' },
    { agency: 'Border Roads Organisation (BRO / Project Swastik)', phone: '0364-2580120', officer: 'Col. Mehta', role: 'Highway Clearing' },
    { agency: 'Superintendent of Police (Traffic Control)', phone: '100 / 0364-2222222', officer: 'SP Traffic & Law', role: 'Roadblocks' }
  ];

  const handleActionClick = (queueId, actionText) => {
    setAssignedStatus(prev => ({ ...prev, [queueId]: actionText }));
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('emergencyResponseTitle')}</h1>
          <p>{t('emergencyResponseDesc')}</p>
        </div>
      </div>

      {/* Priority Action Queue */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={18} color="var(--risk-critical)" />
              <h3>{t('priorityEmergencyQueue')}</h3>
            </div>
            <p>{t('rankedDecisionMandates')}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {queueItems.map((item, index) => {
            const isCrit = item.riskLevel === 'CRITICAL';
            const statusText = item.status === 'Immediate Action Required' ? t('immediateActionRequired') : item.status === 'Standby Alert' ? t('standbyAlert') : item.status === 'Inspection Queued' ? t('inspectionQueued') : t(item.status) || item.status;
            return (
              <div
                key={item.id}
                style={{
                  border: '1px solid var(--border)',
                  borderLeft: `5px solid ${isCrit ? 'var(--risk-critical)' : 'var(--risk-high)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  background: 'var(--surface)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-navy)' }}>#{index + 1} {t(item.zoneName)} ({item.zoneId})</span>
                      <span className={`status-badge ${isCrit ? 'badge-critical' : 'badge-high'}`}>
                        ● {t(item.riskLevel.toLowerCase()) || item.riskLevel} ({item.score}/100)
                      </span>
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>
                      <b>{t('district')}:</b> {t(item.district)} • <b>{t('threat')}:</b> {t(item.roadsAffected) || item.roadsAffected} • {t(item.villagesAffected) || item.villagesAffected}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="status-badge badge-info">{statusText}</span>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t('assigned')}: {t(item.assignedOfficer) || item.assignedOfficer}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', padding: '10px 14px', borderRadius: 6, margin: '12px 0 10px', fontSize: 13, color: 'var(--text-primary)' }}>
                  <b>{t('authorityActionDirective')}:</b> {t(item.mandate) || item.mandate}
                </div>

                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button className="btn-secondary btn-xs" onClick={() => navigate(`/map?zone=${item.zoneId}`)}>
                    <MapPin size={12} /> {t('viewMap')}
                  </button>
                  <button className="btn-secondary btn-xs" onClick={() => handleActionClick(item.id, 'Officer Dispatched')}>
                    <Users size={12} /> {t('assignFieldOfficer')}
                  </button>
                  <button className="btn-danger btn-xs" onClick={() => handleActionClick(item.id, 'Evacuation In Progress')}>
                    <AlertTriangle size={12} /> {t('initiateEvacuation')}
                  </button>
                  <button className="btn-primary btn-xs" onClick={() => handleActionClick(item.id, 'Resolved / Monitored')}>
                    <CheckSquare size={12} /> {t('markResolved')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Standard Operating Procedures & Contact Directory */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* SOP Checklist */}
        <div className="clean-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <h3>Standard Operating Procedures (SOP)</h3>
              <p>Disaster management playbook protocols</p>
            </div>

            <div className="page-actions-group">
              {['P1', 'P2', 'P3'].map(k => (
                <button
                  key={k}
                  className={`btn-xs ${activeQueueTab === k ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveQueueTab(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: sops[activeQueueTab].color }}>
              {sops[activeQueueTab].title}
            </h4>
            {sops[activeQueueTab].steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  background: 'var(--bg)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)'
                }}
              >
                <CheckSquare size={14} color={sops[activeQueueTab].color} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 24x7 Emergency Hotlines Directory */}
        <div className="clean-card">
          <div className="card-header-row">
            <div className="card-title-group">
              <h3>First-Responder Directory (24x7)</h3>
              <p>Direct contact with military, police, and civil defense</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {emergencyContacts.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px', borderRadius: 'var(--radius-md)',
                  background: 'var(--surface)', border: '1px solid var(--border)'
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{c.agency}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.officer} • {c.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <a href={`tel:${c.phone}`} className="btn-primary btn-xs" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <PhoneCall size={11} /> {c.phone.split(' / ')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
