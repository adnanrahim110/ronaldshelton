import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { ReadBookProvider } from "./context/ReadBookContext.jsx";
import "./fonts.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <ReadBookProvider>
          <App />
        </ReadBookProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
