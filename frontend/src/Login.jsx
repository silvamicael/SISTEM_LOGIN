import { useState } from 'react';

const API_URL = 'http://localhost:3000';

function Auth({ onLogin }) {
  const [modo, setModo] = useState('login');

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [erro, setErro] = useState('');
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setMsg('');

    if (modo === 'register' && form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const url =
        modo === 'login'
          ? `${API_URL}/auth/login`
          : `${API_URL}/auth/cadastro`;

      const body =
        modo === 'login'
          ? { email: form.email, senha: form.senha }
          : { nome: form.nome, email: form.email, senha: form.senha };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const dados = await res.json();

      if (!res.ok) {
        setErro(dados.erro);
        return;
      }

      if (modo === 'login') {
        localStorage.setItem('token', dados.token);
        onLogin();
      } else {
        setMsg('Conta criada com sucesso!');
        setModo('login');
      }

    } catch {
      setErro('Erro de conexão');
    }
  }

  return (
    <div className="container">
      <h2>{modo === 'login' ? 'Login' : 'Cadastro'}</h2>

      <form onSubmit={handleSubmit}>
        {modo === 'register' && (
          <input
            name="nome"
            placeholder="Nome"
            onChange={handleChange}
            required
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        {modo === 'register' && (
          <input
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button
        className="link"
        onClick={() =>
          setModo(modo === 'login' ? 'register' : 'login')
        }
      >
        {modo === 'login'
          ? 'Criar conta'
          : 'Já tenho conta'}
      </button>

      {msg && <p className="msg success">{msg}</p>}
      {erro && <p className="msg error">{erro}</p>}
    </div>
  );
}

export default Auth;