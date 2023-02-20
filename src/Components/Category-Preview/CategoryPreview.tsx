import { Grid, Stack, Title, Text } from "@mantine/core";
import Link from "next/link";
import { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
import ProductCard from "../Product-Card/ProductCard";

type CategoryPreviewProps = {
  title: string;
  products: Product[];
};

function CategoriesPreviewItem({ title, products }: CategoryPreviewProps) {
  return (
    <Stack>
      <Title order={2}>
        <Text component={Link} href={title}>
          {title.toUpperCase()}
        </Text>
      </Title>
      <Grid gutter={"xl"}>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <Grid.Col span={6} xs={3} sm={3}>
              <ProductCard product={product} key={product.id} />
            </Grid.Col>
          ))}
      </Grid>
    </Stack>
  );
}

export default CategoriesPreviewItem;
