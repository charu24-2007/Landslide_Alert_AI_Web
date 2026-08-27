// Field Reports Page — Ground truth verification & mobile incident reporting
import React, { useState, useEffect } from 'react';
import { Clipboard, Plus, CheckCircle, XCircle, MapPin, Camera, AlertCircle } from 'lucide-react';
import { getFieldReports, submitReport, verifyReport } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { riskZones } from '../data/riskZones';

export default function FieldReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [reportType, setReportType] = useState('Crack detected');
  const [zone, setZone] = useState('NER-023');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const reload = () => setReports(getFieldReports());

  useEffect(() => {
    reload();
    window.addEventListener('reportsUpdated', reload);
    return () => window.removeEventListener('reportsUpdated', reload);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !description) return;
    submitReport({
      type: reportType,
      zone,
      location,
      reporter: user?.name ? `${user.name} (${user.role.toUpperCase()})` : 'Field Officer',
      description,
    });
    setLocation('');
    setDescription('');
    setShowModal(false);
    reload();
  };

  const handleVerify = (id, status) => {
    verifyReport(id, status);
    reload();
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clipboard size={18} color="var(--navy)" /> Field Ground-Truth & Incident Reports
          </h1>
          <p>On-site observations, tension crack logs, retaining wall damage, and road obstruction verification</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={13} /> Submit Field Observation
        </button>
      </div>

      {/* Reports Table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Logged Field Submissions ({reports.length})</span>
        </div>
        <div className="panel-body no-pad">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Observation Type</th>
                <th>Zone / Sector</th>
                <th>Exact Location</th>
                <th>Officer / Observer</th>
                <th>Details & Observations</th>
                <th>Timestamp</th>
                <th>Verification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td className="id-col">{r.id}</td>
                  <td><b>{r.type}</b></td>
                  <td><span className="tag">{r.zone}</span></td>
                  <td>{r.location}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.reporter}</td>
                  <td style={{ maxWidth: 300, fontSize: 11 }}>{r.description}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>{r.time} ({r.date})</td>
                  <td>
                    <span className="tag" style={{
                      background: r.status === 'Verified' ? 'var(--low-bg)' : r.status === 'Rejected' ? 'var(--critical-bg)' : 'var(--moderate-bg)',
                      color: r.status === 'Verified' ? 'var(--low)' : r.status === 'Rejected' ? 'var(--critical)' : 'var(--moderate)',
                      borderColor: r.status === 'Verified' ? 'var(--low-bd)' : r.status === 'Rejected' ? 'var(--critical-bd)' : 'var(--moderate-bd)',
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status === 'Pending' && user?.role === 'authority' ? (
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-xs btn-primary" title="Verify Report" onClick={() => handleVerify(r.id, 'Verified')}>
                          <CheckCircle size={10} /> Verify
                        </button>
                        <button className="btn btn-xs btn-danger" title="Reject Report" onClick={() => handleVerify(r.id, 'Rejected')}>
                          <XCircle size={10} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="panel" style={{ width: 440, background: 'var(--surface)' }}>
            <div className="panel-header" style={{ background: 'var(--navy)', color: '#fff' }}>
              <span className="panel-title" style={{ color: '#fff' }}>Submit Ground-Truth Observation</span>
              <button className="btn btn-xs" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: 14 }}>
              <div className="form-group">
                <label className="form-label">Observation Type</label>
                <select className="form-control" value={reportType} onChange={e => setReportType(e.target.value)}>
                  <option value="Crack detected">Ground / Tension Crack Detected</option>
                  <option value="Road blockage">Mudslide / Road Obstruction</option>
                  <option value="Slope movement">Active Slope Movement / Creep</option>
                  <option value="Drainage clogging">Drainage Failure / Overflow</option>
                  <option value="Soil shifting">Loose Topsoil Shifting</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Zone</label>
                <select className="form-control" value={zone} onChange={e => setZone(e.target.value)}>
                  {riskZones.map(z => (
                    <option key={z.id} value={z.id}>{z.id} - {z.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location Landmark / Highway Km</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. NH-44 Km 14.2 near Umtyngar Bridge"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Technical Observation Notes</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Describe crack length, depth, water seepage, or rock displacement..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button type="button" className="btn btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
