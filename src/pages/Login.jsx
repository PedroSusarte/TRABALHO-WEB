import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (!email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }
    if (senha.length < 4) {
      setErro("Senha deve ter pelo menos 4 caracteres.");
      return;
    }

    const ok = login(email, senha);
    if (!ok) setErro("Credenciais inválidas.");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>Login</h2>
        <p style={styles.sub}>Sistema de Gerenciamento</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.campo}>
            <label>E-mail</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" style={styles.input}/>
          </div>
          <div style={styles.campo}>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              style={styles.input}
            />
          </div>
          {erro && <p style={styles.erro}>{erro}</p>}
          <button type="submit" style={styles.btn}>
            Entrar
          </button>
        </form>
        <p style={styles.dica}>
          Use qualquer e-mail válido e senha com 4+ caracteres
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f2f5",
  },
  card: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  titulo: { margin: "0 0 0.25rem", fontSize: "1.6rem" },
  sub: { color: "#888", marginTop: 0, marginBottom: "1.5rem" },
  campo: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  input: {
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  erro: { color: "#e53935", marginBottom: "0.8rem", fontSize: "0.9rem" },
  btn: {
    width: "100%",
    padding: "0.75rem",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  dica: {
    marginTop: "1rem",
    fontSize: "0.8rem",
    color: "#aaa",
    textAlign: "center",
  },
};
