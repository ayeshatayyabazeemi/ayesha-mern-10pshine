// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // persistent check
    if (!user) {
      toast.error('Please sign in to access this page');
    }
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
