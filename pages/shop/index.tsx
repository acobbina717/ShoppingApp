import { Container, Grid } from "@mantine/core";
import CategoryPreview from "../../components/CategoryPreview";
import { useCategories, useGridColSkeleton } from "../../src/utils/hooks";

const Shop = () => {
  const { categories, isLoading, isError } = useCategories();
  const skeletonCol = useGridColSkeleton({ height: 320 });
  const nodata = isLoading || isError;
  return (
    <Container fluid>
      {nodata && <Grid>{skeletonCol}</Grid>}

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
