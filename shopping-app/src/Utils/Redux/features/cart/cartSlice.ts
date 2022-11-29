import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../categories/categoriesSlice";

export type CartItem = Omit<Product, "quantity">;

interface CartState {
  isCartOpen: boolean;
  cartItems: Array<Product>;
  cartCount: number;
  cartTotal: number;
}
const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsCartOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isCartOpen = payload;
    },

    addToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const existingCartItem = state.cartItems.find(
        (product) => product.id === payload.id
      );
      if (existingCartItem) {
        state.cartItems = state.cartItems.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: (product.quantity as number) + 1 }
            : product
        );
      } else {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      }
    },

    removeFromCart: (state, { payload }: PayloadAction<Product>) => {
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
            ? { ...product, quantity: (product.quantity as number) - 1 }
            : product
        );
      }
    },

    clearFromCart: (state, { payload }: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== payload.id
      );
    },

    setCartCount: (state) => {
      state.cartCount = state.cartItems.reduce(
        (total, cartItem) => total + (cartItem.quantity as number),
        0
      );
    },

    setCartTotal: (state) => {
      state.cartTotal = state.cartItems.reduce(
        (total, cartItem) =>
          total + (cartItem.quantity as number) * cartItem.price,
        0
      );
    },
  },
});

export const {
  addToCart,
  setCartCount,
  setCartTotal,
  setIsCartOpen,
  clearFromCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
