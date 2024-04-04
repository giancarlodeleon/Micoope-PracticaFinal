import axios from "./axios";

export const getBoletasRequest = () => axios.get('/boletas')

export const getBoletaRequest = (id) => axios.get(`/boletas/${id}`)

export const createBoletaRequest = (boleta) => axios.post('/boletas',boleta)

export const updateBoletaRequest = (id, boleta) => axios.put(`/boletas/${id}`,boleta)

export const deleteBoletaRequest = (id) => axios.delete(`/boletas/${id}`)