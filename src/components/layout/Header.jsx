// Header.jsx — AquaGuard-Exact Top Header for LandSlideAlert AI with Full Multilingual Support
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RefreshCw, MapPin, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Header({ district, onDistrictChange, alertCount = 4, onRefresh }) {
  const { user, roleInfo } = useAuth();
  const { t } = useLanguage();

  return (
    <header style={headerStyles.header}>
      {/* Page context / breadcrumb area */}
      <div style={headerStyles.left}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={14} color="#1199D4" />
          <select
            value={district}
            onChange={e => onDistrictChange(e.target.value)}
            style={headerStyles.districtSelect}
          >
            <option value="all">{t('allNERDistricts')}</option>
            <option value="East Khasi Hills">East Khasi Hills</option>
            <option value="West Khasi Hills">West Khasi Hills</option>
            <option value="Ri-Bhoi">Ri-Bhoi</option>
            <option value="Jaintia Hills">Jaintia Hills</option>
            <option value="West Garo Hills">West Garo Hills</option>
            <option value="North Cachar Hills">North Cachar Hills</option>
            <option value="North Tripura">North Tripura</option>
            <option value="East Sikkim">East Sikkim</option>
          </select>
        </div>
      </div>

      {/* Right side controls */}
      <div style={headerStyles.right}>
        {/* Last sync */}
        <div style={headerStyles.syncInfo}>
          <span style={{ color: '#9CA3AF', fontSize: 12 }}>{t('lastSync')}:</span>
          <span style={{ color: '#374151', fontWeight: 600, fontSize: 12 }}>14:32 IST</span>
        </div>

        {/* Refresh */}
        {onRefresh && (
          <button onClick={onRefresh} style={headerStyles.refreshBtn} title={t('refreshSystem')}>
            <RefreshCw size={14} color="#536273" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#536273' }}>{t('refreshSystem')}</span>
          </button>
        )}

        {/* Alert count pill */}
        <NavLink to="/alerts" style={headerStyles.alertPill}>
          <Bell size={13} />
          <span>{alertCount} {t('activeAlertsCount')}</span>
        </NavLink>

        {/* User info */}
        <div style={headerStyles.userInfo}>
          <div style={headerStyles.userAvatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2933', whiteSpace: 'nowrap' }}>
              {user?.name || 'Charumithra C.'}
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>
              {roleInfo?.name || t('districtAuthority')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const headerStyles = {
  header: {
    height: 60,
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    fontFamily: "'Inter', system-ui, sans-serif",
    gap: 20,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  districtSelect: {
    border: 'none',
    background: 'transparent',
    fontSize: 14,
    fontWeight: 700,
    color: '#1F2933',
    cursor: 'pointer',
    outline: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  syncInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 10px',
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    transition: 'all 0.12s ease',
  },
  alertPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 12px',
    background: '#FEF2F2',
    border: '1px solid #FACACA',
    borderRadius: 20,
    color: '#E52B2B',
    fontSize: 12,
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 14,
    borderLeft: '1px solid #E5E7EB',
  },
  userAvatar: {
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
};
