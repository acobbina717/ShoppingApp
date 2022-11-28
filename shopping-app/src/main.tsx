import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Contexts/user.context";
import { CategoriesProvider } from "./Contexts/categories.context";
import { CartProvider } from "./Contexts/cart.context";

import { Toaster } from "react-hot-toast";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
