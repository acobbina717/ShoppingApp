import { Button, Paper, Text, Title, createStyles } from "@mantine/core";
import { useStore } from "zustand";
import { useCart } from "../src/utils/hooks";
import type { Product } from "../src/utils/typeDef";

type ProductCardProps = {
  product: Product;
};

const useStyles = createStyles((theme) => ({
  card: {
    height: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

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
