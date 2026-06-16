import { useState } from "react";

const INICIAL = { id: null, alunoId: "", cursoId: "", dataMatricula: "" };

export default function CrudMatriculas() {
  const [matriculas, setMatriculas] = useState(() => {
    return JSON.parse(localStorage.getItem("matriculas")) || [];
  });
  const [alunos] = useState(
    () => JSON.parse(localStorage.getItem("alunos")) || [],
  );
  const [cursos] = useState(
    () => JSON.parse(localStorage.getItem("cursos")) || [],
  );
  const [form, setForm] = useState(INICIAL);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);

  function salvar(lista) {
    setMatriculas(lista);
    localStorage.setItem("matriculas", JSON.stringify(lista));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    if (!form.alunoId || !form.cursoId || !form.dataMatricula) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    if (editando) {
      salvar(matriculas.map((m) => (m.id === form.id ? form : m)));
      setEditando(false);
    } else {
      salvar([...matriculas, { ...form, id: Date.now() }]);
    }
    setForm(INICIAL);
  }

  function handleEditar(mat) {
    setForm(mat);
    setEditando(true);
  }

  function handleDeletar(id) {
    if (window.confirm("Excluir matrícula?")) {
      salvar(matriculas.filter((m) => m.id !== id));
    }
  }

  function getNome(id, lista) {
    const item = lista.find((i) => String(i.id) === String(id));
    return item ? item.nome : "—";
  }

  return (
    <div>
      <h2 style={styles.titulo}>Matrículas</h2>

      {(alunos.length === 0 || cursos.length === 0) && (
        <div style={styles.aviso}>
          Cadastre alunos e cursos antes de criar matrículas.
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.subtitulo}>
          {editando ? "Editar Matrícula" : "Nova Matrícula"}
        </h3>
        <div style={styles.grid}>
          <div style={styles.campo}>
            <label>Aluno</label>
            <select
              value={form.alunoId}
              onChange={(e) => setForm({ ...form, alunoId: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione...</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.campo}>
            <label>Curso</label>
            <select
              value={form.cursoId}
              onChange={(e) => setForm({ ...form, cursoId: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione...</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.campo}>
            <label>Data de Matrícula</label>
            <input
              type="date"
              value={form.dataMatricula}
              onChange={(e) =>
                setForm({ ...form, dataMatricula: e.target.value })
              }
              style={styles.input}
            />
          </div>
        </div>
        {erro && <p style={styles.erro}>{erro}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" style={styles.btn}>
            {editando ? "Salvar" : "Matricular"}
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

      {matriculas.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center", padding: "2rem" }}>
          Nenhuma matrícula cadastrada ainda.
        </p>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Aluno</th>
              <th style={styles.th}>Curso</th>
              <th style={styles.th}>Data</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((m) => (
              <tr key={m.id} style={styles.tr}>
                <td style={styles.td}>{getNome(m.alunoId, alunos)}</td>
                <td style={styles.td}>{getNome(m.cursoId, cursos)}</td>
                <td style={styles.td}>{m.dataMatricula}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEditar(m)}
                    style={styles.btnEdit}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(m.id)}
                    style={styles.btnDel}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
  aviso: {
    background: "#fff8e1",
    border: "1px solid #ffd54f",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    fontSize: "0.9rem",
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
  tabela: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  th: {
    background: "#1976d2",
    color: "#fff",
    padding: "0.75rem 1rem",
    textAlign: "left",
    fontSize: "0.9rem",
  },
  tr: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "0.7rem 1rem", fontSize: "0.9rem" },
  btnEdit: {
    marginRight: "0.5rem",
    padding: "0.3rem 0.6rem",
    background: "#fff3e0",
    border: "1px solid #ffa726",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  btnDel: {
    padding: "0.3rem 0.6rem",
    background: "#fce4e4",
    border: "1px solid #e57373",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};
