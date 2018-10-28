import "./index.css";

import * as React from "react";

import { hydrate, render } from "react-dom";

import App from "./App";

const rootElement: any = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
