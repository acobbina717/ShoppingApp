import useSWR from "swr";

import { getCategoriesAndDocuments } from "./firebase/firebase.utils";

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
