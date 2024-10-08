import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useRols } from "./context/RolContext";
import { Navigate, Outlet } from "react-router-dom";

function AddInventarioRoute() {
  const { user } = useAuth();
  const { getRols, rol } = useRols();

  useEffect(() => {
    getRols();
  },[]);

  let hasAllowedRole = false;
  if (rol) {
    hasAllowedRole = rol.some(role => {
      return role.name === user.rol && role.permission_of_add_Product === true;
      
    });
  } 

  if (hasAllowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }

  
}

export default AddInventarioRoute;