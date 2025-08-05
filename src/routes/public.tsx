// components/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PublicRoute = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
