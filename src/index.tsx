import * as React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { AppProviders } from "../src/context/index";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
