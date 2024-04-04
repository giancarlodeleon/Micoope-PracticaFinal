import { createContext, useContext, useState, useEffect } from "react";
import {
  createBoletaRequest,
  getBoletasRequest,
  deleteBoletaRequest,
  getBoletaRequest,
  updateBoletaRequest,
} from "../api/boleta";

const BoletaContext = createContext();

export const useBoletas = () => {
  const context = useContext(BoletaContext);

  if (!context) {
    throw new Error("useBoleta must be usted within a BoletaProvider");
  }
  return context;
};

export function BoletaProvider({ children }) {
  const [boletas, setBoletas] = useState([]);
  const [errors, setErrors] = useState([]);

  const getBoletas = async () => {
    try {
      const res = await getBoletasRequest();
      setBoletas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createBoleta = async (boleta) => {
    try {
      const res = await createBoletaRequest(boleta);
      console.log(res.data);
    } catch (error) {
      console.error(error.response);
      setErrors(error.response.data);
    }
  };

  const deleteBoleta = async (id) => {
    try {
      const res = await deleteBoletaRequest(id);
      if (res.status == 204)
        setBoletas(boletas.filter((boletas) => boletas._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getBoleta = async (id) => {
    try {
      const res = await getBoletaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateBoleta = async (id, boleta) => {
    try {
      await updateBoletaRequest(id, boleta);
    } catch (error) {
      console.error(error.response);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  });
  return (
    <BoletaContext.Provider
      value={{
        boletas,
        createBoleta,
        getBoletas,
        deleteBoleta,
        getBoleta,
        updateBoleta,
        errors,
      }}
    >
      {children}
    </BoletaContext.Provider>
  );
}
