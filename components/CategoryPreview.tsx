import { Grid, Stack, Title, Text, Container } from "@mantine/core";
import Link from "next/link";
import type { Product } from "../utils/typeDef";

import ProductCard from "./ProductCard";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <Container size="xl">
      <Stack pb={40}>
        <Title order={2}>
          <Text
            component={Link}
            href={{ pathname: "/shop/[category]", query: { category: title } }}
          >
            {title.toUpperCase()}
          </Text>
        </Title>

        <Grid>
          {products
            .filter((_, idx) => idx < 4)
            .map((product) =>
              title === "sneakers" ? (
                <Grid.Col key={product.name} span={6} xs={6} sm={3} mb={10}>
                  <ProductCard product={product} key={product.id} />
                </Grid.Col>
              ) : (
                <Grid.Col key={product.name} span={6} xs={6} sm={3} mb={10}>
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
