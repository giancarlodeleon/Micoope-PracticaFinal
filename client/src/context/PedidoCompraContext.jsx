import { createContext, useContext, useState } from "react";
import {
  createPedidoCompraRequest,
  getPedidosCompraRequest,
  deletePedidoCompraRequest,
  getPedidoCompraRequest,
  updatePedidoCompraRequest,
} from "../api/pedido_compra";

const PedidoCompraContext = createContext();

export const usePedidosCompra = () => {
  const context = useContext(PedidoCompraContext);

  if (!context) {
    throw new Error("usePedidoCompra must be usted within a PedidoCompraProvider");
  }
  return context;
};

export function PedidoCompraProvider({ children }) {
  const [pedido_compra, setPedidosCompra] = useState([]);

  const getPedidosCompra = async () => {
    try {
      const res = await getPedidosCompraRequest();
      setPedidosCompra(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPedidoCompra = async (pedido_compra) => {
    const res = await createPedidoCompraRequest(pedido_compra);
    console.log(res);
  };

  const deletePedidoCompra = async (id) => {
    try {
      const res = await deletePedidoCompraRequest(id);
      if (res.status == 204)
        setPedidosCompra(pedido_compra.filter((pedido_compra) => pedido_compra._id !== id));
    } catch (error) {
      console.log(res);
    }
  };

  const getPedidoCompra = async (id) => {
    try {
      const res = await getPedidoCompraRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePedidoCompra = async (id, pedido_compra) => {
    try {
      await updatePedidoCompraRequest(id, pedido_compra);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PedidoCompraContext.Provider
      value={{
        pedido_compra,
        createPedidoCompra,
        getPedidosCompra,
        deletePedidoCompra,
        getPedidoCompra,
        updatePedidoCompra,
      }}
    >
      {children}
    </PedidoCompraContext.Provider>
  );
}