import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AlunoFormPage from './pages/AlunoFormPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<AlunoFormPage />} />
        <Route path="/editar/:id" element={<AlunoFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;