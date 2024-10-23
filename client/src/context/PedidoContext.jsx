import { createContext, useContext, useState } from "react";
import {
  createPedidoRequest,
  getPedidosRequest,
  deletePedidoRequest,
  getPedidoRequest,
  updatePedidoRequest,
} from "../api/pedido";

const PedidoContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error("usePedido must be usted within a PedidoProvider");
  }
  return context;
};

export function PedidoProvider({ children }) {
  const [pedido, setPedidos] = useState([]);

  const getPedidos = async () => {
    try {
      const res = await getPedidosRequest();
      setPedidos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPedido = async (pedido) => {
    const res = await createPedidoRequest(pedido);
    console.log(res);
  };

  const deletePedido = async (id) => {
    try {
      const res = await deletePedidoRequest(id);
      if (res.status == 204)
        setPedidos(pedido.filter((pedido) => pedido._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getPedido = async (id) => {
    try {
      const res = await getPedidoRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePedido = async (id, pedido) => {
    try {
      await updatePedidoRequest(id, pedido);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        createPedido,
        getPedidos,
        deletePedido,
        getPedido,
        updatePedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}