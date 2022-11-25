import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.scss";
import { UserProvider } from "./Contexts/user.context";
import { ProductsProvider } from "./Contexts/products.context";
import { CartProvider } from "./Contexts/cart.context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
