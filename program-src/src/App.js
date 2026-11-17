import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import MainApp from "./dass/DASSMain";
import "./w3.css";
import "./App.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return (
    <Provider store={store}>
      <div className="appContainer">
        <div className="mainApp">
          <MainApp />
        </div>
      </div>
    </Provider>
  );
}

export default App;
