import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SessionProvider } from "./context/sessionContext";

const root = createRoot(document.getElementById("root"));

root.render(
  //<Provider store={store}>
  //<Helmet>
  <BrowserRouter>
    <SessionProvider>
      <App />
    </SessionProvider>
  </BrowserRouter>
  //</Helmet>
  //</Provider>
);
