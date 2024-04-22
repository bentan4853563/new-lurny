import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Adjust path as necessary

const ProtectedRoute = () => {
  const isAuth = useAuth();
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
