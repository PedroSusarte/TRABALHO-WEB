import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { usuario } = useContext(AuthContext);
  return usuario ? <Dashboard /> : <Login />;
}
