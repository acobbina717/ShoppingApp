/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { createContext, useContextSelector } from "use-context-selector";
import {
  CategoriesCollection,
  getCategoriesAndDocuments,
} from "./firebase/firebase.utils";
import { Product } from "./typeDef";

interface AppProps {
  categories?: CategoriesCollection;
  isLoadingData: boolean;
  isDataError: any;
  getProducts: () => (category: string) => Product[];
  cartItems: Product[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  subtractFromCart: (payload: Product) => void;
  removeFromCart: (payload: Product) => void;
}

export const AppStateContext = createContext<AppProps>({
  categories: {},
  isLoadingData: false,
  isDataError: null,
  getProducts: () => (category: string) => [],
  cartItems: [],
  addToCart: (product: Product) => {},
  cartCount: 0,
  cartTotal: 0,
  removeFromCart: (product: Product) => {},
  subtractFromCart: (product: Product) => {},
});

export const AppStateContextProvider = ({ children }) => {
  const { data, error, isLoading } = useSWR(
    "categories",
    getCategoriesAndDocuments
  );

  const getProducts = useCallback(
    () => (category: string) => {
      if (data && data[category]) {
        return data[category];
      }
      return [];
    },
    [data]
  );

  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "");
    if (storedCart) setCartItems(storedCart);
  }, []);

  const cartCount = cartItems.reduce(
    (total, cartItem) => total + Number(cartItem.quantity),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, cartItem) => total + Number(cartItem.quantity) * cartItem.price,
    0
  );

  const saveCart = (cart: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "");
    if (storedCartItems) {
      setCartItems(storedCartItems);
      return;
    }
    setCartItems(cart);
  };

  const addToCart = useCallback(
    (payload: Product) => {
      const existingCartItem = cartItems?.find(
        (product) => product.id === payload.id
      );
      if (existingCartItem) {
        const items = cartItems?.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: Number(product.quantity) + 1 }
            : product
        );
        saveCart(items);
        return;
      }
      const items = [...(cartItems as Product[]), { ...payload, quantity: 1 }];
      saveCart(items);
    },
    [cartItems]
  );

  const subtractFromCart = useCallback(
    (payload: Product) => {
      const existingCartItem = cartItems.find(
        (product) => product.id === payload.id
      );
      if (existingCartItem?.quantity === 1) {
        const items = cartItems.filter((product) => product.id !== payload.id);
        saveCart(items);
        return;
      }

      const items = cartItems.map((product) =>
        product.id === payload.id
          ? { ...product, quantity: Number(product.quantity) - 1 }
          : product
      );
      saveCart(items);
    },
    [cartItems]
  );

  const removeFromCart = useCallback(
    (payload: Product) => {
      const items = cartItems.filter(
        (product) => product.name !== payload.name
      );
      saveCart(items);
    },
    [cartItems]
  );

  const value = useMemo(
    () => ({
      categories: data,
      cartItems,
      isLoadingData: isLoading,
      isDataError: error,
      cartCount,
      cartTotal,
      getProducts,
      addToCart,
      subtractFromCart,
      removeFromCart,
    }),
    [
      data,
      cartItems,
      isLoading,
      error,
      cartCount,
      cartTotal,
      getProducts,
      addToCart,
      subtractFromCart,
      removeFromCart,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useCategories = () => {
  const { categories, getProducts, isLoadingData, isDataError } =
    useContextSelector(AppStateContext, (s) => s);
  return {
    categories,
    getProducts,
    isLoading: isLoadingData,
    isError: isDataError,
  };
};

export const useCart = () => {
  const {
    cartItems,
    cartCount,
    addToCart,
    cartTotal,
    subtractFromCart,
    removeFromCart,
  } = useContextSelector(AppStateContext, (s) => s);
  return {
    cartItems,
    cartCount,
    addToCart,
    cartTotal,
    subtractFromCart,
    removeFromCart,
  };
};
