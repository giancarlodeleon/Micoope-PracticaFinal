import axios from "./axios";

export const getUsersRequest = () => axios.get('/users')

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)


