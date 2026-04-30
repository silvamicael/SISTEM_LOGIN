import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

function Perfil() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    novaSenha: ''
  });

  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    const res = await fetch(`${API_URL}/usuario/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dados = await res.json();

    if (res.ok) {
      setForm({ nome: dados.nome, email: dados.email, novaSenha: '' });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function atualizar(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/usuario/perfil`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const dados = await res.json();

    if (res.ok) {
      setMsg('Atualizado com sucesso!');
      setErro('');
    } else {
      setErro(dados.erro);
      setMsg('');
    }
  }

  async function deletarConta() {
    if (!confirm('Deseja desativar?')) return;

    await fetch(`${API_URL}/usuario/conta`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem('token');
    window.location.reload();
  }

  const iniciais = form.nome
    ? form.nome.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="card profile-card">

  <div className="profile-header">
    <div className="avatar">
      {form.nome?.[0]?.toUpperCase()}
    </div>

    <div className="profile-info">
      <h3>{form.nome}</h3>
      <span>{form.email}</span>
    </div>
  </div>

  <form onSubmit={atualizar}>

    <div className="form-group">
      <label>Nome</label>
      <input name="nome" value={form.nome} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Nova senha</label>
      <input name="novaSenha" type="password" onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Confirmar senha</label>
      <input name="confirmarSenha" type="password" onChange={handleChange} />
    </div>

    <div className="form-actions">
      <button type="submit">Salvar</button>
      <button className="danger" type="button" onClick={deletarConta}>
        Desativar
      </button>
    </div>

  </form>

</div>
  );
}

export default Perfil;