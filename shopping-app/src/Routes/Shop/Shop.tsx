import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../../Components/Categories-Preview/CategoriesPreview";
import Category from "../../Components/Category/Category";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
