import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies, __setCookie, __removeCookie] = useCookies(['token']);

  if (!cookies.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
