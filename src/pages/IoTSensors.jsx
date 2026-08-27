// IoTSensors.jsx — Dedicated IoT Hardware Monitoring Dashboard (AquaGuard-Style)
// Shows all 19 physical sensor components with live telemetry & ML dataset mode
import React, { useState, useEffect } from 'react';
import {
  Cpu, Camera, Globe, Thermometer, Compass, Radio, HardDrive, Clock,
  CloudRain, Zap, Battery, Wifi, Sun, Activity, AlertTriangle,
  CheckCircle, XCircle, RefreshCw, ToggleLeft, ToggleRight,
  Signal, Package, Database, Play
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── Hardware Component Registry ────────────────────────────────────────────
const HARDWARE_COMPONENTS = [
  {
    id: 'ESP32CAM',
    idx: 1,
    name: 'ESP32-CAM (OV3660)',
    category: 'Imaging',
    role: 'Slope image capture for visual anomaly detection',
    icon: Camera,
    iconColor: '#8B5CF6',
    bgColor: '#F5F3FF',
    status: 'ONLINE',
    liveValue: '1280×960 @ 2fps',
    unit: '',
    battery: 92,
    signal: -68,
    lastSeen: '00:12 IST',
    specs: 'OV3660 CMOS · 3MP · Night-mode IR',
    nodeId: 'CAM-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Southern Highway Gorge, East Khasi'
  },
  {
    id: 'ESP32DEV',
    idx: 2,
    name: 'ESP32 DevKit V1 (WROOM-32)',
    category: 'Controller',
    role: 'Main MCU — orchestrates all sensor data acquisition & LoRa uplink',
    icon: Cpu,
    iconColor: '#0891B2',
    bgColor: '#ECFEFF',
    status: 'ONLINE',
    liveValue: '78°F CPU · 2.4GHz',
    unit: '',
    battery: 88,
    signal: -55,
    lastSeen: '00:08 IST',
    specs: '240MHz dual-core · 4MB Flash · Wi-Fi + BLE',
    nodeId: 'MCU-NER-001',
    latitude: 25.580,
    longitude: 91.884,
    location: 'Southern Highway Gorge, East Khasi'
  },
  {
    id: 'SoilMoisture',
    idx: 3,
    name: 'Soil Moisture Sensor V2.0',
    category: 'Geotechnical',
    role: 'Measures volumetric soil moisture — triggers saturation alerts',
    icon: Thermometer,
    iconColor: '#16A34A',
    bgColor: '#F0FDF4',
    status: 'CRITICAL',
    liveValue: '87',
    unit: '%',
    battery: 71,
    signal: -72,
    lastSeen: '00:03 IST',
    specs: 'Capacitive V2.0 · 0–100% VWC · 3.3V',
    nodeId: 'SM-NER-004',
    latitude: 25.571,
    longitude: 91.877,
    location: 'Eastern Slope Sector, East Khasi'
  },
  {
    id: 'GPS',
    idx: 4,
    name: 'NEO-6M GPS (GY-GPS6MV2)',
    category: 'Location',
    role: 'Geo-tags every sensor reading with accurate coordinates',
    icon: Globe,
    iconColor: '#F59E0B',
    bgColor: '#FFFBEB',
    status: 'ONLINE',
    liveValue: '25.578°N · 91.883°E',
    unit: '',
    battery: 95,
    signal: -62,
    lastSeen: '00:15 IST',
    specs: 'UART · ±2.5m accuracy · NMEA 0183',
    nodeId: 'GPS-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Northern Corridor, Ri Bhoi'
  },
  {
    id: 'BME280',
    idx: 5,
    name: 'BME280 Environmental Sensor',
    category: 'Meteorological',
    role: 'Temperature, humidity & atmospheric pressure for rainfall correlation',
    icon: Thermometer,
    iconColor: '#2563EB',
    bgColor: '#EFF6FF',
    status: 'ONLINE',
    liveValue: '26.4°C · 91% RH',
    unit: '',
    battery: 83,
    signal: -60,
    lastSeen: '00:06 IST',
    specs: 'I²C/SPI · ±0.5°C · 300–1100 hPa · ±3% RH',
    nodeId: 'BME-NER-007',
    latitude: 25.565,
    longitude: 91.868,
    location: 'Mawsynram East, East Khasi'
  },
  {
    id: 'MPU6050',
    idx: 6,
    name: 'MPU6050 IMU (Tilt / Vibration)',
    category: 'Geotechnical',
    role: 'Slope tilt & ground vibration — key displacement early-warning sensor',
    icon: Activity,
    iconColor: '#DC2626',
    bgColor: '#FEF2F2',
    status: 'WARNING',
    liveValue: '3.8°',
    unit: ' tilt',
    battery: 66,
    signal: -74,
    lastSeen: '00:02 IST',
    specs: 'I²C · 3-axis ±2g accel · 3-axis ±250°/s gyro',
    nodeId: 'MPU-NER-009',
    latitude: 25.563,
    longitude: 91.865,
    location: 'Seng Khasi Valley, East Khasi'
  },
  {
    id: 'LoRa02',
    idx: 7,
    name: 'LoRa-02 with Antenna',
    category: 'Communication',
    role: 'Long-range (up to 10 km) uplink to gateway — operates without cellular',
    icon: Radio,
    iconColor: '#7C3AED',
    bgColor: '#F5F3FF',
    status: 'ONLINE',
    liveValue: '-58 dBm RSSI',
    unit: '',
    battery: 79,
    signal: -58,
    lastSeen: '00:09 IST',
    specs: '433/868/915 MHz · SF7-12 · 10 km LOS · SX1276',
    nodeId: 'LORA-NER-001',
    latitude: 25.590,
    longitude: 91.890,
    location: 'Gateway Hub, Nongpoh, Ri Bhoi'
  },
  {
    id: 'SDCard',
    idx: 8,
    name: 'SD Card Module (Local Storage)',
    category: 'Storage',
    role: 'Buffers all sensor readings locally during network outages',
    icon: HardDrive,
    iconColor: '#0F766E',
    bgColor: '#F0FDFA',
    status: 'ONLINE',
    liveValue: '4.2 GB free',
    unit: '',
    battery: 90,
    signal: null,
    lastSeen: '00:10 IST',
    specs: 'SPI · FAT32 · 16GB MicroSD · Write-ahead log',
    nodeId: 'SD-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Southern Highway Gorge, East Khasi'
  },
  {
    id: 'RTC',
    idx: 9,
    name: 'RTC DS3231 (Time Module)',
    category: 'Timing',
    role: 'Provides drift-free accurate timestamps for all logged sensor events',
    icon: Clock,
    iconColor: '#9333EA',
    bgColor: '#FAF5FF',
    status: 'ONLINE',
    liveValue: '14:28:51 IST',
    unit: '',
    battery: 98,
    signal: null,
    lastSeen: '00:01 IST',
    specs: 'I²C · ±2 ppm accuracy · Temp-compensated TCXO',
    nodeId: 'RTC-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Southern Highway Gorge, East Khasi'
  },
  {
    id: 'RainSensor',
    idx: 10,
    name: 'Rain Sensor FC-37',
    category: 'Meteorological',
    role: 'Detects onset and intensity of rainfall in real time',
    icon: CloudRain,
    iconColor: '#1D4ED8',
    bgColor: '#EFF6FF',
    status: 'CRITICAL',
    liveValue: 'Heavy · 187 mm/24h',
    unit: '',
    battery: 74,
    signal: -70,
    lastSeen: '00:04 IST',
    specs: 'Analog + Digital · FC-37 · 5V · Threshold adjustable',
    nodeId: 'RAIN-NER-002',
    latitude: 25.576,
    longitude: 91.881,
    location: 'Cherrapunji South, East Khasi'
  },
  {
    id: 'XL6009',
    idx: 11,
    name: 'DC-DC Boost XL6009 (Step-Up)',
    category: 'Power',
    role: 'Boosts solar panel / battery voltage to stable 5V/12V for sensors',
    icon: Zap,
    iconColor: '#D97706',
    bgColor: '#FFFBEB',
    status: 'ONLINE',
    liveValue: '12.1V out',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '00:30 IST',
    specs: 'XL6009 · Vin 3–32V · Vout 5–35V · 4A max',
    nodeId: 'PWR-XL-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Enclosure Box, Node Alpha'
  },
  {
    id: 'LM2596',
    idx: 12,
    name: 'DC-DC Buck LM2596 (Step-Down)',
    category: 'Power',
    role: 'Steps down 12V to 3.3V for MCU and sensor rail protection',
    icon: Zap,
    iconColor: '#B45309',
    bgColor: '#FEF3C7',
    status: 'ONLINE',
    liveValue: '3.31V out',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '00:30 IST',
    specs: 'LM2596 · Vin 4–40V · Vout 1.23–37V · 3A max',
    nodeId: 'PWR-BK-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Enclosure Box, Node Alpha'
  },
  {
    id: 'Battery',
    idx: 13,
    name: 'LiFePO₄ Battery Pack',
    category: 'Power',
    role: 'Primary power source; supports 72h operation without solar',
    icon: Battery,
    iconColor: '#15803D',
    bgColor: '#F0FDF4',
    status: 'ONLINE',
    liveValue: '88%',
    unit: ' SoC',
    battery: 88,
    signal: null,
    lastSeen: '00:05 IST',
    specs: '18650 LiFePO₄ · 3.2V · 6000mAh · BMS protected',
    nodeId: 'BAT-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Enclosure Box, Node Alpha'
  },
  {
    id: 'BatteryHolder',
    idx: 14,
    name: 'Battery Holder & Connector',
    category: 'Assembly',
    role: 'Waterproof 18650 battery housing with 2-pin JST-PH connector',
    icon: Package,
    iconColor: '#6B7280',
    bgColor: '#F9FAFB',
    status: 'ONLINE',
    liveValue: 'Nominal',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '—',
    specs: '2×18650 parallel · IP65 rated · Anti-shock mount',
    nodeId: 'HOLD-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Enclosure Box, Node Alpha'
  },
  {
    id: 'ChargingModule',
    idx: 15,
    name: 'Solar Charging Module (TP4056)',
    category: 'Power',
    role: 'MPPT-based solar charging with overcharge/discharge protection',
    icon: Sun,
    iconColor: '#F59E0B',
    bgColor: '#FFFBEB',
    status: 'ONLINE',
    liveValue: '18V → 12V MPPT',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '00:20 IST',
    specs: 'TP4056 + DW01 · 4.2V CC/CV · 1A max charge · 4W panel',
    nodeId: 'CHG-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Solar Mast, Node Alpha'
  },
  {
    id: 'SolarPanel',
    idx: 16,
    name: 'Solar Panel (5W Monocrystalline)',
    category: 'Power',
    role: 'Off-grid renewable power — provides 5W peak in NER monsoon conditions',
    icon: Sun,
    iconColor: '#F97316',
    bgColor: '#FFF7ED',
    status: 'ONLINE',
    liveValue: '4.1W · 18.2V',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '00:25 IST',
    specs: '5W peak · 18V Voc · Monocrystalline · IP67 frame',
    nodeId: 'SOL-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Solar Mast, Node Alpha (1.5m height)'
  },
  {
    id: 'PCB',
    idx: 17,
    name: 'Custom PCB Board',
    category: 'Assembly',
    role: 'Integrates all sensor breakout boards, headers, and power regulation',
    icon: Cpu,
    iconColor: '#374151',
    bgColor: '#F9FAFB',
    status: 'ONLINE',
    liveValue: 'All rails OK',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '—',
    specs: '2-layer · FR4 · 5V & 3.3V rails · JST + 2.54mm headers',
    nodeId: 'PCB-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Enclosure Box, Node Alpha'
  },
  {
    id: 'Enclosure',
    idx: 18,
    name: 'IP66 Enclosure Box + Cable Glands',
    category: 'Assembly',
    role: 'Weatherproof housing protecting electronics against NER monsoon rainfall',
    icon: Package,
    iconColor: '#475569',
    bgColor: '#F8FAFC',
    status: 'ONLINE',
    liveValue: 'Sealed · 28°C inside',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '00:10 IST',
    specs: 'IP66 ABS · 200×150×80mm · PG-9/PG-11 glands · Silica gel',
    nodeId: 'BOX-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'Ground mount, Node Alpha'
  },
  {
    id: 'Wiring',
    idx: 19,
    name: 'Ribbon Wire & 2/3-Pin Connectors',
    category: 'Assembly',
    role: 'Stranded 24AWG ribbon wire & KF2510 connectors for field-replaceable links',
    icon: Wifi,
    iconColor: '#64748B',
    bgColor: '#F1F5F9',
    status: 'ONLINE',
    liveValue: 'No faults',
    unit: '',
    battery: null,
    signal: null,
    lastSeen: '—',
    specs: '24AWG · UL2651 ribbon · 2-pin & 3-pin JST-XH · 300V rated',
    nodeId: 'WIR-NER-001',
    latitude: 25.578,
    longitude: 91.883,
    location: 'All nodes (internal)'
  }
];

// ML Dataset mock info
const ML_DATASET_INFO = {
  records: 142830,
  features: 23,
  trainSplit: '80/20',
  accuracy: '94.7%',
  precision: '92.1%',
  recall: '96.3%',
  lastTrained: '2026-08-22',
  model: 'XGBoost + Random Forest Ensemble',
  datasets: [
    { name: 'GSI Historical Landslide Repository', records: '78,200', coverage: 'NER 1971–2024' },
    { name: 'IMD AWS Rainfall Archive', records: '34,500', coverage: 'Daily · 52 stations' },
    { name: 'SRTM / CartoSAT-1 DEM', records: '12,400 tiles', coverage: '1 arc-sec resolution' },
    { name: 'NDVI / Vegetation Cover (MODIS)', records: '17,730', coverage: 'Monthly 250m' },
  ]
};

const CATEGORY_COLORS = {
  Imaging: '#8B5CF6',
  Controller: '#0891B2',
  Geotechnical: '#16A34A',
  Location: '#F59E0B',
  Meteorological: '#2563EB',
  Communication: '#7C3AED',
  Storage: '#0F766E',
  Timing: '#9333EA',
  Power: '#D97706',
  Assembly: '#6B7280',
};

function StatusDot({ status, t }) {
  const colors = { ONLINE: '#16A34A', CRITICAL: '#DC2626', WARNING: '#D97706', OFFLINE: '#9CA3AF' };
  const color = colors[status] || '#9CA3AF';
  const label = t ? (t(status.toLowerCase()) || status) : status;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: color + '15', color,
      border: `1px solid ${color}40`
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: color,
        boxShadow: status === 'ONLINE' ? `0 0 0 2px ${color}30` : 'none'
      }} />
      {label}
    </span>
  );
}

function SignalBar({ dbm, t }) {
  if (dbm === null) return <span style={{ color: '#9CA3AF', fontSize: 12 }}>N/A</span>;
  const strengthKey = dbm > -65 ? 'strong' : dbm > -80 ? 'fair' : 'weak';
  const strength = t ? (t(strengthKey) || strengthKey) : strengthKey;
  const color = dbm > -65 ? '#16A34A' : dbm > -80 ? '#D97706' : '#DC2626';
  return <span style={{ fontSize: 12, color, fontWeight: 600 }}>{dbm} dBm · {strength}</span>;
}

function BatteryBar({ value }) {
  if (value === null) return <span style={{ color: '#9CA3AF', fontSize: 12 }}>—</span>;
  const color = value > 50 ? '#16A34A' : value > 20 ? '#D97706' : '#DC2626';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 44, height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color }}>{value}%</span>
    </div>
  );
}

export default function IoTSensors() {
  const { t } = useLanguage();
  const [mode, setMode] = useState('iot'); // 'iot' | 'dataset' | 'both'
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveToggle, setLiveToggle] = useState(true);

  const categories = ['ALL', ...Array.from(new Set(HARDWARE_COMPONENTS.map(c => c.category)))];
  const statuses = ['ALL', 'ONLINE', 'WARNING', 'CRITICAL', 'OFFLINE'];

  const filtered = HARDWARE_COMPONENTS.filter(c => {
    const catOk = categoryFilter === 'ALL' || c.category === categoryFilter;
    const stOk = statusFilter === 'ALL' || c.status === statusFilter;
    return catOk && stOk;
  });

  const stats = {
    total: HARDWARE_COMPONENTS.length,
    online: HARDWARE_COMPONENTS.filter(c => c.status === 'ONLINE').length,
    warning: HARDWARE_COMPONENTS.filter(c => c.status === 'WARNING').length,
    critical: HARDWARE_COMPONENTS.filter(c => c.status === 'CRITICAL').length,
    offline: HARDWARE_COMPONENTS.filter(c => c.status === 'OFFLINE').length,
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => { setIsRefreshing(false); setLastRefresh(new Date()); }, 1200);
  };

  useEffect(() => {
    if (!liveToggle) return;
    const interval = setInterval(() => setLastRefresh(new Date()), 15000);
    return () => clearInterval(interval);
  }, [liveToggle]);

  return (
    <div className="content-area">
      {/* ── Page Header ── */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Cpu size={22} color="var(--primary)" />
            {t('iotSensorsPage')}
          </h1>
          <p>{t('iotSensorsDesc')}</p>
        </div>
        <div className="page-actions-group">
          {/* Live toggle */}
          <button
            onClick={() => setLiveToggle(!liveToggle)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 14px', borderRadius: 8, border: '1px solid',
              borderColor: liveToggle ? '#16A34A' : '#E5E7EB',
              background: liveToggle ? '#F0FDF4' : '#F9FAFB',
              color: liveToggle ? '#16A34A' : '#6B7280',
              fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}
          >
            {liveToggle ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
            {liveToggle ? t('liveReading') : t('simulatedData')}
          </button>
          <button onClick={handleRefresh}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid #E5E7EB', background: '#F9FAFB', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
            <RefreshCw size={14} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            {t('refreshData')}
          </button>
        </div>
      </div>



      {/* ── KPI Strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: t('totalSensors'), value: stats.total, color: '#1D4ED8', icon: Cpu },
          { label: t('activeSensors'), value: stats.online, color: '#16A34A', icon: CheckCircle },
          { label: t('warning'), value: stats.warning, color: '#D97706', icon: AlertTriangle },
          { label: t('critical'), value: stats.critical, color: '#DC2626', icon: XCircle },
          { label: t('offlineSensors'), value: stats.offline, color: '#9CA3AF', icon: XCircle },
        ].map((kpi, i) => {
          const KIcon = kpi.icon;
          return (
            <div key={i} className="clean-card" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <KIcon size={15} color={kpi.color} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* ── IoT Hardware Component Table ── */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Signal size={18} color="var(--primary)" />
              <h3>{t('iotSensorsTitle')} — {HARDWARE_COMPONENTS.length} {t('devices')}</h3>
            </div>
            <p>ESP32 DevKit V1 + CAM · Soil Moisture V2.0 · NEO-6M GPS · BME280 · MPU6050 · LoRa-02 · DS3231 · FC-37 Rain · Solar + Power Stack</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginRight: 4 }}>{t('category')}:</span>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${categoryFilter === cat ? (CATEGORY_COLORS[cat] || '#1D4ED8') : '#E5E7EB'}`,
                  background: categoryFilter === cat ? (CATEGORY_COLORS[cat] || '#1D4ED8') + '15' : '#FAFAFA',
                  color: categoryFilter === cat ? (CATEGORY_COLORS[cat] || '#1D4ED8') : '#6B7280'
                }}
              >{cat === 'ALL' ? t('all') : (t(cat.toLowerCase()) || cat)}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginRight: 4 }}>{t('status')}:</span>
            {statuses.map(st => (
              <button key={st} onClick={() => setStatusFilter(st)}
                style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  border: `1px solid ${statusFilter === st ? '#1D4ED8' : '#E5E7EB'}`,
                  background: statusFilter === st ? '#EFF6FF' : '#FAFAFA',
                  color: statusFilter === st ? '#1D4ED8' : '#6B7280'
                }}
              >{st === 'ALL' ? t('all') : (t(st.toLowerCase()) || st)}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th style={{ width: 32 }}>#</th>
                <th>{t('component')}</th>
                <th>{t('category')}</th>
                <th>{t('status')}</th>
                <th>{t('liveReading')}</th>
                <th>{t('battery')}</th>
                <th>{t('loraSignal')}</th>
                <th>{t('nodeId')}</th>
                <th>{t('location')}</th>
                <th>{t('lastSeen')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(comp => {
                const CompIcon = comp.icon;
                return (
                  <tr
                    key={comp.id}
                    onClick={() => setSelectedComponent(selectedComponent?.id === comp.id ? null : comp)}
                    style={{ cursor: 'pointer', background: selectedComponent?.id === comp.id ? '#F0F9FF' : 'transparent' }}
                  >
                    <td style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 700, textAlign: 'center' }}>{comp.idx}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: comp.bgColor, flexShrink: 0
                        }}>
                          <CompIcon size={15} color={comp.iconColor} />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{t(comp.name) || comp.name}</div>
                          <div style={{ fontSize: 11, color: '#6B7280' }}>{t(comp.role) || comp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                        background: (CATEGORY_COLORS[comp.category] || '#6B7280') + '15',
                        color: CATEGORY_COLORS[comp.category] || '#6B7280',
                        border: `1px solid ${(CATEGORY_COLORS[comp.category] || '#6B7280')}30`
                      }}>{t(comp.category.toLowerCase()) || comp.category}</span>
                    </td>
                    <td><StatusDot status={comp.status} t={t} /></td>
                    <td>
                      <span style={{
                        fontSize: 13, fontWeight: 800,
                        color: comp.status === 'CRITICAL' ? '#DC2626' : comp.status === 'WARNING' ? '#D97706' : '#1F2937'
                      }}>
                        {comp.liveValue}{comp.unit}
                      </span>
                    </td>
                    <td><BatteryBar value={comp.battery} /></td>
                    <td><SignalBar dbm={comp.signal} t={t} /></td>
                    <td className="code-cell" style={{ fontSize: 11 }}>{comp.nodeId}</td>
                    <td style={{ fontSize: 12 }}>
                      <div style={{ fontWeight: 600 }}>{t(comp.location.split(',')[0].trim())}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{comp.location.split(',').slice(1).map(p => t(p.trim())).join(', ')}</div>
                    </td>
                    <td style={{ fontSize: 12, color: '#6B7280' }}>{comp.lastSeen}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expanded Detail Panel */}
        {selectedComponent && (
          <div style={{
            marginTop: 16, padding: '18px 20px',
            background: 'linear-gradient(135deg, #F0F9FF, #EFF6FF)',
            border: '1px solid #BAE6FD', borderRadius: 10
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: selectedComponent.bgColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <selectedComponent.icon size={22} color={selectedComponent.iconColor} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1F2937' }}>{t(selectedComponent.name) || selectedComponent.name}</div>
                  <StatusDot status={selectedComponent.status} t={t} />
                </div>
              </div>
              <button onClick={() => setSelectedComponent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9CA3AF' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { label: t('nodeId'), value: selectedComponent.nodeId },
                { label: t('specs'), value: selectedComponent.specs },
                { label: t('location'), value: selectedComponent.location.split(',').map(p => t(p.trim())).join(', ') },
                { label: t('coordinates'), value: `${selectedComponent.latitude}°N, ${selectedComponent.longitude}°E` },
                { label: t('role'), value: t(selectedComponent.role) || selectedComponent.role },
                { label: t('category'), value: t(selectedComponent.category.toLowerCase()) || selectedComponent.category },
              ].map((d, i) => (
                <div key={i} style={{ padding: '10px 12px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E0F2FE' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#0891B2', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-ring { 0%, 100% { box-shadow: 0 0 0 2px rgba(6,182,212,0.2); } 50% { box-shadow: 0 0 0 5px rgba(6,182,212,0.1); } }
      `}</style>
    </div>
  );
}
