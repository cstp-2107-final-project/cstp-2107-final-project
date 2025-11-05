import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initDB } from "./store/db";
import { seed } from "./data/seed";

initDB(seed); // ✅ Loads seed data once

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
