import { createContext, useContext, useState } from "react";
import {
  createRolRequest,
  getRolsRequest,
  deleteRolRequest,
  getRolRequest,
  updateRolRequest,
} from "../api/rol";

const RolContext = createContext();

export const useRols = () => {
  const context = useContext(RolContext);

  if (!context) {
    throw new Error("useRol must be usted within a RolProvider");
  }
  return context;
};

export function RolProvider({ children }) {
  const [rol, setRols] = useState([]);

  const getRols = async () => {
    try {
      const res = await getRolsRequest();
      setRols(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRol = async (rol) => {
    const res = await createRolRequest(rol);
    console.log(res);
  };

  const deleteRol = async (id) => {
    try {
      const res = await deleteRolRequest(id);
      if (res.status == 204)
        setRols(rol.filter((rol) => rol._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getRol = async (id) => {
    try {
      const res = await getRolRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateRol = async (id, rol) => {
    try {
      await updateRolRequest(id, rol);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RolContext.Provider
      value={{
        rol,
        createRol,
        getRols,
        deleteRol,
        getRol,
        updateRol,
      }}
    >
      {children}
    </RolContext.Provider>
  );
}