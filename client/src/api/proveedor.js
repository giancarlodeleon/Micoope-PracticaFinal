import axios from "./axios";

export const getProveedorsRequest = () => axios.get('/proveedors')

export const getProveedorRequest = (id) => axios.get(`/proveedors/${id}`)

export const createProveedorRequest = (proveedor) => axios.post('/proveedors',proveedor)

export const updateProveedorRequest = (id, proveedor) => axios.put(`/proveedors/${id}`,proveedor)

export const deleteProveedorRequest = (id) => axios.delete(`/proveedors/${id}`)