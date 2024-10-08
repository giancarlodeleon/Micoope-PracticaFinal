import { createContext, useContext, useState } from "react";
import {
  createClientRequest,
  getClientsRequest,
  deleteClientRequest,
  getClientRequest,
  updateClientRequest,
  getAllClientsRequest,
} from "../api/client";

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("useClient must be usted within a ProductoProvider");
  }
  return context;
};

export function ClientProvider({ children }) {
  const [client, setClients] = useState([]);

  const getAllClients = async () => {
    try {
      const res = await getAllClientsRequest(); // Asegúrate de tener esta función para hacer la solicitud
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClients = async () => {
    try {
      const res = await getClientsRequest();
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createClient = async (client) => {
    const res = await createClientRequest(client);
    console.log(res);
  };

  const deleteClient = async (id) => {
    try {
      const res = await deleteClientRequest(id);
      if (res.status == 204)
        setClients(client.filter((client) => client._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await getClientRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, client) => {
    try {
      await updateClientRequest(id, client);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        client,
        createClient,
        getClients,
        deleteClient,
        getClient,
        updateClient,
        getAllClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
