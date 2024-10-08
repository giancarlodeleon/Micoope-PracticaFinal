import axios from "./axios";

export const getClientsRequest = () => axios.get('/clients')

export const getAllClientsRequest = () => axios.get('/clients')

export const getClientRequest = (id) => axios.get(`/clients/${id}`)

export const createClientRequest = (client) => axios.post('/clients',client)

export const updateClientRequest = (id, client) => axios.put(`/clients/${id}`,client)

export const deleteClientRequest = (id) => axios.delete(`/clients/${id}`)