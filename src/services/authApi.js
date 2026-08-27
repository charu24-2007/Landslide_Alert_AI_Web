// Authentication and Role Management Service
import { apiRequest } from './api';

const DEFAULT_USER = {
  name: 'Charumithra C.',
  role: 'authority', // 'authority' | 'analyst' | 'field' | 'citizen'
  roleName: 'District Authority',
  district: 'East Khasi Hills'
};

const ROLE_DETAILS = {
  authority: { roleName: 'District Authority', description: 'Disaster Management Authority & Decision Maker' },
  analyst: { roleName: 'GIS Technical Analyst', description: 'GIS and ML Model Analytics Specialist' },
  field: { roleName: 'Field Inspection Officer', description: 'Ground Verification & Inspection Officer' },
  citizen: { roleName: 'Local Community / Citizen', description: 'Public Safety Portal' }
};

export async function getCurrentUser() {
  const serverUser = await apiRequest('/auth/me');
  if (serverUser) return serverUser;

  // Mock implementation
  const cached = localStorage.getItem('user_session');
  if (cached) {
    return JSON.parse(cached);
  }
  
  localStorage.setItem('user_session', JSON.stringify(DEFAULT_USER));
  return DEFAULT_USER;
}

export async function switchRole(role) {
  const updatedUser = {
    name: 'Charumithra C.',
    role: role,
    roleName: ROLE_DETAILS[role]?.roleName || 'User',
    district: 'East Khasi Hills'
  };
  
  localStorage.setItem('user_session', JSON.stringify(updatedUser));
  // Dispatch a custom event to notify components that the role has updated
  window.dispatchEvent(new Event('roleChanged'));
  return updatedUser;
}

export async function logout() {
  localStorage.removeItem('user_session');
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('roleChanged'));
  return true;
}
