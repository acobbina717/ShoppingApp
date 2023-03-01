import { Container, Skeleton, Space } from "@mantine/core";

import CategoryPreview from "../../components/CategoryPreview";
import { useCategories } from "../../src/utils/hooks";

const Shop = () => {
  const { categories, isLoading } = useCategories();

  return (
    <Container fluid>
      {isLoading && (
        <>
          <Skeleton height={50} />
          <Space />
          <Skeleton width={50} height={200} />
          <Skeleton height={50} />
        </>
      )}

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
