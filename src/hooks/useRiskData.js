// Custom React hooks for LandSlideAlert AI
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';

export { useAuth };

export function useRiskData(district = 'all') {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getRiskZones(district).then(data => {
      if (mounted) {
        setZones(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [district]);

  return { zones, loading };
}

export function useSensors(filter = 'ALL') {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getSensors(filter).then(data => {
      if (mounted) {
        setSensors(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [filter]);

  return { sensors, loading };
}

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = () => {
    api.getAlerts().then(data => {
      setAlerts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAlerts();
    window.addEventListener('alertsUpdated', fetchAlerts);
    return () => window.removeEventListener('alertsUpdated', fetchAlerts);
  }, []);

  return { alerts, loading, refreshAlerts: fetchAlerts };
}
