import { Container, Grid } from "@mantine/core";

import ProductCard from "./ProductCard";
import type { Product } from "../utils/typeDef";

interface CategoryProps {
  products: Product[];
}

const Category = ({ products }: CategoryProps) => {
  return (
    <Container size="xl">
      <Grid>
        {products && (
          <>
            {products.map((product) => (
              <Grid.Col key={product.id} span={6} sm={3} mb={30}>
                <ProductCard product={product} />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Category;
