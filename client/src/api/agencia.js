import axios from "./axios";

export const getAgenciasRequest = () => axios.get('/agencias')

export const getAgenciaRequest = (id) => axios.get(`/agencias/${id}`)

export const createAgenciaRequest = (agencia) => axios.post('/agencias',agencia)

export const updateAgenciaRequest = (id, agencia) => axios.put(`/agencias/${id}`,agencia)

export const deleteAgenciaRequest = (id) => axios.delete(`/agencias/${id}`)