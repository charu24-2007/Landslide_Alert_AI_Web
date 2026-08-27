// Historical Page — Historical landslide occurrences, post-disaster analysis & trends
import React from 'react';
import { History, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { historicalEvents } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoricalPage() {
  const chartData = [
    { year: '2020', count: 18, major: 4 },
    { year: '2021', count: 24, major: 7 },
    { year: '2022', count: 31, major: 11 },
    { year: '2023', count: 28, major: 8 },
    { year: '2024', count: 35, major: 12 },
    { year: '2025', count: 42, major: 15 },
    { year: '2026 (YTD)', count: 19, major: 6 },
  ];

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <History size={18} color="var(--navy)" /> Historical Landslide Archive & Recurrence Patterns
          </h1>
          <p>Multi-year GSI / SDMA historical inventory, incident triggers, and damage reports</p>
        </div>
      </div>

      {/* Chart */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Historical Multi-Year Frequency Trends (NER)</span>
        </div>
        <div className="panel-body" style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" name="Total Incidents" fill="var(--blue-dim)" />
              <Bar dataKey="major" name="Major Debris Flows" fill="var(--critical)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Major Documented Landslide Incidents</span>
        </div>
        <div className="panel-body no-pad">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Location / Sector</th>
                <th>Intensity</th>
                <th>Primary Triggering Cause</th>
                <th>Infrastructure / Economic Damage</th>
                <th>Casualties</th>
              </tr>
            </thead>
            <tbody>
              {historicalEvents.map(ev => (
                <tr key={ev.id}>
                  <td><b>{ev.date}</b></td>
                  <td>{ev.location}</td>
                  <td>
                    <span className={`sev-badge badge-${ev.intensity === 'Critical' ? 'CRITICAL' : ev.intensity === 'Major' ? 'HIGH' : 'MODERATE'}`}>
                      ● {ev.intensity}
                    </span>
                  </td>
                  <td>{ev.cause}</td>
                  <td>{ev.damage}</td>
                  <td><b style={{ color: ev.casualties > 0 ? 'var(--critical)' : 'inherit' }}>{ev.casualties}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
