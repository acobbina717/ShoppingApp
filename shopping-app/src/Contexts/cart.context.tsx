import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ProductsNoQuantity, ProductsObj } from "./products.context";

interface CartProviderProps {
  children: ReactNode;
}

type Context = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: Array<ProductsObj>;
  setCartItems: Dispatch<SetStateAction<Array<ProductsObj>>>;
  addToCart: (productToAdd: ProductsNoQuantity) => void;
  removeFromCart: (productToRemove: ProductsObj) => void;
  clearFromCart: (productToRemove: ProductsObj) => void;
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

const addItemToCart = (
  cartItems: Array<ProductsObj>,
  productToAdd: ProductsNoQuantity
) => {
  const existingCartItem = cartItems.find(
    (product) => product.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((product) =>
      product.id === productToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: Array<ProductsObj>,
  productToRemove: ProductsObj
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((product) => product.id !== productToRemove.id);
  }

  return cartItems.map((product) =>
    product.id === productToRemove.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
};

const clearCartItem = (
  cartItems: Array<ProductsObj>,
  productToRemove: ProductsObj
) => {
  return cartItems.filter((product) => product.id !== productToRemove.id);
};

export const CartContext = createContext(cartContextState);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<ProductsObj>>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  const addToCart = (productToAdd: ProductsNoQuantity) => {
    setCartItems(addItemToCart(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeFromCart = (productToRemove: ProductsObj) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearFromCart = (productToRemove: ProductsObj) => {
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
