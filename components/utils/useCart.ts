import { useMemo } from "react";
import { Product } from "../../src/Utils/Redux/features/categories/categoriesSlice";

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

  return { cartTotal, cartCount };
};
