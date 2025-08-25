// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element }) => {
//   const token = localStorage.getItem("token");
//   return token ? element : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;