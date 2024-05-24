import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CustomProvider } from "rsuite";

import "rsuite/dist/rsuite.min.css"; // or 'rsuite/styles/index.less';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomProvider>
      <App />
    </CustomProvider>
  </React.StrictMode>
);
