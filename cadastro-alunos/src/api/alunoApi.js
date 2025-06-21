import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAlunos = () => api.get('/alunos');
export const createAluno = (aluno) => api.post('/alunos', aluno);
export const updateAluno = (id, aluno) => api.put(`/alunos/${id}`, aluno);
export const deleteAluno = (id) => api.delete(`/alunos/${id}`);
