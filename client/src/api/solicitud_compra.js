import axios from "./axios";

export const getSolicitudsCompraRequest = () => axios.get('/solicitudes_compra')

export const getSolicitudCompraRequest = (id) => axios.get(`/solicitudes_compra/${id}`)

export const createSolicitudCompraRequest = (solicitud_compra) => axios.post('/solicitudes_compra',solicitud_compra)

export const updateSolicitudCompraRequest = (id, solicitud_compra) => axios.put(`/solicitudes_compra/${id}`,solicitud_compra)

export const deleteSolicitudCompraRequest = (id) => axios.delete(`/solicitudes_compra/${id}`)