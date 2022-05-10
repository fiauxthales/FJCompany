import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { SessionProvider } from "./context/sessionContext";

const root = createRoot(document.getElementById("root"));

root.render(
  //<Provider store={store}>
  //<Helmet>
  <BrowserRouter>
    <SessionProvider>
      <AppRoutes />
    </SessionProvider>
  </BrowserRouter>
  //</Helmet>
  //</Provider>
);
