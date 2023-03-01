import { Container, Grid } from "@mantine/core";
import CategoryPreview from "../../components/CategoryPreview";
import { useCategories, useGridColSkeleton } from "../../src/utils/hooks";

const Shop = () => {
  const { categories, isLoading } = useCategories();
  const skeletonCol = useGridColSkeleton({ height: 320 });
  return (
    <Container fluid>
      {isLoading && <Grid>{skeletonCol}</Grid>}

      {categories &&
        Object.keys(categories).map((title) => {
          const products = categories[title];

          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
    </Container>
  );
};

export default Shop;
