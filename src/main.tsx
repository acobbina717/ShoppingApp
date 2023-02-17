import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { persistor, store } from "./Utils/Redux/app/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Elements } from "@stripe/react-stripe-js";

import { Toaster } from "react-hot-toast";
import "./index.scss";

import { stripePromise } from "./Utils/Stripe/stripe.utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
