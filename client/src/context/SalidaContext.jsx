import { createContext, useContext, useState } from "react";
import {
  createSalidaRequest,
  getSalidasRequest,
  deleteSalidaRequest,
  getSalidaRequest,
  updateSalidaRequest,
} from "../api/salida";

const SalidaContext = createContext();

export const useSalidas = () => {
  const context = useContext(SalidaContext);

  if (!context) {
    throw new Error("useSalida must be usted within a SalidaProvider");
  }
  return context;
};

export function SalidaProvider({ children }) {
  const [salidas, setSalidas] = useState([]);

  const getSalidas = async () => {
    try {
      const res = await getSalidasRequest();
      setSalidas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSalida = async (salida) => {
    const res = await createSalidaRequest(salida);
    console.log(res);
  };

  const deleteSalida = async (id) => {
    try {
      const res = await deleteSalidaRequest(id);
      if (res.status == 204)
        setSalidas(salidas.filter((salidas) => salidas._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getSalida = async (id) => {
    try {
      const res = await getSalidaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSalida = async (id, salida) => {
    try {
      await updateSalidaRequest(id, salida);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SalidaContext.Provider
      value={{
        salidas,
        createSalida,
        getSalidas,
        deleteSalida,
        getSalida,
        updateSalida,
      }}
    >
      {children}
    </SalidaContext.Provider>
  );
}
