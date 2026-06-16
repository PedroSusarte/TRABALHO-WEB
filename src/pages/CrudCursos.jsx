import { useState } from "react";
import TabelaLista from "../components/TabelaLista";

const INICIAL = { id: null, nome: "", cargaHoraria: "", categoria: "" };
const CATEGORIAS = ["Tecnologia", "Saúde", "Negócios", "Educação", "Outro"];

export default function CrudCursos() {
  const [cursos, setCursos] = useState(() => {
    return JSON.parse(localStorage.getItem("cursos")) || [];
  });
  const [form, setForm] = useState(INICIAL);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);

  function salvar(lista) {
    setCursos(lista);
    localStorage.setItem("cursos", JSON.stringify(lista));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!form.nome || !form.cargaHoraria || !form.categoria) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    if (editando) {
      salvar(cursos.map((c) => (c.id === form.id ? form : c)));
      setEditando(false);
    } else {
      salvar([...cursos, { ...form, id: Date.now() }]);
    }
    setForm(INICIAL);
  }

  function handleEditar(curso) {
    setForm(curso);
    setEditando(true);
  }

  function handleDeletar(id) {
    if (window.confirm("Excluir curso?")) {
      salvar(cursos.filter((c) => c.id !== id));
    }
  }

  return (
    <div>
      <h2 style={styles.titulo}>Cursos</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.subtitulo}>
          {editando ? "Editar Curso" : "Novo Curso"}
        </h3>
        <div style={styles.grid}>
          <div style={styles.campo}>
            <label>Nome do Curso</label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: React do Zero"
              style={styles.input}
            />
          </div>
          <div style={styles.campo}>
            <label>Carga Horária (h)</label>
            <input
              type="number"
              value={form.cargaHoraria}
              onChange={(e) =>
                setForm({ ...form, cargaHoraria: e.target.value })
              }
              placeholder="Ex: 40"
              style={styles.input}
            />
          </div>
          <div style={styles.campo}>
            <label>Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione...</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
          { key: "nome", label: "Curso" },
          { key: "cargaHoraria", label: "Carga Horária (h)" },
          { key: "categoria", label: "Categoria" },
        ]}
        dados={cursos}
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
