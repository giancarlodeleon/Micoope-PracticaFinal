import axios from "./axios";

export const getSolicitudsRequest = () => axios.get('/solicitudes')

export const getSolicitudRequest = (id) => axios.get(`/solicitudes/${id}`)

export const createSolicitudRequest = (solicitud) => axios.post('/solicitudes',solicitud)

export const updateSolicitudRequest = (id, solicitud) => axios.put(`/solicitudes/${id}`,solicitud)

export const deleteSolicitudRequest = (id) => axios.delete(`/solicitudes/${id}`)