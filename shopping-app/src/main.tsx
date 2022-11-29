import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { persistor, store } from "./Utils/Redux/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "react-hot-toast";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
