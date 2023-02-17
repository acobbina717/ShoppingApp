import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../../components/Categories-Preview/CategoriesPreview";
import Category from "../../components/Category/Category";
import { fetchCategoriesLoading } from "../../Utils/Redux/features/categories/categoriesSlice";

import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";

const Shop = () => {
  const { status } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesLoading() as unknown as AnyAction);
    }
  });
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
