import { Container, Grid, Stack } from "@mantine/core";
import { useGridColSkeleton } from "../utils/hooks";
import type { Product } from "../utils/typeDef";
import ProductCard from "./ProductCard";

interface CategoryProps {
  products: Product[];
}

const Category = ({ products }: CategoryProps) => {
  const skeletonCol = useGridColSkeleton({ height: 320 });
  return (
    <Container size="xl">
      <Stack>
        <Grid>
          <>
            {!products && skeletonCol}

            {products && (
              <>
                {products.map((product) => (
                  <Grid.Col key={product.id} span={6} sm={3} mb={30}>
                    <ProductCard product={product} />
                  </Grid.Col>
                ))}
              </>
            )}
          </>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Category;
