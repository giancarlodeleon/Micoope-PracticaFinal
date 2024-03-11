import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { user } = useAuth();


  if (user.rol === "R1" ) return <Outlet />;
  return <Navigate to="/" replace />;

}

export default AdminRoute;