import { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import ProductCard from "../Product-Card/ProductCard";

import {
  Title,
  Preview,
  CategoryPreviewContainer,
} from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

function CategoryPreview({ title, products }: CategoryPreviewProps) {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;
