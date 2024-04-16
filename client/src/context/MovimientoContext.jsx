import { createContext, useContext, useState, useEffect } from "react";
import {
  createMovimientoRequest,
  getMovimientosRequest,
  deleteMovimientoRequest,
  getMovimientoRequest,
  updateMovimientoRequest,
} from "../api/movimiento";

const MovimientoContext = createContext();

export const useMovimientos = () => {
  const context = useContext(MovimientoContext);

  if (!context) {
    throw new Error("useMovimiento must be usted within a MovimientoProvider");
  }
  return context;
};

export function MovimientoProvider({ children }) {
  const [movimiento, setMovimientos] = useState([]);
  const [errors, setErrors] = useState([]);

  const getMovimientos = async () => {
    try {
      const res = await getMovimientosRequest();
      setMovimientos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createMovimiento = async (movimiento) => {
    const res = await createMovimientoRequest(movimiento);
    console.log(res);
  };

  const deleteMovimiento = async (id) => {
    try {
      const res = await deleteMovimientoRequest(id);
      if (res.status == 204)
        setMovimientos(
          movimientos.filter((movimientos) => movimientos._id !== id)
        );
    } catch (error) {
      console.log(res);
    }
  };

  const getMovimiento = async (id) => {
    try {
      const res = await getMovimientoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateMovimiento = async (id, movimiento) => {
    try {
      await updateMovimientoRequest(id, movimiento);
    } catch (error) {
      console.error(error);
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
  },);

  return (
    <MovimientoContext.Provider
      value={{
        movimiento,
        createMovimiento,
        getMovimientos,
        deleteMovimiento,
        getMovimiento,
        updateMovimiento,
        errors
      }}
    >
      {children}
    </MovimientoContext.Provider>
  );
}
