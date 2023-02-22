import { Grid, Stack, Title, Text, Container } from "@mantine/core";
import Link from "next/link";
import { Product } from "../Utils/Redux/features/categories/categoriesSlice";
import ProductCard from "./ProductCard";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

function CategoriesPreviewItem({ title, products }: CategoryPreviewProps) {
  const productCard = products
    .filter((_, idx) => idx < 4)
    .map((product, idx) => {
      if (title === "sneakers") {
        return (
          <Grid.Col key={idx} span={12} xs={10} sm={6} xl={3}>
            <ProductCard product={product} key={product.id} />
          </Grid.Col>
        );
      }

      return (
        <Grid.Col key={idx} span={6} xs={5} sm={3}>
          <ProductCard product={product} key={product.id} />
        </Grid.Col>
      );
    });

  return (
    <Container fluid mb={50}>
      <Stack>
        <Title order={2}>
          <Text component={Link} href={`/shop/${title}`}>
            {title.toUpperCase()}
          </Text>
        </Title>
        <Grid justify="center">{productCard}</Grid>
      </Stack>
    </Container>
  );
}

export default CategoriesPreviewItem;
