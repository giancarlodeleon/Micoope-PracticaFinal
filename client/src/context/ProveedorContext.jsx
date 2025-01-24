import { createContext, useContext, useState } from "react";
import {
  createProveedorRequest,
  getProveedorsRequest,
  deleteProveedorRequest,
  getProveedorRequest,
  updateProveedorRequest,
} from "../api/proveedor";

const ProveedorContext = createContext();

export const useProveedors = () => {
  const context = useContext(ProveedorContext);

  if (!context) {
    throw new Error("useProveedor must be usted within a ProveedorProvider");
  }
  return context;
};

export function ProveedorProvider({ children }) {
  const [proveedors, setProveedors] = useState([]);

  const getProveedors = async () => {
    try {
      const res = await getProveedorsRequest();
      setProveedors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProveedor = async (proveedor) => {
    const res = await createProveedorRequest(proveedor);
    console.log(res);
  };

  const deleteProveedor = async (id) => {
    try {
      const res = await deleteProveedorRequest(id);
      if (res.status == 204)
        setVentas(proveedors.filter((proveedors) => proveedors._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getProveedor = async (id) => {
    try {
      const res = await getProveedorRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProveedor = async (id, proveedor) => {
    try {
      await updateProveedorRequest(id, proveedor);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        proveedors,
        createProveedor,
        getProveedors,
        deleteProveedor,
        getProveedor,
        updateProveedor,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
}
