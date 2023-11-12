import React from "react";
import ReactDOM from "react-dom/client";
import App from "./logic/App";
import "./styles/reset.css";
import "./styles/main.css";
import "./styles/form.css";
import "./styles/nav.css";
import "./styles/global.css";
import "./styles/btn.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}
