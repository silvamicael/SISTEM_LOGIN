import { useState } from 'react';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));
  const [pagina, setPagina] = useState('dashboard');

  function logout() {
    localStorage.removeItem('token');
    setLogado(false);
  }

  if (!logado) {
  return <Auth onLogin={() => setLogado(true)} />;
}

  return (
    <div className="layout">
      <Sidebar setPagina={setPagina} />

      <div className="content">
        <Navbar onLogout={logout} />

        {pagina === 'dashboard' && <Dashboard />}
        {pagina === 'perfil' && <Perfil />}
      </div>
    </div>
  );
}

export default App;