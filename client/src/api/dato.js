import axios from "./axios";

export const getDatosRequest = () => axios.get('/dato')


export const createDatoRequest = (dato) => axios.post('/dato',dato)


export const deleteDatoRequest = () => axios.delete('/dato')