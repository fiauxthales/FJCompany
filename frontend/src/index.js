import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { SessionProvider } from "./context/sessionContext";
import "normalize.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  </BrowserRouter>
);
