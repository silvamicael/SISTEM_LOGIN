import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

function Perfil() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      const res = await fetch(`${API_URL}/usuario/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dados = await res.json();

      if (!res.ok) {
        setErro(dados.erro);
        return;
      }

      setForm({
        nome: dados.nome,
        email: dados.email,
        novaSenha: '',
        confirmarSenha: ''
      });

    } catch {
      setErro('Erro ao carregar perfil');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function atualizar(e) {
    e.preventDefault();
    setErro('');
    setMsg('');

    if (form.novaSenha && form.novaSenha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/usuario/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          novaSenha: form.novaSenha || undefined
        })
      });

      const dados = await res.json();

      if (!res.ok) {
        setErro(dados.erro);
        return;
      }

      setMsg('Perfil atualizado com sucesso!');
      setForm({ ...form, novaSenha: '', confirmarSenha: '' });

    } catch {
      setErro('Erro ao atualizar');
    }
  }

  async function deletarConta() {
    if (!confirm('Tem certeza que deseja desativar sua conta?')) return;

    await fetch(`${API_URL}/usuario/conta`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.removeItem('token');
    window.location.reload();
  }

  const iniciais = form.nome
    ? form.nome.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="page">
      <div className="card profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">{iniciais}</div>

          <div className="profile-info">
            <h3>{form.nome || 'Carregando...'}</h3>
            <span>{form.email}</span>
          </div>
        </div>

        {/* FORM */}
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
            <input
              name="novaSenha"
              type="password"
              placeholder="Digite uma nova senha"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              name="confirmarSenha"
              type="password"
              placeholder="Confirme a senha"
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">Salvar alterações</button>

            <button
              type="button"
              className="danger"
              onClick={deletarConta}
            >
              Desativar conta
            </button>
          </div>
        </form>

        {msg && <p className="msg success">{msg}</p>}
        {erro && <p className="msg error">{erro}</p>}
      </div>
    </div>
  );
}

export default Perfil;