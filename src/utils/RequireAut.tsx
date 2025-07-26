import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const RequireAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return Boolean(isAuthenticated) ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
