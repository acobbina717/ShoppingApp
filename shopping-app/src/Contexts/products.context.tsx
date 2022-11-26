import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import PRODUCTS from "../shop-data.json";

interface ProviderProps {
  children: ReactNode;
}

export interface ProductsObj {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export type ProductsNoQuantity = Omit<ProductsObj, "quantity">;

type Context = {
  products: ProductsNoQuantity[] | [];
  setProducts: Dispatch<SetStateAction<ProductsNoQuantity[] | []>>;
};

const productContext: Context = {
  products: [],
  setProducts: () => null,
};

export const ProductsContext = createContext(productContext);

export const ProductsProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<ProductsNoQuantity[]>(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
