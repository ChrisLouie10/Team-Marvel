import { Navigate, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;