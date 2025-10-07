import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const listarUsuarios = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

export const crearUsuarios = async (usuario) => {
  const response = await axios.post(`${API_URL}/nuevo`, usuario);
  return response.data;
};