import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Brain, CloudRain, Radio, Bell,
  Construction, Home, FileText, Clipboard, Zap, History,
  BarChart2, Settings, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { group: 'Overview', items: [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, perm: 'dashboard' },
    { path: '/map', label: 'Risk Map', icon: Map, perm: 'map' },
    { path: '/ai', label: 'AI Risk Analysis', icon: Brain, perm: 'ai' },
  ]},
  { group: 'Monitoring', items: [
    { path: '/weather', label: 'Weather', icon: CloudRain, perm: 'weather' },
    { path: '/sensors', label: 'Sensor Network', icon: Radio, perm: 'sensors' },
    { path: '/alerts', label: 'Alerts', icon: Bell, perm: 'alerts', badge: true },
  ]},
  { group: 'Impact', items: [
    { path: '/infrastructure', label: 'Infrastructure', icon: Construction, perm: 'infrastructure' },
    { path: '/villages', label: 'Villages', icon: Home, perm: 'villages' },
    { path: '/field', label: 'Field Reports', icon: Clipboard, perm: 'field' },
  ]},
  { group: 'Response', items: [
    { path: '/response', label: 'Response', icon: Zap, perm: 'response' },
    { path: '/historical', label: 'Historical', icon: History, perm: 'historical' },
    { path: '/reports', label: 'Reports', icon: BarChart2, perm: 'reports' },
  ]},
  { group: 'System', items: [
    { path: '/admin', label: 'Admin', icon: Settings, perm: 'admin' },
  ]},
];

export default function Sidebar({ alertCount = 0 }) {
  const { user, roleInfo } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
          </svg>
        </div>
        <div className="sidebar-brand-text">
          <span className="brand-name">LandSlide Alert AI</span>
          <span className="brand-sub">NER · SIH26001</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(section => (
          <div key={section.group}>
            <div className="nav-section-label">{section.group}</div>
            {section.items.map(item => {
              const Icon = item.icon;
              const canAccess = user?.role === 'authority' || !item.perm;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  style={!canAccess && user?.role !== 'authority' ? { opacity: 0.45, pointerEvents: 'none' } : {}}
                >
                  <Icon size={15} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && alertCount > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--critical-bg)', color: 'var(--critical)', padding: '1px 4px', borderRadius: 3 }}>
                      {alertCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div style={{ marginBottom: 4, fontWeight: 600, color: 'var(--text-secondary)' }}>{user?.name}</div>
        <div>{roleInfo?.name}</div>
        <div style={{ marginTop: 4, color: 'var(--text-muted)' }}>{user?.district}</div>
      </div>
    </aside>
  );
}
