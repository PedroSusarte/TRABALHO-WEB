import { useState } from "react";

export default function Relatorio() {
  const [alunos] = useState(
    () => JSON.parse(localStorage.getItem("alunos")) || [],
  );
  const [cursos] = useState(
    () => JSON.parse(localStorage.getItem("cursos")) || [],
  );
  const [matriculas] = useState(
    () => JSON.parse(localStorage.getItem("matriculas")) || [],
  );
  const [filtro, setFiltro] = useState("");

  const relatorio = matriculas
    .map((m) => {
      const aluno = alunos.find((a) => String(a.id) === String(m.alunoId));
      const curso = cursos.find((c) => String(c.id) === String(m.cursoId));
      return {
        id: m.id,
        aluno: aluno ? aluno.nome : "Aluno removido",
        email: aluno ? aluno.email : "—",
        curso: curso ? curso.nome : "Curso removido",
        categoria: curso ? curso.categoria : "—",
        cargaHoraria: curso ? curso.cargaHoraria : "—",
        dataMatricula: m.dataMatricula,
      };
    })
    .filter(
      (r) =>
        r.aluno.toLowerCase().includes(filtro.toLowerCase()) ||
        r.curso.toLowerCase().includes(filtro.toLowerCase()) ||
        r.categoria.toLowerCase().includes(filtro.toLowerCase()),
    );

  return (
    <div>
      <h2 style={styles.titulo}>Relatório — Alunos por Curso</h2>

      <div style={styles.resumo}>
        <div style={styles.card}>
          <span style={styles.num}>{alunos.length}</span>
          <span style={styles.label}>Alunos</span>
        </div>
        <div style={styles.card}>
          <span style={styles.num}>{cursos.length}</span>
          <span style={styles.label}>Cursos</span>
        </div>
        <div style={styles.card}>
          <span style={styles.num}>{matriculas.length}</span>
          <span style={styles.label}>Matrículas</span>
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar por aluno, curso ou categoria..."
          style={styles.busca}
        />
      </div>

      {matriculas.length === 0 ? (
        <div style={styles.vazio}>
          Nenhuma matrícula cadastrada. Acesse a aba Matrículas para cadastrar.
        </div>
      ) : relatorio.length === 0 ? (
        <div style={styles.vazio}>
          Nenhum resultado encontrado para "{filtro}".
        </div>
      ) : (
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Aluno</th>
              <th style={styles.th}>E-mail</th>
              <th style={styles.th}>Curso</th>
              <th style={styles.th}>Categoria</th>
              <th style={styles.th}>Carga (h)</th>
              <th style={styles.th}>Data Matrícula</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.map((r) => (
              <tr key={r.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{r.aluno}</strong>
                </td>
                <td style={styles.td}>{r.email}</td>
                <td style={styles.td}>{r.curso}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>{r.categoria}</span>
                </td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  {r.cargaHoraria}
                </td>
                <td style={styles.td}>{r.dataMatricula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={styles.rodape}>

      </p>
    </div>
  );
}

const styles = {
  titulo: { marginTop: 0, color: "#1976d2" },
  sub: {
    color: "#888",
    marginTop: "-0.75rem",
    marginBottom: "1.25rem",
    fontSize: "0.9rem",
  },
  resumo: { display: "flex", gap: "1rem", marginBottom: "1.5rem" },
  card: {
    flex: 1,
    background: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
  },
  num: { fontSize: "2rem", fontWeight: "bold", color: "#1976d2" },
  label: { fontSize: "0.85rem", color: "#888" },
  busca: {
    width: "100%",
    padding: "0.6rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    boxSizing: "border-box",
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
    fontSize: "0.85rem",
  },
  tr: { borderBottom: "1px solid #f0f0f0" },
  td: { padding: "0.7rem 1rem", fontSize: "0.88rem" },
  badge: {
    background: "#e3f2fd",
    color: "#1565c0",
    padding: "0.2rem 0.6rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
  },
  vazio: {
    background: "#f5f5f5",
    borderRadius: "8px",
    padding: "2rem",
    textAlign: "center",
    color: "#aaa",
  },
  rodape: {
    marginTop: "0.75rem",
    fontSize: "0.85rem",
    color: "#888",
    textAlign: "right",
  },
};
