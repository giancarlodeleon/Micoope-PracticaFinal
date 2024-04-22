import axios from "./axios";

export const getSalidasRequest = () => axios.get('/salidas')

export const getSalidaRequest = (id) => axios.get(`/salidas/${id}`)

export const createSalidaRequest = (salida) => axios.post('/salidas',salida)

export const updateSalidaRequest = (id, salida) => axios.put(`/salidas/${id}`,salida)

export const deleteSalidaRequest = (id) => axios.delete(`/salidas/${id}`)
