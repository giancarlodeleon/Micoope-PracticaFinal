import { createContext, useContext, useState } from "react";
import {
  createGastoRequest,
  getGastosRequest,
  deleteGastoRequest,
  getGastoRequest,
  updateGastoRequest,
} from "../api/gasto";

const GastoContext = createContext();

export const useGastos = () => {
  const context = useContext(GastoContext);

  if (!context) {
    throw new Error("useGasto must be usted within a GastoProvider");
  }
  return context;
};

export function GastoProvider({ children }) {
  const [gastos, setGastos] = useState([]);

  const getGastos = async () => {
    try {
      const res = await getGastosRequest();
      setGastos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createGasto = async (gasto) => {
    const res = await createGastoRequest(gasto);
    console.log(res);
  };

  const deleteGasto = async (id) => {
    try {
      const res = await deleteGastoRequest(id);
      if (res.status == 204)
        setGastos(gastos.filter((gastos) => gastos._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getGasto = async (id) => {
    try {
      const res = await getGastoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateGasto = async (id, gasto) => {
    try {
      await updateGastoRequest(id, gasto);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GastoContext.Provider
      value={{
        gastos,
        createGasto,
        getGastos,
        deleteGasto,
        getGasto,
        updateGasto,
      }}
    >
      {children}
    </GastoContext.Provider>
  );
}
