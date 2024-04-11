import axios from "./axios";

export const getGastosRequest = () => axios.get('/gasto')

export const getGastoRequest = (id) => axios.get(`/gasto/${id}`)

export const createGastoRequest = (gasto) => axios.post('/gasto',gasto)

export const updateGastoRequest = (id, gasto) => axios.put(`/gasto/${id}`,gasto)

export const deleteGastoRequest = (id) => axios.delete(`/gasto/${id}`)