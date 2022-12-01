import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../../Components/Categories-Preview/CategoriesPreview";
import Category from "../../Components/Category/Category";
import { fetchCategories } from "../../Utils/Redux/features/categories/categoriesSlice";

import { useAppDispatch, useAppSelector } from "../../Utils/Redux/hooks/hooks";

const Shop = () => {
  const { status } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories() as unknown as AnyAction);
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
