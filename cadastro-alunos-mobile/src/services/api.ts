import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://leoproti.com.br:8004',
});

export const getAlunos = () => api.get('/alunos');
export const getAlunoById = (id) => api.get(`/alunos/${id}`);
export const criarAluno = (aluno) => api.post('/alunos', aluno);
export const atualizarAluno = (id, aluno) => api.put(`/alunos/${id}`, aluno);
export const excluirAluno = (id) => api.delete(`/alunos/${id}`);
