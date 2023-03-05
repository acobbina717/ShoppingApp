import { Container, Grid } from "@mantine/core";
import CategoryPreview from "../../components/CategoryPreview";
import { useCategories, useGridColSkeleton } from "../../utils/hooks";

const Shop = () => {
  const { categories, isLoading, isError } = useCategories();
  const skeletonCol = useGridColSkeleton({ height: 320 });
  const nodata = isLoading || isError;

  return (
    <Container fluid>
      {nodata && <Grid>{skeletonCol}</Grid>}

      {categories &&
        categories.map(({ products, id, name }) => {
          return <CategoryPreview key={id} title={name} products={products} />;
        })}
    </Container>
  );
};

export default Shop;
