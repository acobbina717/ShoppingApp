/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import useSWR from "swr";
import { Product } from "./typeDef";
import fetcher from "./fetcher";

export const useCategories = () => {
  let categories = [];
  const { data, error, isLoading } = useSWR("/categories", fetcher);

  if (data) categories = data;
  const noData = isLoading || error || categories.length < 1;
  return { categories, isLoading, isError: error, noData };
};

interface CartProps {
  cartItems: Product[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  subtractFromCart: (payload: Product) => void;
  removeFromCart: (payload: Product) => void;
}

const CartContext = createContext<CartProps>({
  cartItems: [],
  addToCart: (product: Product) => {},
  cartCount: 0,
  cartTotal: 0,
  removeFromCart: (product: Product) => {},
  subtractFromCart: (product: Product) => {},
});

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    if (localStorage.getItem("cart") || "") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "");
      setCartItems(storedCart);
    }
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
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      subtractFromCart,
      removeFromCart,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      subtractFromCart,
      removeFromCart,
    ]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const {
    cartItems,
    cartCount,
    addToCart,
    cartTotal,
    subtractFromCart,
    removeFromCart,
  } = useContextSelector(CartContext, (s) => s);
  return {
    cartItems,
    cartCount,
    addToCart,
    cartTotal,
    subtractFromCart,
    removeFromCart,
  };
};
