import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AlunoFormPage from './pages/AlunoFormPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<AlunoFormPage />} />
        <Route path="/editar/:id" element={<AlunoFormPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
