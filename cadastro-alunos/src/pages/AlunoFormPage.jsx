import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createAluno, updateAluno } from '../api/alunoApi';
import AlunoForm from '../components/AlunoForm';

const AlunoFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const handleSubmit = async (aluno) => {
    try {
      if (id) {
        await updateAluno(id, aluno);
      } else {
        await createAluno(aluno);
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar aluno', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}</h2>
      <AlunoForm onSubmit={handleSubmit} initialData={state} />
    </div>
  );
};

export default AlunoFormPage;
