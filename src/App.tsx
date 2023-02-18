import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./Routes/Home/Home";
import Shop from "./Routes/Shop/Shop";
import Auth from "./Routes/Auth/Auth";
import Checkout from "./Routes/Checkout/Checkout";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./Utils/Redux/hooks/hooks";
import { checkUserSession } from "./Utils/Redux/features/user/userSlice";
import {
  setCartTotal,
  setCartCount,
} from "./Utils/Redux/features/cart/cartSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    dispatch(setCartTotal());
    dispatch(setCartCount());
  }, [cartItems]);

  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
