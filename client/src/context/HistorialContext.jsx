import { createContext, useContext, useState } from "react";
import {
  createHistorialRequest,
  getHistorialsRequest,
  deleteHistorialRequest,
  getHistorialRequest,
  updateHistorialRequest,
} from "../api/historial";

const HistorialContext = createContext();

export const useHistorials = () => {
  const context = useContext(HistorialContext);

  if (!context) {
    throw new Error("useHistorial must be usted within a HistorialProvider");
  }
  return context;
};

export function HistorialProvider({ children }) {
  const [historials, setHistorials] = useState([]);

  const getHistorials = async () => {
    try {
      const res = await getHistorialsRequest();
      setHistorials(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createHistorial = async (historial) => {
    const res = await createHistorialRequest(historial);
    console.log(res);
  };

  const deleteHistorial = async (id) => {
    try {
      const res = await deleteHistorialRequest(id);
      if (res.status == 204)
        setHistorials(historials.filter((historials) => historials._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getHistorial = async (id) => {
    try {
      const res = await getHistorialRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateHistorial = async (id, historial) => {
    try {
      await updateHistorialRequest(id, historial);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HistorialContext.Provider
      value={{
        historials,
        createHistorial,
        getHistorials,
        deleteHistorial,
        getHistorial,
        updateHistorial,
      }}
    >
      {children}
    </HistorialContext.Provider>
  );
}
