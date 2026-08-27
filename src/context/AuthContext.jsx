// AuthContext.jsx — Session, Permissions, and Role Management
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, DEMO_USERS } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('lsa_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 450));
    const match = DEMO_USERS[email.toLowerCase().trim()];
    if (!match || (match.password !== password && password !== 'landslide123')) {
      setLoading(false);
      throw new Error('Invalid email or password. Please select one of the demonstration accounts.');
    }

    const session = {
      ...match,
      token: `lsa-jwt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('lsa_session', JSON.stringify(session));
    setUser(session);
    setLoading(false);
    return session;
  };

  const logout = () => {
    localStorage.removeItem('lsa_session');
    setUser(null);
  };

  const switchRole = (roleKey) => {
    if (!ROLES[roleKey]) return;
    const demoForRole = Object.values(DEMO_USERS).find(u => u.role === roleKey) || {
      name: 'Authorized User',
      designation: ROLES[roleKey].name,
      district: 'East Khasi Hills',
      state: 'Meghalaya',
      email: `${roleKey}@ner.gov.in`
    };

    const updated = {
      ...demoForRole,
      role: roleKey,
      token: `lsa-jwt-${Date.now()}`,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('lsa_session', JSON.stringify(updated));
    setUser(updated);
    window.dispatchEvent(new Event('roleChanged'));
  };

  const hasPermission = (permissionKey) => {
    if (!user || !user.role) return false;
    const roleConfig = ROLES[user.role];
    if (!roleConfig) return false;
    return roleConfig.permissions.includes(permissionKey);
  };

  const roleInfo = user ? ROLES[user.role] : null;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole, hasPermission, roleInfo, ROLES, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
