import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../features/user/userSlice";
import cartReducer from "../../features/cart/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
