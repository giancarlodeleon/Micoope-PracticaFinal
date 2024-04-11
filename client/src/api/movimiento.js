import axios from "./axios";

export const getMovimientosRequest = () => axios.get('/movimientos')

export const getMovimientoRequest = (id) => axios.get(`/movimientos/${id}`)

export const createMovimientoRequest = (movimiento) => axios.post('/movimientos',movimiento)

export const updateMovimientoRequest = (id, movimiento) => axios.put(`/movimientos/${id}`,movimiento)

export const deleteMovimientoRequest = (id) => axios.delete(`/movimientos/${id}`)
