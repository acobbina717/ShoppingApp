import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.scss";
import { UserProvider } from "./Contexts/user.context";
import { ProductsProvider } from "./Contexts/products.context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
