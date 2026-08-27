// KPIRow.jsx — AquaGuard-Exact Pastel KPI Cards for LandSlideAlert AI with Full Multilingual Support
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Layers, Radio, Construction } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KPIRow({ alertCount = 4 }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const kpiData = [
    {
      id: 'risk',
      label: t('overallRiskLevel'),
      value: t('high').toUpperCase(),
      sub: `${t('riskScore')}: 78 / 100 • ${t('increasing')}`,
      color: '#F97316',       // orange
      bg: '#FFF7ED',
      border: '#FED7AA',
      icon: TrendingUp,
      iconColor: '#F97316',
      path: '/ai'
    },
    {
      id: 'alerts',
      label: t('activeAlerts'),
      value: String(alertCount),
      sub: `${t('critical')}: 1 • ${t('high')}: 3 • ${t('moderate')}: 2`,
      color: '#E52B2B',
      bg: '#FEF2F2',
      border: '#FECACA',
      icon: AlertTriangle,
      iconColor: '#EF4444',
      path: '/alerts'
    },
    {
      id: 'zones',
      label: t('highRiskZones'),
      value: '12',
      sub: `${t('critical')}: 3 • ${t('high')}: 9 • ${t('monitoring')}: 18`,
      color: '#1199D4',
      bg: '#EAF5FB',
      border: '#BDE5F7',
      icon: Layers,
      iconColor: '#0EA5E9',
      path: '/map'
    },
    {
      id: 'sensors',
      label: t('sensorNetwork'),
      value: '39 / 42',
      sub: `${t('online')}: 39 • ${t('offline')}: 3 • ${t('warning')}: 4`,
      color: '#16A34A',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      icon: Radio,
      iconColor: '#22C55E',
      path: '/iot-sensors'
    },
    {
      id: 'connectivity',
      label: t('connectivityAtRisk'),
      value: '07',
      sub: `${t('roads')}: 4 • ${t('bridges')}: 1 • ${t('blocked')}: 2`,
      color: '#7C3AED',
      bg: '#F5F3FF',
      border: '#DDD6FE',
      icon: Construction,
      iconColor: '#8B5CF6',
      path: '/roads-villages'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 14,
      marginBottom: 4,
    }}>
      {kpiData.map(kpi => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            onClick={() => navigate(kpi.path)}
            style={{
              background: kpi.bg,
              border: `1px solid ${kpi.border}`,
              borderRadius: 14,
              padding: '16px 18px',
              cursor: 'pointer',
              transition: 'transform 0.12s ease, box-shadow 0.12s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top row: label + icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#536273', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                {kpi.label}
              </span>
              <Icon size={20} color={kpi.iconColor} style={{ flexShrink: 0, opacity: 0.7 }} />
            </div>
            {/* Big metric */}
            <div style={{ fontSize: 28, fontWeight: 800, color: kpi.color, lineHeight: 1, letterSpacing: '-0.02em' }}>
              {kpi.value}
            </div>
            {/* Sub line */}
            <div style={{ fontSize: 11.5, color: '#536273', lineHeight: 1.4 }}>
              {kpi.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
