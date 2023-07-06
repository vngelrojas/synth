import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./playSynth.js";
import synth from  "./playSynth.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App synth={synth} />
  </React.StrictMode>
);
