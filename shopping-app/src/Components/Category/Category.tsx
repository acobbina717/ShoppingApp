import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ProductCard from "../Product-Card/ProductCard";

import { CategoryContainer } from "./category.styles";
import { useAppSelector } from "../../Utils/Redux/hooks/hooks";
import { Product } from "../../Utils/Redux/features/categories/categoriesSlice";

const Category = () => {
  const { categoriesMap } = useAppSelector((state) => state.categories);
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <CategoryContainer>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </CategoryContainer>
  );
};

export default Category;
