import { createContext, useContext, useState } from "react";
import {
  createDatoRequest,
  getDatosRequest,
  deleteDatoRequest,
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

  const deleteDato = async (id) => {
    try {
      const res = await deleteDatoRequest(id);
      if (res.status == 204)
        setDatos(datos.filter((datos) => datos._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  return (
    <DatoContext.Provider
      value={{
        datos,
        createDato,
        getDatos,
        deleteDato,
      }}
    >
      {children}
    </DatoContext.Provider>
  );
}