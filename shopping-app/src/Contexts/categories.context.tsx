import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { getCategoriesAndDocuments } from "../Utils/Firebase/firebase.utils";

interface CategoriesProviderProps {
  children: ReactNode;
}

type ProductKeys = "id" | "name" | "imageUrl" | "price" | "quantity";

export interface Products extends Record<ProductKeys, number | string> {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export type Categories = { [key: string]: Products[] };

type CategoriesContextType = {
  categoriesMap: Categories;
  setCategoriesMap: Dispatch<SetStateAction<Categories | {}>>;
};

const categoriesContextProps: CategoriesContextType = {
  categoriesMap: {},
  setCategoriesMap: () => null,
};

export const CategoriesContext = createContext(categoriesContextProps);

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const [categoriesMap, setCategoriesMap] = useState<Categories>({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
