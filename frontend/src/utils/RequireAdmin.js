// src/utils/RequireAdmin.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
}