import { useMemo } from "react";
import useSWR from "swr";
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

export const useCart = (cartItems: Product[]) => {
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, cartItem) => total + Number(cartItem.quantity) * cartItem.price,
        0
      ),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, cartItem) => total + Number(cartItem.quantity) * cartItem.price,
        0
      ),
    [cartItems]
  );

  return {
    cartTotal,
    cartCount,
  };
};
