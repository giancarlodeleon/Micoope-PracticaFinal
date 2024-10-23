import { createContext, useContext, useState } from "react";
import {
  createSolicitudRequest,
  getSolicitudsRequest,
  deleteSolicitudRequest,
  getSolicitudRequest,
  updateSolicitudRequest,
} from "../api/solicitud";

const SolicitudContext = createContext();

export const useSolicituds = () => {
  const context = useContext(SolicitudContext);

  if (!context) {
    throw new Error("useSolicitud must be usted within a SolicitudProvider");
  }
  return context;
};

export function SolicitudProvider({ children }) {
  const [solicituds, setSolicituds] = useState([]);

  const getSolicituds = async () => {
    try {
      const res = await getSolicitudsRequest();
      setSolicituds(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSolicitud = async (solicitud) => {
    const res = await createSolicitudRequest(solicitud);
    console.log(res);
  };

  const deleteSolicitud = async (id) => {
    try {
      const res = await deleteSolicitudRequest(id);
      if (res.status == 204)
        setSolicituds(solicituds.filter((solicituds) => solicituds._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getSolicitud = async (id) => {
    try {
      const res = await getSolicitudRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSolicitud = async (id, solicitud) => {
    try {
      await updateSolicitudRequest(id, solicitud);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicituds,
        createSolicitud,
        getSolicituds,
        deleteSolicitud,
        getSolicitud,
        updateSolicitud,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}
