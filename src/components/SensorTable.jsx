// SensorTable Component - IoT Telemetry logs with sorting and status filters
import React, { useState } from 'react';
import { ArrowUpDown, Search, Filter } from 'lucide-react';

export default function SensorTable({ sensors, onSelectNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle column sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // Filter sensors
  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sensor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort sensors
  const sortedSensors = [...filteredSensors].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Clean percentage/tilt characters for comparison
    if (sortField === 'soilMoisture') {
      aVal = parseInt(a.soilMoisture.replace('%', '')) || 0;
      bVal = parseInt(b.soilMoisture.replace('%', '')) || 0;
    } else if (sortField === 'tilt') {
      aVal = parseFloat(a.tilt.replace('°', '')) || 0;
      bVal = parseFloat(b.tilt.replace('°', '')) || 0;
    } else if (sortField === 'battery') {
      aVal = parseInt(a.battery.replace('%', '')) || 0;
      bVal = parseInt(b.battery.replace('%', '')) || 0;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="panel">
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '8px' }}>
        <h4>Sensor & IoT Telemetry Network</h4>
        
        {/* Table Filters */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={11} style={{ position: 'absolute', left: '8px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search nodes..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '24px', width: '130px', fontSize: '11px', height: '24px' }}
            />
          </div>

          <div className="district-selector">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ fontSize: '11px', padding: '2px 4px', height: '24px' }}
              aria-label="Filter Sensor Status"
            >
              <option value="ALL">All Status</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="WARNING">Warning Only</option>
              <option value="NORMAL">Normal Only</option>
              <option value="OFFLINE">Offline Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="panel-body" style={{ padding: '0' }}>
        <div className="table-container" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <table className="dense-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                  Node ID <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
                <th onClick={() => handleSort('location')} style={{ cursor: 'pointer' }}>
                  Location <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
                <th onClick={() => handleSort('soilMoisture')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  Soil Moisture <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
                <th onClick={() => handleSort('tilt')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  Tilt <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
                <th style={{ textAlign: 'center' }}>Rain (24h)</th>
                <th onClick={() => handleSort('battery')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                  Battery <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
                <th style={{ textAlign: 'center' }}>Signal</th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  Status <ArrowUpDown size={10} style={{ display: 'inline', marginLeft: '3px' }} />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSensors.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                    No sensors match selection criteria.
                  </td>
                </tr>
              ) : (
                sortedSensors.map(sensor => {
                  const isCrit = sensor.status === 'CRITICAL';
                  const isWarn = sensor.status === 'WARNING';
                  const isOff = sensor.status === 'OFFLINE';

                  return (
                    <tr 
                      key={sensor.id} 
                      onClick={() => onSelectNode && onSelectNode(sensor.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{sensor.id}</td>
                      <td>{sensor.location}</td>
                      <td style={{ textAlign: 'right', fontWeight: '500' }}>{sensor.soilMoisture}</td>
                      <td style={{ textAlign: 'right', fontWeight: '500' }}>{sensor.tilt}</td>
                      <td style={{ textAlign: 'center' }}>{sensor.rain}</td>
                      <td style={{ textAlign: 'right' }}>{sensor.battery}</td>
                      <td style={{ textAlign: 'center' }}>{sensor.signal}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`badge ${
                          isCrit ? 'badge-critical' : 
                          isWarn ? 'badge-high' : 
                          isOff ? 'badge-low' : 'badge-low'
                        }`} style={{
                          backgroundColor: isOff ? '#ECEFF1' : undefined,
                          color: isOff ? '#5F6B76' : undefined
                        }}>
                          {sensor.status === 'NORMAL' ? 'NORMAL' : sensor.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
