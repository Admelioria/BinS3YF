import React from "react";

import ReactDOM from "react-dom/client";
import './App/index.css';
import App from './App/app';
import reportWebVitals from './reportWebVitals'; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
 