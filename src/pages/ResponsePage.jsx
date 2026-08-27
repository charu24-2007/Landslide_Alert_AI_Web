// Response Page — Standard Operating Procedures, NDRF/SDRF mobilization, and incident playbooks
import React, { useState } from 'react';
import { Zap, Shield, PhoneCall, Truck, AlertOctagon, CheckSquare } from 'lucide-react';

export default function ResponsePage() {
  const [activeTab, setActiveTab] = useState('P1');

  const protocols = {
    P1: {
      title: 'Priority 1: Immediate Critical Evacuation (Score > 85)',
      color: 'var(--critical)',
      steps: [
        'Issue sirens and broadcast cell-broadcast emergency alert to local cell towers.',
        'Mobilize NDRF 1st Battalion & SDRF quick reaction teams to designated staging areas.',
        'Order PWD/BRO to erect roadblock barriers 2km ahead of unstable slope corridors.',
        'Open Sohra & Mawsynram Community Relief Shelters with medical and ration stockpiles.',
        'Deploy heavy earthmovers (JCB/Excavators) on standby at high-risk highway choke points.'
      ],
      contacts: [
        { agency: 'NDRF Control Room (Guwahati/Shillong)', phone: '0364-2520001', officer: 'Commandant R. K. Singh' },
        { agency: 'State Disaster Management Authority (SDMA)', phone: '1070 / 0364-2225500', officer: 'Duty Officer' },
        { agency: 'Border Roads Organisation (BRO / Project Swastik)', phone: '0364-2580120', officer: 'Col. Mehta' },
        { agency: 'Superintendent of Police (Control Room)', phone: '100 / 0364-2222222', officer: 'SP Traffic & Law' }
      ]
    },
    P2: {
      title: 'Priority 2: High Alert Standby & Monitoring (Score 65 - 85)',
      color: 'var(--high)',
      steps: [
        'Notify village headmen (Rangbah Shnong) and initiate pre-evacuation briefing.',
        'Switch IoT sensor sampling frequency from 15 mins to continuous 1-min intervals.',
        'Pre-position medical emergency ambulances at block primary healthcare centers.',
        'Issue travel advisories warning tourists and heavy commercial vehicles from night transit.'
      ],
      contacts: [
        { agency: 'Sub-Divisional Magistrate (Sohra/Mawsynram)', phone: '0364-235002', officer: 'SDM Office' },
        { agency: 'Executive Engineer PWD (Roads)', phone: '0364-2223401', officer: 'EE Sangma' }
      ]
    },
    P3: {
      title: 'Priority 3: Routine Surveillance & Precautionary Advisory (Score < 65)',
      color: 'var(--moderate)',
      steps: [
        'Inspect drainage culverts for debris clogging.',
        'Monitor daily rainfall forecasts from IMD Cherrapunji/Sohra radar.',
        'Log baseline ground deformation readings.'
      ],
      contacts: [
        { agency: 'District Emergency Operations Centre (DEOC)', phone: '0364-2500000', officer: 'DEOC Desk' }
      ]
    }
  };

  const curr = protocols[activeTab];

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={18} color="var(--critical)" /> Emergency Response Action Protocols (SOP)
          </h1>
          <p>Institutional disaster management playbooks, NDRF/SDRF directory, and mobilization matrix</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['P1', 'P2', 'P3'].map(k => (
            <button
              key={k}
              className={`btn btn-sm ${activeTab === k ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab(k)}
            >
              {k} - {k === 'P1' ? 'Critical' : k === 'P2' ? 'High Alert' : 'Precautionary'}
            </button>
          ))}
        </div>
      </div>

      <div className="panel" style={{ borderLeft: `4px solid ${curr.color}` }}>
        <div className="panel-header" style={{ background: 'var(--surface-2)' }}>
          <span className="panel-title" style={{ color: curr.color }}>{curr.title}</span>
        </div>
        <div className="panel-body">
          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>
            Action Checklist & SOP Protocol
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {curr.steps.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'var(--bg)', padding: '8px 10px', borderRadius: 3, border: '1px solid var(--border)' }}>
                <CheckSquare size={14} color={curr.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 12 }}>{st}</span>
              </div>
            ))}
          </div>

          <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8 }}>
            First-Responder Agency Emergency Directory
          </h4>
          <table className="data-table">
            <thead>
              <tr>
                <th>Agency / Battalion</th>
                <th>Designated Officer</th>
                <th>24x7 Hot-line Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {curr.contacts.map((c, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{c.agency}</td>
                  <td>{c.officer}</td>
                  <td><b style={{ color: 'var(--blue)' }}>{c.phone}</b></td>
                  <td>
                    <a href={`tel:${c.phone}`} className="btn btn-xs btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <PhoneCall size={10} /> Call Dispatch
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
