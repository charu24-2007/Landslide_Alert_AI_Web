// FieldReports.jsx — Ground Truth Observations & Verification Queue
import React, { useState, useEffect } from 'react';
import { Clipboard, Plus, CheckCircle, XCircle, MapPin, Camera, Image, ShieldCheck } from 'lucide-react';
import { getFieldReports, submitReport, verifyReport } from '../data/fieldReports';
import { riskZones } from '../data/riskZones';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function FieldReports() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('Crack');
  const [zoneId, setZoneId] = useState('NER-023');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');

  const reload = () => setReports(getFieldReports());

  useEffect(() => {
    reload();
    window.addEventListener('reportsUpdated', reload);
    return () => window.removeEventListener('reportsUpdated', reload);
  }, []);

  const handleVerify = (id, status) => {
    verifyReport(id, status, user?.name || 'District Authority');
    reload();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!locationName || !description) return;

    const z = riskZones.find(item => item.id === zoneId);
    submitReport({
      type,
      typeName: type === 'Crack' ? t('slopeCrack') : type === 'Road Blockage' ? t('roadBlockage') : t('landslideIncident'),
      zone: zoneId,
      zoneName: z ? z.name : 'NER Sector',
      district: z ? z.district : 'East Khasi Hills',
      location: locationName,
      latitude: z ? z.latitude : 25.31,
      longitude: z ? z.longitude : 91.52,
      reporter: user?.name ? `${user.name} (${user.role.toUpperCase()})` : 'Officer Sangma (Field Lead)',
      reporterRole: user?.role === 'citizen' ? t('citizen') : t('fieldOfficer'),
      description,
      photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80',
      actionTaken: 'Field note recorded and queued for verification.'
    });

    setLocationName('');
    setDescription('');
    setShowModal(false);
    reload();
  };

  return (
    <div className="content-area">
      {/* Page Heading */}
      <div className="page-heading-box">
        <div className="page-title-group">
          <h1>{t('fieldReportsTitle')}</h1>
          <p>{t('fieldReportsDesc')}</p>
        </div>

        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> {t('submitReport')}
        </button>
      </div>

      {/* Workflow Info Box */}
      <div className="clean-card" style={{ padding: '14px 18px', background: 'var(--brand-light)', borderColor: 'var(--border-subtle)' }}>
        <div style={{ fontSize: 13, color: 'var(--brand-navy)', fontWeight: 600 }}>
          <b>{t('groundTruthLoop')}</b>
        </div>
      </div>

      {/* Reports Table */}
      <div className="clean-card">
        <div className="card-header-row">
          <div className="card-title-group">
            <h3>{t('registeredGroundTruth')} ({reports.length})</h3>
            <p>{t('incidentTypesSubtitle')}</p>
          </div>
        </div>

        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>{t('reportId')}</th>
                <th>{t('observationType')}</th>
                <th>{t('zoneSector')}</th>
                <th>{t('landmarkGps')}</th>
                <th>{t('reporterRole')}</th>
                <th>{t('technicalNotes')}</th>
                <th>{t('photoEvidence')}</th>
                <th>{t('verificationStatus')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const isVerified = r.status === 'Verified';
                const isRejected = r.status === 'Rejected';
                const typeName = r.type === 'Crack' ? t('slopeCrack') : r.type === 'Road Blockage' ? t('roadBlockage') : t('landslideIncident');
                return (
                  <tr key={r.id}>
                    <td className="code-cell">{r.id}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{typeName}</span>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t(r.type) || r.type}</div>
                    </td>
                    <td>
                      <span className="status-badge badge-info">{r.zone}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{t(r.location) || r.location}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MapPin size={10} /> Lat: {r.latitude?.toFixed(4)}, Lng: {r.longitude?.toFixed(4)}
                      </div>
                    </td>
                    <td>
                      <div>{t(r.reporter) || r.reporter}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.timestamp}</div>
                    </td>
                    <td style={{ maxWidth: 280, fontSize: 12.5, lineHeight: 1.4 }}>
                      {t(r.description) || r.description}
                    </td>
                    <td>
                      {r.photoUrl ? (
                        <a href={r.photoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                          <Camera size={13} /> {t('viewPhoto')}
                        </a>
                      ) : (
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t('noMedia')}</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${isVerified ? 'badge-low' : isRejected ? 'badge-critical' : 'badge-moderate'}`}>
                        {isVerified ? t('verified') : isRejected ? t('rejected') : t('pendingVerification')}
                      </span>
                      {isVerified && r.verifiedBy && (
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                          {t('by')} {r.verifiedBy.split(' ')[0]}
                        </div>
                      )}
                    </td>
                    <td>
                      {r.status === 'Pending' && user?.role === 'authority' ? (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            className="btn-primary btn-xs"
                            title="Verify Ground Truth"
                            onClick={() => handleVerify(r.id, 'Verified')}
                          >
                            <CheckCircle size={11} /> {t('verified')}
                          </button>
                          <button
                            className="btn-danger btn-xs"
                            title="Reject Report"
                            onClick={() => handleVerify(r.id, 'Rejected')}
                          >
                            <XCircle size={11} /> {t('rejected')}
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t('systemOnline')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Submission */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(18, 59, 99, 0.4)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div className="clean-card" style={{ width: '100%', maxWidth: 500, boxShadow: 'var(--shadow-dropdown)' }}>
            <div className="card-header-row">
              <div className="card-title-group">
                <h3>Submit Field Ground-Truth Observation</h3>
                <p>Record on-site tension cracks, retaining wall shifts, or mud deposits</p>
              </div>
              <button onClick={() => setShowModal(false)} className="btn-secondary btn-xs">✕</button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group-clean">
                <label className="form-label-clean">Observation Category</label>
                <select className="form-input-clean" value={type} onChange={e => setType(e.target.value)}>
                  <option value="Crack">Tension / Ground Crack</option>
                  <option value="Road Blockage">Mudslide / Road Obstruction</option>
                  <option value="Slope Movement">Slope Creep / Retaining Wall Shift</option>
                  <option value="Landslide">Active Slide Collapse</option>
                  <option value="Other">Drainage Overflow / Soil Erosion</option>
                </select>
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Associated Landslide Zone</label>
                <select className="form-input-clean" value={zoneId} onChange={e => setZoneId(e.target.value)}>
                  {riskZones.map(z => (
                    <option key={z.id} value={z.id}>{z.id} — {z.name} ({z.district})</option>
                  ))}
                </select>
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Location Landmark / Highway Km</label>
                <input
                  type="text"
                  className="form-input-clean"
                  placeholder="e.g. NH-44 Km 14.2 near Umtyngar Bridge"
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Observation Details</label>
                <textarea
                  className="form-input-clean"
                  rows={3}
                  placeholder="Describe crack dimensions, depth, water seepage, rock displacement..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Observation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
