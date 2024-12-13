import axios from "./axios";

export const getVentasRequest = () => axios.get('/ventas')

export const getVentaRequest = (id) => axios.get(`/ventas/${id}`)

export const createVentaRequest = (venta) => axios.post('/ventas',venta)

export const updateVentaRequest = (id, venta) => axios.put(`/ventas/${id}`,venta)

export const deleteVentaRequest = (id) => axios.delete(`/ventas/${id}`)