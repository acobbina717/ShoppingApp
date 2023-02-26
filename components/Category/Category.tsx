import { Container, Skeleton } from "@mantine/core";
import type { Product } from "../../src/utils/typeDef";
import ProductCard from "../ProductCard";

interface CategoryProps {
  products: Product[];
}

const Category = ({ products }: CategoryProps) => {
  return (
    <Container>
      {products.length < 1 && <Skeleton height={400} />}

      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Container>
  );
};

export default Category;
