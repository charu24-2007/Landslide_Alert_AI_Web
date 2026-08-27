// GISMap.jsx — Interactive React Leaflet Map for North Eastern Region (NER)
import React, { useEffect, useRef, useState } from 'react';
import { riskZones, getRiskColor } from '../../data/riskZones';
import { sensors } from '../../data/sensors';
import { roads } from '../../data/roads';
import { villages } from '../../data/villages';
import { historicalLandslides } from '../../data/historicalLandslides';
import { Layers, MapPin, Radio, Construction, Home, History } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const OSM_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TOPO_TILE = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
const SATELLITE_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

export default function GISMap({ district = 'all', selectedZone, onZoneSelect, height = 460 }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});
  const baseTileRef = useRef(null);

  const [mapReady, setMapReady] = useState(false);
  const [basemap, setBasemap] = useState('osm');
  const [showZones, setShowZones] = useState(true);
  const [showSensors, setShowSensors] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [showVillages, setShowVillages] = useState(true);
  const [showHistorical, setShowHistorical] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!window.L || mapInstanceRef.current || !mapContainerRef.current) return;

    const map = window.L.map(mapContainerRef.current, {
      center: [25.35, 91.58], // East Khasi Hills / Meghalaya central focus
      zoom: 10,
      zoomControl: true,
      attributionControl: false
    });

    baseTileRef.current = window.L.tileLayer(OSM_TILE, { maxZoom: 18 }).addTo(map);
    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (baseTileRef.current) {
      try { map.removeLayer(baseTileRef.current); } catch {}
    }

    const url = basemap === 'satellite' ? SATELLITE_TILE : basemap === 'topo' ? TOPO_TILE : OSM_TILE;
    baseTileRef.current = window.L.tileLayer(url, { maxZoom: 18 }).addTo(map);
    baseTileRef.current.bringToBack();
  }, [basemap, mapReady]);

  // Render Overlays
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear previous dynamic layers
    Object.values(layersRef.current).forEach(l => {
      try { map.removeLayer(l); } catch {}
    });
    layersRef.current = {};

    const filteredZones = district === 'all'
      ? riskZones
      : riskZones.filter(z => z.district.toLowerCase() === district.toLowerCase());

    // 1. Risk Zones & Polygons
    if (showZones) {
      filteredZones.forEach(zone => {
        const color = getRiskColor(zone.riskLevel);

        // Marker Pin
        const pinIcon = window.L.divIcon({
          className: '',
          html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2px solid #FFFFFF;box-shadow:0 1px 4px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = window.L.marker([zone.latitude, zone.longitude], { icon: pinIcon }).addTo(map);
        marker.on('click', () => onZoneSelect && onZoneSelect(zone));
        marker.bindTooltip(`
          <div style="font-family:'Inter',sans-serif;padding:2px 4px;">
            <b style="color:${color};">${zone.riskLevel} RISK (${zone.riskScore}/100)</b><br/>
            <strong>${zone.name}</strong><br/>
            <span style="color:#536273;font-size:11px;">${zone.district} • ${zone.id}</span>
          </div>
        `, { direction: 'top' });

        layersRef.current[`zone_pin_${zone.id}`] = marker;

        // Polygon Vector Area
        if (zone.polygon && zone.polygon.length > 0) {
          const poly = window.L.polygon(zone.polygon, {
            color: color,
            weight: 2,
            opacity: 0.85,
            fillColor: color,
            fillOpacity: selectedZone?.id === zone.id ? 0.35 : 0.18
          }).addTo(map);

          poly.on('click', () => onZoneSelect && onZoneSelect(zone));
          layersRef.current[`zone_poly_${zone.id}`] = poly;
        }
      });
    }

    // 2. IoT Sensors
    if (showSensors) {
      sensors.slice(0, 16).forEach(s => {
        const isWarn = s.status === 'CRITICAL' || s.status === 'WARNING';
        const sColor = s.status === 'CRITICAL' ? '#D62828' : s.status === 'WARNING' ? '#E85D04' : '#2E9B57';

        const sensorIcon = window.L.divIcon({
          className: '',
          html: `<div style="width:12px;height:12px;border-radius:3px;background:${sColor};border:1.5px solid #FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,0.25);"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        const sMarker = window.L.marker([s.latitude, s.longitude], { icon: sensorIcon }).addTo(map);
        sMarker.bindTooltip(`
          <div style="font-family:'Inter',sans-serif;">
            <b>Node ${s.nodeId} (${s.location})</b><br/>
            <span>Soil Moisture: ${s.soilMoisture !== null ? s.soilMoisture + '%' : 'N/A'}</span><br/>
            <span>Tilt: ${s.tilt !== null ? s.tilt + '°' : 'N/A'}</span>
          </div>
        `);
        layersRef.current[`sensor_${s.nodeId}`] = sMarker;
      });
    }

    // 3. Historical Landslides
    if (showHistorical) {
      historicalLandslides.forEach(h => {
        const histIcon = window.L.divIcon({
          className: '',
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#536273;border:2px dashed #FFFFFF;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        const hMarker = window.L.marker([25.30 + Math.random() * 0.15, 91.50 + Math.random() * 0.2], { icon: histIcon }).addTo(map);
        hMarker.bindTooltip(`<b>Historical: ${h.location} (${h.date})</b><br/>${h.damage}`);
        layersRef.current[`hist_${h.id}`] = hMarker;
      });
    }
  }, [mapReady, district, showZones, showSensors, showHistorical, selectedZone]);

  // Fly to selected zone
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !selectedZone) return;
    mapInstanceRef.current.flyTo([selectedZone.latitude, selectedZone.longitude], 12, { duration: 1.2 });
  }, [selectedZone, mapReady]);

  const { t } = useLanguage();

  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Map Surface */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

      {/* Basemap & Layer Controls Overlay */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 500,
        background: 'rgba(255, 255, 255, 0.95)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '10px 14px',
        boxShadow: 'var(--shadow-card)', fontSize: 12, display: 'flex', flexDirection: 'column', gap: 8
      }}>
        <div style={{ fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: 10 }}>
          {t('gisLayersBasemap')}
        </div>

        {/* Basemap buttons */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[['osm', t('street')], ['satellite', t('satellite')], ['topo', t('terrain')]].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setBasemap(k)}
              style={{
                padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                background: basemap === k ? 'var(--primary)' : 'var(--bg)',
                color: basemap === k ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border)'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Layer Toggles */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={showZones} onChange={e => setShowZones(e.target.checked)} />
            <span>{t('riskZonesPolygons')}</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={showSensors} onChange={e => setShowSensors(e.target.checked)} />
            <span>{t('iotSensorsTelemetry')}</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={showHistorical} onChange={e => setShowHistorical(e.target.checked)} />
            <span>{t('historicalLandslides')}</span>
          </label>
        </div>
      </div>

      {/* Semantic Risk Legend Overlay */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12, zIndex: 500,
        background: 'rgba(255, 255, 255, 0.95)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '8px 12px',
        boxShadow: 'var(--shadow-card)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 12
      }}>
        <span style={{ fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: 10 }}>{t('overallRiskLevel')}:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D62828' }} />
          <span>{t('critical')} (&gt;85)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E85D04' }} />
          <span>{t('high')} (65-85)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F2B705' }} />
          <span>{t('moderate')} (40-65)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2E9B57' }} />
          <span>{t('low')} (&lt;40)</span>
        </div>
      </div>
    </div>
  );
}
