// Sidebar.jsx — AquaGuard-Exact Sidebar for LandSlideAlert AI
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Brain, CloudRain, Bell,
  Clipboard, Construction, Zap, FileText, Settings,
  LogOut, Globe, Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar({ alertCount = 5 }) {
  const { user, roleInfo, logout, hasPermission } = useAuth();
  const { lang, changeLanguage, t, LANGUAGES } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const navSections = [
    {
      items: [
        { path: '/', label: t('dashboard'), icon: LayoutDashboard, perm: 'dashboard' },
      ]
    },
    {
      items: [
        { path: '/map', label: t('riskMap'), icon: Map, perm: 'map' },
        { path: '/ai', label: t('aiRiskAnalysis'), icon: Brain, perm: 'ai' },
        { path: '/iot-sensors', label: t('iotSensorsNav'), icon: Radio, perm: 'iot_sensors' },
        { path: '/alerts', label: t('alertsWarnings'), icon: Bell, perm: 'alerts', badge: alertCount },
        { path: '/field-reports', label: t('fieldReports'), icon: Clipboard, perm: 'field_reports' },
        { path: '/roads-villages', label: t('roadsVillages'), icon: Construction, perm: 'roads_villages' },
        { path: '/emergency-response', label: t('emergencyResponse'), icon: Zap, perm: 'emergency_response' },
        { path: '/reports-history', label: t('reportsHistory'), icon: FileText, perm: 'reports_history' },
        { path: '/admin', label: t('administration'), icon: Settings, perm: 'admin' },
      ]
    },
  ];

  return (
    <aside style={sidebarStyles.sidebar}>
      {/* App Brand */}
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.brandName}>LANDSLIDE ALERT AI</div>
        <div style={sidebarStyles.brandSub}>
          AI-Based Early Warning &amp; Landslide Risk Monitoring for NER
        </div>
      </div>

      {/* Language Selector */}
      <div style={sidebarStyles.langWrap}>
        <Globe size={14} color="#536273" />
        <select
          value={lang}
          onChange={e => changeLanguage(e.target.value)}
          style={sidebarStyles.langSelect}
        >
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.native}</option>)}
        </select>
      </div>

      {/* Online status badge */}
      <div style={sidebarStyles.onlineBadge}>
        <span style={sidebarStyles.onlineDot} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0891B2' }}>Online</span>
      </div>

      {/* Navigation */}
      <nav style={sidebarStyles.nav}>
        {navSections.map((section, si) => (
          <ul key={si} style={sidebarStyles.navList}>
            {section.items.filter(it => hasPermission(it.perm)).map(item => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    style={({ isActive }) => ({
                      ...sidebarStyles.navLink,
                      background: isActive ? '#1199D4' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#374151',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={16} color={isActive ? '#FFFFFF' : '#536273'} style={{ flexShrink: 0 }} />
                        <span>{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <span style={{
                            ...sidebarStyles.badge,
                            background: isActive ? 'rgba(255,255,255,0.25)' : '#FEF2F2',
                            color: isActive ? '#FFF' : '#E52B2B',
                          }}>
                            {String(item.badge).padStart(2, '0')}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ))}
      </nav>

      {/* User Footer */}
      <div style={sidebarStyles.userFooter}>
        <div style={sidebarStyles.avatar}>
          {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2933', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name || 'Charumithra C.'}
          </div>
          <div style={{ fontSize: 11, color: '#536273', marginTop: 1 }}>
            {roleInfo?.name || 'District Authority'}
          </div>
        </div>
        <button
          onClick={handleLogout}
          title={t('logout')}
          style={sidebarStyles.logoutBtn}
        >
          <LogOut size={14} color="#8292A2" />
        </button>
      </div>
    </aside>
  );
}

const sidebarStyles = {
  sidebar: {
    width: 210,
    minWidth: 210,
    background: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  brand: {
    padding: '20px 16px 14px',
    borderBottom: '1px solid #F3F4F6',
  },
  brandName: {
    fontSize: 15,
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
  },
  langSelect: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    cursor: 'pointer',
    outline: 'none',
  },
  onlineBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    margin: '10px 12px 0',
    padding: '4px 10px',
    background: '#ECFEFF',
    border: '1px solid #A5F3FC',
    borderRadius: 20,
    width: 'fit-content',
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#06B6D4',
    display: 'inline-block',
    boxShadow: '0 0 0 2px rgba(6,182,212,0.2)',
    animation: 'pulse-ring 2s infinite',
  },
  nav: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 10px',
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
    height: 38,
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
  },
  userFooter: {
    padding: '12px 14px',
    borderTop: '1px solid #F3F4F6',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#1199D4',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
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
  },
};
