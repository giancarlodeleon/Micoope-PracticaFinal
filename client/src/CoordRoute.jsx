import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function CoordRoute() {
  const { user } = useAuth();


  if (user.rol === "R2" || user.rol === "R1" ) return <Outlet />;
  return <Navigate to="/" replace />;

}

export default CoordRoute;