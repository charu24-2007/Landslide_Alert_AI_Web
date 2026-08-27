// Sidebar.jsx — Role-Based Navigation: Authority (7 items) vs Analyst (6 items)
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Brain, CloudRain, Bell,
  Clipboard, Construction, Zap, FileText, Radio,
  LogOut, Globe, ChevronDown, Cloud, Shield, History
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

// Role-specific navigation configs
const NAV_CONFIG = {
  authority: [
    { path: '/',                   label: 'dashboard',         icon: LayoutDashboard },
    { path: '/map',                label: 'riskMap',           icon: Map },
    { path: '/ai',                 label: 'aiRiskAnalysis',    icon: Brain },
    { path: '/alerts',             label: 'alertsWarnings',    icon: Bell,         badge: true },
    { path: '/roads-villages',     label: 'roadsVillages',     icon: Construction },
    { path: '/field-reports',      label: 'fieldReports',      icon: Clipboard },
    { path: '/emergency-response', label: 'emergencyResponse', icon: Zap },
  ],
  analyst: [
    { path: '/',                   label: 'dashboard',         icon: LayoutDashboard },
    { path: '/map',                label: 'riskMap',           icon: Map },
    { path: '/iot-sensors',        label: 'weatherSatellite',  icon: CloudRain },
    { path: '/iot-sensors',        label: 'iotSensorsNav',     icon: Radio },
    { path: '/ai',                 label: 'aiRiskAnalysis',    icon: Brain },
    { path: '/reports-history',    label: 'historicalAnalysis', icon: History },
  ],
  field: [
    { path: '/',                   label: 'dashboard',         icon: LayoutDashboard },
    { path: '/field-reports',      label: 'fieldReports',      icon: Clipboard },
  ],
  citizen: [
    { path: '/',                   label: 'dashboard',         icon: LayoutDashboard },
  ],
};

export default function Sidebar({ alertCount = 5 }) {
  const { user, roleInfo, logout, hasPermission } = useAuth();
  const { lang, changeLanguage, t, LANGUAGES, currentLangObj } = useLanguage();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const role = user?.role || 'authority';
  const navItems = NAV_CONFIG[role] || NAV_CONFIG.authority;

  // For analyst, the two IoT items both go to same path — deduplicate by path for rendering (keep both as separate items)
  // but mark the second one as "sensors" sub-page for clarity via unique key
  const uniqueKeyedItems = navItems.map((item, i) => ({ ...item, _key: `${item.path}-${i}` }));

  const avatarInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const roleColor = roleInfo?.color || '#1199D4';

  return (
    <aside style={sb.sidebar}>
      {/* ── Brand ── */}
      <div style={sb.brand}>
        <div style={sb.brandName}>Landslide Alert AI</div>
        <div style={sb.brandSub}>AI-Based Early Warning &amp; Landslide Risk Monitoring for NER</div>
      </div>

      {/* ── Language Selector ── */}
      <div style={sb.langWrap} onClick={() => setLangOpen(o => !o)}>
        <Globe size={13} color="#536273" />
        <span style={sb.langLabel}>{currentLangObj?.native || 'English'}</span>
        <ChevronDown size={12} color="#8292A2" style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }} />
      </div>
      {langOpen && (
        <div style={sb.langDropdown}>
          {LANGUAGES.map(l => (
            <div
              key={l.code}
              onClick={() => { changeLanguage(l.code); setLangOpen(false); }}
              style={{
                ...sb.langOption,
                background: lang === l.code ? '#EAF5FB' : 'transparent',
                color: lang === l.code ? '#1199D4' : '#374151',
                fontWeight: lang === l.code ? 700 : 400,
              }}
            >
              <span>{l.native}</span>
              <span style={{ fontSize: 11, color: '#8292A2' }}>{l.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Online Status ── */}
      <div style={sb.onlinePill}>
        <Cloud size={12} color="#FFFFFF" />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>Online</span>
        <span style={sb.liveDot} />
      </div>

      {/* ── Navigation ── */}
      <nav style={sb.nav}>
        <ul style={sb.navList}>
          {uniqueKeyedItems.map(item => {
            const Icon = item.icon;
            const showBadge = item.badge && alertCount > 0;
            return (
              <li key={item._key}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  style={({ isActive }) => ({
                    ...sb.navLink,
                    background: isActive ? '#1199D4' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#374151',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={16} color={isActive ? '#FFFFFF' : '#536273'} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t(item.label)}
                      </span>
                      {showBadge && (
                        <span style={{
                          ...sb.badge,
                          background: isActive ? 'rgba(255,255,255,0.25)' : '#FEF2F2',
                          color: isActive ? '#FFF' : '#E52B2B',
                        }}>
                          {String(alertCount).padStart(2, '0')}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── User Block (pinned bottom) ── */}
      <div style={sb.userFooter}>
        <div style={{ ...sb.avatar, background: roleColor }}>
          {avatarInitial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2933', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontSize: 11, color: '#536273', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email || ''}
          </div>
          {/* Role badge pill */}
          <div style={{ ...sb.roleBadge, borderColor: roleColor, color: roleColor }}>
            <Shield size={9} color={roleColor} />
            <span>{roleInfo?.name || 'Authority'}</span>
          </div>
        </div>
        <button onClick={handleLogout} title={t('logout')} style={sb.logoutBtn}>
          <LogOut size={14} color="#8292A2" />
        </button>
      </div>
    </aside>
  );
}

const sb = {
  sidebar: {
    width: 240,
    minWidth: 240,
    background: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    fontFamily: "'Inter', system-ui, sans-serif",
    overflowY: 'auto',
  },
  brand: {
    padding: '22px 18px 14px',
    borderBottom: '1px solid #F3F4F6',
  },
  brandName: {
    fontSize: 17,
    fontWeight: 800,
    color: '#1199D4',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  brandSub: {
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 1.4,
    marginTop: 4,
  },
  langWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    margin: '12px 12px 0',
    padding: '7px 10px',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    cursor: 'pointer',
    background: '#FAFAFA',
    userSelect: 'none',
    position: 'relative',
  },
  langLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
  },
  langDropdown: {
    margin: '4px 12px 0',
    border: '1px solid #E5E7EB',
    borderRadius: 10,
    background: '#FFFFFF',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    zIndex: 100,
    maxHeight: 220,
    overflowY: 'auto',
  },
  langOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: 12.5,
    borderBottom: '1px solid #F3F4F6',
    transition: 'background 0.1s',
  },
  onlinePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    margin: '10px 12px 0',
    padding: '5px 10px',
    background: '#1199D4',
    borderRadius: 20,
    width: 'fit-content',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#86EFAC',
    display: 'inline-block',
    animation: 'pulse-ring 2s infinite',
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    padding: '14px 10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    minHeight: 40,
    padding: '0 10px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 13.5,
    fontWeight: 600,
    transition: 'all 0.12s ease',
  },
  badge: {
    marginLeft: 'auto',
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: 10,
    flexShrink: 0,
  },
  userFooter: {
    padding: '12px 14px',
    borderTop: '1px solid #F3F4F6',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 0,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 2,
  },
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
    padding: '2px 7px',
    border: '1px solid',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 700,
    background: '#FFFFFF',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
};
