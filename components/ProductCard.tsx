import {
  Button,
  Card,
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";

import { useAppDispatch } from "../src/utils/redux/hooks/hooks";
import { increaseCartItemQuantity } from "../src/utils/redux/features/cart/cartSlice";
import type { Product } from "../src/utils/typeDef";

// import { useHover } from "@mantine/hooks";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;

  const dispatch = useAppDispatch();
  const addProductToCart = () => dispatch(increaseCartItemQuantity(product));

  // const { hovered, ref } = useHover();

  return (
    <Stack>
      <Card radius="md" shadow="lg">
        <Card.Section>
          <Image src={imageUrl} alt={name} radius="sm" />
          <Center>
            <Button
              style={{ position: "absolute" }}
              w="80%"
              bottom={10}
              display="none"
              onClick={addProductToCart}
            >
              Add To Cart
            </Button>
          </Center>
        </Card.Section>
      </Card>
      <Paper>
        <Group display="flex" position="apart">
          <Text w="65%">{name}</Text>
          <Text>{`$${price}`}</Text>
        </Group>
      </Paper>
    </Stack>
  );
};

export default ProductCard;
