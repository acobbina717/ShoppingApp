import userReducer from "../../features/user/userSlice";
import cartReducer from "../../features/cart/cartSlice";
import categoriesReducer from "../../features/categories/categoriesSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoriesReducer,
});

export default rootReducer;
