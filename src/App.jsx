// App.jsx — Master Router, Layout Shell & Role-Based Guard Wrappers
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RiskMap from './pages/RiskMap';
import AIRiskAnalysis from './pages/AIRiskAnalysis';
import WeatherSensors from './pages/WeatherSensors';
import Alerts from './pages/Alerts';
import FieldReports from './pages/FieldReports';
import RoadsVillages from './pages/RoadsVillages';
import EmergencyResponse from './pages/EmergencyResponse';
import ReportsHistory from './pages/ReportsHistory';
import Administration from './pages/Administration';
import IoTSensors from './pages/IoTSensors';
import AccessDenied from './pages/AccessDenied';
import InfrastructureImpact from './pages/InfrastructureImpact';

// Data
import { getAlerts } from './data/alerts';

// Protected Route Guard
function ProtectedRoute({ children, permission }) {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', color: 'var(--brand-navy)', fontWeight: 600 }}>
        Loading LandSlideAlert AI...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <AccessDenied />;
  }

  return children;
}

// App Layout Shell
function AppShell() {
  const { user } = useAuth();
  const [district, setDistrict] = useState('all');
  const [alerts, setAlerts] = useState(getAlerts());
  const location = useLocation();

  const fetchAlerts = () => setAlerts(getAlerts());

  useEffect(() => {
    fetchAlerts();
    window.addEventListener('alertsUpdated', fetchAlerts);
    return () => window.removeEventListener('alertsUpdated', fetchAlerts);
  }, []);

  const activeAlertCount = alerts.filter(a => a.status === 'Active').length;

  // On Login page, render standalone without sidebar/header
  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {/* Clean Navigation Sidebar */}
      <Sidebar alertCount={activeAlertCount} />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top 68px Header */}
        <Header
          district={district}
          onDistrictChange={setDistrict}
          alertCount={activeAlertCount}
          onRefresh={fetchAlerts}
        />

        {/* Dynamic Page Routes */}
        <Routes>
          <Route path="/" element={<ProtectedRoute permission="dashboard"><Dashboard district={district} /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute permission="map"><RiskMap district={district} /></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute permission="ai"><AIRiskAnalysis district={district} /></ProtectedRoute>} />
          <Route path="/iot-sensors" element={<ProtectedRoute permission="iot_sensors"><IoTSensors /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute permission="alerts"><Alerts /></ProtectedRoute>} />
          <Route path="/field-reports" element={<ProtectedRoute permission="field_reports"><FieldReports /></ProtectedRoute>} />
          <Route path="/roads-villages" element={<ProtectedRoute permission="roads_villages"><RoadsVillages district={district} /></ProtectedRoute>} />
          <Route path="/emergency-response" element={<ProtectedRoute permission="emergency_response"><EmergencyResponse /></ProtectedRoute>} />
          <Route path="/reports-history" element={<ProtectedRoute permission="reports_history"><ReportsHistory /></ProtectedRoute>} />
          <Route path="/infrastructure-impact" element={<ProtectedRoute permission="roads_villages"><InfrastructureImpact /></ProtectedRoute>} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Legacy & Shortcut Aliases */}
          <Route path="/weather-sensors" element={<Navigate to="/iot-sensors" replace />} />
          <Route path="/weather" element={<Navigate to="/iot-sensors" replace />} />
          <Route path="/sensors" element={<Navigate to="/iot-sensors" replace />} />
          <Route path="/infrastructure" element={<Navigate to="/roads-villages" replace />} />
          <Route path="/villages" element={<Navigate to="/roads-villages" replace />} />
          <Route path="/field" element={<Navigate to="/field-reports" replace />} />
          <Route path="/response" element={<Navigate to="/emergency-response" replace />} />
          <Route path="/historical" element={<Navigate to="/reports-history" replace />} />
          <Route path="/historical-analysis" element={<Navigate to="/reports-history" replace />} />
          <Route path="/reports" element={<Navigate to="/reports-history" replace />} />
          {/* Admin kept as hidden route but not in sidebar nav */}
          <Route path="/admin" element={<ProtectedRoute permission="admin"><Administration /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppShell />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
