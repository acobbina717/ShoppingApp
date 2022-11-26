import { Routes, Route } from "react-router-dom";

import Navigation from "./Routes/Navigation/Navigation";
import Home from "./Routes/Home/Home";
import Shop from "./Routes/Shop/Shop";
import Auth from "./Routes/Auth/Auth";
import Checkout from "./Routes/Checkout/Checkout";

type AppProps = {};

const App = (props: AppProps) => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
