import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CrudAlunos from "./CrudAlunos";
import CrudCursos from "./CrudCursos";
import CrudMatriculas from "./CrudMatriculas";
import Relatorio from "./Relatorio";

const abas = ["Alunos", "Cursos", "Matrículas", "Relatório"];

export default function Dashboard() {
  const { usuario, logout } = useContext(AuthContext);
  const [aba, setAba] = useState("Alunos");

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <span style={styles.logo}>GestãoEdu</span>
        <span style={styles.userInfo}>
            {usuario.email} &nbsp;
          <button onClick={logout} style={styles.logoutBtn}>
            Sair
          </button>
        </span>
      </header>

      <nav style={styles.nav}>
        {abas.map((a) => (
          <button
            key={a}
            onClick={() => setAba(a)}
            style={{ ...styles.tab, ...(aba === a ? styles.tabAtiva : {}) }}
          >
            {a}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {aba === "Alunos" && <CrudAlunos />}
        {aba === "Cursos" && <CrudCursos />}
        {aba === "Matrículas" && <CrudMatriculas />}
        {aba === "Relatório" && <Relatorio />}
      </main>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f5f7fa" },
  header: {
    background: "#1976d2",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontWeight: "bold", fontSize: "1.2rem" },
  userInfo: { fontSize: "0.9rem" },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.5)",
    color: "#fff",
    padding: "0.3rem 0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  nav: {
    background: "#fff",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    padding: "0 1.5rem",
    gap: "0.25rem",
  },
  tab: {
    padding: "0.75rem 1.25rem",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#555",
    fontSize: "0.95rem",
    borderBottom: "3px solid transparent",
  },
  tabAtiva: {
    color: "#1976d2",
    borderBottom: "3px solid #1976d2",
    fontWeight: "bold",
  },
  main: { padding: "1.5rem", maxWidth: "900px", margin: "0 auto" },
};
