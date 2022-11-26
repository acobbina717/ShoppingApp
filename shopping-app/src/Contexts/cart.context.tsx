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
  cartCount: number;
  increaseCartQuantity: (productId: number) => void;
  decreaseCartQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

const cartContextState: Context = {
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  cartCount: 0,
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  removeCartItem: () => {},
};

const addItemToCart = (
  cartitems: Array<ProductsObj>,
  productToAdd: ProductsNoQuantity
) => {
  const existingCartItem = cartitems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartitems.map((product) =>
      product.id === productToAdd.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...cartitems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext(cartContextState);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<ProductsObj>>([]);
  const [cartCount, setCartCount] = useState<number>(0);

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

  const increaseCartQuantity = (productId: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };
  const decreaseCartQuantity = (productId: number) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeCartItem = (productId: number) => {
    setCartItems(cartItems.filter((product) => product.id !== productId));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    addToCart,
    cartCount,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeCartItem,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
