import { useEffect, useState } from 'react';
import { getAlunos, deleteAluno } from '../api/alunoApi';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
} from '@mui/material';

const AlunoList = ({ onEdit }) => {
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    try {
      const response = await getAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este aluno?')) {
      await deleteAluno(id);
      fetchAlunos();
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Grid container spacing={3}>
        {alunos.map((aluno) => (
          <Grid item xs={12} sm={6} md={4} key={aluno.id}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {aluno.nome}
                </Typography>
                <Typography color="text.secondary">Turma: {aluno.turma}</Typography>
                <Typography color="text.secondary">Curso: {aluno.curso}</Typography>
                <Typography color="text.secondary">Matrícula: {aluno.matricula}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onEdit(aluno)}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(aluno.id)}>
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlunoList;
