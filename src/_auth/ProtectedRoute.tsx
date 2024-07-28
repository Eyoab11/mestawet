import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
