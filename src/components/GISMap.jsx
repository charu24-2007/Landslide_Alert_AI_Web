// GISMap — Leaflet map component for risk zone visualization
import React, { useEffect, useRef, useState } from 'react';
import { riskZones, getRiskColor } from '../data/riskZones';

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const SATELLITE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const TOPO = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

export default function GISMap({ district = 'all', selectedZone, onZoneSelect, height = 400 }) {
  const mapRef = useRef(null);
  const leafRef = useRef(null);
  const layerRef = useRef({});
  const tileRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [basemap, setBasemap] = useState('osm');
  const [showZones, setShowZones] = useState(true);
  const [showSensors, setShowSensors] = useState(true);

  // Init map
  useEffect(() => {
    if (!window.L || leafRef.current) return;
    const map = window.L.map(mapRef.current, { center: [25.35, 91.58], zoom: 9, zoomControl: true });
    tileRef.current = window.L.tileLayer(TILE_URL, { attribution: '© OpenStreetMap', maxZoom: 18 }).addTo(map);
    leafRef.current = map;
    setReady(true);
    return () => { map.remove(); leafRef.current = null; };
  }, []);

  // Add/update risk zone polygons
  useEffect(() => {
    if (!ready || !leafRef.current) return;
    const map = leafRef.current;
    // clear existing
    Object.values(layerRef.current).forEach(l => { try { map.removeLayer(l); } catch {} });
    layerRef.current = {};
    if (!showZones) return;

    const filtered = district === 'all' ? riskZones : riskZones.filter(z => z.district === district);
    filtered.forEach(zone => {
      const color = getRiskColor(zone.riskLevel);
      // Marker
      const markerEl = window.L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 4px ${color};"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      const marker = window.L.marker([zone.latitude, zone.longitude], { icon: markerEl }).addTo(map);
      marker.on('click', () => onZoneSelect && onZoneSelect(zone));
      marker.bindTooltip(`
        <div style="font:12px 'Noto Sans',sans-serif;min-width:160px">
          <b style="color:${color}">${zone.riskLevel}</b> · ${zone.id}<br/>
          <span style="font-weight:600">${zone.name}</span><br/>
          <span style="color:#666">Risk Score: ${zone.riskScore}/100</span>
        </div>`, { permanent: false, direction: 'top' });

      // Polygon
      if (zone.polygon) {
        const poly = window.L.polygon(zone.polygon, {
          color, fillColor: color, fillOpacity: 0.18, weight: 1.5
        }).addTo(map);
        poly.on('click', () => onZoneSelect && onZoneSelect(zone));
        layerRef.current[`poly_${zone.id}`] = poly;
      }
      layerRef.current[`marker_${zone.id}`] = marker;
    });
  }, [ready, district, showZones]);

  // Basemap switching
  useEffect(() => {
    if (!ready || !leafRef.current) return;
    const map = leafRef.current;
    if (tileRef.current) { try { map.removeLayer(tileRef.current); } catch {} }
    const url = basemap === 'satellite' ? SATELLITE : basemap === 'topo' ? TOPO : TILE_URL;
    tileRef.current = window.L.tileLayer(url, { attribution: '© ' + basemap, maxZoom: 18 }).addTo(map);
    tileRef.current.bringToBack();
  }, [ready, basemap]);

  // Fly to selected zone
  useEffect(() => {
    if (!ready || !leafRef.current || !selectedZone) return;
    leafRef.current.flyTo([selectedZone.latitude, selectedZone.longitude], 13, { duration: 1 });
  }, [selectedZone, ready]);

  return (
    <div className="map-wrapper" style={{ height }}>
      {/* Map */}
      <div ref={mapRef} className="map-leaflet" style={{ height: '100%' }} />

      {/* Layer Controls */}
      <div className="map-overlay map-layers">
        <div className="map-layers-title">Basemap</div>
        {[['osm','Street'],['satellite','Satellite'],['topo','Terrain']].map(([k, l]) => (
          <div key={k} className="layer-row" onClick={() => setBasemap(k)}>
            <input type="radio" checked={basemap === k} onChange={() => setBasemap(k)} />
            <span>{l}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 5, paddingTop: 5 }}>
          <div className="layer-row"><input type="checkbox" checked={showZones} onChange={e => setShowZones(e.target.checked)} /><span>Risk Zones</span></div>
          <div className="layer-row"><input type="checkbox" checked={showSensors} onChange={e => setShowSensors(e.target.checked)} /><span>Sensors</span></div>
        </div>
      </div>

      {/* Legend */}
      <div className="map-overlay map-legend">
        <div className="map-legend-title">Risk Level</div>
        {[['CRITICAL','#D33F3F'],['HIGH','#E8A33D'],['MODERATE','#D4B106'],['LOW','#3F9142']].map(([l, c]) => (
          <div key={l} className="legend-row">
            <div className="legend-swatch" style={{ background: c }} />
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
