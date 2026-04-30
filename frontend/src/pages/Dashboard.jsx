import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const res = await fetch(`${API_URL}/usuario/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dados = await res.json();

    if (res.ok) setUsuario(dados);
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Usuário</h3>
          <p>{usuario?.nome}</p>
        </div>

        <div className="dashboard-card">
          <h3>Email</h3>
          <p>{usuario?.email}</p>
        </div>

        <div className="dashboard-card">
          <h3>Status</h3>
          <p style={{ color: '#22c55e' }}>Ativo</p>
        </div>
      </div>

      <div className="card">
        <h3>Atividades recentes</h3>
        <ul style={{ marginTop: '10px', lineHeight: '1.8' }}>
          <li>Login realizado</li>
          <li>Perfil carregado</li>
          <li>Conectado ao backend</li>
          <li>JWT validado</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Informações do sistema</h3>
        <p><strong>Versão:</strong> 1.0.0</p>
        <p><strong>API:</strong> Online</p>
        <p><strong>Banco:</strong> Conectado</p>
        <p><strong>Ambiente:</strong> Dev</p>
      </div>
    </div>
  );
}

export default Dashboard;