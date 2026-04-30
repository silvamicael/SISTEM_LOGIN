import { useState } from "react";

const API_URL = "http://localhost:3000";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ nome: "", email: "", senha: "" });
    const [msg, setMsg] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function submit(e) {
        e.preventDefault();
        setMsg("");

        const url = isLogin ? "/auth/login" : "/auth/cadastro";

        try {
            const res = await fetch(API_URL + url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                if (isLogin) {
                    localStorage.setItem("token", data.token);
                    window.location.reload();
                } else {
                    setMsg("Cadastro realizado com sucesso!");
                    setIsLogin(true);
                }
            } else {
                setMsg(data.erro || "Erro ao processar");
            }
        } catch {
            setMsg("Erro de conexão com o servidor");
        }
    }

    return (
        <div className="auth-container">
            <div className={`auth-card ${isLogin ? "" : "flip"}`}>

                {/* FRENTE - LOGIN */}
                <div className="auth-face auth-front">
                    <div className="auth-box">
                        <div className="auth-header">
                            <h2>Bem-vindo 👋</h2>
                            <p>Entre com seus dados</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    name="senha"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className="auth-btn">Entrar</button>
                        </form>

                        <div className="switch-auth">
                            <p>
                                Não tem conta?{" "}
                                <span onClick={() => setIsLogin(false)}>
                                    Criar agora
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* VERSO - CADASTRO */}
                <div className="auth-face auth-back">
                    <div className="auth-box">
                        <div className="auth-header">
                            <h2>Criar conta 🚀</h2>
                            <p>Preencha seus dados</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    name="nome"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    name="senha"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className="auth-btn">Cadastrar</button>
                        </form>

                        <div className="switch-auth">
                            <p>
                                Já tem conta?{" "}
                                <span onClick={() => setIsLogin(true)}>
                                    Fazer login
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {msg && <p className="msg error">{msg}</p>}
        </div>
    );
}

export default Auth;