import { useState } from "react";
import TabelaLista from "../components/TabelaLista";

const INICIAL = { id: null, nome: "", email: "", idade: "" };

export default function CrudAlunos() {
  const [alunos, setAlunos] = useState(() => {
    return JSON.parse(localStorage.getItem("alunos")) || [];
  });
  const [form, setForm] = useState(INICIAL);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);

  function salvar(lista) {
    setAlunos(lista);
    localStorage.setItem("alunos", JSON.stringify(lista));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!form.nome || !form.email || !form.idade) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }
    if (!form.email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }

    if (editando) {
      salvar(alunos.map((a) => (a.id === form.id ? form : a)));
      setEditando(false);
    } else {
      salvar([...alunos, { ...form, id: Date.now() }]);
    }
    setForm(INICIAL);
  }

  function handleEditar(aluno) {
    setForm(aluno);
    setEditando(true);
  }

  function handleDeletar(id) {
    if (window.confirm("Excluir aluno?")) {
      salvar(alunos.filter((a) => a.id !== id));
    }
  }

  return (
    <div>
      <h2 style={styles.titulo}>Alunos</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.subtitulo}>
          {editando ? "Editar Aluno" : "Novo Aluno"}
        </h3>
        <div style={styles.grid}>
          <div style={styles.campo}>
            <label>Nome</label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Nome completo"
              style={styles.input}
            />
          </div>
          <div style={styles.campo}>
            <label>E-mail</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@exemplo.com"
              style={styles.input}
            />
          </div>
          <div style={styles.campo}>
            <label>Idade</label>
            <input
              type="number"
              value={form.idade}
              onChange={(e) => setForm({ ...form, idade: e.target.value })}
              placeholder="Ex: 20"
              style={styles.input}
            />
          </div>
        </div>
        {erro && <p style={styles.erro}>{erro}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" style={styles.btn}>
            {editando ? "Salvar" : "Cadastrar"}
          </button>
          {editando && (
            <button
              type="button"
              onClick={() => {
                setForm(INICIAL);
                setEditando(false);
              }}
              style={styles.btnCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <TabelaLista
        colunas={[
          { key: "nome", label: "Nome" },
          { key: "email", label: "E-mail" },
          { key: "idade", label: "Idade" },
        ]}
        dados={alunos}
        onEditar={handleEditar}
        onDeletar={handleDeletar}
      />
    </div>
  );
}

const styles = {
  titulo: { marginTop: 0, color: "#1976d2" },
  subtitulo: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1rem",
    color: "#555",
  },
  form: {
    background: "#fff",
    padding: "1.25rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "1rem",
  },
  campo: { display: "flex", flexDirection: "column", gap: "0.3rem" },
  input: {
    padding: "0.55rem 0.75rem",
    borderRadius: "7px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
  },
  erro: { color: "#e53935", fontSize: "0.88rem", marginBottom: "0.5rem" },
  btn: {
    padding: "0.6rem 1.2rem",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
  },
  btnCancel: {
    padding: "0.6rem 1.2rem",
    background: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "7px",
    cursor: "pointer",
  },
};
