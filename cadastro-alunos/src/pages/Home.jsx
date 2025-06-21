import AlunoList from '../components/AlunoList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <AlunoList onEdit={(aluno) => navigate(`/editar/${aluno.id}`, { state: aluno })} />
      <Button variant="contained" onClick={() => navigate('/novo')} sx={{ mt: 2 }}>
        Novo Aluno
      </Button>
    </div>
  );
};

export default Home;
