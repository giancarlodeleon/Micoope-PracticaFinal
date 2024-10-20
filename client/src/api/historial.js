import axios from "./axios";

export const getHistorialsRequest = () => axios.get('/historials')

export const getHistorialRequest = (id) => axios.get(`/historials/${id}`)

export const createHistorialRequest = (historial) => axios.post('/historials',historial)

export const updateHistorialRequest = (id, historial) => axios.put(`/historials/${id}`,historial)

export const deleteHistorialRequest = (id) => axios.delete(`/historials/${id}`)