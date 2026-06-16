export default function TabelaLista({ colunas, dados, onEditar, onDeletar }) {
  if (dados.length === 0) {
    return (
      <p style={{ color: "#aaa", textAlign: "center", padding: "2rem" }}>
        Nenhum registro cadastrado ainda.
      </p>
    );
  }

  return (
    <table style={styles.tabela}>
      <thead>
        <tr>
          {colunas.map((col) => (
            <th key={col.key} style={styles.th}>
              {col.label}
            </th>
          ))}
          <th style={styles.th}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item) => (
          <tr key={item.id} style={styles.tr}>
            {colunas.map((col) => (
              <td key={col.key} style={styles.td}>
                {item[col.key]}
              </td>
            ))}
            <td style={styles.td}>
              <button onClick={() => onEditar(item)} style={styles.btnEdit}>
                Editar
              </button>
              <button onClick={() => onDeletar(item.id)} style={styles.btnDel}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  tabela: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
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
