// import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import ProductCard from "../ProductCard";

import { CategoryContainer } from "./category.styles";
import { useAppSelector } from "../../Utils/Redux/hooks/hooks";
import { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import { Skeleton } from "@mantine/core";
// import Spinner from "../Spinner/Spinner";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const { categoriesMap, error, status } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h1>{category?.toUpperCase()}</h1>
      {status === "loading" ? (
        <Skeleton />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
