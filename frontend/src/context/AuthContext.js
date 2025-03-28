import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || 'user');
    }
  }, []);

  const login = (tk, userRole) => {
    setToken(tk);
    setRole(userRole);
    localStorage.setItem('token', tk);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setToken(null);
    setRole('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
