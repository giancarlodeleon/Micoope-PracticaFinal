import axios from "./axios";

export const getRolsRequest = () => axios.get('/rols')

export const getRolRequest = (id) => axios.get(`/rols/${id}`)

export const createRolRequest = (rol) => axios.post('/rols',rol)

export const updateRolRequest = (id, rol) => axios.put(`/rols/${id}`,rol)

export const deleteRolRequest = (id) => axios.delete(`/rols/${id}`)