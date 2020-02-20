import * as React from "react";
import { render } from "react-dom";
import Main from "./components/Main";
import { BrowserRouter, Route } from "react-router-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Main} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
  rootElement
);
