// AccessDenied.jsx — Clean Role-Based Access Denied Page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AccessDenied() {
  const navigate = useNavigate();
  const { user, roleInfo } = useAuth();

  return (
    <div className="content-area" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div className="clean-card" style={{ maxWidth: 480, alignItems: 'center', padding: '36px 32px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: 'var(--risk-critical-bg)',
          border: '1px solid var(--risk-critical-border)', color: 'var(--risk-critical)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
        }}>
          <ShieldAlert size={28} />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--brand-navy)' }}>
          Access Restricted
        </h2>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 }}>
          Your current active operational role (<b>{roleInfo?.name || user?.role || 'User'}</b>) does not possess clearance for this decision-support module.
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Go Back
          </button>
          <button className="btn-primary" onClick={() => navigate('/')}>
            <Home size={14} /> Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
