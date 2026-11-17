import React from "react";
import ReactDOM from "react-dom/client";
import Chart from "chart.js/auto";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
window.Chart = Chart;

//root.render( <React.StrictMode><App /></React.StrictMode>);
root.render(<App />);
