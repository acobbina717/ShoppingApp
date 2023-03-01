import { Container, Grid, Skeleton, Stack } from "@mantine/core";
import { v4 as uuid } from "uuid";
import type { Product } from "../src/utils/typeDef";
import ProductCard from "./ProductCard";

interface CategoryProps {
  products: Product[];
}

const skeletonLayoutCount = new Array(10).fill(1);

const Category = ({ products }: CategoryProps) => {
  return (
    <Container fluid mb={50}>
      <Stack pb={10}>
        {products.length < 1 && (
          <Grid justify="center">
            {skeletonLayoutCount.map(() => (
              <Grid.Col key={uuid()} span={6} xs={5} sm={3} mb={10}>
                <Skeleton height={400} />
              </Grid.Col>
            ))}
          </Grid>
        )}

        {products && (
          <Grid>
            {products.map((product) => (
              <Grid.Col key={product.id} span={6} xs={5} sm={3} mb={10}>
                <ProductCard product={product} />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default Category;
