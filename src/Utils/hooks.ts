import useSWR from "swr";
import { persist } from "zustand/middleware";
import { createStore } from "zustand";
import { getCategoriesAndDocuments } from "./firebase/firebase.utils";
import { Product } from "./typeDef";

export const useCategories = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    "categories",
    getCategoriesAndDocuments
  );

  return {
    categories: data,
    isError: error,
    isLoading,
    isValidating,
    getProducts: (category: string) => {
      if (data && data[category]) {
        return data[category];
      }

      return [];
    },
  };
};

type useCartProps = {
  cartItems: Product[];
  cartCount: number;
  cartTotal: number;
  // eslint-disable-next-line no-unused-vars
  addToCart: (payload: Product) => void;
  // eslint-disable-next-line no-unused-vars
  subtractFromCart: (payload: Product) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (payload: Product) => void;
  setCartCount: () => void;
  setCartTotal: () => void;
};

export const useCart = createStore<useCartProps>()(
  persist(
    (set) => ({
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
      addToCart: (payload) =>
        set((state) => {
          const existingCartItem = state.cartItems?.find(
            (product) => product.id === payload.id
          );
          if (existingCartItem) {
            return {
              cartItems: state.cartItems?.map((product) =>
                product.id === payload.id
                  ? { ...product, quantity: Number(product.quantity) + 1 }
                  : product
              ),
            };
          }
          return {
            cartItems: [
              ...(state.cartItems as Product[]),
              { ...payload, quantity: 1 },
            ],
          };
        }),
      subtractFromCart: (payload) =>
        set((state) => {
          const existingCartItem = state.cartItems.find(
            (product) => product.id === payload.id
          );
          if (existingCartItem?.quantity === 1) {
            return {
              cartItems: state.cartItems.filter(
                (product) => product.id !== payload.id
              ),
            };
          }
          return {
            cartItems: state.cartItems.map((product) =>
              product.id === payload.id
                ? { ...product, quantity: Number(product.quantity) - 1 }
                : product
            ),
          };
        }),
      removeFromCart: (payload) =>
        set((state) => {
          return {
            cartItems: state.cartItems.filter(
              (product) => product.id !== payload.id
            ),
          };
        }),
      setCartCount: () =>
        set((state) => ({
          cartCount: state.cartItems.reduce(
            (total, cartItem) => total + Number(cartItem.quantity),
            0
          ),
        })),
      setCartTotal: () =>
        set((state) => ({
          cartTotal: state.cartItems.reduce(
            (total, cartItem) =>
              total + Number(cartItem.quantity) * cartItem.price,
            0
          ),
        })),
    }),
    { name: "cartItems" }
  )
);
