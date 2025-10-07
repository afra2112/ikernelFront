import axios from 'axios';

const API_URL = 'http://localhost:8080/api/proyectos';

export const listarProyectos = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

export const crearProyectos = async (proyecto) => {
  const response = await axios.post(`${API_URL}/nuevo`, proyecto);
  return response.data;
};