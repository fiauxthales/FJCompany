import { createContext, useState } from "react";

export const SessionContext = createContext();
SessionContext.displayName = "Session";

export function SessionProvider({ children }) {
  const [sessao, setSessao] = useState({
    cpf: "",
    token: "",
    funcao: "",
    activeSession: false,
  });

  return (
    <SessionContext.Provider value={{ sessao, setSessao }}>
      {children}
    </SessionContext.Provider>
  );
}