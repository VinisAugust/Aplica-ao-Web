import { Button, TextField, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const AlunoForm = ({ onSubmit, initialData }) => {
  const [aluno, setAluno] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: '',
  });

  useEffect(() => {
    if (initialData) {
      setAluno(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(aluno);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <TextField
        label="Nome"
        name="nome"
        value={aluno.nome}
        onChange={handleChange}
        required
      />
      <TextField
        label="Turma"
        name="turma"
        value={aluno.turma || ''}
        onChange={handleChange}
      />
      <TextField
        label="Curso"
        name="curso"
        value={aluno.curso || ''}
        onChange={handleChange}
      />
      <TextField
        label="Matrícula"
        name="matricula"
        value={aluno.matricula || ''}
        onChange={handleChange}
        required
      />
      <Button variant="contained" type="submit">
        Salvar
      </Button>
    </Box>
  );
};

export default AlunoForm;
