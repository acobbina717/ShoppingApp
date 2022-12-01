import { Routes, Route } from "react-router-dom";

import Navigation from "./Routes/Navigation/Navigation";
import Home from "./Routes/Home/Home";
import Shop from "./Routes/Shop/Shop";
import Auth from "./Routes/Auth/Auth";
import Checkout from "./Routes/Checkout/Checkout";

import { useEffect } from "react";

import {
  createUserDocFromGoogleAuth,
  onAuthStateChangeListener,
} from "./Utils/Firebase/firebase.utils";

import { useAppDispatch, useAppSelector } from "./Utils/Redux/hooks/hooks";
import { setCurrentUser } from "./Utils/Redux/features/user/userSlice";
import {
  setCartTotal,
  setCartCount,
} from "./Utils/Redux/features/cart/cartSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocFromGoogleAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(setCartTotal());
    dispatch(setCartCount());
  }, [cartItems]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
