import { createContext, useContext, useState } from "react";
import {
  createSolicitudCompraRequest,
  getSolicitudsCompraRequest,
  deleteSolicitudCompraRequest,
  getSolicitudCompraRequest,
  updateSolicitudCompraRequest,
} from "../api/solicitud_compra";

const SolicitudCompraContext = createContext();

export const useSolicitudsCompra = () => {
  const context = useContext(SolicitudCompraContext);

  if (!context) {
    throw new Error("useSolicitudCompra must be usted within a SolicitudCompraProvider");
  }
  return context;
};

export function SolicitudCompraProvider({ children }) {
  const [solicituds_compra, setSolicitudsCompra] = useState([]);

  const getSolicitudsCompra = async () => {
    try {
      const res = await getSolicitudsCompraRequest();
      setSolicitudsCompra(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createSolicitudCompra = async (solicitud_compra) => {
    const res = await createSolicitudCompraRequest(solicitud_compra);
    console.log(res);
  };

  const deleteSolicitudCompra = async (id) => {
    try {
      const res = await deleteSolicitudCompraRequest(id);
      if (res.status == 204)
        setSolicitudsCompra(solicituds_compra.filter((solicituds_compra) => solicituds_compra._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getSolicitudCompra = async (id) => {
    try {
      const res = await getSolicitudCompraRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateSolicitudCompra = async (id, solicitud_compra) => {
    try {
      await updateSolicitudCompraRequest(id, solicitud_compra);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SolicitudCompraContext.Provider
      value={{
        solicituds_compra,
        createSolicitudCompra,
        getSolicitudsCompra,
        deleteSolicitudCompra,
        getSolicitudCompra,
        updateSolicitudCompra,
      }}
    >
      {children}
    </SolicitudCompraContext.Provider>
  );
}
