import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";

function forceDismissPreloader() {
  const el = document.getElementById("preloader");
  if (!el) return;
  el.style.opacity = "0";
  el.style.visibility = "hidden";
  window.setTimeout(() => el.remove(), 500);
}

// Bootstrap-level fallback so preloader cannot hang if app init fails early.
window.addEventListener("load", () => {
  window.setTimeout(forceDismissPreloader, 1200);
});
window.setTimeout(forceDismissPreloader, 3000);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
