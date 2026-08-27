// Login.jsx — Exact match to requested LandSlide Alert AI authentication portal design
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
  Zap,
  Radio,
  ShieldCheck,
  Landmark,
  BookOpen,
  HardHat,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('authority');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredRole, setHoveredRole] = useState(null);

  const roleMeta = {
    authority: {
      label: 'District Authority',
      desc: 'Full monitoring & alert access',
      emailPlaceholder: 'Enter Login ID (e.g. authority@ner.gov.in)',
      passwordPlaceholder: 'Enter Authority Password (e.g. ••••••••••)',
      loginHint: 'District Authority Login',
      Icon: Landmark,
      color: '#00A6FF',
    },
    analyst: {
      label: 'GIS / Tech Analyst',
      desc: 'Data & AI analysis access',
      emailPlaceholder: 'Enter Login ID (e.g. analyst@ner.gov.in)',
      passwordPlaceholder: 'Enter Analyst Password (e.g. ••••••••••)',
      loginHint: 'GIS / Tech Analyst Login',
      Icon: BookOpen,
      color: '#00A6FF',
    },
    field: {
      label: 'Field Officer',
      desc: 'Field verification access',
      emailPlaceholder: 'Enter Login ID (e.g. field@ner.gov.in)',
      passwordPlaceholder: 'Enter Field Officer Password (e.g. ••••••••••)',
      loginHint: 'Field Officer Login',
      Icon: HardHat,
      color: '#00A6FF',
      iconColor: '#FF7A59',
    },
    citizen: {
      label: 'Citizen',
      desc: 'Public warning & reporting',
      emailPlaceholder: 'Enter Login ID (e.g. citizen@ner.gov.in)',
      passwordPlaceholder: 'Enter Citizen Access Password (e.g. ••••••••••)',
      loginHint: 'Citizen Access Login',
      Icon: Users,
      color: '#00A6FF',
      iconColor: '#A875FF',
    },
  };

  const currentMeta = roleMeta[selectedRole] || roleMeta.authority;

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { key: 'authority', ...roleMeta.authority },
    { key: 'analyst', ...roleMeta.analyst },
    { key: 'field', ...roleMeta.field },
    { key: 'citizen', ...roleMeta.citizen },
  ];

  return (
    <div style={s.page}>
      {/* Background radial glowing gradients */}
      <div style={s.bgGlowLeft} />
      <div style={s.bgGlowRight} />
      <div style={s.bgGlowCenter} />

      {/* Topographic background grid vector overlay */}
      <svg
        style={s.bgSvg}
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="gridGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Mountain outline */}
        <path
          d="M-100,750 L150,450 L320,620 L550,300 L750,550 L950,380 L1200,600 L1500,280 L1600,900 L-100,900 Z"
          fill="url(#gridGrad)"
        />
        {/* Contour curve lines */}
        <path
          d="M0,720 Q250,640 500,680 Q750,720 1000,660 Q1250,600 1500,650"
          fill="none"
          stroke="#00A6FF"
          strokeWidth="1"
          opacity="0.1"
        />
        <path
          d="M0,780 Q300,740 600,760 Q900,780 1200,730 Q1350,710 1500,740"
          fill="none"
          stroke="#0066FF"
          strokeWidth="0.8"
          opacity="0.08"
        />
      </svg>

      {/* Main split content container */}
      <div style={s.contentContainer}>
        {/* ── LEFT PANEL (Branding & Role Selector) ── */}
        <div style={s.leftPanel}>
          {/* Main Logo */}
          <div style={s.logoWrap}>
            <img
              src="/landslide-logo.png"
              alt="LandSlide Alert AI Logo"
              style={s.logo}
              draggable={false}
            />
          </div>

          {/* Title & Subtitle */}
          <div style={s.brandBlock}>
            <h1 style={s.heroTitle}>
              LANDSLIDE<br />
              <span style={s.heroTitleAccent}>ALERT AI</span>
            </h1>
            <p style={s.heroSub}>
              AI-Based Early Warning &amp; Landslide<br />
              Risk Monitoring System for NER
            </p>

            {/* Ministry badge */}
            <div style={s.govBadge}>
              <ShieldCheck size={14} color="#00A6FF" style={{ flexShrink: 0 }} />
              <span>Ministry of Development of North Eastern Region</span>
            </div>
          </div>

          {/* Feature capability pills */}
          <div style={s.badgeRow}>
            <div style={s.badge}>
              <Zap size={13} color="#00A6FF" />
              <span>Real-Time IoT</span>
            </div>
            <div style={s.badge}>
              <ShieldCheck size={13} color="#00A6FF" />
              <span>AI Prediction</span>
            </div>
            <div style={s.badge}>
              <Radio size={13} color="#00A6FF" />
              <span>Early Warning</span>
            </div>
          </div>

          {/* Role selector grid (2x2) */}
          <div style={s.rolesGrid}>
            {roles.map((r) => {
              const isSelected = selectedRole === r.key;
              const isHovered = hoveredRole === r.key;
              const RoleIcon = r.Icon;
              const iconClr = isSelected ? '#00A6FF' : (r.iconColor || '#00A6FF');

              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleRoleSelect(r.key)}
                  onMouseEnter={() => setHoveredRole(r.key)}
                  onMouseLeave={() => setHoveredRole(null)}
                  style={{
                    ...s.roleCard,
                    borderColor: isSelected
                      ? '#00A6FF'
                      : isHovered
                      ? 'rgba(0, 166, 255, 0.35)'
                      : 'rgba(0, 166, 255, 0.15)',
                    background: isSelected
                      ? 'rgba(0, 50, 110, 0.45)'
                      : isHovered
                      ? 'rgba(10, 28, 55, 0.65)'
                      : 'rgba(6, 20, 42, 0.5)',
                    boxShadow: isSelected
                      ? '0 0 18px rgba(0, 166, 255, 0.25)'
                      : 'none',
                  }}
                >
                  <div style={s.roleIconBox}>
                    <RoleIcon size={20} color={iconClr} />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: isSelected ? '#00A6FF' : '#FFFFFF',
                      }}
                    >
                      {r.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: '#627B9B',
                        marginTop: 3,
                        lineHeight: 1.25,
                      }}
                    >
                      {r.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vertical subtle divider */}
        <div style={s.divider} />

        {/* ── RIGHT PANEL (Login Form Card) ── */}
        <div style={s.rightPanel}>
          <div style={s.formCard}>
            {/* Header */}
            <div style={s.formHeader}>
              <div style={s.lockIconWrap}>
                <Lock size={20} color="#FFFFFF" />
              </div>
              <h2 style={s.formTitle}>Welcome back</h2>
              <p style={s.formSub}>
                Sign in as{' '}
                <span style={{ color: '#00A6FF', fontWeight: 700 }}>
                  {currentMeta.label}
                </span>
              </p>

              {/* Active Role pill badge */}
              <div style={s.activeRoleBadge}>
                <div style={s.cyanDot} />
                <span style={{ fontSize: 13, color: '#00A6FF', fontWeight: 600 }}>
                  🔐 {currentMeta.loginHint}
                </span>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div style={s.errorBox}>
                <span>⚠ {error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={s.form}>
              {/* Login ID Input */}
              <div style={s.fieldGroup}>
                <label style={s.label}>EMAIL ADDRESS / LOGIN ID</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#4F6E96" style={s.inputLeftIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={currentMeta.emailPlaceholder}
                    required
                    style={s.input}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div style={s.fieldGroup}>
                <label style={s.label}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#4F6E96" style={s.inputLeftIcon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentMeta.passwordPlaceholder}
                    required
                    style={{ ...s.input, paddingRight: 46 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={s.eyeBtn}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#4F6E96" />
                    ) : (
                      <Eye size={18} color="#4F6E96" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={s.submitBtn}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.opacity = '0.94';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      style={{ animation: 'lsa-spin 1s linear infinite' }}
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock size={17} /> Secure Login
                  </>
                )}
              </button>
            </form>

            {/* Footer security note */}
            <div style={s.securityNote}>
              <ShieldCheck size={14} color="#00A6FF" />
              <span>Secured by Government-Grade MFA • LandSlide Alert AI v2.0</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes lsa-spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input::placeholder { color: #4A6385 !important; font-size: 13.5px; }
        input:focus { outline: none !important; border-color: #00A6FF !important; box-shadow: 0 0 0 3px rgba(0,166,255,0.2) !important; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}

// ── STYLES (Exact 1:1 Match to Reference UI) ──────────────────────────────────
const s = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    background: '#020A16',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '30px 20px',
  },

  bgGlowLeft: {
    position: 'absolute',
    left: '10%',
    top: '20%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 102, 204, 0.22) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgGlowRight: {
    position: 'absolute',
    right: '15%',
    top: '30%',
    width: '550px',
    height: '550px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 166, 255, 0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgGlowCenter: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(6, 30, 65, 0.4) 0%, transparent 75%)',
    pointerEvents: 'none',
  },
  bgSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },

  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1150px',
    zIndex: 2,
    position: 'relative',
  },

  // ── LEFT PANEL ──
  leftPanel: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 40px 20px 20px',
    textAlign: 'center',
  },
  logoWrap: {
    marginBottom: 18,
    display: 'flex',
    justifyContent: 'center',
    filter: 'drop-shadow(0 8px 28px rgba(0, 166, 255, 0.45))',
  },
  logo: {
    width: '210px',
    height: 'auto',
    objectFit: 'contain',
    userSelect: 'none',
  },
  brandBlock: {
    textAlign: 'center',
    marginBottom: 22,
  },
  heroTitle: {
    fontSize: '38px',
    fontWeight: 900,
    color: '#FFFFFF',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
  },
  heroTitleAccent: {
    color: '#00A6FF',
  },
  heroSub: {
    fontSize: '14.5px',
    color: '#8CA3C0',
    lineHeight: '1.5',
    margin: '0 0 14px 0',
    fontWeight: 400,
  },
  govBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0, 70, 140, 0.18)',
    border: '1px solid rgba(0, 166, 255, 0.3)',
    borderRadius: '20px',
    padding: '5px 16px',
    fontSize: '12px',
    color: '#4DAFFF',
    fontWeight: 500,
  },

  badgeRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: 26,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    background: 'rgba(8, 24, 48, 0.65)',
    border: '1px solid rgba(0, 166, 255, 0.22)',
    borderRadius: '20px',
    padding: '7px 16px',
    fontSize: '12px',
    color: '#FFFFFF',
    fontWeight: 600,
    backdropFilter: 'blur(6px)',
  },

  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    width: '100%',
    maxWidth: '460px',
  },
  roleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 15px',
    borderRadius: '12px',
    border: '1px solid rgba(0, 166, 255, 0.15)',
    background: 'rgba(6, 20, 42, 0.5)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(8px)',
  },
  roleIconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // ── DIVIDER ──
  divider: {
    width: '1px',
    height: '460px',
    background:
      'linear-gradient(180deg, transparent 0%, rgba(0, 166, 255, 0.2) 30%, rgba(0, 166, 255, 0.25) 50%, rgba(0, 166, 255, 0.2) 70%, transparent 100%)',
    flexShrink: 0,
    margin: '0 20px',
  },

  // ── RIGHT PANEL ──
  rightPanel: {
    flex: '1 1 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px 20px 40px',
  },
  formCard: {
    width: '100%',
    maxWidth: '440px',
    background: 'rgba(6, 20, 40, 0.75)',
    border: '1px solid rgba(0, 166, 255, 0.2)',
    borderRadius: '20px',
    padding: '38px 36px 30px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  },
  formHeader: {
    marginBottom: 24,
  },
  lockIconWrap: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #0066FF 0%, #00C6FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(0, 166, 255, 0.45)',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#FFFFFF',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    margin: '0 0 6px 0',
  },
  formSub: {
    fontSize: '14.5px',
    color: '#7E94B3',
    margin: '0 0 14px 0',
    fontWeight: 400,
  },
  activeRoleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(0, 50, 100, 0.35)',
    border: '1px solid rgba(0, 166, 255, 0.35)',
    borderRadius: '20px',
    padding: '5px 14px',
  },
  cyanDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#00A6FF',
    boxShadow: '0 0 8px #00A6FF',
  },

  errorBox: {
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#FCA5A5',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '18px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: '#7E94B3',
    marginBottom: '8px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  inputLeftIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: '48px',
    paddingLeft: '44px',
    paddingRight: '14px',
    background: '#08182D',
    border: '1px solid #163359',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#FFFFFF',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    zIndex: 2,
  },
  submitBtn: {
    width: '100%',
    height: '50px',
    background: 'linear-gradient(90deg, #0066FF 0%, #00D2FF 100%)',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: 700,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.15s ease, transform 0.15s ease',
    boxShadow: '0 6px 24px rgba(0, 180, 255, 0.4)',
    marginTop: '6px',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '22px',
    fontSize: '11.5px',
    color: '#496385',
    fontWeight: 500,
  },
};
