import { Grid, Stack, Title, Text, Container } from "@mantine/core";
import Link from "next/link";
import type { Product } from "../src/utils/typeDef";

import ProductCard from "./product-card/ProductCard";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <Container size="xl">
      <Stack pb={10}>
        <Title order={2}>
          <Text component={Link} href={`/shop/${title}`}>
            {title.toUpperCase()}
          </Text>
        </Title>
        <Grid justify="center">
          {products
            .filter((_, idx) => idx < 4)
            .map((product) =>
              title === "sneakers" ? (
                <Grid.Col
                  key={product.name}
                  span={12}
                  xs={10}
                  sm={6}
                  xl={3}
                  mb={10}
                >
                  <ProductCard product={product} key={product.id} />
                </Grid.Col>
              ) : (
                <Grid.Col key={product.name} span={6} xs={5} sm={3} mb={10}>
                  <ProductCard product={product} key={product.id} />
                </Grid.Col>
              )
            )}
        </Grid>
      </Stack>
    </Container>
  );
};

export default CategoryPreview;
