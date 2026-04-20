import React, { createContext, useState, useCallback } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const refreshUser = useCallback(async () => {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return; // Not logged in, nothing to refresh
    try {
      const parsedInfo = JSON.parse(stored);
      if (!parsedInfo?.token) return;
      const { data } = await api.get('/auth/profile');
      // Merge fresh profile data with existing token
      const updated = { ...parsedInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updated));
      setUser(updated);
    } catch {
      // If token expired or invalid, axios interceptor handles logout
    }
  }, []);

  const updateProfile = async (name, email) => {
    const { data } = await api.put('/auth/profile', { name, email });
    const updated = { ...data };
    localStorage.setItem('userInfo', JSON.stringify(updated));
    setUser(updated);
    return data;
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const { data } = await api.put('/auth/password', { currentPassword, newPassword });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, updatePassword, refreshUser, logout }}>
        {children}
    </AuthContext.Provider>
  );
};
