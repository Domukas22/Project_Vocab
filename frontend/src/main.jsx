import React from "react";
import ReactDOM from "react-dom/client";
import App from "./logic/App";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/1_nav.css";
import "./styles/2_board.css";
import "./styles/3_form.css";
import "./styles/4_btns.css";
import "./styles/5_coloredText.css";
import "./styles/6_colorBtn_WRAP.css";

// import { terminal } from "virtual:terminal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => console.clear());
}
