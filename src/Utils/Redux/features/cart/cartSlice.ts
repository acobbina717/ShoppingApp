import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../categories/categoriesSlice";
export type CartItem = Omit<Product, "quantity">;

interface CartState {
  cartItems: Array<Product>;
  cartCount: number;
  cartTotal: number;
}
const initialState: CartState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseItemQuantity: (state, { payload }: PayloadAction<CartItem>) => {
      const existingCartItem = state.cartItems.find(
        (product) => product.id === payload.id
      );
      if (existingCartItem) {
        state.cartItems = state.cartItems.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: Number(product.quantity) + 1 }
            : product
        );
      } else {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      }
    },

    decreaseItemQuantity: (state, { payload }: PayloadAction<Product>) => {
      const existingCartItem = state.cartItems.find(
        (product) => product.id === payload.id
      );
      if (existingCartItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== payload.id
        );
      } else {
        state.cartItems = state.cartItems.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product
        );
      }
    },

    removeItemFromCart: (state, { payload }: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== payload.id
      );
    },

    setCartCount: (state) => {
      state.cartCount = state.cartItems.reduce(
        (total, cartItem) => total + Number(cartItem.quantity),
        0
      );
    },

    setCartTotal: (state) => {
      state.cartTotal = state.cartItems.reduce(
        (total, cartItem) => total + Number(cartItem.quantity) * cartItem.price,
        0
      );
    },
  },
});

export const {
  setCartCount,
  setCartTotal,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
