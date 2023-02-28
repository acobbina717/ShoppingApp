import { Button, Paper, Text, Title } from "@mantine/core";
import { useStore } from "zustand";
import { useCart } from "../../src/utils/hooks/useCart";
import type { Product } from "../../src/utils/typeDef";
import { useStyles } from "./product-card.styles";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;

  const { addToCart } = useStore(useCart);
  const handleAddToCart = () => {
    addToCart(product);
  };

  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${imageUrl})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {name}
        </Text>
        <Title order={3} className={classes.title}>
          {price}
        </Title>
      </div>
      <Button variant="white" color="dark" onClick={handleAddToCart}>
        Read article
      </Button>
    </Paper>
  );
};

export default ProductCard;
