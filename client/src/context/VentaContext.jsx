import { createContext, useContext, useState } from "react";
import {
  createVentaRequest,
  getVentasRequest,
  deleteVentaRequest,
  getVentaRequest,
  updateVentaRequest,
} from "../api/venta";

const VentaContext = createContext();

export const useVentas = () => {
  const context = useContext(VentaContext);

  if (!context) {
    throw new Error("useVenta must be usted within a VentaProvider");
  }
  return context;
};

export function VentaProvider({ children }) {
  const [ventas, setVentas] = useState([]);

  const getVentas = async () => {
    try {
      const res = await getVentasRequest();
      setVentas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createVenta = async (venta) => {
    const res = await createVentaRequest(venta);
    console.log(res);
  };

  const deleteVenta = async (id) => {
    try {
      const res = await deleteVentaRequest(id);
      if (res.status == 204)
        setVentas(ventas.filter((ventas) => ventas._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getVenta = async (id) => {
    try {
      const res = await getVentaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateVenta = async (id, venta) => {
    try {
      await updateVentaRequest(id, venta);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VentaContext.Provider
      value={{
        ventas,
        createVenta,
        getVentas,
        deleteVenta,
        getVenta,
        updateVenta,
      }}
    >
      {children}
    </VentaContext.Provider>
  );
}
