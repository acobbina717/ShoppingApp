import { Container, Skeleton } from "@mantine/core";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchCategoriesLoading } from "../src/Utils/Redux/features/categories/categoriesSlice";

import { useAppDispatch, useAppSelector } from "../src/Utils/Redux/hooks/hooks";
import CategoryPreview from "./CategoryPreview";

const CategoriesPreview = () => {
  const { categoriesMap, status } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesLoading() as unknown as AnyAction);
    }
  });

  return (
    <Container size={1600}>
      {status === "loading" ? (
        <>
          <Skeleton height={50} />
          <Skeleton height={200} />
          <Skeleton height={50} />
        </>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];

          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Container>
  );
};

export default CategoriesPreview;