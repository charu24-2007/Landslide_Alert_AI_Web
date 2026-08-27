// MapPage - Full screen GIS Risk mapping
import React, { useState, useEffect } from 'react';
import GISMap from '../components/GISMap';
import { getRiskZones } from '../services/riskApi';
import { getSensors } from '../services/sensorApi';
import { Layers, MapPin } from 'lucide-react';

export default function MapPage() {
  const [zones, setZones] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState('NER-023');

  useEffect(() => {
    async function load() {
      const zData = await getRiskZones();
      const sData = await getSensors();
      setZones(zData);
      setSensors(sData);
    }
    load();
  }, []);

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div className="page-header" style={{ marginBottom: '8px' }}>
        <div className="page-title">
          <h3>GIS Terrain Risk Mapping</h3>
          <p>Multi-layered geographical information systems (GIS) map and active sensor vectors</p>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: '350px' }}>
        <GISMap 
          zones={zones}
          sensors={sensors}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
        />
      </div>
      
      <div className="panel" style={{ marginTop: '10px' }}>
        <div className="panel-header">
          <h4>Geological Inspection Coordinates</h4>
        </div>
        <div className="panel-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11.5px' }}>
          <div>
            <strong>Mawsynram Slopes Zone (NER-023)</strong><br/>
            Lat: 25.3100° N, Long: 91.5200° E<br/>
            Status: <span style={{ color: 'var(--risk-high)', fontWeight: 'bold' }}>HIGH RISK (78/100)</span>
          </div>
          <div>
            <strong>Umtyngar Gorge Zone (NER-011)</strong><br/>
            Lat: 25.2750° N, Long: 91.5750° E<br/>
            Status: <span style={{ color: 'var(--risk-critical)', fontWeight: 'bold' }}>CRITICAL RISK (92/100)</span>
          </div>
          <div>
            <strong>Nongstoin Valley (NER-018)</strong><br/>
            Lat: 25.4300° N, Long: 91.3800° E<br/>
            Status: <span style={{ color: 'var(--risk-high)', fontWeight: 'bold' }}>HIGH RISK (68/100)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
