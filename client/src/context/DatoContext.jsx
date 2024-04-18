import { createContext, useContext, useState } from "react";
import {
  createDatoRequest,
  getDatosRequest,
  deleteDatoRequest,
  getDatoRequest,
} from "../api/dato";

const DatoContext = createContext();

export const useDatos = () => {
  const context = useContext(DatoContext);

  if (!context) {
    throw new Error("useGsto must be usted within a ProductoProvider");
  }
  return context;
};

export function DatoProvider({ children }) {
  const [datos, setDatos] = useState([]);

  const getDatos = async () => {
    try {
      const res = await getDatosRequest();
      setDatos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createDato = async (dato) => {
    const res = await createDatoRequest(dato);
    console.log(res);
  };


  const deleteDato  = async () => {
    try {
      const res = await deleteDatoRequest();
      if (res.status === 204) {
        setDatos([]); // Eliminar todos los datos
      }
    } catch (error) {
      console.error("Error deleting all datos:", error);
    }
  };

  const getDato = async (id) => {
    try {
      const res = await getDatoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <DatoContext.Provider
      value={{
        datos,
        createDato,
        getDato,
        getDatos,
        deleteDato,
      }}
    >
      {children}
    </DatoContext.Provider>
  );
}