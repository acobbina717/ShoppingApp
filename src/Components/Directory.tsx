import { Container, Grid, createStyles } from "@mantine/core";
import DirectoryItem from "./directory-item/DirectoryItem";

import type { Product } from "../Utils/Redux/features/categories/categoriesSlice";
export interface Directory extends Pick<Product, "id" | "imageUrl"> {
  title: string;
  route: string;
}

const categories: Directory[] = [
  {
    id: 1,
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "shop/hats",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/jackets",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "shop/sneakers",
  },
  {
    id: 4,
    title: "women",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "shop/women",
  },
  {
    id: 5,
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "shop/men",
  },
];

const useStyles = createStyles({});

const Directory = () => {
  const { theme } = useStyles();
  return (
    <Container fluid>
      <Grid bg={theme.colors.dark[0]} grow gutter="xs">
        {categories.map((category) => {
          return (
            <Grid.Col key={category.id} span={6} xs={4}>
              <DirectoryItem category={category} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Directory;