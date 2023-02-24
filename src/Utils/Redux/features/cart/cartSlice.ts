import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "../categories/categoriesSlice";

export type CartItem = Omit<Product, "quantity">;

interface CartState {
  cartItems: Array<Product>;
}
const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseCartItemQuantity: (state, { payload }: PayloadAction<CartItem>) => {
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

    decreaseCartItemQuantity: (state, { payload }: PayloadAction<Product>) => {
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
  },
});

export const {
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
