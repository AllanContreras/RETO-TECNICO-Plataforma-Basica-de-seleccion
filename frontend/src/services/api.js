import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const MEDIA_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const registrarPracticante = async (formData) => {
  const response = await api.post('/practicantes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const obtenerPracticantes = async () => {
  const response = await api.get('/practicantes');

  return response.data;
};

export const actualizarEstadoPracticante = async (id, estado) => {
  const response = await api.put(`/practicantes/${id}/estado`, { estado });

  return response.data;
};
