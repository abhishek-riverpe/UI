import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./Routes";
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
);
