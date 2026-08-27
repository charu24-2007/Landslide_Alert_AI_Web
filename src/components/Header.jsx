import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, RefreshCw, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ district, onDistrictChange, alertCount = 0, lastUpdated }) {
  const { user, roleInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || 'U';

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="top-header">
      {/* Brand Mark */}
      <div className="header-identity">
        <div className="header-mark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
          </svg>
        </div>
        <div className="header-brand">
          <span className="hb-name">LandSlide Alert AI</span>
          <span className="hb-sub">Ministry of DoNER · Disaster Management Dashboard</span>
        </div>
      </div>

      <div className="header-sep" />

      {/* District Selector */}
      <div className="district-select">
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>District:</span>
        <select value={district} onChange={e => onDistrictChange(e.target.value)}>
          <option value="all">All Districts</option>
          <option value="East Khasi Hills">East Khasi Hills</option>
          <option value="West Khasi Hills">West Khasi Hills</option>
          <option value="Ri-Bhoi">Ri-Bhoi</option>
          <option value="Jaintia Hills">Jaintia Hills</option>
          <option value="West Garo Hills">West Garo Hills</option>
          <option value="North Cachar Hills">North Cachar Hills</option>
          <option value="North Tripura">North Tripura</option>
        </select>
      </div>

      <div className="header-spacer" />

      {/* Right Controls */}
      <div className="header-right">
        {/* Live Status */}
        <div className="status-pill">
          <div className="status-dot" />
          <span>Live</span>
        </div>

        {/* Last updated */}
        {lastUpdated && (
          <div className="status-pill" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <RefreshCw size={10} />
            <span>{lastUpdated}</span>
          </div>
        )}

        {/* Alert Pill */}
        {alertCount > 0 && (
          <div className="alerts-pill" onClick={() => navigate('/alerts')}>
            <Bell size={11} />
            <span>{alertCount} Active</span>
          </div>
        )}

        {/* User Menu */}
        <div className="user-menu" onClick={() => setMenuOpen(!menuOpen)} ref={menuRef}>
          <div className="user-avatar" style={{ background: roleInfo?.color || 'var(--blue)' }}>{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{roleInfo?.name}</span>
          </div>
          <ChevronDown size={12} color="var(--text-muted)" />

          {menuOpen && (
            <div className="user-dropdown" onClick={e => e.stopPropagation()}>
              <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--text-muted)' }}>
                {user?.email}
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => { navigate('/admin'); setMenuOpen(false); }}>
                <Settings size={13} /><span>Admin Panel</span>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={13} /><span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
