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

import { useAppDispatch } from "../Utils/Redux/hooks/hooks";
import { increaseCartItemQuantity } from "../Utils/Redux/features/cart/cartSlice";

import { useHover } from "@mantine/hooks";

import type { Product } from "../Utils/Redux/features/categories/categoriesSlice";
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { imageUrl, name, price } = product;

  const dispatch = useAppDispatch();
  const addProductToCart = () => dispatch(increaseCartItemQuantity(product));

  const { hovered, ref } = useHover();

  return (
    <Stack>
      <Card radius="md" shadow="lg">
        <Card.Section ref={ref}>
          <Image src={imageUrl} alt={name} radius={"sm"} />
          <Center>
            <Button
              style={{ position: "absolute" }}
              w={"80%"}
              bottom={10}
              display={!hovered && "none"}
              onClick={addProductToCart}
            >
              Add To Cart
            </Button>
          </Center>
        </Card.Section>
      </Card>
      <Paper>
        <Group display={"flex"} position="apart">
          <Text w={"65%"}>{name}</Text>
          <Text>{`$${price}`}</Text>
        </Group>
      </Paper>
    </Stack>
  );
};

export default ProductCard;
