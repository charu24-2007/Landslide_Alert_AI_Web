// Login Page — Government portal-style authentication
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { email: 'authority@ner.gov.in', label: 'District Authority', color: '#1A73C7' },
  { email: 'analyst@ner.gov.in',   label: 'GIS Analyst',        color: '#3F9142' },
  { email: 'field@ner.gov.in',     label: 'Field Officer',      color: '#E8A33D' },
  { email: 'citizen@ner.gov.in',   label: 'Citizen Access',     color: '#6A7381' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('authority@ner.gov.in');
  const [password, setPassword] = useState('demo123');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillAccount = (acc) => { setEmail(acc.email); setPassword('demo123'); setError(''); };

  return (
    <div className="login-page">
      <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Government banner */}
        <div style={{ textAlign: 'center', padding: '0 0 8px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Government of India
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>
            Ministry of Development of North Eastern Region
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
            Disaster Management Division
          </div>
        </div>

        {/* Login card */}
        <div className="login-card">
          <div className="login-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.15)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
                </svg>
              </div>
              <div>
                <h1>LandSlide Alert AI</h1>
                <p>AI-Based Early Warning System · NER</p>
              </div>
            </div>
          </div>

          <div className="login-body">
            {error && (
              <div className="alert-banner danger" style={{ marginBottom: 14 }}>
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email / Username</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="officer@ner.gov.in"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ paddingRight: 34, width: '100%' }}
                    required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', height: 36, fontSize: 13, justifyContent: 'center', marginTop: 4 }} disabled={loading}>
                {loading ? <><Loader2 size={14} className="spin" /> Authenticating...</> : 'Sign In to Dashboard'}
              </button>
            </form>

            {/* Demo account quick-select */}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, textAlign: 'center' }}>
                — Demo Accounts (password: demo123) —
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                {DEMO_ACCOUNTS.map(acc => (
                  <button key={acc.email} onClick={() => fillAccount(acc)}
                    className="btn" style={{ fontSize: 11, flexDirection: 'column', height: 40, gap: 2, padding: '4px 8px', borderColor: email === acc.email ? acc.color : undefined, color: email === acc.email ? acc.color : undefined }}>
                    <span style={{ fontWeight: 600 }}>{acc.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{acc.email.split('@')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="login-footer">
            <div>Problem Statement: SIH26001 · NIC / MDoNER · For authorized use only</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-muted)' }}>
          This system contains sensitive disaster-management data. Unauthorized access is prohibited.
        </div>
      </div>
    </div>
  );
}
