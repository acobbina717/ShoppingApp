import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Products } from "./categories.context";

interface CartProviderProps {
  children: ReactNode;
}

export type CartItem = Omit<Products, "quantity">;

type Context = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: Array<Products>;
  setCartItems: Dispatch<SetStateAction<Array<Products>>>;
  addToCart: (productToAdd: CartItem) => void;
  removeFromCart: (productToRemove: Products) => void;
  clearFromCart: (productToRemove: Products) => void;
  cartCount: number;
  cartTotal: number;
};

const cartContextState: Context = {
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
};

const addItemToCart = (cartItems: Array<Products>, productToAdd: CartItem) => {
  const existingCartItem = cartItems.find(
    (product) => product.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((product) =>
      product.id === productToAdd.id
        ? { ...product, quantity: (product.quantity as number) + 1 }
        : product
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: Array<Products>,
  productToRemove: Products
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((product) => product.id !== productToRemove.id);
  }

  return cartItems.map((product) =>
    product.id === productToRemove.id
      ? { ...product, quantity: (product.quantity as number) - 1 }
      : product
  );
};

const clearCartItem = (
  cartItems: Array<Products>,
  productToRemove: Products
) => {
  return cartItems.filter((product) => product.id !== productToRemove.id);
};

export const CartContext = createContext(cartContextState);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<Products>>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  const addToCart = (productToAdd: CartItem) => {
    setCartItems(addItemToCart(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + (cartItem.quantity as number),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) =>
        total + (cartItem.quantity as number) * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeFromCart = (productToRemove: Products) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearFromCart = (productToRemove: Products) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
