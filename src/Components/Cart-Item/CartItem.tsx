import { Card, Group, Image, Stack, Text } from "@mantine/core";
import QuantityCounter from "../QuantityCounter";

import { useAppDispatch } from "../../Utils/Redux/hooks/hooks";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../Utils/Redux/features/cart/cartSlice";

import { useStyles } from "./cart-item.styles";

import type { Product } from "../../Utils/Redux/features/categories/categoriesSlice";
type CartItemProps = {
  cartItem: Product;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, imageUrl, price } = cartItem;

  const { theme } = useStyles();

  const dispatch = useAppDispatch();

  const addToCart = () => dispatch(increaseItemQuantity(cartItem));

  const subtractFromCart = () => dispatch(decreaseItemQuantity(cartItem));

  return (
    <Card
      h={150}
      withBorder
      display={"flex"}
      mb={15}
      p={0}
      style={{
        alignItems: "center",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      <Group noWrap spacing={0}>
        <Image src={imageUrl} alt={`${name}`} width={136} mr={4} />
        <Stack>
          <Group position="apart">
            <Text size={"sm"} w={210} ml={3}>
              {name}
            </Text>
            <Text>{`$${price}`}</Text>
          </Group>
          <Group position="right" ml={20}>
            <QuantityCounter
              quantity={Number(quantity)}
              addToCart={addToCart}
              subtractFromCart={subtractFromCart}
            />
          </Group>
          <Text align="right">{`Total: $${Number(quantity) * price} `}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default CartItem;
