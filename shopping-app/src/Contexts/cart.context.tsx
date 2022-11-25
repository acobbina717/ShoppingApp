import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface CartProviderProps {
  children: ReactNode;
}

type Context = {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
};

const cartStateContext: Context = {
  isCartOpen: false,
  setIsCartOpen: () => {},
};

export const CartContext = createContext(cartStateContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
