import axios from "./axios";

export const getPedidosCompraRequest = () => axios.get('/pedidos_compra')

export const getPedidoCompraRequest = (id) => axios.get(`/pedidos_compra/${id}`)

export const createPedidoCompraRequest = (pedido_compra) => axios.post('/pedidos_compra',pedido_compra)

export const updatePedidoCompraRequest = (id, pedido_compra) => axios.put(`/pedidos_compra/${id}`,pedido_compra)

export const deletePedidoCompraRequest = (id) => axios.delete(`/pedidos_compra/${id}`)