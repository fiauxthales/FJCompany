import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SessionContext } from "./context/sessionContext";
import NotFoundView from "./pages/errors/NotFoundView";
import Login from "./pages/login/Login";
import MensagemAleatoria from "./pages/mensagemAleatoria/MensagemAleatoria";
import Signup from "./pages/signup/Signup";

// ----------------------------------------------------------------------

export default function AppRoutes() {
  const { sessao } = useContext(SessionContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          sessao.activeSession ? (
            <Navigate to="/app" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/app"
        element={
          sessao.activeSession ? (
            <MensagemAleatoria />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={sessao.activeSession? <MensagemAleatoria/> : <Login />} />
      <Route path="/signup" element={sessao.activeSession? <MensagemAleatoria/> : <Signup />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
