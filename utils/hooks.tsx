/* eslint-disable no-unused-vars */
import { Grid, Skeleton } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { createContext, useContextSelector } from "use-context-selector";
import { v4 as uuid } from "uuid";
import fetcher from "./fetcher";
import { Product } from "./typeDef";

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

export const useCategories = () => {
  let categories = [];
  const { data, error, isLoading } = useSWR("/categories", fetcher);
  if (data) categories = data;
  const noData = isLoading || error || categories.length < 1;
  return { categories, isLoading, isError: error, noData };
};

export const useCategory = (slug: string) => {
  let products = [];
  const { data, isLoading, error } = useSWR(`/category${slug}`, fetcher);
  if (data) products = data.products;
  const noData = isLoading || error || products.length < 1;
  return { products, isLoading, isError: error, noData };
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

export const useGridColSkeleton = ({
  colCount = 16,
  height = 300,
  span = 6,
}) => {
  const skeletonLayoutCount = new Array(colCount).fill(1);
  return skeletonLayoutCount.map(() => (
    <Grid.Col key={uuid()} span={span} sm={span / 2} mb={30}>
      <Skeleton height={height} />
    </Grid.Col>
  ));
};

export const useUser = () => {
  let currentUser = null;
  const { data, isLoading, error } = useSWR("/authuser", fetcher);
  if (data) currentUser = data;

  return { currentUser, isLoading, isError: error };
};
