import { createContext, useContext, useState, useEffect } from "react";
import {
  createAgenciaRequest,
  getAgenciasRequest,
  deleteAgenciaRequest,
  getAgenciaRequest,
  updateAgenciaRequest,
} from "../api/agencia";

const AgenciaContext = createContext();

export const useAgencias = () => {
  const context = useContext(AgenciaContext);

  if (!context) {
    throw new Error("useAgencia must be usted within a AgenciaProvider");
  }
  return context;
};

export function AgenciaProvider({ children }) {
  const [agencias, setAgencia] = useState([]);
  const [errors, setErrors] = useState([]);

  const getAgencias = async () => {
    try {
      const res = await getAgenciasRequest();
      setAgencia(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createAgencia = async (agencia) => {
    try {
      const res = await createAgenciaRequest(agencia);
      console.log(res.data);
    } catch (error) {
      console.error(error.response);
      setErrors(error.response.data);
    }
  };

  const deleteAgencia = async (id) => {
    try {
      const res = await deleteAgenciaRequest(id);
      if (res.status == 204)
        setAgencia(agencias.filter((agencias) => agencias._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getAgencia = async (id) => {
    try {
      const res = await getAgenciaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateAgencia = async (id, agencias) => {
    try {
      await updateAgenciaRequest(id, agencias);
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
  },);

  return (
    <AgenciaContext.Provider
      value={{
        agencias,
        createAgencia,
        getAgencias,
        deleteAgencia,
        getAgencia,
        updateAgencia,
        errors
      }}
    >
      {children}
    </AgenciaContext.Provider>
  );
}
