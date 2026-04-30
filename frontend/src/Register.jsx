import { useState } from 'react';

const API_URL = 'http://localhost:3000';

function Register({ onRegister }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [erro, setErro] = useState('');
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setMsg('');

    try {
      const resposta = await fetch(`${API_URL}/auth/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro);
        return;
      }

      setMsg('Conta criada com sucesso!');
      setTimeout(() => onRegister(), 1000);

    } catch {
      setErro('Erro de conexão');
    }
  }

  return (
    <div>
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>

      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

export default Register;